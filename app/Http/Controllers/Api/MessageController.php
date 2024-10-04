<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(){
        $message = Message::all();
        return response()->json(['message' => $message,'result' => true],200);
    }

    public function create(Request $request){
        $message = new Message();
        $message->message_description = $request->message;
        $query=$message->save();
        if($query){
            event(new MessageSent($message));
            return response()->json(['message' => 'Success','result' => true],200);
        }
        return response()->json(['message' => 'Failed','result' => false],400);
    }
}
