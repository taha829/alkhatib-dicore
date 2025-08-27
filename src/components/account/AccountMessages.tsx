
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'staff';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  active: boolean;
}

// Sample conversations
const sampleConversations: Conversation[] = [
  {
    id: 'conv1',
    title: 'Electrical Service Inquiry',
    active: true,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Hello, I need help with electrical wiring in my new home.',
        timestamp: '2023-10-15T10:23:00',
        read: true
      },
      {
        id: 'm2',
        sender: 'staff',
        content: 'Hi there! I\'d be happy to help. Could you please provide more details about what you need?',
        timestamp: '2023-10-15T10:25:00',
        read: true
      },
      {
        id: 'm3',
        sender: 'user',
        content: 'I need to install new light fixtures in my living room and kitchen.',
        timestamp: '2023-10-15T10:28:00',
        read: true
      },
      {
        id: 'm4',
        sender: 'staff',
        content: 'We can definitely help with that. How many fixtures do you need to install? Do you already have the fixtures or do you need recommendations?',
        timestamp: '2023-10-15T10:30:00',
        read: true
      }
    ]
  },
  {
    id: 'conv2',
    title: 'Plumbing Service Support',
    active: true,
    messages: [
      {
        id: 'm5',
        sender: 'user',
        content: 'My bathroom sink is clogged. When can someone come to fix it?',
        timestamp: '2023-10-12T14:15:00',
        read: true
      },
      {
        id: 'm6',
        sender: 'staff',
        content: 'I\'m sorry to hear about your sink. We have availability tomorrow between 10 AM and 2 PM. Would that work for you?',
        timestamp: '2023-10-12T14:18:00',
        read: true
      }
    ]
  }
];

const AccountMessages = () => {
  const { t } = useLanguage();
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDateHeader = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg: Message = {
      id: `m${Date.now()}`,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMsg]
    } : null);
    setNewMessage('');
    
    // Simulate a reply after 1.5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `m${Date.now() + 1}`,
        sender: 'staff',
        content: 'Thank you for your message. Our team will get back to you shortly.',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const updatedWithReply = updatedConversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg, replyMsg]
          };
        }
        return conv;
      });
      
      setConversations(updatedWithReply);
      setSelectedConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, replyMsg]
      } : null);
    }, 1500);
  };
  
  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('Messages', 'الرسائل')}
        </h2>
        <Button className="bg-orange-500 hover:bg-orange-600">
          {t('New Message', 'رسالة جديدة')}
        </Button>
      </div>
      
      <Tabs defaultValue="messages">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">{t('Messages', 'الرسائل')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('Notifications', 'الإشعارات')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="flex flex-col md:flex-row h-[500px] border rounded-lg overflow-hidden">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r overflow-y-auto">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-3 cursor-pointer rounded-lg ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-orange-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => selectConversation(conversation)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{conversation.title}</h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.messages[conversation.messages.length - 1].timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message View */}
            <div className="w-full md:w-2/3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-medium">{selectedConversation.title}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.active 
                        ? t('Active Conversation', 'محادثة نشطة')
                        : t('Closed', 'مغلق')}
                    </p>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-6">
                      <div className="text-center">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {formatDateHeader(selectedConversation.messages[0].timestamp)}
                        </span>
                      </div>
                      
                      {selectedConversation.messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 text-right ${
                              message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                    <Input
                      placeholder={t('Type a message...', 'اكتب رسالة...')}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {t('Select a conversation', 'اختر محادثة')}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-orange-600">{t('Booking Confirmation', 'تأكيد الحجز')}</h3>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm mt-1">
                    {t(
                      'Your booking for Electrical Repair on October 15 has been confirmed.',
                      'تم تأكيد حجزك للإصلاح الكهربائي في 15 أكتوبر.'
                    )}
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-orange-600">{t('Payment Received', 'تم استلام الدفع')}</h3>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                  <p className="text-sm mt-1">
                    {t(
                      "We've received your payment of $18.00 for Electrical Repair (Deposit).",
                      'لقد تلقينا دفعتك البالغة 18.00 دولارًا للإصلاح الكهربائي (العربون).'
                    )}
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-orange-600">{t('Special Offer', 'عرض خاص')}</h3>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                  <p className="text-sm mt-1">
                    {t(
                      'Get 15% off your next booking with promo code FALL15.',
                      'احصل على خصم 15٪ على حجزك التالي باستخدام الرمز الترويجي FALL15.'
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountMessages;
