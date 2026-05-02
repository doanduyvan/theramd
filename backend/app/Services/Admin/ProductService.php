<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Support\ApiResponse as AR;
use Illuminate\Support\Facades\Http;
use App\Support\SapoHelper;

class ProductService
{


    public function syncProductsFromSapo()
    {
        $urlSapo = SapoHelper::getUrl('/admin/products.json');
        $response = Http::get($urlSapo);

        if ($response->failed()) {
            return AR::error(400, 'Không thể lấy danh sách sản phẩm từ Sapo.');
        }

        $products = $response->json('products', []);

        foreach ($products as $item) {
            Product::updateOrCreate(
                [
                    'id_sapo' => $item['id'],
                ],
                [
                    'name' => $item['name'] ?? '',
                    'alias' => $item['alias'] ?? null,
                    'product_type' => $item['product_type'] ?? null,
                    'meta_title' => $item['meta_title'] ?? null,
                    'meta_description' => $item['meta_description'] ?? null,
                    'summary' => $item['summary'] ?? null,
                    'content' => $item['content'] ?? null,
                    'status' => $item['status'] ?? null,
                    'images' => $item['images'] ?? null,
                    'image' => $item['image'] ?? null,
                    'variants' => $item['variants'] ?? null,
                ]
            );
        }

        return AR::success(200, 'Đồng bộ sản phẩm từ Sapo thành công');
    }

    public function getProducts()
    {
        $products = Product::query()
            ->latest()
            ->get();

        return AR::success(200, 'Lấy danh sách sản phẩm thành công.', $products);
    }


    public function getList(array $filters = [])
    {
        return Product::query()
            ->when(!empty($filters['keyword']), function ($query) use ($filters) {
                $query->where('name', 'like', '%' . $filters['keyword'] . '%')
                    ->orWhere('alias', 'like', '%' . $filters['keyword'] . '%');
            })
            ->when(!empty($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->latest()
            ->paginate($filters['per_page'] ?? 20);
    }

    public function findById(int $id): Product
    {
        return Product::findOrFail($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(int $id, array $data): Product
    {
        $product = $this->findById($id);

        $product->update($data);

        return $product;
    }

    public function delete(int $id): bool
    {
        $product = $this->findById($id);

        return $product->delete();
    }
}
