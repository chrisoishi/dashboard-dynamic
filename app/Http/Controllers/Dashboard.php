<?php

namespace App\Http\Controllers;
use Storage;

use Illuminate\Http\Request;

class Dashboard extends Controller
{
    function save(Request $request){
        Storage::put("cfgs/".$request['id'].".txt",json_encode($request['cfg'],JSON_PRETTY_PRINT));
    }
    function load($id){
        if(!Storage::exists("cfgs/$id.txt")){
            Storage::put("cfgs/".$id.".txt","{dash1:{type='dash-card-add',data:null}}");
        }
        return Storage::get("cfgs/$id.txt");
    }
    function connection($id){
        if(Storage::exists("cfgs/$id.txt")){
            return json_encode(array('connection'=>'true'));
        }
        else return json_encode(array('connection'=>'false'));
    }
}
