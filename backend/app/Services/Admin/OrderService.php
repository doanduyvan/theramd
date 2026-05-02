<?php

namespace App\Services\Admin;

use App\Support\SapoHelper;
use App\Support\ApiResponse as AR;
use Illuminate\Support\Facades\Http;
use App\Models\Order;

class OrderService
{
    //

    public function syncOrdersFromSapo()
    {
        $urlSapo = SapoHelper::getUrl('/admin/orders.json');
        $response = Http::get($urlSapo);
        if ($response->failed()) {
            return AR::error(400, 'Không thể đồng bộ đơn hàng từ Sapo.');
        }

        $orders = $response->json('orders', []);

        foreach ($orders as $item) {
            Order::updateOrCreate(
                [
                    'id_sapo' => $item['id'],
                ],
                [
                    'email' => $item['email'] ?? null,
                    'phone' => $item['phone']
                        ?? $item['shipping_address']['phone']
                        ?? $item['billing_address']['phone']
                        ?? null,
                    'status' => $item['status'] ?? null,
                    'full_fields' => $item,
                ]
            );
        }

        return AR::success(
            200,
            'Đồng bộ đơn hàng từ Sapo thành công.',
            [
                'total' => count($orders),
            ]
        );
    }

    // viết hàm lấy đơn hàng có phân trang ở đây

    public function getOrders(array $filters = [])
    {
        $orders = Order::query()
            ->latest()
            ->paginate($filters['per_page'] ?? 50);

        return AR::success(200, 'Lấy danh sách đơn hàng thành công.', $orders);
    }
}
