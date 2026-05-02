<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// for Admin
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\OrderController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// for customer
Route::group([], function () {
    Route::get('/test', function () {
        return response()->json(['scope' => 'customer']);
    });
});

// for Admin
Route::prefix('v1/admin')->name('admin.')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
    });

    Route::get('/sync/products', [ProductController::class, 'syncProducts']);
    Route::get('/products', [ProductController::class, 'getProducts']);
    Route::get('/sync/orders', [OrderController::class, 'syncOrders']);
    Route::get('/orders', [OrderController::class, 'getOrders']);


    Route::get('/test', function () {
        return response()->json(['scope' => 'admin']);
    });
});
