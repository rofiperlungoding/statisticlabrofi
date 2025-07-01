import React, { useState, useMemo } from 'react';
import { ScatterChart as Scatter, Upload, Play, RotateCcw, Layers } from 'lucide-react';
import { ScatterChart, Scatter as ScatterPlot, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import FileUpload from '../../components/FileUpload';
import ResultDisplay from '../../components/ResultDisplay';
import Papa from 'papaparse';
import { kMeansCluster, calculateMean, calculateStandardDeviation, exportToCSV, exportToPDF } from '../../utils/statistics';

interface ClusterPoint {
  x: number;
  y: number;
  cluster: number;
  originalIndex: number;
}

const ClusteringVisualizer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [algorithm, setAlgorithm] = useState<'kmeans' | 'hierarchical' | 'dbscan'>('kmeans');
  const [k, setK] = useState(3);
  const [autoScale, setAutoScale] = useState(true);
  const [results, setResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

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
        setSelectedColumns(numericCols.slice(0, 2)); // Auto-select first 2 numeric columns
      }
    });
  };

  const prepareClusteringData = (): number[][] => {
    if (selectedColumns.length < 2 || data.length === 0) return [];
    
    const rawData = data
      .filter(row => selectedColumns.every(col => !isNaN(Number(row[col]))))
      .map(row => selectedColumns.map(col => Number(row[col])));
    
    if (!autoScale) return rawData;
    
    // Auto-scaling (standardization)
    const scaledData = rawData.map(row => [...row]);
    
    for (let colIndex = 0; colIndex < selectedColumns.length; colIndex++) {
      const values = rawData.map(row => row[colIndex]);
      const mean = calculateMean(values);
      const std = calculateStandardDeviation(values);
      
      if (std > 0) {
        for (let rowIndex = 0; rowIndex < scaledData.length; rowIndex++) {
          scaledData[rowIndex][colIndex] = (scaledData[rowIndex][colIndex] - mean) / std;
        }
      }
    }
    
    return scaledData;
  };

  const performKMeansClustering = async () => {
    const clusteringData = prepareClusteringData();
    if (clusteringData.length === 0) return;

    setIsRunning(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { assignments, centroids } = kMeansCluster(clusteringData, k);
    
    // Calculate cluster statistics
    const clusterStats = Array(k).fill(null).map((_, clusterIndex) => {
      const clusterPoints = clusteringData.filter((_, i) => assignments[i] === clusterIndex);
      
      if (clusterPoints.length === 0) {
        return {
          cluster: clusterIndex,
          size: 0,
          centroid: centroids[clusterIndex],
          inertia: 0
        };
      }
      
      const inertia = clusterPoints.reduce((sum, point) => {
        const distance = Math.sqrt(
          point.reduce((distSum, val, dim) => 
            distSum + Math.pow(val - centroids[clusterIndex][dim], 2), 0
          )
        );
        return sum + distance * distance;
      }, 0);
      
      return {
        cluster: clusterIndex,
        size: clusterPoints.length,
        centroid: centroids[clusterIndex],
        inertia
      };
    });

    const totalInertia = clusterStats.reduce((sum, stat) => sum + stat.inertia, 0);
    
    // Calculate silhouette score approximation
    const silhouetteScore = calculateSilhouetteScore(clusteringData, assignments);
    
    setResults({
      algorithm: 'K-Means',
      assignments,
      centroids,
      clusterStats,
      totalInertia,
      silhouetteScore,
      clusterData: clusteringData.map((point, i) => ({
        x: point[0],
        y: point[1],
        cluster: assignments[i],
        originalIndex: i
      }))
    });
    
    setIsRunning(false);
  };

  const calculateSilhouetteScore = (data: number[][], assignments: number[]): number => {
    if (data.length === 0) return 0;
    
    const silhouetteValues = data.map((point, i) => {
      const currentCluster = assignments[i];
      
      // Calculate average distance to points in same cluster (a)
      const sameClusterPoints = data.filter((_, j) => j !== i && assignments[j] === currentCluster);
      const a = sameClusterPoints.length > 0 ? 
        calculateMean(sameClusterPoints.map(otherPoint => 
          Math.sqrt(point.reduce((sum, val, dim) => sum + Math.pow(val - otherPoint[dim], 2), 0))
        )) : 0;
      
      // Calculate minimum average distance to points in other clusters (b)
      const clusters = [...new Set(assignments)];
      const b = Math.min(...clusters
        .filter(cluster => cluster !== currentCluster)
        .map(cluster => {
          const otherClusterPoints = data.filter((_, j) => assignments[j] === cluster);
          return otherClusterPoints.length > 0 ?
            calculateMean(otherClusterPoints.map(otherPoint =>
              Math.sqrt(point.reduce((sum, val, dim) => sum + Math.pow(val - otherPoint[dim], 2), 0))
            )) : Infinity;
        })
      );
      
      return b === Infinity ? 0 : (b - a) / Math.max(a, b);
    });
    
    return calculateMean(silhouetteValues);
  };

  const calculateElbowData = (): any[] => {
    const clusteringData = prepareClusteringData();
    if (clusteringData.length === 0) return [];
    
    const maxK = Math.min(10, Math.floor(clusteringData.length / 2));
    const elbowData = [];
    
    for (let currentK = 1; currentK <= maxK; currentK++) {
      if (currentK === 1) {
        // For k=1, inertia is total variance
        const centroid = Array(clusteringData[0].length).fill(0).map((_, dim) =>
          calculateMean(clusteringData.map(point => point[dim]))
        );
        
        const inertia = clusteringData.reduce((sum, point) => {
          const distance = Math.sqrt(
            point.reduce((distSum, val, dim) => distSum + Math.pow(val - centroid[dim], 2), 0)
          );
          return sum + distance * distance;
        }, 0);
        
        elbowData.push({ k: currentK, inertia });
      } else {
        const { assignments, centroids } = kMeansCluster(clusteringData, currentK);
        
        const inertia = assignments.reduce((sum, clusterIndex, pointIndex) => {
          const point = clusteringData[pointIndex];
          const centroid = centroids[clusterIndex];
          const distance = Math.sqrt(
            point.reduce((distSum, val, dim) => distSum + Math.pow(val - centroid[dim], 2), 0)
          );
          return sum + distance * distance;
        }, 0);
        
        elbowData.push({ k: currentK, inertia });
      }
    }
    
    return elbowData;
  };

  const elbowData = useMemo(() => calculateElbowData(), [selectedColumns, data, autoScale]);

  const getClusterColors = (clusterIndex: number): string => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16'];
    return colors[clusterIndex % colors.length];
  };

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = data.map((row, i) => ({
          ...row,
          cluster: results.assignments[i],
          cluster_x: results.clusterData[i]?.x,
          cluster_y: results.clusterData[i]?.y
        }));
        exportToCSV(csvData, `clustering-results-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
CLUSTERING ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

ALGORITHM: ${results.algorithm}
Number of Clusters: ${k}
Data Points: ${data.length}
Features Used: ${selectedColumns.join(', ')}
Auto-scaling: ${autoScale ? 'Enabled' : 'Disabled'}

CLUSTER STATISTICS:
${results.clusterStats.map((stat: any, i: number) => 
  `Cluster ${i}: ${stat.size} points, Inertia: ${stat.inertia.toFixed(4)}`
).join('\n')}

QUALITY METRICS:
Total Inertia: ${results.totalInertia.toFixed(4)}
Silhouette Score: ${results.silhouetteScore.toFixed(4)}

CLUSTER CENTROIDS:
${results.centroids.map((centroid: number[], i: number) =>
  `Cluster ${i}: [${centroid.map(val => val.toFixed(4)).join(', ')}]`
).join('\n')}

INTERPRETATION:
Silhouette Score: ${results.silhouetteScore > 0.5 ? 'Good' : results.silhouetteScore > 0.25 ? 'Fair' : 'Poor'} clustering quality
        `;
        exportToPDF(reportContent, `clustering-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Cluster Analysis Application</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform clustering analysis with K-means algorithm, automatic feature scaling, and interactive visualizations.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect}>
            <h3 className="text-subtitle text-primary mb-2">Upload Dataset for Clustering</h3>
            <p className="text-body text-secondary mb-6">
              Upload a CSV file with numeric columns for cluster analysis
            </p>
          </FileUpload>
        </div>
      ) : (
        <div className="space-section">
          {/* Configuration Panel */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Clustering Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Algorithm
                </label>
                <select 
                  value={algorithm} 
                  onChange={(e) => setAlgorithm(e.target.value as any)} 
                  className="input"
                >
                  <option value="kmeans">K-Means</option>
                  <option value="hierarchical" disabled>Hierarchical (Coming Soon)</option>
                  <option value="dbscan" disabled>DBSCAN (Coming Soon)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Number of Clusters (k)
                </label>
                <input
                  type="number"
                  value={k}
                  onChange={(e) => setK(Number(e.target.value))}
                  className="input"
                  min="2"
                  max="10"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoScale}
                    onChange={(e) => setAutoScale(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Auto-scale features</span>
                </label>
              </div>

              <div className="flex items-end">
                <button
                  onClick={performKMeansClustering}
                  className="btn-primary w-full"
                  disabled={selectedColumns.length < 2 || isRunning}
                >
                  {isRunning ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Clustering...</span>
                    </div>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Clustering
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Feature Selection */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Select Features for Clustering</h3>
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
            <p className="text-xs text-neutral-500 mt-2">
              Select at least 2 features. Visualization will use the first 2 selected features.
            </p>
          </div>

          {/* Elbow Method */}
          {elbowData.length > 0 && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Elbow Method for Optimal k</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={elbowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="k" 
                      stroke="#737373" 
                      fontSize={12}
                      label={{ value: 'Number of Clusters (k)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#737373" 
                      fontSize={12}
                      label={{ value: 'Inertia', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value) => [value.toFixed(2), 'Inertia']}
                      labelFormatter={(value) => `k = ${value}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Line 
                      dataKey="inertia" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                Look for the "elbow" point where the rate of inertia decrease sharply diminishes to find optimal k.
              </p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultDisplay
                title="Clustering Results"
                results={{
                  algorithm: results.algorithm,
                  clusters: k,
                  dataPoints: data.length,
                  totalInertia: results.totalInertia,
                  silhouetteScore: results.silhouetteScore,
                  clusterQuality: results.silhouetteScore > 0.5 ? 'Good' : 
                                  results.silhouetteScore > 0.25 ? 'Fair' : 'Poor'
                }}
                onExport={handleExport}
                interpretation={`
                  K-means clustering with ${k} clusters completed.
                  Silhouette score: ${results.silhouetteScore.toFixed(3)} (${results.silhouetteScore > 0.5 ? 'Good' : results.silhouetteScore > 0.25 ? 'Fair' : 'Poor'} clustering quality).
                  ${results.silhouetteScore < 0.25 ? 'Consider adjusting the number of clusters or features.' : ''}
                `}
              />

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Cluster Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Silhouette Score</h4>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {results.silhouetteScore.toFixed(3)}
                      </p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Total Inertia</h4>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {results.totalInertia.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {results.clusterStats.map((stat: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getClusterColors(i) }}
                          ></div>
                          <span className="text-sm font-medium">Cluster {i}</span>
                        </div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {stat.size} points
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cluster Visualization */}
          {results && selectedColumns.length >= 2 && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">
                Cluster Visualization ({selectedColumns[0]} vs {selectedColumns[1]})
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={selectedColumns[0]}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={selectedColumns[1]}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value.toFixed(3), name]}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    {Array.from({ length: k }, (_, i) => (
                      <ScatterPlot
                        key={i}
                        data={results.clusterData.filter((point: any) => point.cluster === i)}
                        fill={getClusterColors(i)}
                        name={`Cluster ${i}`}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              {/* Centroids */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Cluster Centroids</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {results.centroids.map((centroid: number[], i: number) => (
                    <div key={i} className="flex items-center space-x-2 p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getClusterColors(i) }}
                      ></div>
                      <span>Cluster {i}: [{centroid.map(val => val.toFixed(2)).join(', ')}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cluster Statistics */}
          {results && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Detailed Cluster Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Cluster</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Percentage</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Inertia</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Centroid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.clusterStats.map((stat: any, i: number) => (
                      <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-2 px-3">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: getClusterColors(i) }}
                            ></div>
                            <span className="font-medium">Cluster {i}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat.size}</td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">
                          {((stat.size / data.length) * 100).toFixed(1)}%
                        </td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">
                          {stat.inertia.toFixed(4)}
                        </td>
                        <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300 font-mono text-xs">
                          [{stat.centroid.map((val: number) => val.toFixed(2)).join(', ')}]
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
            <h3 className="text-subtitle text-primary mb-4">Clustering Analysis Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body text-secondary">
              <div>
                <h4 className="font-medium text-primary mb-2">K-Means Algorithm</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Partitions data into k clusters</li>
                  <li>• Minimizes within-cluster sum of squares</li>
                  <li>• Assumes spherical clusters</li>
                  <li>• Sensitive to initialization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Quality Metrics</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Silhouette Score: [-1, 1], higher is better</li>
                  <li>• Inertia: Within-cluster sum of squares</li>
                  <li>• Elbow method: Find optimal k</li>
                  <li>• Good clustering: Silhouette &gt; 0.5</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Best Practices</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Scale features for better results</li>
                  <li>• Use elbow method to choose k</li>
                  <li>• Consider feature selection</li>
                  <li>• Validate results with domain knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusteringVisualizer;