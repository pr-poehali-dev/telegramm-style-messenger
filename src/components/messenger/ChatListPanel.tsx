import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chat, SidebarSection } from './types';

interface ChatListPanelProps {
  sidebarSection: SidebarSection;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredChats: Chat[];
  selectedChat: Chat;
  setSelectedChat: (chat: Chat) => void;
}

const ChatListPanel = ({
  sidebarSection,
  searchQuery,
  setSearchQuery,
  filteredChats,
  selectedChat,
  setSelectedChat,
}: ChatListPanelProps) => {
  return (
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
  );
};

export default ChatListPanel;
