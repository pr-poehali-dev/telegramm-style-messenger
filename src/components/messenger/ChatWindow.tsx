import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chat, Message } from './types';

interface ChatWindowProps {
  selectedChat: Chat;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatWindow = ({
  selectedChat,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
}: ChatWindowProps) => {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="p-4 border-b border-border bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-11 h-11 ring-2 ring-white shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              {selectedChat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-lg">{selectedChat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedChat.online ? (
                  <span className="text-green-600">онлайн</span>
                ) : (
                  'был(а) недавно'
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10"
            >
              <Icon name="Phone" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10"
            >
              <Icon name="Video" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10"
            >
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isMine ? 'justify-end' : 'justify-start'
              } animate-slide-up`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  message.isMine
                    ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-md'
                    : 'bg-white rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-xs ${
                    message.isMine
                      ? 'text-white/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span>{message.time}</span>
                  {message.isMine && (
                    <Icon
                      name={message.isRead ? 'CheckCheck' : 'Check'}
                      size={14}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {selectedChat.typing && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white px-5 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-primary/10"
          >
            <Icon name="Paperclip" size={20} />
          </Button>
          <Input
            placeholder="Напишите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1 rounded-2xl bg-background/50 border-border/50 focus:border-primary/50"
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-primary/10"
          >
            <Icon name="Smile" size={20} />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
          >
            <Icon name="Send" size={18} className="mr-2" />
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
