<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\User;
use DB;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB as FacadesDB;

class ChatRepository
{
    public function getuserMessage(int $senderId, int $receiverId)
    {
        return Message::whereIn('sender_id', [$senderId, $receiverId])
            ->whereIn('receiver_id', [$senderId, $receiverId])
            ->get();
    }


    public function sentMessage(array $data): Message
    {
        return Message::create($data);
    }

    public function getRecentUserWithMessage(int $senderId) : array
    {
        FacadesDB::statement("SET SESSION sql_mode = ''");

        $recentMessages =  Message::where(function ($query) use ($senderId) {
            $query->where('sender_id', $senderId)
                ->orWhere('receiver_id', $senderId);
        })->groupBy('sender_id', 'receiver_id')
            ->select('sender_id', 'receiver_id', 'message')
            ->orderBy('id', 'desc')
            ->get();

        
        return $this->getFilterRecentMessage($recentMessages,$senderId);
    }
    public function getFilterRecentMessage(Collection $recentMessages, int $senderId): array
    {
        $RecentUserWithMessage = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if (!in_array($userId, $usedUserIds)) {
                $RecentUserWithMessage[] = [
                    'user_id' => $userId,
                    'message' => $message->message
                ];
                $usedUserIds[] = $userId;
            }
        }
    
        $userIds = array_column($RecentUserWithMessage, 'user_id');
        $users = User::whereIn('id', $userIds)->pluck('name', 'id');
    
        foreach ($RecentUserWithMessage as $key => $userMessage) {
            $RecentUserWithMessage[$key]['name'] = $users->get($userMessage['user_id'], '');
        }
    
        return $RecentUserWithMessage;
    }
    
}
