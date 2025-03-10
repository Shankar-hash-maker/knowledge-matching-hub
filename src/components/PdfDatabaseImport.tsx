
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, RefreshCw } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { resetExpertsDatabase } from '@/utils/experts';
import { useToast } from '@/hooks/use-toast';

const PdfDatabaseImport = () => {
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();
  
  const handleFilesSelected = (files: File[]) => {
    console.log("PDF database files selected:", files);
    // L'upload est traité directement dans le composant FileUpload
  };
  
  const handleResetDatabase = async () => {
    setIsResetting(true);
    try {
      await resetExpertsDatabase();
      toast({
        title: "Base de données réinitialisée",
        description: "La liste des experts a été restaurée à son état d'origine.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error resetting database:", error);
    } finally {
      setIsResetting(false);
    }
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <span>Base de données d'experts</span>
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6">
        Importez votre propre base de données d'experts au format PDF.
        Le système analysera le document et extraira les informations pertinentes.
      </p>
      
      <FileUpload 
        onFilesSelected={handleFilesSelected}
        isPdfDatabase={true}
      />
      
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleResetDatabase}
          disabled={isResetting}
        >
          {isResetting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Réinitialisation...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Réinitialiser la base de données</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default PdfDatabaseImport;
