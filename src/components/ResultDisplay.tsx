import React from 'react';
import { Download, FileText, Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  title: string;
  results: { [key: string]: any };
  onExport?: (format: 'csv' | 'pdf' | 'json') => void;
  interpretation?: string;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  title,
  results,
  onExport,
  interpretation,
  className = ""
}) => {
  const [copied, setCopied] = React.useState(false);

  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(4);
    }
    if (Array.isArray(value)) {
      return value.map(v => typeof v === 'number' ? (Number.isInteger(v) ? v.toString() : v.toFixed(4)) : v).join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const copyToClipboard = () => {
    const text = Object.entries(results)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-subtitle text-primary">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Copy results"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>
          {onExport && (
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Download className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => onExport('csv')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 first:rounded-t-lg"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => onExport('json')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => onExport('pdf')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 last:rounded-b-lg"
                >
                  Export Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="flex justify-between items-start py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-sm text-neutral-900 dark:text-white font-mono text-right ml-4">
              {formatValue(value)}
            </span>
          </div>
        ))}
      </div>

      {interpretation && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Interpretation</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">{interpretation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;