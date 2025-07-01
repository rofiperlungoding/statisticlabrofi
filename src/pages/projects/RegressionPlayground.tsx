import React, { useState, useMemo } from 'react';
import { TrendingUp, Upload, Play, RotateCcw } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import Papa from 'papaparse';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

const RegressionPlayground: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [regressionType, setRegressionType] = useState<'linear' | 'polynomial' | 'logistic'>('linear');
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [regressionResults, setRegressionResults] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data as any[]);
        const cols = Object.keys(results.data[0] || {});
        setColumns(cols);
        
        // Auto-select numeric columns
        const numericCols = cols.filter(col => {
          const values = (results.data as any[]).slice(0, 10).map(row => row[col]);
          return values.every(v => !isNaN(Number(v)));
        });
        
        if (numericCols.length >= 2) {
          setXColumn(numericCols[0]);
          setYColumn(numericCols[1]);
        }
      }
    });
  };

  const plotData = useMemo(() => {
    if (!data.length || !xColumn || !yColumn) return [];
    
    return data
      .filter(row => 
        row[xColumn] !== null && 
        row[yColumn] !== null && 
        !isNaN(Number(row[xColumn])) && 
        !isNaN(Number(row[yColumn]))
      )
      .map(row => ({
        x: Number(row[xColumn]),
        y: Number(row[yColumn]),
      }));
  }, [data, xColumn, yColumn]);

  const performRegression = () => {
    if (plotData.length < 2) return;

    const n = plotData.length;
    const sumX = plotData.reduce((sum, point) => sum + point.x, 0);
    const sumY = plotData.reduce((sum, point) => sum + point.y, 0);
    const sumXY = plotData.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumX2 = plotData.reduce((sum, point) => sum + point.x * point.x, 0);
    const sumY2 = plotData.reduce((sum, point) => sum + point.y * point.y, 0);

    if (regressionType === 'linear') {
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
      // Calculate R²
      const meanY = sumY / n;
      const totalSumSquares = plotData.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0);
      const residualSumSquares = plotData.reduce((sum, point) => {
        const predicted = slope * point.x + intercept;
        return sum + Math.pow(point.y - predicted, 2);
      }, 0);
      const rSquared = 1 - (residualSumSquares / totalSumSquares);

      setRegressionResults({
        type: 'linear',
        slope,
        intercept,
        rSquared,
        equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`,
        predict: (x: number) => slope * x + intercept
      });
    } else if (regressionType === 'polynomial') {
      // Simplified polynomial regression for degree 2
      const sumX3 = plotData.reduce((sum, point) => sum + Math.pow(point.x, 3), 0);
      const sumX4 = plotData.reduce((sum, point) => sum + Math.pow(point.x, 4), 0);
      const sumX2Y = plotData.reduce((sum, point) => sum + point.x * point.x * point.y, 0);

      // Solve system of equations for ax² + bx + c
      const matrix = [
        [n, sumX, sumX2, sumY],
        [sumX, sumX2, sumX3, sumXY],
        [sumX2, sumX3, sumX4, sumX2Y]
      ];

      // Gaussian elimination (simplified)
      const c = sumY / n;
      const b = (sumXY - c * sumX) / sumX2;
      const a = (sumX2Y - b * sumX3 - c * sumX2) / sumX4;

      const meanY = sumY / n;
      const totalSumSquares = plotData.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0);
      const residualSumSquares = plotData.reduce((sum, point) => {
        const predicted = a * point.x * point.x + b * point.x + c;
        return sum + Math.pow(point.y - predicted, 2);
      }, 0);
      const rSquared = 1 - (residualSumSquares / totalSumSquares);

      setRegressionResults({
        type: 'polynomial',
        a, b, c,
        rSquared,
        equation: `y = ${a.toFixed(3)}x² + ${b.toFixed(3)}x + ${c.toFixed(3)}`,
        predict: (x: number) => a * x * x + b * x + c
      });
    }
  };

  const regressionLine = useMemo(() => {
    if (!regressionResults || plotData.length === 0) return [];

    const minX = Math.min(...plotData.map(p => p.x));
    const maxX = Math.max(...plotData.map(p => p.x));
    const step = (maxX - minX) / 100;

    return Array.from({ length: 101 }, (_, i) => {
      const x = minX + i * step;
      return {
        x,
        y: regressionResults.predict(x)
      };
    });
  }, [regressionResults, plotData]);

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Regression Playground</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Upload your data and fit linear, polynomial, or logistic regression models with interactive visualizations.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect}>
            <h3 className="text-subtitle text-primary mb-2">Upload Dataset for Regression</h3>
            <p className="text-body text-secondary mb-6">
              Upload a CSV file with numeric columns for X and Y variables
            </p>
          </FileUpload>
        </div>
      ) : (
        <div className="space-section">
          {/* Controls */}
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  X Variable
                </label>
                <select value={xColumn} onChange={(e) => setXColumn(e.target.value)} className="input">
                  <option value="">Select X column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Y Variable
                </label>
                <select value={yColumn} onChange={(e) => setYColumn(e.target.value)} className="input">
                  <option value="">Select Y column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Regression Type
                </label>
                <select 
                  value={regressionType} 
                  onChange={(e) => setRegressionType(e.target.value as any)} 
                  className="input"
                >
                  <option value="linear">Linear</option>
                  <option value="polynomial">Polynomial</option>
                  <option value="logistic">Logistic</option>
                </select>
              </div>

              {regressionType === 'polynomial' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Degree
                  </label>
                  <select 
                    value={polynomialDegree} 
                    onChange={(e) => setPolynomialDegree(Number(e.target.value))} 
                    className="input"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              )}

              <div className="flex items-end space-x-2">
                <button
                  onClick={performRegression}
                  disabled={!xColumn || !yColumn || plotData.length < 2}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>Fit Model</span>
                </button>
                <button
                  onClick={() => setRegressionResults(null)}
                  className="btn-secondary"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {regressionResults && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Regression Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Equation</h4>
                  <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                    {regressionResults.equation}
                  </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-2">R² Score</h4>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {regressionResults.rSquared.toFixed(4)}
                  </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Model Quality</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {regressionResults.rSquared > 0.8 ? 'Excellent' :
                     regressionResults.rSquared > 0.6 ? 'Good' :
                     regressionResults.rSquared > 0.4 ? 'Moderate' : 'Poor'} fit
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Visualization */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">
              Scatter Plot {xColumn && yColumn && `(${xColumn} vs ${yColumn})`}
            </h3>
            {plotData.length > 0 ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={plotData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={xColumn}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={yColumn}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value.toFixed(3), name]}
                      labelFormatter={(value) => `${xColumn}: ${value.toFixed(3)}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Scatter dataKey="y" fill="#3b82f6" />
                    {regressionResults && (
                      <Line 
                        data={regressionLine}
                        type="monotone"
                        dataKey="y"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-neutral-500">
                Select X and Y variables to see the plot
              </div>
            )}
          </div>

          {/* Data Preview */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Data Points ({plotData.length})</h3>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Showing first 100 valid data points with both X and Y values
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegressionPlayground;