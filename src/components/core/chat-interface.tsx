
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: string; // 'user' or 'other' or user ID
  senderName?: string;
  timestamp: Date;
  avatar?: string;
}

interface ChatInterfaceProps {
  groupId: string;
  groupName: string;
}

const mockMessages: Message[] = [
  { id: '1', text: 'Hey everyone! Super excited for this Bali trip!', sender: 'user1', senderName: 'Alice', timestamp: new Date(Date.now() - 1000 * 60 * 5), avatar: 'https://placehold.co/40x40.png?text=A' },
  { id: '2', text: 'Me too! Has anyone been to Ubud before?', sender: 'user2', senderName: 'Bob', timestamp: new Date(Date.now() - 1000 * 60 * 3), avatar: 'https://placehold.co/40x40.png?text=B' },
  { id: '3', text: 'Yeah, Ubud is amazing! We should definitely visit the Monkey Forest.', sender: 'user1', senderName: 'Alice', timestamp: new Date(Date.now() - 1000 * 60 * 1), avatar: 'https://placehold.co/40x40.png?text=A' },
];

// Assume current user is 'currentUser'
const currentUserId = 'currentUser'; 
const currentUserName = 'You';
const currentUserAvatar = 'https://placehold.co/40x40.png?text=Y';

export default function ChatInterface({ groupId, groupName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch messages for groupId in a real app
    // For now, just scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: String(Date.now()),
      text: newMessage,
      sender: currentUserId,
      senderName: currentUserName,
      timestamp: new Date(),
      avatar: currentUserAvatar,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Card className="h-full flex flex-col shadow-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">{groupName} - Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === currentUserId ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender !== currentUserId && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar} alt={msg.senderName} data-ai-hint="avatar person" />
                    <AvatarFallback>{msg.senderName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 shadow ${
                    msg.sender === currentUserId
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm font-medium mb-0.5">{msg.sender !== currentUserId ? msg.senderName : ''}</p>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.sender === currentUserId && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={msg.avatar} alt={msg.senderName} data-ai-hint="avatar person" />
                    <AvatarFallback>{msg.senderName?.charAt(0) || 'Y'}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon" className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-primary-foreground">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
