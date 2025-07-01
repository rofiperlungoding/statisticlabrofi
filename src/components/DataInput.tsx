import React, { useState } from 'react';
import { Upload, Type, FileText, AlertCircle } from 'lucide-react';

interface DataInputProps {
  onDataSubmit: (data: number[]) => void;
  label?: string;
  placeholder?: string;
  allowFileUpload?: boolean;
  validation?: (data: number[]) => string | null;
  className?: string;
}

const DataInput: React.FC<DataInputProps> = ({
  onDataSubmit,
  label = "Enter Data",
  placeholder = "Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)",
  allowFileUpload = true,
  validation,
  className = ""
}) => {
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState<string>('');
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');

  const parseTextData = (text: string): number[] => {
    return text
      .split(/[,\s\n\t]+/)
      .map(item => item.trim())
      .filter(item => item !== '')
      .map(Number)
      .filter(num => !isNaN(num));
  };

  const handleTextSubmit = () => {
    setError('');
    
    if (!textInput.trim()) {
      setError('Please enter some data');
      return;
    }

    const data = parseTextData(textInput);
    
    if (data.length === 0) {
      setError('No valid numbers found in the input');
      return;
    }

    if (validation) {
      const validationError = validation(data);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    onDataSubmit(data);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseTextData(text);
      
      if (data.length === 0) {
        setError('No valid numbers found in the file');
        return;
      }

      if (validation) {
        const validationError = validation(data);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      setTextInput(data.slice(0, 50).join(', ') + (data.length > 50 ? '...' : ''));
      onDataSubmit(data);
    };
    reader.readAsText(file);
  };

  return (
    <div className={`card p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-subtitle text-primary">{label}</h3>
          {allowFileUpload && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setInputMethod('text')}
                className={`p-2 rounded-lg ${inputMethod === 'text' ? 'bg-blue-100 text-blue-600' : 'text-neutral-500 hover:bg-neutral-100'}`}
              >
                <Type className="w-4 h-4" />
              </button>
              <button
                onClick={() => setInputMethod('file')}
                className={`p-2 rounded-lg ${inputMethod === 'file' ? 'bg-blue-100 text-blue-600' : 'text-neutral-500 hover:bg-neutral-100'}`}
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {inputMethod === 'text' ? (
          <div className="space-y-3">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={placeholder}
              className="input min-h-24 resize-y"
              rows={4}
            />
            <button
              onClick={handleTextSubmit}
              className="btn-primary w-full"
            >
              Process Data
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center">
              <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Upload a text file with numbers (CSV, TXT)
              </p>
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="data-file-upload"
              />
              <label htmlFor="data-file-upload" className="btn-secondary cursor-pointer">
                Choose File
              </label>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInput;