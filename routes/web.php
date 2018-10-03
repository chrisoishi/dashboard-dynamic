<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $connection = "true";
    }
    else{
        if(!isset($_COOKIE['dash-dynamic-id'])){
            $id = rand(10000,99999);
            setcookie('dash-dynamic-id',$id);
        }
        else $id = $_COOKIE['dash-dynamic-id'];
        $connection = "false";
    }
    return view('app',compact('id',$id,'connection',$connection));
});

Route::post('/save','Dashboard@save')->name("dashboard.save");
Route::get('/load/{id}','Dashboard@load')->name("dashboard.load");
Route::get('/connection/{id}','Dashboard@connection')->name("dashboard.connection");
