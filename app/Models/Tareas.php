<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    use HasFactory;
    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
