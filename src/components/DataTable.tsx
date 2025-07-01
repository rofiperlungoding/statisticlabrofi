import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps {
  data: any[];
  columns: string[];
  pageSize?: number;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  columns, 
  pageSize = 10, 
  className = '' 
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(3);
    }
    return value.toString();
  };

  const getColumnType = (column: string) => {
    const values = data.slice(0, 100).map(row => row[column]).filter(v => v !== null && v !== undefined);
    if (values.length === 0) return 'text';
    
    const numericValues = values.filter(v => !isNaN(Number(v)));
    return numericValues.length / values.length > 0.8 ? 'numeric' : 'text';
  };

  return (
    <div className={`card ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-subtitle text-primary">Data Preview</h3>
          <span className="text-caption text-muted">
            {data.length} rows × {columns.length} columns
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="text-left py-3 px-4 font-medium text-neutral-900 dark:text-white"
                  >
                    <div className="flex flex-col">
                      <span>{column}</span>
                      <span className="text-xs text-muted font-normal">
                        {getColumnType(column)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750"
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="py-3 px-4 text-neutral-700 dark:text-neutral-300"
                    >
                      {formatValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <span className="text-caption text-muted">
              Page {currentPage + 1} of {totalPages}
            </span>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;