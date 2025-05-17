import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/AdminSidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { Folder, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    enabled: isAuthenticated,
  });
  
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/admin/messages'],
    enabled: isAuthenticated,
  });
  
  const isLoading = authLoading || projectsLoading || messagesLoading;
  
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    window.location.href = '/api/login';
    return null;
  }
  
  const unreadMessages = messages ? messages.filter((message: any) => !message.read).length : 0;
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - L-VS</title>
      </Helmet>
      
      <div className="flex h-screen">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-3xl font-bold mb-8">{t('admin.welcome')}</h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">{t('admin.stats.title')}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('admin.stats.projects')}
                    </CardTitle>
                    <Folder className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects?.length || 0}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {projects?.length === 1 ? 'Project' : 'Projects'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('admin.stats.messages')}
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{unreadMessages}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {unreadMessages === 1 ? 'Unread Message' : 'Unread Messages'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-500">
                Welcome to your admin dashboard. From here, you can manage your projects, 
                view messages from contacts, and update your portfolio.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
