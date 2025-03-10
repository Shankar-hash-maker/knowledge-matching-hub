
import React, { useCallback, useState } from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  }, [onFilesSelected]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      e.target.value = '';
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
        multiple
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="p-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium mb-1">
          Déposez vos fichiers ici ou cliquez pour parcourir
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, DOCX, XLSX, PPTX, JPG, PNG (max. 10 MB)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
