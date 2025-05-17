import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Message } from '@shared/schema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, CheckCircle, Mail, MailOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MessageCardProps {
  message: Message;
  onMarkAsRead: () => void;
  onDelete: () => void;
}

export function MessageCard({ message, onMarkAsRead, onDelete }: MessageCardProps) {
  const { t } = useTranslation();
  
  const formattedDate = message.createdAt 
    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
    : '';
  
  return (
    <Card className={message.read ? 'border-gray-200' : 'border-black'}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl">
              {message.subject}
            </CardTitle>
            {!message.read && (
              <Badge className="bg-black text-white">New</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {t('admin.messages.sent_by')} <span className="font-medium">{message.name}</span> {t('admin.messages.on_date')} {formattedDate}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {message.read ? (
            <MailOpen className="h-5 w-5 text-gray-400" />
          ) : (
            <Mail className="h-5 w-5 text-black" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Email:</span> {message.email}
          </div>
          <p className="text-gray-700 whitespace-pre-line mt-2">{message.message}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-700"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          {t('admin.messages.delete')}
        </Button>
        
        {!message.read && (
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700"
            onClick={onMarkAsRead}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            {t('admin.messages.mark_read')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
