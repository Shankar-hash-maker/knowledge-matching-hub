import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import FileUpload from './FileUpload';
import { Expert } from '@/utils/experts';

interface MessageSpaceProps {
  expert: Expert;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'expert';
  timestamp: Date;
  files?: {name: string; url: string}[];
}

const MessageSpace: React.FC<MessageSpaceProps> = ({ expert }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [filesToAttach, setFilesToAttach] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: `Bonjour, je suis ${expert.name}. Comment puis-je vous aider aujourd'hui ?`,
      sender: 'expert',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [expert]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && filesToAttach.length === 0) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      files: filesToAttach.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setFilesToAttach([]);
    setShowFileUpload(false);
    
    // Simulate expert response after delay
    setTimeout(() => {
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Merci pour votre message. J'ai bien pris en compte votre demande et vous répondrai dans les plus brefs délais.",
        sender: 'expert',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, expertResponse]);
    }, 2000);
  };
  
  const handleFileSelect = (files: File[]) => {
    setFilesToAttach(prev => [...prev, ...files]);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{expert.name}</h3>
            <p className="text-xs text-muted-foreground">{expert.title}</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          En ligne
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground ml-4'
                  : 'bg-secondary text-secondary-foreground mr-4'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              
              {message.files && message.files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded bg-black/10">
                      <Paperclip size={14} />
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-xs truncate hover:underline">
                        {file.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-[10px] opacity-70 text-right mt-1">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {showFileUpload && (
        <div className="border-t p-3">
          <FileUpload onFilesSelected={handleFileSelect} />
          <div className="flex flex-wrap gap-2 mt-2">
            {filesToAttach.map((file, index) => (
              <Badge key={index} variant="secondary" className="text-xs gap-1">
                <Paperclip size={12} />
                {file.name}
                <button 
                  onClick={() => setFilesToAttach(prev => prev.filter((_, i) => i !== index))}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <Separator />
      
      <form onSubmit={handleSendMessage} className="p-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => setShowFileUpload(!showFileUpload)}
          >
            {showFileUpload ? <ChevronLeft size={18} /> : <Paperclip size={18} />}
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez votre message ici..."
            className="flex-1"
          />
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() && filesToAttach.length === 0}
            className="flex-shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageSpace;
