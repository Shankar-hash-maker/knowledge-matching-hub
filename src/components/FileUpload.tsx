
import React, { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { importExpertsFromPDF } from '@/utils/expertMatching';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isPdfDatabase?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFilesSelected, 
  isPdfDatabase = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      
      if (isPdfDatabase) {
        await handlePdfDatabaseFiles(filesArray);
      } else {
        onFilesSelected(filesArray);
      }
    }
  }, [onFilesSelected, isPdfDatabase]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      
      if (isPdfDatabase) {
        await handlePdfDatabaseFiles(filesArray);
      } else {
        onFilesSelected(filesArray);
      }
      
      e.target.value = '';
    }
  };
  
  const handlePdfDatabaseFiles = async (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner uniquement des fichiers PDF.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process the PDF database
      await importExpertsFromPDF(pdfFiles[0]);
      
      toast({
        title: "Base de données importée",
        description: "Les experts ont été ajoutés avec succès.",
        variant: "default"
      });
      
      // Still notify parent component
      onFilesSelected(pdfFiles);
    } catch (error) {
      toast({
        title: "Erreur d'importation",
        description: "Impossible d'analyser le fichier PDF.",
        variant: "destructive"
      });
      console.error("PDF import error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div
      className={`relative border border-dashed rounded-lg transition-all duration-300 ${
        isDragging ? 'file-drop-active bg-primary/5' : 'border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple={!isPdfDatabase}
        accept={isPdfDatabase ? "application/pdf" : undefined}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="p-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
          {isPdfDatabase ? (
            <FileText className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Upload className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm font-medium mb-1">
          {isPdfDatabase
            ? "Déposez votre base de données PDF ici"
            : "Déposez vos fichiers ici ou cliquez pour parcourir"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isPdfDatabase
            ? "Format PDF uniquement (base de données d'experts)"
            : "PDF, DOCX, XLSX, PPTX, JPG, PNG (max. 10 MB)"}
        </p>
        
        {isProcessing && (
          <div className="mt-4">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Traitement du fichier...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
