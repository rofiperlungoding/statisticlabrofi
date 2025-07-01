// Core statistical functions library
export interface StatisticalResult {
  result: number | number[] | { [key: string]: number };
  confidence?: number;
  pValue?: number;
  testStatistic?: number;
  degreesOfFreedom?: number;
  criticalValue?: number;
  interpretation?: string;
  assumptions?: string[];
}

export interface DescriptiveStats {
  count: number;
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  standardDeviation: number;
  range: number;
  min: number;
  max: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
}

// Gamma function implementation using Lanczos approximation
export const gamma = (z: number): number => {
  // Lanczos approximation
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
             771.32342877765313, -176.61502916214059, 12.507343278686905,
             -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  
  z -= 1;
  
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (z + i);
  }
  
  const t = z + g + 0.5;
  const sqrt2pi = Math.sqrt(2 * Math.PI);
  
  return sqrt2pi * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
};

// Basic statistical functions
export const calculateMean = (data: number[]): number => {
  return data.reduce((sum, val) => sum + val, 0) / data.length;
};

export const calculateMedian = (data: number[]): number => {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[mid - 1] + sorted[mid]) / 2 
    : sorted[mid];
};

export const calculateMode = (data: number[]): number[] => {
  const frequency: { [key: number]: number } = {};
  data.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
  
  const maxFreq = Math.max(...Object.values(frequency));
  return Object.keys(frequency)
    .filter(key => frequency[Number(key)] === maxFreq)
    .map(Number);
};

export const calculateVariance = (data: number[], sample: boolean = true): number => {
  const mean = calculateMean(data);
  const sumSquaredDifferences = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
  return sumSquaredDifferences / (data.length - (sample ? 1 : 0));
};

export const calculateStandardDeviation = (data: number[], sample: boolean = true): number => {
  return Math.sqrt(calculateVariance(data, sample));
};

export const calculateQuartiles = (data: number[]): { q1: number; q3: number } => {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  
  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);
  
  return {
    q1: sorted[q1Index],
    q3: sorted[q3Index]
  };
};

export const calculateSkewness = (data: number[]): number => {
  const mean = calculateMean(data);
  const std = calculateStandardDeviation(data);
  const n = data.length;
  
  const sumCubed = data.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0);
  return (n / ((n - 1) * (n - 2))) * sumCubed;
};

export const calculateKurtosis = (data: number[]): number => {
  const mean = calculateMean(data);
  const std = calculateStandardDeviation(data);
  const n = data.length;
  
  const sumFourth = data.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0);
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sumFourth - 
         (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
};

export const calculateDescriptiveStats = (data: number[]): DescriptiveStats => {
  const sorted = [...data].sort((a, b) => a - b);
  const quartiles = calculateQuartiles(data);
  
  return {
    count: data.length,
    mean: calculateMean(data),
    median: calculateMedian(data),
    mode: calculateMode(data),
    variance: calculateVariance(data),
    standardDeviation: calculateStandardDeviation(data),
    range: Math.max(...data) - Math.min(...data),
    min: Math.min(...data),
    max: Math.max(...data),
    q1: quartiles.q1,
    q3: quartiles.q3,
    iqr: quartiles.q3 - quartiles.q1,
    skewness: calculateSkewness(data),
    kurtosis: calculateKurtosis(data)
  };
};

// Z-Score calculations
export const calculateZScore = (value: number, mean: number, standardDeviation: number): number => {
  return (value - mean) / standardDeviation;
};

// T-Test calculations
export const oneSampleTTest = (data: number[], populationMean: number): StatisticalResult => {
  const n = data.length;
  const sampleMean = calculateMean(data);
  const sampleStd = calculateStandardDeviation(data);
  const standardError = sampleStd / Math.sqrt(n);
  
  const tStatistic = (sampleMean - populationMean) / standardError;
  const degreesOfFreedom = n - 1;
  
  const pValue = 2 * (1 - approximateTCDF(Math.abs(tStatistic), degreesOfFreedom));
  
  return {
    result: tStatistic,
    testStatistic: tStatistic,
    degreesOfFreedom,
    pValue,
    interpretation: pValue < 0.05 ? 'Significant difference from population mean' : 'No significant difference from population mean'
  };
};

export const twoSampleTTest = (data1: number[], data2: number[], equalVariances: boolean = true): StatisticalResult => {
  const n1 = data1.length;
  const n2 = data2.length;
  const mean1 = calculateMean(data1);
  const mean2 = calculateMean(data2);
  const var1 = calculateVariance(data1);
  const var2 = calculateVariance(data2);
  
  let tStatistic: number;
  let degreesOfFreedom: number;
  
  if (equalVariances) {
    const pooledVariance = ((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2);
    const standardError = Math.sqrt(pooledVariance * (1/n1 + 1/n2));
    tStatistic = (mean1 - mean2) / standardError;
    degreesOfFreedom = n1 + n2 - 2;
  } else {
    const standardError = Math.sqrt(var1/n1 + var2/n2);
    tStatistic = (mean1 - mean2) / standardError;
    degreesOfFreedom = Math.pow(var1/n1 + var2/n2, 2) / 
      (Math.pow(var1/n1, 2)/(n1-1) + Math.pow(var2/n2, 2)/(n2-1));
  }
  
  const pValue = 2 * (1 - approximateTCDF(Math.abs(tStatistic), degreesOfFreedom));
  
  return {
    result: tStatistic,
    testStatistic: tStatistic,
    degreesOfFreedom,
    pValue,
    interpretation: pValue < 0.05 ? 'Significant difference between groups' : 'No significant difference between groups'
  };
};

export const pairedTTest = (data1: number[], data2: number[]): StatisticalResult => {
  if (data1.length !== data2.length) {
    throw new Error('Paired data must have equal lengths');
  }
  
  const differences = data1.map((val, i) => val - data2[i]);
  return oneSampleTTest(differences, 0);
};

// ANOVA calculations
export const oneWayANOVA = (groups: number[][]): StatisticalResult => {
  const allData = groups.flat();
  const grandMean = calculateMean(allData);
  const n = allData.length;
  const k = groups.length;
  
  // Between groups sum of squares
  const ssBetween = groups.reduce((sum, group) => {
    const groupMean = calculateMean(group);
    return sum + group.length * Math.pow(groupMean - grandMean, 2);
  }, 0);
  
  // Within groups sum of squares
  const ssWithin = groups.reduce((sum, group) => {
    const groupMean = calculateMean(group);
    return sum + group.reduce((groupSum, val) => groupSum + Math.pow(val - groupMean, 2), 0);
  }, 0);
  
  const dfBetween = k - 1;
  const dfWithin = n - k;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const fStatistic = msBetween / msWithin;
  
  // Approximate p-value for F-distribution
  const pValue = 1 - approximateFCDF(fStatistic, dfBetween, dfWithin);
  
  return {
    result: fStatistic,
    testStatistic: fStatistic,
    degreesOfFreedom: dfBetween,
    pValue,
    interpretation: pValue < 0.05 ? 'Significant differences between groups' : 'No significant differences between groups'
  };
};

// Correlation calculations
export const calculatePearsonCorrelation = (x: number[], y: number[]): number => {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }
  
  const n = x.length;
  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
  const sumY2 = y.reduce((sum, val) => sum + val * val, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return numerator / denominator;
};

// Linear regression
export const linearRegression = (x: number[], y: number[]) => {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }
  
  const n = x.length;
  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const meanY = sumY / n;
  const totalSumSquares = y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0);
  const residualSumSquares = y.reduce((sum, val, i) => {
    const predicted = slope * x[i] + intercept;
    return sum + Math.pow(val - predicted, 2);
  }, 0);
  const rSquared = 1 - (residualSumSquares / totalSumSquares);
  
  return {
    slope,
    intercept,
    rSquared,
    correlation: calculatePearsonCorrelation(x, y)
  };
};

// Chi-square test
export const chiSquareTest = (observed: number[], expected: number[]): StatisticalResult => {
  if (observed.length !== expected.length) {
    throw new Error('Observed and expected arrays must have the same length');
  }
  
  const chiSquare = observed.reduce((sum, obs, i) => {
    const exp = expected[i];
    return sum + Math.pow(obs - exp, 2) / exp;
  }, 0);
  
  const degreesOfFreedom = observed.length - 1;
  const pValue = 1 - approximateChiSquareCDF(chiSquare, degreesOfFreedom);
  
  return {
    result: chiSquare,
    testStatistic: chiSquare,
    degreesOfFreedom,
    pValue,
    interpretation: pValue < 0.05 ? 'Significant deviation from expected' : 'No significant deviation from expected'
  };
};

// Sample size calculations
export const calculateSampleSizeForMean = (
  marginOfError: number,
  standardDeviation: number,
  confidenceLevel: number = 0.95
): number => {
  const alpha = 1 - confidenceLevel;
  const zCritical = approximateInverseNormalCDF(1 - alpha/2);
  return Math.ceil(Math.pow((zCritical * standardDeviation) / marginOfError, 2));
};

export const calculateSampleSizeForProportion = (
  marginOfError: number,
  proportion: number = 0.5,
  confidenceLevel: number = 0.95
): number => {
  const alpha = 1 - confidenceLevel;
  const zCritical = approximateInverseNormalCDF(1 - alpha/2);
  return Math.ceil((Math.pow(zCritical, 2) * proportion * (1 - proportion)) / Math.pow(marginOfError, 2));
};

// Power analysis
export const calculatePower = (effectSize: number, sampleSize: number, alpha: number = 0.05): number => {
  const zAlpha = approximateInverseNormalCDF(1 - alpha / 2);
  const criticalValue = zAlpha / Math.sqrt(sampleSize);
  const zBeta = effectSize * Math.sqrt(sampleSize) - zAlpha;
  return approximateNormalCDF(zBeta);
};

// Confidence interval calculations
export const calculateConfidenceInterval = (
  data: number[],
  confidenceLevel: number = 0.95,
  knownStd?: number
): { lower: number; upper: number; margin: number } => {
  const n = data.length;
  const mean = calculateMean(data);
  const std = knownStd || calculateStandardDeviation(data);
  const alpha = 1 - confidenceLevel;
  
  let criticalValue: number;
  if (knownStd || n >= 30) {
    criticalValue = approximateInverseNormalCDF(1 - alpha/2);
  } else {
    criticalValue = approximateInverseTCDF(1 - alpha/2, n - 1);
  }
  
  const standardError = std / Math.sqrt(n);
  const margin = criticalValue * standardError;
  
  return {
    lower: mean - margin,
    upper: mean + margin,
    margin
  };
};

// Distribution functions
export const approximateNormalCDF = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
};

export const approximateInverseNormalCDF = (p: number): number => {
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [0, -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [0, 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  if (p < 0.02425) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  } else if (p <= 0.97575) {
    const q = p - 0.5;
    const r = q * q;
    return (((((a[1] * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * r + a[6]) * q / (((((b[1] * r + b[2]) * r + b[3]) * r + b[4]) * r + b[5]) * r + 1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  }
};

export const approximateTCDF = (t: number, df: number): number => {
  if (df >= 30) {
    return approximateNormalCDF(t);
  }
  
  const x = t / Math.sqrt(df);
  const a = (df - 1) / 2;
  return 0.5 + (x * Math.sqrt(Math.PI)) / (2 * Math.sqrt(a)) * 
         Math.exp(-a * Math.log(1 + (x * x) / df));
};

export const approximateInverseTCDF = (p: number, df: number): number => {
  if (df >= 30) {
    return approximateInverseNormalCDF(p);
  }
  
  const z = approximateInverseNormalCDF(p);
  const c1 = z / 4;
  const c2 = (5 * z + 16) * z / 96;
  const c3 = (3 * z * z + 19) * z / 384;
  
  return z + c1 / df + c2 / (df * df) + c3 / (df * df * df);
};

export const approximateChiSquareCDF = (x: number, df: number): number => {
  if (df >= 30) {
    const z = (Math.sqrt(2 * x) - Math.sqrt(2 * df - 1)) / Math.sqrt(2);
    return approximateNormalCDF(z);
  }
  
  return Math.min(1, Math.max(0, x / (2 * df)));
};

export const approximateFCDF = (f: number, df1: number, df2: number): number => {
  // Simple approximation for F-distribution
  if (f <= 0) return 0;
  if (f >= 10) return 1;
  
  // Rough approximation
  const x = f / (f + df2 / df1);
  return Math.pow(x, df1 / 2);
};

// Clustering algorithms
export const kMeansCluster = (data: number[][], k: number, maxIterations: number = 100) => {
  const n = data.length;
  const dimensions = data[0].length;
  
  // Initialize centroids randomly
  let centroids = Array(k).fill(null).map(() => 
    Array(dimensions).fill(null).map(() => Math.random() * 10)
  );
  
  let assignments = new Array(n).fill(0);
  
  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign points to nearest centroid
    const newAssignments = data.map(point => {
      let minDistance = Infinity;
      let cluster = 0;
      
      centroids.forEach((centroid, i) => {
        const distance = Math.sqrt(
          point.reduce((sum, val, j) => sum + Math.pow(val - centroid[j], 2), 0)
        );
        if (distance < minDistance) {
          minDistance = distance;
          cluster = i;
        }
      });
      
      return cluster;
    });
    
    // Check for convergence
    if (newAssignments.every((val, i) => val === assignments[i])) {
      break;
    }
    
    assignments = newAssignments;
    
    // Update centroids
    centroids = Array(k).fill(null).map((_, clusterIndex) => {
      const clusterPoints = data.filter((_, i) => assignments[i] === clusterIndex);
      if (clusterPoints.length === 0) return centroids[clusterIndex];
      
      return Array(dimensions).fill(null).map((_, dim) =>
        clusterPoints.reduce((sum, point) => sum + point[dim], 0) / clusterPoints.length
      );
    });
  }
  
  return { assignments, centroids };
};

// Data export utilities
export const exportToCSV = (data: any[], filename: string): void => {
  const csvContent = Object.keys(data[0]).join(',') + '\n' + 
    data.map(row => Object.values(row).join(',')).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const exportToPDF = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace('.pdf', '.txt');
  link.click();
  window.URL.revokeObjectURL(url);
};