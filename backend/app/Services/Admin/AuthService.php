<?php

namespace App\Services\Admin;

use App\Models\Admin as ModelAdmin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Support\ApiResponse as AR;
use Illuminate\Http\JsonResponse;


class AuthService
{
    public function login(array $data): JsonResponse
    {

        // return AR::success(200, 'message ok ne', $data);

        $admin = ModelAdmin::where('email', $data['email'])->first();


        if (! $admin || ! Hash::check($data['password'], $admin->password)) {
            return AR::error(401, 'Thông tin đăng nhập không chính xác');
        }

        $maxTokens = 3;

        $tokens = $admin->tokens()
            ->oldest()
            ->get();

        if ($tokens->count() >= $maxTokens) {
            $tokens->take($tokens->count() - $maxTokens + 1)
                ->each
                ->delete();
        }

        $admin['token'] = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return AR::success(200, 'Đăng nhập thành công', $admin);
    }
}
