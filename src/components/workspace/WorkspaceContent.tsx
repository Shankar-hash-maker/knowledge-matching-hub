
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, FileText } from 'lucide-react';
import MessageSpace from '@/components/MessageSpace';
import FileUpload from '@/components/FileUpload';
import { Expert } from '@/utils/experts';

interface WorkspaceContentProps {
  expert: Expert;
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ expert }) => {
  const [activeTab, setActiveTab] = useState('messages');
  
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    // In a real app, we would upload these files to a server
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="messages" className="gap-1">
          <MessageSquare size={16} />
          <span>Messages</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="gap-1">
          <FileText size={16} />
          <span>Documents</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="messages" className="mt-0">
        <Card className="h-[600px] overflow-hidden">
          <MessageSpace expert={expert} />
        </Card>
      </TabsContent>
      
      <TabsContent value="documents" className="mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Documents partagés</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Partagez des documents confidentiels avec {expert.name}. Tous les fichiers sont chiffrés et sécurisés.
          </p>
          
          <FileUpload onFilesSelected={handleFilesSelected} />
          
          <div className="mt-8">
            <h4 className="text-sm font-medium mb-3">Documents récents</h4>
            <div className="text-sm text-muted-foreground text-center py-8">
              Aucun document partagé pour le moment.
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default WorkspaceContent;
