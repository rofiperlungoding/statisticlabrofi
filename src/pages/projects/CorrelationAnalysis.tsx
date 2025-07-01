import React, { useState } from 'react';
import { Activity, Upload } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FileUpload from '../../components/FileUpload';
import ResultDisplay from '../../components/ResultDisplay';
import Papa from 'papaparse';
import { calculatePearsonCorrelation, exportToCSV, exportToPDF } from '../../utils/statistics';

const CorrelationAnalysis: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [correlationMatrix, setCorrelationMatrix] = useState<any>(null);
  const [scatterPlotData, setScatterPlotData] = useState<any[]>([]);
  const [selectedPair, setSelectedPair] = useState<{ x: string; y: string } | null>(null);

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data as any[]);
        const cols = Object.keys(results.data[0] || {});
        
        // Filter numeric columns
        const numericCols = cols.filter(col => {
          const values = (results.data as any[]).slice(0, 10).map(row => row[col]);
          return values.every(v => !isNaN(Number(v)) && v !== null && v !== '');
        });
        
        setColumns(numericCols);
        setSelectedColumns(numericCols.slice(0, 5)); // Auto-select first 5 numeric columns
      }
    });
  };

  const calculateCorrelations = () => {
    if (selectedColumns.length < 2) {
      alert('Please select at least 2 columns for correlation analysis');
      return;
    }

    const matrix: any = {};
    const pairs: any[] = [];

    // Calculate correlation matrix
    selectedColumns.forEach((col1, i) => {
      matrix[col1] = {};
      selectedColumns.forEach((col2, j) => {
        if (i === j) {
          matrix[col1][col2] = 1;
        } else {
          const values1 = data.map(row => Number(row[col1])).filter(v => !isNaN(v));
          const values2 = data.map(row => Number(row[col2])).filter(v => !isNaN(v));
          
          if (values1.length === values2.length && values1.length > 1) {
            const correlation = calculatePearsonCorrelation(values1, values2);
            matrix[col1][col2] = correlation;
            
            if (i < j) { // Only add unique pairs
              pairs.push({
                variable1: col1,
                variable2: col2,
                correlation: correlation,
                strength: getCorrelationStrength(correlation),
                direction: correlation > 0 ? 'Positive' : correlation < 0 ? 'Negative' : 'None'
              });
            }
          } else {
            matrix[col1][col2] = NaN;
          }
        }
      });
    });

    setCorrelationMatrix({ matrix, pairs });
  };

  const getCorrelationStrength = (r: number): string => {
    const abs = Math.abs(r);
    if (abs >= 0.9) return 'Very Strong';
    if (abs >= 0.7) return 'Strong';
    if (abs >= 0.5) return 'Moderate';
    if (abs >= 0.3) return 'Weak';
    return 'Very Weak';
  };

  const getCorrelationColor = (r: number): string => {
    const abs = Math.abs(r);
    if (abs >= 0.7) return r > 0 ? 'bg-green-500' : 'bg-red-500';
    if (abs >= 0.5) return r > 0 ? 'bg-green-400' : 'bg-red-400';
    if (abs >= 0.3) return r > 0 ? 'bg-green-300' : 'bg-red-300';
    return 'bg-neutral-200 dark:bg-neutral-600';
  };

  const showScatterPlot = (col1: string, col2: string) => {
    const plotData = data
      .map(row => ({
        x: Number(row[col1]),
        y: Number(row[col2])
      }))
      .filter(point => !isNaN(point.x) && !isNaN(point.y));

    setScatterPlotData(plotData);
    setSelectedPair({ x: col1, y: col2 });
  };

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!correlationMatrix) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        exportToCSV(correlationMatrix.pairs, `correlation-analysis-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
CORRELATION ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

CORRELATION PAIRS:
${correlationMatrix.pairs.map((pair: any) => 
  `${pair.variable1} vs ${pair.variable2}: r = ${pair.correlation.toFixed(4)} (${pair.strength}, ${pair.direction})`
).join('\n')}

CORRELATION MATRIX:
${selectedColumns.map(col => 
  selectedColumns.map(col2 => 
    correlationMatrix.matrix[col][col2].toFixed(3)
  ).join('\t')
).join('\n')}

INTERPRETATION:
Strong correlations (|r| ≥ 0.7): ${correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) >= 0.7).length}
Moderate correlations (0.5 ≤ |r| < 0.7): ${correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) >= 0.5 && Math.abs(p.correlation) < 0.7).length}
Weak correlations (|r| < 0.5): ${correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) < 0.5).length}
        `;
        exportToPDF(reportContent, `correlation-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Correlation Analysis Tool</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Analyze relationships between variables with Pearson correlation coefficients and interactive heatmaps.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect}>
            <h3 className="text-subtitle text-primary mb-2">Upload Dataset for Correlation Analysis</h3>
            <p className="text-body text-secondary mb-6">
              Upload a CSV file with numeric columns to analyze correlations
            </p>
          </FileUpload>
        </div>
      ) : (
        <div className="space-section">
          {/* Column Selection */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Select Variables for Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {columns.map(col => (
                <label key={col} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedColumns(prev => [...prev, col]);
                      } else {
                        setSelectedColumns(prev => prev.filter(c => c !== col));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{col}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={calculateCorrelations}
                className="btn-primary"
                disabled={selectedColumns.length < 2}
              >
                <Activity className="w-4 h-4 mr-2" />
                Calculate Correlations
              </button>
            </div>
          </div>

          {/* Results */}
          {correlationMatrix && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultDisplay
                title="Correlation Summary"
                results={{
                  totalPairs: correlationMatrix.pairs.length,
                  strongCorrelations: correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) >= 0.7).length,
                  moderateCorrelations: correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) >= 0.5 && Math.abs(p.correlation) < 0.7).length,
                  weakCorrelations: correlationMatrix.pairs.filter((p: any) => Math.abs(p.correlation) < 0.5).length,
                  averageCorrelation: correlationMatrix.pairs.reduce((sum: number, p: any) => sum + Math.abs(p.correlation), 0) / correlationMatrix.pairs.length
                }}
                onExport={handleExport}
                interpretation="Correlation coefficients range from -1 to +1. Values closer to ±1 indicate stronger linear relationships."
              />

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Correlation Strength Guide</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Strong Positive (0.7 to 1.0)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-300 rounded"></div>
                    <span className="text-sm">Moderate Positive (0.3 to 0.7)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                    <span className="text-sm">Weak (-0.3 to 0.3)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-300 rounded"></div>
                    <span className="text-sm">Moderate Negative (-0.7 to -0.3)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Strong Negative (-1.0 to -0.7)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Correlation Matrix Heatmap */}
          {correlationMatrix && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Correlation Matrix Heatmap</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-neutral-300 dark:border-neutral-600 p-2"></th>
                      {selectedColumns.map(col => (
                        <th key={col} className="border border-neutral-300 dark:border-neutral-600 p-2 text-xs font-medium transform -rotate-45 min-w-16">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedColumns.map(row => (
                      <tr key={row}>
                        <td className="border border-neutral-300 dark:border-neutral-600 p-2 text-xs font-medium">
                          {row}
                        </td>
                        {selectedColumns.map(col => {
                          const correlation = correlationMatrix.matrix[row][col];
                          return (
                            <td
                              key={col}
                              className={`border border-neutral-300 dark:border-neutral-600 p-2 text-center cursor-pointer hover:opacity-80 ${getCorrelationColor(correlation)}`}
                              onClick={() => row !== col && showScatterPlot(row, col)}
                              title={`${row} vs ${col}: ${correlation.toFixed(3)}`}
                            >
                              <span className={`text-xs font-medium ${Math.abs(correlation) > 0.5 ? 'text-white' : 'text-neutral-800 dark:text-neutral-200'}`}>
                                {correlation.toFixed(2)}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500 mt-2">Click on cells to view scatter plot for variable pairs</p>
            </div>
          )}

          {/* Scatter Plot */}
          {selectedPair && scatterPlotData.length > 0 && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">
                Scatter Plot: {selectedPair.x} vs {selectedPair.y}
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={scatterPlotData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={selectedPair.x}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={selectedPair.y}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value.toFixed(3), name]}
                      labelFormatter={() => ''}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Scatter dataKey="y" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              {correlationMatrix && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Correlation coefficient: <strong>
                      {correlationMatrix.matrix[selectedPair.x][selectedPair.y].toFixed(4)}
                    </strong> ({getCorrelationStrength(correlationMatrix.matrix[selectedPair.x][selectedPair.y])})
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Correlation Pairs Table */}
          {correlationMatrix && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Correlation Pairs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Variable 1</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Variable 2</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Correlation</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Strength</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Direction</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correlationMatrix.pairs
                      .sort((a: any, b: any) => Math.abs(b.correlation) - Math.abs(a.correlation))
                      .map((pair: any, index: number) => (
                      <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{pair.variable1}</td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{pair.variable2}</td>
                        <td className="py-2 px-3 font-mono text-neutral-900 dark:text-white">
                          {pair.correlation.toFixed(4)}
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            Math.abs(pair.correlation) >= 0.7 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            Math.abs(pair.correlation) >= 0.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400'
                          }`}>
                            {pair.strength}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{pair.direction}</td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => showScatterPlot(pair.variable1, pair.variable2)}
                            className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                          >
                            View Plot
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guide */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Correlation Analysis Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
              <div>
                <h4 className="font-medium text-primary mb-2">Interpretation</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Correlation measures linear relationships only</li>
                  <li>• Values range from -1 (perfect negative) to +1 (perfect positive)</li>
                  <li>• 0 indicates no linear relationship</li>
                  <li>• Correlation does not imply causation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Applications</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Feature selection for machine learning</li>
                  <li>• Multicollinearity detection</li>
                  <li>• Exploratory data analysis</li>
                  <li>• Variable relationship assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrelationAnalysis;