<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zihanki extends Model
{
    use HasFactory;
    
    // protected $table = 'zihanki';

    protected $fillable = [
        'lat',
        'lng',
        'img_path',
    ];

    public $timestamps = false;
}
