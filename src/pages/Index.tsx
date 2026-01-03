import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'АП',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Команда дизайнеров',
    avatar: 'КД',
    lastMessage: 'Отправил новые макеты',
    time: '13:15',
    unread: 5,
    online: false,
  },
  {
    id: 3,
    name: 'Михаил Иванов',
    avatar: 'МИ',
    lastMessage: 'Созвонимся завтра?',
    time: '11:48',
    unread: 0,
    online: true,
    typing: true,
  },
  {
    id: 4,
    name: 'Проект 2026',
    avatar: 'П2',
    lastMessage: 'Обновление статуса проекта',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Екатерина Смирнова',
    avatar: 'ЕС',
    lastMessage: 'Спасибо большое!',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Привет! Как дела?',
    time: '14:30',
    isMine: false,
    isRead: true,
  },
  {
    id: 2,
    text: 'Отлично! Работаю над новым проектом',
    time: '14:31',
    isMine: true,
    isRead: true,
  },
  {
    id: 3,
    text: 'Звучит интересно! Расскажешь подробнее?',
    time: '14:32',
    isMine: false,
    isRead: true,
  },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarSection, setSidebarSection] = useState<
    'chats' | 'contacts' | 'groups' | 'archive' | 'profile' | 'settings'
  >('chats');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMine: true,
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');

      toast.success('Сообщение отправлено', {
        description: 'Собеседник получит уведомление',
      });
    }
  };

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-20 bg-gradient-to-b from-primary via-secondary to-accent flex flex-col items-center py-6 gap-6 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl hover:bg-white/30 transition-all cursor-pointer hover:scale-110">
          💬
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {[
            { icon: 'MessageCircle', section: 'chats', label: 'Чаты' },
            { icon: 'Users', section: 'contacts', label: 'Контакты' },
            { icon: 'UsersRound', section: 'groups', label: 'Группы' },
            { icon: 'Archive', section: 'archive', label: 'Архив' },
          ].map((item) => (
            <button
              key={item.section}
              onClick={() => setSidebarSection(item.section as any)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${
                sidebarSection === item.section
                  ? 'bg-white text-primary shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              title={item.label}
            >
              <Icon name={item.icon as any} size={24} />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setSidebarSection('settings')}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${
              sidebarSection === 'settings'
                ? 'bg-white text-primary shadow-lg'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="Настройки"
          >
            <Icon name="Settings" size={24} />
          </button>

          <button
            onClick={() => setSidebarSection('profile')}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${
              sidebarSection === 'profile'
                ? 'bg-white text-primary shadow-lg'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="Профиль"
          >
            <Icon name="User" size={24} />
          </button>
        </div>
      </aside>

      <div className="w-96 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {sidebarSection === 'chats' && 'Чаты'}
            {sidebarSection === 'contacts' && 'Контакты'}
            {sidebarSection === 'groups' && 'Группы'}
            {sidebarSection === 'archive' && 'Архив'}
            {sidebarSection === 'profile' && 'Профиль'}
            {sidebarSection === 'settings' && 'Настройки'}
          </h2>
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 rounded-xl"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {sidebarSection === 'chats' && (
            <div className="p-2">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 rounded-2xl mb-2 transition-all hover:scale-[1.02] hover:shadow-md group ${
                    selectedChat.id === chat.id
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-muted-foreground ml-2">
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.typing ? (
                            <span className="text-accent italic">
                              печатает...
                            </span>
                          ) : (
                            chat.lastMessage
                          )}
                        </p>
                        {chat.unread > 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {sidebarSection === 'profile' && (
            <div className="p-6 animate-fade-in">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="w-24 h-24 ring-4 ring-primary/20 shadow-xl">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                    ВЫ
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">Ваше имя</h3>
                  <p className="text-sm text-muted-foreground">@username</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl hover:bg-primary/5"
                >
                  <Icon name="Phone" size={18} className="mr-3" />
                  +7 999 123-45-67
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl hover:bg-primary/5"
                >
                  <Icon name="Mail" size={18} className="mr-3" />
                  email@example.com
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl hover:bg-primary/5"
                >
                  <Icon name="Info" size={18} className="mr-3" />О себе
                </Button>
              </div>
            </div>
          )}

          {sidebarSection === 'settings' && (
            <div className="p-6 space-y-2 animate-fade-in">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-primary/5"
              >
                <Icon name="Bell" size={18} className="mr-3" />
                Уведомления
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-primary/5"
              >
                <Icon name="Lock" size={18} className="mr-3" />
                Приватность
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-primary/5"
              >
                <Icon name="Palette" size={18} className="mr-3" />
                Темы оформления
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-primary/5"
              >
                <Icon name="Languages" size={18} className="mr-3" />
                Язык
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-primary/5"
              >
                <Icon name="HardDrive" size={18} className="mr-3" />
                Данные и хранилище
              </Button>
            </div>
          )}

          {(sidebarSection === 'contacts' ||
            sidebarSection === 'groups' ||
            sidebarSection === 'archive') && (
            <div className="p-6 text-center text-muted-foreground animate-fade-in">
              <Icon
                name="Inbox"
                size={48}
                className="mx-auto mb-4 text-muted-foreground/50"
              />
              <p>Раздел в разработке</p>
            </div>
          )}
        </ScrollArea>
      </div>

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
    </div>
  );
};

export default Index;
