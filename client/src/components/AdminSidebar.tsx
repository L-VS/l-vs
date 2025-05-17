import React from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from '@/hooks/useTranslation';
import { LogOut, Home, Monitor, MessageSquare, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function AdminSidebar() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: t('admin.dashboard'), href: '/admin' },
    { icon: <Monitor className="h-5 w-5" />, label: t('admin.projects_link'), href: '/admin/projects' },
    { icon: <MessageSquare className="h-5 w-5" />, label: t('admin.messages_link'), href: '/admin/messages' },
    { icon: <Settings className="h-5 w-5" />, label: t('admin.settings'), href: '/admin/settings' },
  ];
  
  const handleLogout = () => {
    window.location.href = '/api/logout';
  };
  
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6">
        <Logo className="mb-6" />
        <Separator className="my-6" />
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={location === item.href ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                location === item.href ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => navigate(item.href)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <Separator className="mb-6" />
        <Button
          variant="outline"
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">{t('admin.logout')}</span>
        </Button>
      </div>
    </div>
  );
}
