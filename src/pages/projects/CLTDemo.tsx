import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CLTDemo: React.FC = () => {
  const [distribution, setDistribution] = useState<'uniform' | 'exponential' | 'bimodal'>('uniform');
  const [sampleSize, setSampleSize] = useState(30);
  const [numSamples, setNumSamples] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);
  const [currentSample, setCurrentSample] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate population based on distribution type
  const generatePopulation = (type: string, size: number = 1000) => {
    const population = [];
    
    for (let i = 0; i < size; i++) {
      let value;
      switch (type) {
        case 'uniform':
          value = Math.random() * 10;
          break;
        case 'exponential':
          value = -Math.log(Math.random()) * 2;
          break;
        case 'bimodal':
          value = Math.random() < 0.5 
            ? Math.random() * 3 + 1  // First mode around 2.5
            : Math.random() * 3 + 7; // Second mode around 8.5
          break;
        default:
          value = Math.random() * 10;
      }
      population.push(value);
    }
    
    return population;
  };

  // Generate sample from population
  const generateSample = () => {
    const population = generatePopulation(distribution);
    const sample = [];
    
    for (let i = 0; i < sampleSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      sample.push(population[randomIndex]);
    }
    
    return sample;
  };

  // Calculate sample mean
  const calculateMean = (sample: number[]) => {
    return sample.reduce((sum, val) => sum + val, 0) / sample.length;
  };

  // Start/stop sampling animation
  const toggleSampling = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const newSample = generateSample();
        const mean = calculateMean(newSample);
        
        setCurrentSample(newSample);
        setSampleMeans(prev => [...prev, mean]);
        setNumSamples(prev => prev + 1);
        
        // Stop after 1000 samples
        if (numSamples >= 999) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1100 - speed * 10);
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setSampleMeans([]);
    setCurrentSample([]);
    setNumSamples(0);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Create histogram data for sample means
  const createHistogram = (data: number[], bins: number = 30) => {
    if (data.length === 0) return [];
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    // Handle case where all data points are identical
    if (min === max) {
      return [{
        bin: min,
        count: data.length,
        range: `${min.toFixed(1)}-${min.toFixed(1)}`
      }];
    }
    
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0).map((_, i) => ({
      bin: min + i * binWidth,
      count: 0,
      range: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`
    }));
    
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });
    
    return histogram;
  };

  // Create population distribution for visualization
  const getPopulationData = () => {
    const population = generatePopulation(distribution, 10000);
    return createHistogram(population, 50);
  };

  const populationData = getPopulationData();
  const samplingDistribution = createHistogram(sampleMeans);
  
  // Calculate statistics
  const populationMean = populationData.reduce((sum, bin) => sum + bin.bin * bin.count, 0) / 
    populationData.reduce((sum, bin) => sum + bin.count, 0);
  
  const sampleMeansMean = sampleMeans.length > 0 
    ? sampleMeans.reduce((sum, val) => sum + val, 0) / sampleMeans.length 
    : 0;
    
  const sampleMeansStd = sampleMeans.length > 1
    ? Math.sqrt(sampleMeans.reduce((sum, val) => sum + Math.pow(val - sampleMeansMean, 2), 0) / (sampleMeans.length - 1))
    : 0;

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Central Limit Theorem Demo</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Visualize how sampling distributions approach normality regardless of the original population distribution.
        </p>
      </div>

      <div className="space-section">
        {/* Controls */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Simulation Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Population Distribution
              </label>
              <select
                value={distribution}
                onChange={(e) => {
                  setDistribution(e.target.value as any);
                  resetSimulation();
                }}
                className="input"
              >
                <option value="uniform">Uniform</option>
                <option value="exponential">Exponential</option>
                <option value="bimodal">Bimodal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Sample Size: {sampleSize}
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={sampleSize}
                onChange={(e) => {
                  setSampleSize(Number(e.target.value));
                  resetSimulation();
                }}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Animation Speed: {speed}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={toggleSampling}
                className={`btn-primary flex items-center space-x-2 ${isRunning ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button onClick={resetSimulation} className="btn-secondary">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Samples Taken</h4>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{numSamples}</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Population Mean</h4>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {populationMean.toFixed(2)}
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Sample Means Avg</h4>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {sampleMeansMean.toFixed(2)}
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Std Error</h4>
              <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {sampleMeansStd.toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Distribution */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Population Distribution ({distribution})
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="bin" 
                    stroke="#737373" 
                    fontSize={12}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [value, 'Frequency']}
                    labelFormatter={(value) => `Value: ${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sampling Distribution */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Sampling Distribution of Sample Means
            </h3>
            <div className="h-64">
              {samplingDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={samplingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="bin" 
                      stroke="#737373" 
                      fontSize={12}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [value, 'Frequency']}
                      labelFormatter={(value) => `Mean: ${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500">
                  Start sampling to see the distribution build
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Sample */}
        {currentSample.length > 0 && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">
              Current Sample (n={sampleSize})
            </h3>
            <div className="mb-4">
              <p className="text-body text-secondary">
                Sample Mean: <span className="font-semibold text-primary">
                  {calculateMean(currentSample).toFixed(3)}
                </span>
              </p>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={createHistogram(currentSample, 15)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="bin" 
                    stroke="#737373" 
                    fontSize={12}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [value, 'Count']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Theory Explanation */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Central Limit Theorem</h3>
          <div className="space-element text-body text-secondary">
            <p>
              The Central Limit Theorem states that regardless of the shape of the population distribution, 
              the sampling distribution of sample means approaches a normal distribution as the sample size increases.
            </p>
            <p>
              Key observations:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>The mean of sample means equals the population mean</li>
              <li>The standard error decreases as sample size increases</li>
              <li>The distribution becomes more normal with more samples</li>
              <li>This works for any population distribution shape</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLTDemo;