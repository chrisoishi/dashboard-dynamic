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

Route::get('/','Dashboard@dashboard');

Route::post('/start','Dashboard@start')->name("dashboard.startconnection");

Route::post('/save','Dashboard@save')->name("dashboard.save");
Route::post('/saveDash','Dashboard@saveDash')->name("dashboard.saveDash");
Route::post('/deleteDash','Dashboard@deleteDash')->name("dashboard.deleteDash");

Route::get('/loadSavedDash','Dashboard@loadSavedDash')->name("dashboard.loadSavedDash");
Route::get('/loadSavedDash/{id}-{saved}','Dashboard@loadSavedDash');

Route::get('/load','Dashboard@load')->name("dashboard.load");
Route::get('/load/{id}/{update}','Dashboard@load');

Route::get('/meta','Dashboard@meta')->name("dashboard.metadash");
Route::get('/meta/{id}','Dashboard@meta');

Route::get('/listdash','Dashboard@listSavedDash')->name("dashboard.listdash");

Route::get('/connection/{id}','Dashboard@connection')->name("dashboard.connection");
Route::get('/json/{json}','Dashboard@json')->name("dashboard.json");

Route::get('/survey/{connection}/{id}','Survey@answer');
Route::get('/survey/data/{connection}/{id}','Survey@data');
Route::post('/survey/compute','Survey@compute')->name('survey.compute');
