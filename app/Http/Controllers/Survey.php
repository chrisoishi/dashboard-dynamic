<?php

namespace App\Http\Controllers;
use Storage;
use App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;

class Survey extends Controller
{
    function answer($connection,$id){
        $cfgs = Storage::get("cfgs/$connection.txt");
        $decode = json_decode($cfgs);
        $survey = $decode->data_card->{"id_$id"};
        if(!Storage::exists("survey/$connection-$id.txt")){
            Storage::put("survey/$connection-$id.txt","{}");
        }
        //dd($decode->data_card->{"id_$id"});
        return view('survey',compact('id','connection','survey'));
    }
    function compute(Request $r){
        $cfgs = Storage::get("survey/$r->connection-$r->id.txt");
        $decode = json_decode($cfgs);
        $cfgs2 = Storage::get("cfgs/$r->connection.txt");
        $decode2 = json_decode($cfgs2);
        $survey = $decode2->data_card->{"id_$r->id"};
        $decode->question = $survey->question;
        $decode->answers = $survey->answers;
        if(isset($decode->{$r->answer}))$decode->{$r->answer} += 1;
        else $decode->{$r->answer}=1;
        Storage::put("survey/$r->connection-$r->id.txt",json_encode($decode));

        Dashboard::incrementUpdatedLevel($r->connection);

    }
    function data($connection,$id){
        if(Storage::exists("survey/$connection-$id.txt"))return Storage::get("survey/$connection-$id.txt");
        else return "{}";
    }
}
