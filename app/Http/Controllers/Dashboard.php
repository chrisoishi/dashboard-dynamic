<?php

namespace App\Http\Controllers;
use Storage;

use Illuminate\Http\Request;

class Dashboard extends Controller
{
    function dashboard(){
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $connection = "true";
        }
        else{
            if(!isset($_COOKIE['dash-dynamic-id'])){
                do{
                    $id = rand(10000,99999);
                }while(Storage::exists("cfgs/$id.txt"));
                setcookie('dash-dynamic-id',$id,2147483647);
            }
            else $id = $_COOKIE['dash-dynamic-id'];
            $connection = "false";
        }

        return view('app',compact('id',$id,'connection',$connection));
    }

    function meta($id){
        if(Storage::exists("cfgs/saved/$id.meta")){
            $meta = Storage::get("cfgs/saved/$id.meta");
        }
        else $meta = "{}";
        return $meta;
    }

    function save(Request $request){
        Storage::put("cfgs/".$request['id'].".txt",json_encode($request['cfg'],JSON_PRETTY_PRINT));
        Storage::put("cfgs/".$request['id'].".updated",$request['updated_level']);
    }
    function saveDash(Request $request){
        $contents = Storage::get("cfgs/".$request['id'].".txt");
        if($request['new_id'] != "")$request['id'] = $request['id']."-".$request['new_id'];
        Storage::put("cfgs/saved/".$request['id'].".txt",$contents);
        Storage::put("cfgs/saved/".$request['id'].".meta",json_encode($request['meta'],JSON_PRETTY_PRINT));
    }
    function deleteDash(Request $request){
        Storage::delete("cfgs/saved/".$request['id'].".txt");
        Storage::delete("cfgs/saved/".$request['id'].".meta");
    }
    function loadSavedDash($id,$saved){
        $contents = Storage::get("cfgs/saved/".$saved.".txt");
        Storage::put("cfgs/".$id.".txt",$contents);
        Storage::put("cfgs/".$id.".updated","1");
        return "{}";
    }
    function listSavedDash(){
        $templates = array();
        foreach(Storage::files("cfgs/saved/") as $file){
            if(strstr($file,".meta")){
                $ex = explode("/",$file);
                $id = str_replace(".meta","",$ex[count($ex)-1]);
                $content = json_decode(Storage::get($file));
                //dd($content);
                array_push($templates,array('value'=>$id,'text'=>$content->name));
            }
        }
        return $templates;
    }

    function load($id,$update){
        if(!Storage::exists("cfgs/$id.txt")){
            if(Storage::exists("cfgs/saved/$id.txt")){
                Storage::copy("cfgs/saved/$id.txt","cfgs/$id.txt");
            }
            else{
                Storage::put("cfgs/".$id.".txt",'{
                    "dash1": {
                        "type": "dash-card-add",
                        "data": null
                    },
                    "updated_level" : "0"
                }');
            }
            Storage::put("cfgs/".$id.".updated","0");
        }
        $updated_level = Storage::get("cfgs/$id.updated");
        if($updated_level > $update) return Storage::get("cfgs/$id.txt");
        else return "{}";
    }
    function start(Request $r){
        Storage::put("cfgs/start/$r->connection.txt",$r->dash_id);
    }

    function connection($id){
        if(Storage::exists("cfgs/start/$id.txt")){
            $dash = Storage::get("cfgs/start/$id.txt");
            Storage::delete("cfgs/start/$id.txt");
            return json_encode(array('connection'=>$dash));
        }
        else return json_encode(array('connection'=>'false'));
    }
    function json($json){
        return Storage::get("json/$json.txt");
    }

    static function incrementUpdatedLevel($connection){
        $cfgs = Storage::get("cfgs/$connection.txt");
        $decode = json_decode($cfgs);
        $decode->updated_level += 1;
        Storage::put("cfgs/$connection.txt",json_encode($decode,JSON_PRETTY_PRINT));
        Storage::put("cfgs/".$connection.".updated",$decode->updated_level);
    }


}
