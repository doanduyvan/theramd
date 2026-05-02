<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'id_sapo',
        'email',
        'phone',
        'status',
        'full_fields',
    ];

    protected function casts(): array
    {
        return [
            'id_sapo' => 'integer',
            'full_fields' => 'array',
        ];
    }
}
