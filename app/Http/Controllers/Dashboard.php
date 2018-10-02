<?php

namespace App\Http\Controllers;
use Storage;

use Illuminate\Http\Request;

class Dashboard extends Controller
{
    function save(Request $request){
        Storage::put("cfg.txt",json_encode($request['cfg'],JSON_PRETTY_PRINT));
    }
    function load(){
        return Storage::get("cfg.txt");
    }
}
