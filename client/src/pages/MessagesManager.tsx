import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/AdminSidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MessageCard } from '@/components/MessageCard';
import { Message } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MessagesManager() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/admin/messages'],
    enabled: isAuthenticated,
  });
  
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => {
      return apiRequest('PATCH', `/api/admin/messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
      toast({
        title: 'Message marked as read',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to mark message as read',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
  
  const deleteMessageMutation = useMutation({
    mutationFn: (id: number) => {
      return apiRequest('DELETE', `/api/admin/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
      setMessageToDelete(null);
      toast({
        title: 'Message deleted successfully',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to delete message',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
  
  const isLoading = authLoading || messagesLoading;
  
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
  
  const handleMarkAsRead = (message: Message) => {
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
  };
  
  const handleDeleteMessage = (message: Message) => {
    setMessageToDelete(message);
  };
  
  const confirmDeleteMessage = () => {
    if (messageToDelete) {
      deleteMessageMutation.mutate(messageToDelete.id);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Messages - L-VS Admin</title>
      </Helmet>
      
      <div className="flex h-screen">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-3xl font-bold mb-8">{t('admin.messages.title')}</h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message: Message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onMarkAsRead={() => handleMarkAsRead(message)}
                  onDelete={() => handleDeleteMessage(message)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500">{t('admin.messages.no_messages')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Delete Message Confirmation Dialog */}
      <AlertDialog open={!!messageToDelete} onOpenChange={() => setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.messages.confirm_delete')}</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this message from your inbox.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteMessage}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
