<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }
    /**
     *@return\Inertia\Response
     */

    public function index(Request $request, ?int $receiverId = null)
    {
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessage((int)$request->user()->id, (int)$receiverId);

        return Inertia::render('Chat/Chat', [
            'messages' => $messages,
            'recentMessages' => $this->chat->getRecentUserWithMessage($request->user()->id),
            'receiver' => User::find($receiverId)
        ]);
    }


    

    /**
     *@return\Inertia\Response
     */

    public function store(Request $request, ?int $receiverId = null)
    {
        $request->validate([
            'message' => 'required',
        ]);

        if (empty($receiverId)) {
            return;
        }

        try {
            $message = $this->chat->sentMessage([
                'sender_id' => (int) $request->user()->id,
                'receiver_id' => $receiverId,
                'message' => $request->message,
            ]);

            event(new MessageSent($message));
            return Redirect::route('chat.index', $receiverId);
        } catch (\Throwable $th) {
            return Redirect::route('chat.index', $receiverId);
        }
    }
}
