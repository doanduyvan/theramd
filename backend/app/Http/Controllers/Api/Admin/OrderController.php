<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(private readonly OrderService $orderService) {}

    public function syncOrders()
    {
        return $this->orderService->syncOrdersFromSapo();
    }

    public function getOrders(Request $request)
    {
        return $this->orderService->getOrders($request->all());
    }
}
