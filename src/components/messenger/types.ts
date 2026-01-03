export interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
}

export type ChatCategory = 'personal' | 'work' | 'archived';

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  category: ChatCategory;
}

export type SidebarSection = 'chats' | 'contacts' | 'groups' | 'archive' | 'profile' | 'settings';

export const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'АП',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 2,
    online: true,
    category: 'personal',
  },
  {
    id: 2,
    name: 'Команда дизайнеров',
    avatar: 'КД',
    lastMessage: 'Отправил новые макеты',
    time: '13:15',
    unread: 5,
    online: false,
    category: 'work',
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
    category: 'personal',
  },
  {
    id: 4,
    name: 'Проект 2026',
    avatar: 'П2',
    lastMessage: 'Обновление статуса проекта',
    time: 'Вчера',
    unread: 0,
    online: false,
    category: 'work',
  },
  {
    id: 5,
    name: 'Екатерина Смирнова',
    avatar: 'ЕС',
    lastMessage: 'Спасибо большое!',
    time: 'Вчера',
    unread: 0,
    online: false,
    category: 'archived',
  },
  {
    id: 6,
    name: 'Отдел продаж',
    avatar: 'ОП',
    lastMessage: 'Новые лиды готовы',
    time: '2 дня назад',
    unread: 0,
    online: false,
    category: 'work',
  },
  {
    id: 7,
    name: 'Дмитрий Волков',
    avatar: 'ДВ',
    lastMessage: 'До встречи!',
    time: '3 дня назад',
    unread: 0,
    online: false,
    category: 'archived',
  },
];

export const mockMessages: Message[] = [
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