import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/AdminSidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Moon, Sun } from 'lucide-react';

export default function SettingsPage() {
  const { t, changeLanguage, getCurrentLanguage } = useTranslation();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  
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
  
  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
  };
  
  return (
    <>
      <Helmet>
        <title>Settings - L-VS Admin</title>
      </Helmet>
      
      <div className="flex h-screen">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-3xl font-bold mb-8">{t('admin.settings')}</h1>
          
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View and manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {user?.profileImageUrl && (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-lg font-medium">
                        {user?.firstName || ''} {user?.lastName || ''}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the appearance of the admin dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button variant="default" className="flex-1">
                        System
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>
                    Choose your preferred language for the admin interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interface Language</label>
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <Select
                        value={getCurrentLanguage()}
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger className="w-60">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
