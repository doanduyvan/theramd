<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id_sapo',
        'name',
        'alias',
        'product_type',
        'meta_title',
        'meta_description',
        'summary',
        'content',
        'status',
        'images',
        'image',
        'variants',
    ];

    protected function casts(): array
    {
        return [
            'id_sapo' => 'integer',
            'images' => 'array',
            'image' => 'array',
            'variants' => 'array',
        ];
    }
}
