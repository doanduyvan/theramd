<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Admin\ProductService;

class ProductController extends Controller
{

    public function __construct(private readonly ProductService $productService) {}

    public function syncProducts()
    {
        return $this->productService->syncProductsFromSapo();
    }

    public function getProducts()
    {
        return $this->productService->getProducts();
    }
}
