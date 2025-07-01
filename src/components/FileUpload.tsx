import React, { useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  accept = '.csv,.txt', 
  className = '',
  children 
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`card border-dashed border-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="p-8 text-center space-element">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        {children || (
          <>
            <h3 className="text-subtitle text-primary mb-2">Upload your data file</h3>
            <p className="text-body text-secondary mb-6">
              Drag and drop your CSV file here, or click to browse
            </p>
          </>
        )}
        
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-block">
          Choose File
        </label>
        
        <p className="text-caption text-muted mt-4">
          Supported formats: CSV, TXT (up to 10MB)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;