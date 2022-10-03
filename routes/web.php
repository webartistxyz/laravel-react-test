<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationsController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/reservation-data', [ReservationsController::class, 'index']);
