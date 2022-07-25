<?php

namespace App\Actions;

use App\Models\User;

class StoreAction
{
    public static function store(array $data)
    {
        return User::firstOrCreate($data);
    }
}
