<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrProductCode extends Model
{
    protected $table = 'qr_products_code';

    protected $fillable = [
        'order_id',
        'qr_code',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
