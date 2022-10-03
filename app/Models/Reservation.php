<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $casts = [
        'checkIn' => 'datetime:m-d',
        'checkOut' => 'datetime:m-d',
        'created_at' => 'datetime:m-d',
        'confirmedAt' => 'datetime:m-d',
    ];

    public function getListingAttribute($value)
    {
        return json_decode($value);
    }

    public function getMoneyAttribute($value)
    {
        return json_decode($value);
    }

    public function getGuestAttribute($value)
    {
        return json_decode($value);
    }
}
