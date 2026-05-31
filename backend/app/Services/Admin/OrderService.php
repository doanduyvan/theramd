<?php

namespace App\Services\Admin;

use App\Support\SapoHelper;
use App\Support\ApiResponse as AR;
use Illuminate\Support\Facades\Http;
use App\Models\Order;
use App\Models\QrProductCode;

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


    public function getOrders(array $filters = [])
    {
        $orders = Order::query()
            ->with(['qrProductCodes:id,order_id,qr_code,created_at'])
            ->latest()
            ->paginate($filters['per_page'] ?? 50);
        return AR::success(200, 'Lấy danh sách đơn hàng thành công.', $orders);
    }

    public function saveQr($p)
    {
        $orderId = $p['idOrder'] ?? null;
        $qrs = $p['qrs'] ?? [];

        if (!$orderId || !is_array($qrs) || empty($qrs)) {
            return AR::error(400, 'Dữ liệu QR không hợp lệ.');
        }

        $inputQrs = collect($qrs)
            ->map(fn($qr) => trim($qr))
            ->filter()
            ->values();

        $duplicateInRequest = $inputQrs->duplicates()->values();

        $uniqueQrs = $inputQrs->unique()->values();

        $existingQrs = QrProductCode::whereIn('qr_code', $uniqueQrs)
            ->pluck('qr_code');

        $newQrs = $uniqueQrs->diff($existingQrs)->values();

        $now = now();

        $rows = $newQrs
            ->map(fn($qr) => [
                'order_id' => $orderId,
                'qr_code' => $qr,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        $savedCount = count($rows) > 0
            ? QrProductCode::insertOrIgnore($rows)
            : 0;

        $duplicateQrs = $existingQrs
            ->merge($duplicateInRequest)
            ->unique()
            ->values();

        return AR::success(201, 'Lưu QR thành công: ' . $savedCount . ' mã mới, ' . $duplicateQrs->count() . ' mã trùng.', [
            'total_received' => $inputQrs->count(),
            'total_unique' => $uniqueQrs->count(),
            'saved' => $savedCount,
            'duplicated' => $duplicateQrs->count(),
            'duplicate_qrs' => $duplicateQrs,
        ]);
    }
}
