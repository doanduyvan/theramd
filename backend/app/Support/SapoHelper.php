<?php

namespace App\Support;

class SapoHelper
{
    public static function getUrl(string $path)
    {
        $apiKey = env('SAPO_API_KEY');
        $secretKey = env('SAPO_SECRET_KEY');
        return "https://{$apiKey}:{$secretKey}@sciencosapp.mysapo.net{$path}";
    }
}
