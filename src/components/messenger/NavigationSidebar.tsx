import Icon from '@/components/ui/icon';
import { SidebarSection } from './types';

interface NavigationSidebarProps {
  sidebarSection: SidebarSection;
  setSidebarSection: (section: SidebarSection) => void;
}

const NavigationSidebar = ({ sidebarSection, setSidebarSection }: NavigationSidebarProps) => {
  return (
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
            onClick={() => setSidebarSection(item.section as SidebarSection)}
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
  );
};

export default NavigationSidebar;
