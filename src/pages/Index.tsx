import { useState } from 'react';
import { toast } from 'sonner';
import NavigationSidebar from '@/components/messenger/NavigationSidebar';
import ChatListPanel from '@/components/messenger/ChatListPanel';
import ChatWindow from '@/components/messenger/ChatWindow';
import { Chat, Message, SidebarSection, mockChats, mockMessages } from '@/components/messenger/types';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarSection, setSidebarSection] = useState<SidebarSection>('chats');

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
      <NavigationSidebar
        sidebarSection={sidebarSection}
        setSidebarSection={setSidebarSection}
      />

      <ChatListPanel
        sidebarSection={sidebarSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredChats={filteredChats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Index;
