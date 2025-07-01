import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { Download, Filter, Search, Eye } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import DataTable from '../../components/DataTable';
import StatsSummary from '../../components/StatsSummary';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const CSVExplorer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<string>('');

  const handleFileSelect = useCallback((file: File) => {
    setLoading(true);
    setError('');
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Parse error: ${results.errors[0].message}`);
        } else {
          setData(results.data as any[]);
          setColumns(Object.keys(results.data[0] || {}));
        }
        setLoading(false);
      },
      error: (error) => {
        setError(`File error: ${error.message}`);
        setLoading(false);
      }
    });
  }, []);

  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return columns.some(col => 
      String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getColumnDistribution = (column: string) => {
    const values = data.map(row => row[column]).filter(v => v !== null && v !== undefined);
    const isNumeric = values.every(v => !isNaN(Number(v)));
    
    if (isNumeric) {
      // Create histogram for numeric data
      const numValues = values.map(v => Number(v));
      const min = Math.min(...numValues);
      const max = Math.max(...numValues);
      const bins = 10;
      const binSize = (max - min) / bins;
      
      const histogram = Array(bins).fill(0).map((_, i) => ({
        range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        count: 0,
        value: min + i * binSize
      }));
      
      numValues.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
        histogram[binIndex].count++;
      });
      
      return histogram;
    } else {
      // Create frequency chart for categorical data
      const frequency: { [key: string]: number } = {};
      values.forEach(value => {
        const key = String(value);
        frequency[key] = (frequency[key] || 0) + 1;
      });
      
      return Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([value, count]) => ({ range: value, count, value }));
    }
  };

  if (loading) {
    return (
      <div className="container-main section-padding">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-body text-secondary">Processing your CSV file...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">CSV Data Explorer</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Upload your CSV file to explore data with automatic statistics, visualizations, and interactive filtering.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect} />
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-section">
          {/* File Info */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-subtitle text-primary mb-2">File: {fileName}</h3>
                <p className="text-body text-secondary">
                  {data.length} rows × {columns.length} columns
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Summary */}
          <StatsSummary data={data} columns={columns} />

          {/* Search and Filters */}
          <div className="card p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="input"
                >
                  <option value="">Select column to visualize</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Column Visualization */}
          {selectedColumn && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Distribution: {selectedColumn}</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getColumnDistribution(selectedColumn)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="range" 
                      stroke="#737373"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Data Table */}
          <DataTable 
            data={filteredData} 
            columns={columns}
            pageSize={20}
          />
        </div>
      )}
    </div>
  );
};

export default CSVExplorer;