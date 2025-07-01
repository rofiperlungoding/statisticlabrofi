import React from 'react';
import { BarChart, TrendingUp, Target, Activity } from 'lucide-react';

interface StatsSummaryProps {
  data: any[];
  columns: string[];
  className?: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ data, columns, className = '' }) => {
  const calculateStats = () => {
    const numericColumns = columns.filter(col => {
      const values = data.slice(0, 100).map(row => row[col]).filter(v => v !== null && v !== undefined);
      const numericValues = values.filter(v => !isNaN(Number(v)));
      return numericValues.length / values.length > 0.8;
    });

    const stats = numericColumns.map(col => {
      const values = data.map(row => Number(row[col])).filter(v => !isNaN(v));
      
      if (values.length === 0) return null;

      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sorted = [...values].sort((a, b) => a - b);
      const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];
      
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      const std = Math.sqrt(variance);

      return {
        column: col,
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        std: std.toFixed(3),
        min: Math.min(...values).toFixed(3),
        max: Math.max(...values).toFixed(3),
        count: values.length
      };
    }).filter(Boolean);

    return stats;
  };

  const stats = calculateStats();

  const overallStats = [
    {
      icon: BarChart,
      label: 'Total Rows',
      value: data.length.toLocaleString(),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: TrendingUp,
      label: 'Total Columns',
      value: columns.length.toString(),
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Target,
      label: 'Numeric Columns',
      value: stats.length.toString(),
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Activity,
      label: 'Missing Values',
      value: data.reduce((sum, row) => {
        return sum + columns.filter(col => row[col] === null || row[col] === undefined || row[col] === '').length;
      }, 0).toLocaleString(),
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className={`space-component ${className}`}>
      {/* Overall Statistics */}
      <div className="grid-stats">
        {overallStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="card p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800`}>
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-caption text-muted">{stat.label}</p>
                  <p className="text-subtitle text-primary font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Statistics */}
      {stats.length > 0 && (
        <div className="card">
          <div className="p-6">
            <h3 className="text-subtitle text-primary mb-4">Numeric Column Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Column</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Count</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Mean</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Median</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Std Dev</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Min</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, index) => (
                    <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 px-3 font-medium text-neutral-900 dark:text-white">{stat!.column}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.count}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.mean}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.median}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.std}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.min}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{stat!.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsSummary;