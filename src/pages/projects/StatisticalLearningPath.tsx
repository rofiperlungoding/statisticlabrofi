import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, GraduationCap, Target, Trophy, BarChart3, Calculator, TrendingUp, CheckCircle, XCircle, RotateCcw, Play, ChevronRight, Award, Clock, Brain, AlertCircle, BookOpen, Calendar, Users, Database, PieChart, Activity } from 'lucide-react';

interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = very easy, 5 = very hard
  realWorldContext?: string;
  datasetContext?: any;
}

interface ExerciseSet {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  exercises: Exercise[];
  icon: any;
  color: string;
  prerequisites?: string[];
  learningObjectives: string[];
  estimatedTime: number; // in minutes
}

interface UserProgress {
  completedSets: Set<string>;
  exerciseScores: { [exerciseId: string]: number };
  timeSpent: { [setId: string]: number };
  attemptCounts: { [exerciseId: string]: number };
  masteryLevels: { [concept: string]: number }; // 0-100
  lastActivity: Date;
  streakDays: number;
  totalPracticeTime: number;
  weakAreas: string[];
  strongAreas: string[];
}

interface Assessment {
  id: string;
  title: string;
  questions: Exercise[];
  requiredScore: number;
  timeLimit?: number;
  scheduledDate: Date;
  completed: boolean;
  score?: number;
}

interface LearningAnalytics {
  overallProgress: number;
  conceptMastery: { [concept: string]: number };
  recommendedNextSteps: string[];
  strengthAreas: string[];
  improvementAreas: string[];
  studyTimeRecommendation: number;
  difficultyTrend: number[];
}

const StatisticalLearningPath: React.FC = () => {
  const [currentView, setCurrentView] = useState<'hub' | 'exercise' | 'results' | 'analytics' | 'assessment' | 'review'>('hub');
  const [selectedSet, setSelectedSet] = useState<ExerciseSet | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedSets: new Set(),
    exerciseScores: {},
    timeSpent: {},
    attemptCounts: {},
    masteryLevels: {},
    lastActivity: new Date(),
    streakDays: 1,
    totalPracticeTime: 0,
    weakAreas: [],
    strongAreas: []
  });
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [learningAnalytics, setLearningAnalytics] = useState<LearningAnalytics | null>(null);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(3); // 1-5 scale
  const [dailyGoal, setDailyGoal] = useState(30); // minutes
  const [exerciseStartTime, setExerciseStartTime] = useState<Date | null>(null);

  // Real-world datasets for practice
  const realWorldDatasets = {
    sales: {
      name: "E-commerce Sales Data",
      description: "Monthly sales data from an online store",
      data: [85000, 92000, 78000, 105000, 118000, 95000, 102000, 110000, 125000, 98000, 115000, 135000],
      context: "A growing e-commerce company wants to analyze their sales trends"
    },
    students: {
      name: "Student Performance Data",
      description: "Test scores from different teaching methods",
      data: {
        traditional: [72, 75, 68, 81, 74, 79, 73, 76, 70, 78],
        interactive: [78, 82, 85, 79, 88, 83, 86, 81, 84, 87],
        online: [65, 71, 74, 69, 73, 68, 72, 70, 67, 75]
      },
      context: "Educational researchers comparing effectiveness of teaching methods"
    },
    medical: {
      name: "Clinical Trial Data",
      description: "Blood pressure measurements before and after treatment",
      data: {
        before: [142, 138, 155, 149, 146, 152, 140, 144, 151, 147],
        after: [128, 132, 139, 135, 133, 140, 126, 130, 136, 134]
      },
      context: "Pharmaceutical company testing a new blood pressure medication"
    }
  };

  // Comprehensive exercise sets with progressive difficulty
  const exerciseSets: ExerciseSet[] = [
    {
      id: 'descriptive-basics',
      title: 'Descriptive Statistics Fundamentals',
      description: 'Master the basics of descriptive statistics including measures of central tendency and dispersion.',
      difficulty: 'Beginner',
      icon: BarChart3,
      color: 'bg-blue-500',
      learningObjectives: [
        'Calculate mean, median, and mode accurately',
        'Understand measures of variability',
        'Interpret descriptive statistics in context',
        'Apply concepts to real-world scenarios'
      ],
      estimatedTime: 45,
      exercises: [
        {
          id: 'ds1',
          question: 'What is the mean of the dataset: 2, 4, 6, 8, 10?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 1,
          explanation: 'The mean is calculated by adding all values (2+4+6+8+10=30) and dividing by the number of values (5). 30/5 = 6.',
          concept: 'Mean (Average)',
          difficulty: 1
        },
        {
          id: 'ds2',
          question: 'In the sales dataset below, what is the median monthly sales figure?\nSales: $85,000, $92,000, $78,000, $105,000, $118,000, $95,000',
          options: ['$92,000', '$93,500', '$95,000', '$105,000'],
          correctAnswer: 1,
          explanation: 'First, arrange in order: $78,000, $85,000, $92,000, $95,000, $105,000, $118,000. With 6 values, the median is the average of the 3rd and 4th values: ($92,000 + $95,000) / 2 = $93,500.',
          concept: 'Median',
          difficulty: 2,
          realWorldContext: 'E-commerce company analyzing monthly sales performance',
          datasetContext: realWorldDatasets.sales
        },
        {
          id: 'ds3',
          question: 'A quality control manager measures product weights: 12.1g, 12.1g, 12.3g, 12.1g, 12.4g, 12.1g, 12.2g. What is the mode?',
          options: ['12.1g', '12.2g', '12.3g', '12.4g'],
          correctAnswer: 0,
          explanation: 'The mode is the value that appears most frequently. 12.1g appears 4 times, more than any other value.',
          concept: 'Mode',
          difficulty: 2,
          realWorldContext: 'Manufacturing quality control analysis'
        },
        {
          id: 'ds4',
          question: 'Which measure of central tendency is most affected by outliers in a salary dataset?',
          options: ['Mean', 'Median', 'Mode', 'Range'],
          correctAnswer: 0,
          explanation: 'The mean is most affected by outliers because it uses all values in its calculation. A single very high or low salary can significantly change the mean, while median and mode are more resistant to outliers.',
          concept: 'Outlier Sensitivity',
          difficulty: 3,
          realWorldContext: 'HR department analyzing employee compensation'
        },
        {
          id: 'ds5',
          question: 'A pharmaceutical company tests reaction times (in seconds): 0.8, 1.2, 0.9, 1.1, 1.0, 0.7, 1.3. What does a large standard deviation indicate?',
          options: ['All reaction times are similar', 'Reaction times vary widely', 'The average is incorrect', 'The sample size is too small'],
          correctAnswer: 1,
          explanation: 'Standard deviation measures how spread out the data points are from the mean. A large standard deviation indicates high variability - reaction times vary widely among participants.',
          concept: 'Standard Deviation',
          difficulty: 3,
          realWorldContext: 'Clinical trial measuring drug effects on reaction time'
        },
        {
          id: 'ds6',
          question: 'In a perfectly consistent manufacturing process, all products weigh exactly 500g. What is the standard deviation?',
          options: ['500', '0', '1', 'Cannot be determined'],
          correctAnswer: 1,
          explanation: 'A standard deviation of 0 means there is no variability in the data, which only occurs when all values are identical. Perfect consistency means no variation.',
          concept: 'Standard Deviation Properties',
          difficulty: 2,
          realWorldContext: 'Manufacturing process control'
        },
        {
          id: 'ds7',
          question: 'A market researcher collects customer satisfaction scores: 2, 8, 9, 3, 10, 1, 7. What is the range?',
          options: ['8', '9', '10', '9'],
          correctAnswer: 1,
          explanation: 'Range is calculated as maximum value minus minimum value. Max = 10, Min = 1, so Range = 10 - 1 = 9.',
          concept: 'Range',
          difficulty: 2,
          realWorldContext: 'Customer satisfaction survey analysis'
        },
        {
          id: 'ds8',
          question: 'In a normally distributed dataset of employee performance scores, what percentage of scores fall within one standard deviation of the mean?',
          options: ['68%', '95%', '99.7%', '50%'],
          correctAnswer: 0,
          explanation: 'According to the empirical rule (68-95-99.7 rule), approximately 68% of data falls within one standard deviation of the mean in a normal distribution.',
          concept: 'Empirical Rule',
          difficulty: 3,
          realWorldContext: 'HR performance evaluation analysis'
        },
        {
          id: 'ds9',
          question: 'In quarterly sales data analysis, which quartile represents the median?',
          options: ['Q1 (25th percentile)', 'Q2 (50th percentile)', 'Q3 (75th percentile)', 'Q4 (100th percentile)'],
          correctAnswer: 1,
          explanation: 'Q2 (the second quartile) is the median, which divides the dataset into two equal halves at the 50th percentile.',
          concept: 'Quartiles',
          difficulty: 2,
          realWorldContext: 'Business performance analytics'
        },
        {
          id: 'ds10',
          question: 'A data analyst wants to measure the spread of the middle 50% of customer purchase amounts. Which statistic should they use?',
          options: ['Range', 'Standard deviation', 'Interquartile range (IQR)', 'Variance'],
          correctAnswer: 2,
          explanation: 'The IQR is calculated as Q3 minus Q1, representing the range of the middle 50% of the data, making it perfect for measuring the spread of the central portion of the dataset.',
          concept: 'Interquartile Range',
          difficulty: 3,
          realWorldContext: 'E-commerce customer behavior analysis'
        }
      ]
    },
    {
      id: 'probability-foundations',
      title: 'Probability Foundations',
      description: 'Learn fundamental probability concepts through real-world scenarios and business applications.',
      difficulty: 'Beginner',
      icon: Target,
      color: 'bg-green-500',
      prerequisites: ['descriptive-basics'],
      learningObjectives: [
        'Calculate basic probabilities correctly',
        'Apply probability rules to real scenarios',
        'Understand conditional probability',
        'Solve business probability problems'
      ],
      estimatedTime: 50,
      exercises: [
        {
          id: 'pf1',
          question: 'A quality control inspector finds that 5% of products are defective. If they randomly select one product, what is the probability it is defective?',
          options: ['0.05', '0.5', '0.95', '5'],
          correctAnswer: 0,
          explanation: '5% means 5 out of 100, which equals 0.05 in probability terms. This is a direct application of basic probability.',
          concept: 'Basic Probability',
          difficulty: 1,
          realWorldContext: 'Manufacturing quality control'
        },
        {
          id: 'pf2',
          question: 'In a fair marketing A/B test with equal traffic split, what is the probability a visitor sees version A?',
          options: ['0.25', '0.5', '0.75', '1.0'],
          correctAnswer: 1,
          explanation: 'With equal traffic split, each version gets 50% of visitors. Therefore, P(version A) = 0.5.',
          concept: 'Fair Probability',
          difficulty: 1,
          realWorldContext: 'Digital marketing A/B testing'
        },
        {
          id: 'pf3',
          question: 'A customer can either buy Product A or Product B, but not both. If P(A) = 0.3 and P(B) = 0.4, what is P(A and B)?',
          options: ['0.7', '0.12', '0', '0.35'],
          correctAnswer: 2,
          explanation: 'Since the customer cannot buy both products (mutually exclusive events), P(A and B) = 0.',
          concept: 'Mutually Exclusive Events',
          difficulty: 2,
          realWorldContext: 'Retail customer purchasing behavior'
        },
        {
          id: 'pf4',
          question: 'If the probability of rain tomorrow is 0.3, what is the probability it will NOT rain?',
          options: ['0.7', '0.3', '1.3', '0'],
          correctAnswer: 0,
          explanation: 'Using the complement rule: P(not rain) = 1 - P(rain) = 1 - 0.3 = 0.7.',
          concept: 'Complement Rule',
          difficulty: 2,
          realWorldContext: 'Weather forecasting for event planning'
        },
        {
          id: 'pf5',
          question: 'A marketing database has 10,000 customers: 6,000 women and 4,000 men. What is the probability of randomly selecting a woman?',
          options: ['0.4', '0.6', '6000', '0.5'],
          correctAnswer: 1,
          explanation: 'P(woman) = Number of women / Total customers = 6,000 / 10,000 = 0.6.',
          concept: 'Classical Probability',
          difficulty: 2,
          realWorldContext: 'Customer database analysis'
        },
        {
          id: 'pf6',
          question: 'Two independent advertising campaigns have success rates of 20% and 30% respectively. What does "independent" mean?',
          options: ['They cannot both succeed', 'They must both succeed', 'One campaign\'s success does not affect the other', 'They have equal success rates'],
          correctAnswer: 2,
          explanation: 'Independent events are those where the occurrence of one event does not change the probability of the other event occurring.',
          concept: 'Independent Events',
          difficulty: 3,
          realWorldContext: 'Marketing campaign analysis'
        },
        {
          id: 'pf7',
          question: 'If customer satisfaction is 80% for Product A and 70% for Product B, and purchases are independent, what is the probability both products satisfy a customer who buys both?',
          options: ['0.56', '1.5', '0.75', '0.24'],
          correctAnswer: 0,
          explanation: 'For independent events, P(A and B) = P(A) × P(B) = 0.8 × 0.7 = 0.56.',
          concept: 'Independent Events Multiplication',
          difficulty: 3,
          realWorldContext: 'Product satisfaction analysis'
        },
        {
          id: 'pf8',
          question: 'A call center receives calls that are either technical (T), billing (B), or sales (S) inquiries. What is the probability of receiving a non-sales call if P(T) = 0.4, P(B) = 0.35, P(S) = 0.25?',
          options: ['0.25', '0.75', '0.4', '0.35'],
          correctAnswer: 1,
          explanation: 'Non-sales calls include technical and billing: P(not S) = P(T) + P(B) = 0.4 + 0.35 = 0.75. Alternatively, P(not S) = 1 - P(S) = 1 - 0.25 = 0.75.',
          concept: 'Complement and Addition Rules',
          difficulty: 3,
          realWorldContext: 'Call center operations analysis'
        },
        {
          id: 'pf9',
          question: 'An online store has 100 products: 30 electronics, 25 clothing, 20 books, 15 home goods, 10 sports items. What is the probability of randomly selecting an electronics item?',
          options: ['30', '0.3', '0.7', '3'],
          correctAnswer: 1,
          explanation: 'P(electronics) = Number of electronics / Total products = 30 / 100 = 0.3.',
          concept: 'Basic Probability Calculation',
          difficulty: 2,
          realWorldContext: 'E-commerce inventory analysis'
        },
        {
          id: 'pf10',
          question: 'In a valid probability distribution for customer satisfaction ratings (Poor, Fair, Good, Excellent), what must the sum of all probabilities equal?',
          options: ['0', '0.5', '1', 'The number of categories'],
          correctAnswer: 2,
          explanation: 'The fundamental rule of probability distributions is that all probabilities must sum to 1, representing certainty that one of the outcomes will occur.',
          concept: 'Probability Distribution Properties',
          difficulty: 2,
          realWorldContext: 'Customer satisfaction survey design'
        }
      ]
    },
    {
      id: 'hypothesis-testing-fundamentals',
      title: 'Hypothesis Testing Fundamentals',
      description: 'Master the principles of hypothesis testing using real business and research scenarios.',
      difficulty: 'Intermediate',
      icon: Calculator,
      color: 'bg-purple-500',
      prerequisites: ['descriptive-basics', 'probability-foundations'],
      learningObjectives: [
        'Formulate proper null and alternative hypotheses',
        'Interpret p-values correctly',
        'Make statistical decisions using significance levels',
        'Apply hypothesis testing to business problems'
      ],
      estimatedTime: 60,
      exercises: [
        {
          id: 'ht1',
          question: 'A pharmaceutical company claims their new drug is more effective than the current standard. What should the null hypothesis represent?',
          options: ['The new drug is more effective', 'The new drug is less effective', 'The new drug is equally effective as the standard', 'The new drug has side effects'],
          correctAnswer: 2,
          explanation: 'The null hypothesis (H₀) typically represents the status quo or no difference. Here, it states that the new drug is equally effective as the current standard.',
          concept: 'Null Hypothesis',
          difficulty: 2,
          realWorldContext: 'Pharmaceutical drug efficacy testing'
        },
        {
          id: 'ht2',
          question: 'After running an A/B test on website conversion rates, you get a p-value of 0.03. What does this p-value represent?',
          options: ['The probability that version B is better than A', 'The probability that there is no difference between versions', 'The probability of observing this difference (or larger) if there truly is no difference', 'The conversion rate improvement'],
          correctAnswer: 2,
          explanation: 'A p-value is the probability of observing the data (or more extreme data) assuming the null hypothesis (no difference) is true.',
          concept: 'P-value Definition',
          difficulty: 3,
          realWorldContext: 'Digital marketing A/B testing'
        },
        {
          id: 'ht3',
          question: 'A marketing manager sets α = 0.05 for their campaign effectiveness test. The p-value is 0.03. What should they conclude?',
          options: ['Accept the null hypothesis', 'Reject the null hypothesis', 'The test is inconclusive', 'Increase the sample size'],
          correctAnswer: 1,
          explanation: 'Since the p-value (0.03) is less than α (0.05), we reject the null hypothesis. This suggests the campaign has a statistically significant effect.',
          concept: 'Statistical Decision Making',
          difficulty: 3,
          realWorldContext: 'Marketing campaign effectiveness analysis'
        },
        {
          id: 'ht4',
          question: 'A quality control manager incorrectly concludes that a production process is defective when it actually is working properly. What type of error is this?',
          options: ['Type I error (False positive)', 'Type II error (False negative)', 'Sampling error', 'Measurement error'],
          correctAnswer: 0,
          explanation: 'A Type I error occurs when we reject a true null hypothesis. Here, concluding the process is defective when it\'s actually working properly is a false positive.',
          concept: 'Type I Error',
          difficulty: 3,
          realWorldContext: 'Manufacturing quality control'
        },
        {
          id: 'ht5',
          question: 'A clinical researcher wants to ensure their study has an 80% chance of detecting a real treatment effect if it exists. What is this 80% referring to?',
          options: ['Confidence level', 'Significance level', 'Statistical power', 'Effect size'],
          correctAnswer: 2,
          explanation: 'Statistical power is the probability of correctly rejecting a false null hypothesis (detecting a true effect). Power of 80% means an 80% chance of finding a real effect.',
          concept: 'Statistical Power',
          difficulty: 4,
          realWorldContext: 'Clinical trial design'
        },
        {
          id: 'ht6',
          question: 'A company changes their significance level from α = 0.05 to α = 0.01 to be more conservative. What happens to the probability of Type I error?',
          options: ['It increases', 'It decreases', 'It stays the same', 'It becomes undefined'],
          correctAnswer: 1,
          explanation: 'Decreasing the significance level (α) from 0.05 to 0.01 directly decreases the probability of Type I error, making the test more conservative.',
          concept: 'Significance Level and Type I Error',
          difficulty: 3,
          realWorldContext: 'Business decision-making with statistical tests'
        },
        {
          id: 'ht7',
          question: 'A researcher conducts a two-tailed test to see if a new teaching method affects student performance (could be better or worse). With α = 0.05, what is the critical value region in each tail?',
          options: ['0.05', '0.025', '0.01', '0.1'],
          correctAnswer: 1,
          explanation: 'In a two-tailed test, the significance level is split between both tails, so each tail contains α/2 = 0.05/2 = 0.025.',
          concept: 'Two-tailed Tests',
          difficulty: 3,
          realWorldContext: 'Educational research methodology'
        },
        {
          id: 'ht8',
          question: 'A market researcher constructs a 95% confidence interval for average customer spending: [$45, $55]. The company claims the average is $60. What can they conclude?',
          options: ['Accept the company claim', 'Reject the company claim', 'The confidence interval is invalid', 'Need more data'],
          correctAnswer: 1,
          explanation: 'Since $60 falls outside the 95% confidence interval [$45, $55], we can reject the null hypothesis that the true average is $60 at the 5% significance level.',
          concept: 'Confidence Intervals and Hypothesis Testing',
          difficulty: 4,
          realWorldContext: 'Market research and customer analysis'
        },
        {
          id: 'ht9',
          question: 'An e-commerce company tests a new checkout process and finds a "statistically significant" improvement. What does this mean for business decisions?',
          options: ['The improvement is practically important', 'The p-value is less than the significance level', 'The effect size is large', 'The sample size was adequate'],
          correctAnswer: 1,
          explanation: 'Statistical significance means the p-value is less than the predetermined significance level (α), but this doesn\'t necessarily mean the improvement is practically important for business.',
          concept: 'Statistical vs Practical Significance',
          difficulty: 4,
          realWorldContext: 'E-commerce optimization and business decision-making'
        },
        {
          id: 'ht10',
          question: 'A clinical trial comparing two treatments has low statistical power. Which of the following would help increase the power?',
          options: ['Increasing sample size', 'Using more precise measurements', 'Having a larger true effect size', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Statistical power can be increased by: increasing sample size (more data), reducing measurement error (more precise measures), and having larger effect sizes (bigger true differences).',
          concept: 'Factors Affecting Statistical Power',
          difficulty: 4,
          realWorldContext: 'Clinical trial design and optimization'
        }
      ]
    },
    {
      id: 'regression-analysis-applied',
      title: 'Applied Regression Analysis',
      description: 'Master regression analysis through real business data and practical prediction problems.',
      difficulty: 'Intermediate',
      icon: TrendingUp,
      color: 'bg-orange-500',
      prerequisites: ['descriptive-basics', 'probability-foundations'],
      learningObjectives: [
        'Interpret regression coefficients in business context',
        'Evaluate model quality using R-squared',
        'Understand correlation vs causation',
        'Apply regression for business predictions'
      ],
      estimatedTime: 75,
      exercises: [
        {
          id: 'ra1',
          question: 'A real estate model predicts: House Price = 50,000 + 100 × Square_Feet. What does the coefficient 100 represent?',
          options: ['The minimum house price', 'The price increase per additional square foot', 'The average house price', 'The total square footage'],
          correctAnswer: 1,
          explanation: 'In the linear equation, the coefficient of Square_Feet (100) represents the slope - the expected increase in house price for each additional square foot.',
          concept: 'Regression Coefficient Interpretation',
          difficulty: 2,
          realWorldContext: 'Real estate price prediction modeling'
        },
        {
          id: 'ra2',
          question: 'A marketing team builds a model predicting sales from advertising spend with R² = 0.75. What does this mean?',
          options: ['75% correlation between variables', '75% of sales variation is explained by advertising', '25% error rate', '75% confidence level'],
          correctAnswer: 1,
          explanation: 'R² (coefficient of determination) measures the proportion of variance in the dependent variable (sales) that is explained by the independent variable (advertising spend).',
          concept: 'R-squared Interpretation',
          difficulty: 3,
          realWorldContext: 'Marketing ROI analysis'
        },
        {
          id: 'ra3',
          question: 'An e-commerce company\'s model shows R² = 0.84 for predicting customer lifetime value. What percentage of variation is unexplained?',
          options: ['84%', '16%', '0.84%', '68%'],
          correctAnswer: 1,
          explanation: 'If R² = 0.84, then 84% of variance is explained, leaving 100% - 84% = 16% unexplained.',
          concept: 'R-squared and Unexplained Variance',
          difficulty: 2,
          realWorldContext: 'Customer lifetime value modeling'
        },
        {
          id: 'ra4',
          question: 'A business analyst finds a correlation of r = -0.85 between price and demand. What does this indicate?',
          options: ['85% price reduction', 'Strong positive relationship', 'Strong negative relationship', 'Weak relationship'],
          correctAnswer: 2,
          explanation: 'A correlation of -0.85 indicates a strong negative relationship, meaning as price increases, demand tends to decrease significantly.',
          concept: 'Correlation Interpretation',
          difficulty: 3,
          realWorldContext: 'Price elasticity analysis'
        },
        {
          id: 'ra5',
          question: 'A study finds high correlation (r = 0.9) between ice cream sales and drowning incidents. What can we conclude?',
          options: ['Ice cream causes drowning', 'Drowning causes ice cream sales', 'Both are related to a third factor (temperature)', 'The correlation is incorrect'],
          correctAnswer: 2,
          explanation: 'High correlation does not imply causation. Both variables are likely influenced by temperature - hot weather increases both ice cream sales and swimming (hence drowning risk).',
          concept: 'Correlation vs Causation',
          difficulty: 4,
          realWorldContext: 'Data interpretation and logical reasoning'
        },
        {
          id: 'ra6',
          question: 'In a customer satisfaction model, the residuals (errors) show increasing variance as predicted values increase. What assumption is violated?',
          options: ['Normality', 'Independence', 'Homoscedasticity (equal variances)', 'Linearity'],
          correctAnswer: 2,
          explanation: 'Homoscedasticity assumes constant variance of residuals. When variance increases with predicted values, this assumption is violated (heteroscedasticity).',
          concept: 'Regression Assumptions - Homoscedasticity',
          difficulty: 4,
          realWorldContext: 'Customer satisfaction modeling'
        },
        {
          id: 'ra7',
          question: 'A marketing model uses both \'advertising spend\' and \'promotional spend\' as predictors, but they are highly correlated (r = 0.95). What problem might this cause?',
          options: ['Improved accuracy', 'Multicollinearity', 'Underfitting', 'Increased R-squared'],
          correctAnswer: 1,
          explanation: 'Multicollinearity occurs when independent variables are highly correlated with each other, making it difficult to determine individual effects and reducing model stability.',
          concept: 'Multicollinearity',
          difficulty: 4,
          realWorldContext: 'Marketing attribution modeling'
        },
        {
          id: 'ra8',
          question: 'A sales prediction model is: Revenue = 10,000 + 500 × Salespeople. If a company has 0 salespeople, what is the predicted revenue?',
          options: ['$0', '$500', '$10,000', 'Undefined'],
          correctAnswer: 2,
          explanation: 'The y-intercept (10,000) represents the predicted value of revenue when the number of salespeople equals zero, which is $10,000.',
          concept: 'Y-intercept Interpretation',
          difficulty: 2,
          realWorldContext: 'Sales force effectiveness modeling'
        },
        {
          id: 'ra9',
          question: 'A restaurant\'s model predicting daily revenue shows residuals that are larger on weekends than weekdays. What does this suggest?',
          options: ['The model is perfect', 'Heteroscedasticity - unequal error variances', 'Normal distribution of errors', 'Linear relationship'],
          correctAnswer: 1,
          explanation: 'Different error variances for different groups (weekends vs weekdays) indicates heteroscedasticity, violating the assumption of constant variance.',
          concept: 'Heteroscedasticity Detection',
          difficulty: 4,
          realWorldContext: 'Restaurant revenue forecasting'
        },
        {
          id: 'ra10',
          question: 'A human resources model uses standardized coefficients (beta weights) to compare the relative importance of education (β = 0.6) vs experience (β = 0.4) in predicting salary. What can we conclude?',
          options: ['Education is measured in larger units', 'Experience has a bigger effect on salary', 'Education has a bigger effect on salary', 'Both have equal effects'],
          correctAnswer: 2,
          explanation: 'Standardized coefficients (beta weights) allow direct comparison of variable importance. Education (β = 0.6) has a larger effect on salary than experience (β = 0.4).',
          concept: 'Standardized Coefficients',
          difficulty: 4,
          realWorldContext: 'Human resources salary analysis'
        }
      ]
    },
    {
      id: 'advanced-inference-methods',
      title: 'Advanced Statistical Inference',
      description: 'Master complex statistical methods including ANOVA, non-parametric tests, and advanced business analytics.',
      difficulty: 'Advanced',
      icon: Trophy,
      color: 'bg-red-500',
      prerequisites: ['hypothesis-testing-fundamentals', 'regression-analysis-applied'],
      learningObjectives: [
        'Apply ANOVA to multi-group business problems',
        'Choose appropriate non-parametric alternatives',
        'Understand interaction effects in factorial designs',
        'Implement advanced statistical methods in business contexts'
      ],
      estimatedTime: 90,
      exercises: [
        {
          id: 'ai1',
          question: 'A retail company compares sales performance across 4 regional stores using ANOVA. The F-statistic of 8.5 represents what ratio?',
          options: ['Within-store variance / Between-store variance', 'Between-store variance / Within-store variance', 'Total variance / Error variance', 'Sample size / Number of stores'],
          correctAnswer: 1,
          explanation: 'The F-statistic in ANOVA is the ratio of between-group variance to within-group variance. A larger F (like 8.5) indicates more difference between stores relative to variation within stores.',
          concept: 'ANOVA F-statistic',
          difficulty: 3,
          realWorldContext: 'Retail multi-location performance analysis'
        },
        {
          id: 'ai2',
          question: 'A market research team has customer satisfaction ratings (1-5 scale) that are heavily skewed. Which test should they use to compare satisfaction across 3 different service channels?',
          options: ['One-way ANOVA', 'Kruskal-Wallis test', 'Chi-square test', 'Linear regression'],
          correctAnswer: 1,
          explanation: 'When data violates ANOVA assumptions (normality), the Kruskal-Wallis test is the non-parametric alternative for comparing multiple independent groups.',
          concept: 'Non-parametric Tests for Multiple Groups',
          difficulty: 4,
          realWorldContext: 'Customer satisfaction research with ordinal data'
        },
        {
          id: 'ai3',
          question: 'An e-commerce company tests two factors: website design (A vs B) and payment method (credit card vs PayPal). They find that design B works better with PayPal but design A works better with credit cards. What is this called?',
          options: ['Main effect only', 'Interaction effect', 'Confounding effect', 'Random effect'],
          correctAnswer: 1,
          explanation: 'An interaction effect occurs when the effect of one factor (design) depends on the level of another factor (payment method). The optimal design changes based on payment method.',
          concept: 'Interaction Effects in Factorial Design',
          difficulty: 4,
          realWorldContext: 'E-commerce conversion optimization'
        },
        {
          id: 'ai4',
          question: 'After finding a significant ANOVA result comparing 5 marketing campaigns, what should the analyst do next to determine which specific campaigns differ?',
          options: ['Stop - the analysis is complete', 'Conduct post-hoc tests with multiple comparison correction', 'Run separate t-tests for all pairs', 'Increase the sample size'],
          correctAnswer: 1,
          explanation: 'Post-hoc tests with multiple comparison corrections (like Bonferroni) are needed after significant ANOVA to determine which specific groups differ while controlling family-wise error rate.',
          concept: 'Post-hoc Tests and Multiple Comparisons',
          difficulty: 4,
          realWorldContext: 'Marketing campaign effectiveness analysis'
        },
        {
          id: 'ai5',
          question: 'A clinical trial shows a statistically significant difference (p < 0.001) between treatments, but the effect size (Cohen\'s d) is 0.1. What should the business decision be?',
          options: ['Implement the treatment - it\'s significant', 'Consider practical significance - the effect is very small', 'The statistics are contradictory', 'Increase the significance level'],
          correctAnswer: 1,
          explanation: 'Effect size measures practical significance. Cohen\'s d = 0.1 is considered a very small effect. Statistical significance (due to large sample) doesn\'t guarantee practical importance.',
          concept: 'Effect Size vs Statistical Significance',
          difficulty: 5,
          realWorldContext: 'Clinical trial results interpretation'
        },
        {
          id: 'ai6',
          question: 'A pharmaceutical company conducts a repeated measures study testing a drug at weeks 1, 2, 4, and 8. The sphericity assumption is violated. What should they do?',
          options: ['Use regular ANOVA anyway', 'Apply Greenhouse-Geisser correction', 'Switch to between-subjects design', 'Remove the outliers'],
          correctAnswer: 1,
          explanation: 'When sphericity is violated in repeated measures ANOVA, corrections like Greenhouse-Geisser adjust the degrees of freedom to maintain valid F-tests.',
          concept: 'Sphericity and Repeated Measures ANOVA',
          difficulty: 5,
          realWorldContext: 'Pharmaceutical longitudinal studies'
        },
        {
          id: 'ai7',
          question: 'A marketing team runs 20 different A/B tests on website features. To control Type I error across all tests, they should use α = 0.05/20 = 0.0025. What correction is this?',
          options: ['Tukey correction', 'Bonferroni correction', 'Holm correction', 'False discovery rate'],
          correctAnswer: 1,
          explanation: 'The Bonferroni correction divides the significance level by the number of tests (α/k) to control the family-wise error rate when conducting multiple comparisons.',
          concept: 'Bonferroni Multiple Comparisons Correction',
          difficulty: 4,
          realWorldContext: 'Digital marketing multiple testing scenarios'
        },
        {
          id: 'ai8',
          question: 'A startup with limited customer data (n=50) wants to estimate confidence intervals for user engagement metrics. Which resampling method would be most appropriate?',
          options: ['Increase sample size', 'Bootstrap resampling', 'Cross-validation', 'Monte Carlo simulation'],
          correctAnswer: 1,
          explanation: 'Bootstrapping resamples with replacement from the original data to estimate sampling distributions, making it ideal for small samples where traditional methods may not apply.',
          concept: 'Bootstrap Resampling',
          difficulty: 4,
          realWorldContext: 'Startup analytics with limited data'
        },
        {
          id: 'ai9',
          question: 'An online education platform analyzes course completion (completed/not completed) based on study hours and prior experience. What type of regression should they use?',
          options: ['Linear regression', 'Logistic regression', 'Polynomial regression', 'Multiple linear regression'],
          correctAnswer: 1,
          explanation: 'Logistic regression is used when the outcome variable is binary (completed/not completed). It models the probability of completion rather than predicting completion directly.',
          concept: 'Logistic Regression for Binary Outcomes',
          difficulty: 4,
          realWorldContext: 'Educational platform analytics'
        },
        {
          id: 'ai10',
          question: 'A healthcare study finds an odds ratio of 2.5 for a treatment effect. How should this be interpreted?',
          options: ['The treatment increases the outcome by 250%', 'The odds of success are 2.5 times higher with treatment', 'The treatment is 25% effective', 'The correlation is 0.25'],
          correctAnswer: 1,
          explanation: 'An odds ratio of 2.5 means the odds of the outcome occurring are 2.5 times higher in the treatment group compared to the control group.',
          concept: 'Odds Ratio Interpretation',
          difficulty: 4,
          realWorldContext: 'Healthcare treatment effectiveness analysis'
        }
      ]
    },
    {
      id: 'business-analytics-capstone',
      title: 'Business Analytics Capstone',
      description: 'Apply advanced statistical methods to complex business problems with real datasets.',
      difficulty: 'Expert',
      icon: Brain,
      color: 'bg-indigo-500',
      prerequisites: ['advanced-inference-methods', 'regression-analysis-applied'],
      learningObjectives: [
        'Integrate multiple statistical methods for complex problems',
        'Design complete analytical solutions for business questions',
        'Interpret results in strategic business context',
        'Communicate statistical findings to non-technical stakeholders'
      ],
      estimatedTime: 120,
      exercises: [
        {
          id: 'bc1',
          question: 'A SaaS company wants to reduce customer churn. They have data on usage patterns, support tickets, billing history, and demographics. Which analytical approach would be most comprehensive?',
          options: ['Single logistic regression model', 'Survival analysis with time-to-churn', 'Descriptive statistics only', 'Simple correlation analysis'],
          correctAnswer: 1,
          explanation: 'Survival analysis is ideal for churn analysis as it models time-to-event (churn) and can handle censored data (customers who haven\'t churned yet), providing more insight than simple classification.',
          concept: 'Survival Analysis for Business Problems',
          difficulty: 5,
          realWorldContext: 'SaaS customer retention strategy'
        },
        {
          id: 'bc2',
          question: 'A retail chain is analyzing the ROI of a customer loyalty program across 100 stores. They find significant variation in program effectiveness by region, store size, and customer demographics. What advanced technique should they use?',
          options: ['Simple ANOVA', 'Hierarchical/mixed-effects modeling', 'Basic correlation', 'Single regression model'],
          correctAnswer: 1,
          explanation: 'Hierarchical models account for nested data structure (customers within stores within regions) and can model varying effects across different levels, providing more accurate insights.',
          concept: 'Hierarchical Modeling for Complex Data',
          difficulty: 5,
          realWorldContext: 'Multi-level retail analytics'
        },
        {
          id: 'bc3',
          question: 'A financial services company uses multiple models (credit scoring, fraud detection, customer lifetime value) for decision-making. How should they handle the uncertainty from combining multiple model predictions?',
          options: ['Use the average of all predictions', 'Apply Bayesian model averaging', 'Choose the model with highest R²', 'Use the most recent model only'],
          correctAnswer: 1,
          explanation: 'Bayesian model averaging weights different models by their posterior probabilities, providing more robust predictions and proper uncertainty quantification when combining multiple models.',
          concept: 'Bayesian Model Averaging',
          difficulty: 5,
          realWorldContext: 'Financial services risk management'
        },
        {
          id: 'bc4',
          question: 'An e-commerce platform conducts hundreds of simultaneous A/B tests on different features. Beyond multiple testing correction, what additional challenge must they address?',
          options: ['Sample size requirements', 'Interaction effects between simultaneous tests', 'Computational complexity', 'Data storage issues'],
          correctAnswer: 1,
          explanation: 'Simultaneous A/B tests can interact with each other, making individual test results misleading. Advanced experimental design and analysis methods are needed to account for these interactions.',
          concept: 'Multi-arm Bandit and Interaction Effects',
          difficulty: 5,
          realWorldContext: 'Large-scale digital experimentation'
        },
        {
          id: 'bc5',
          question: 'A healthcare analytics team finds that their predictive model performs well on average but has significant bias against certain demographic groups. What framework should guide their response?',
          options: ['Focus only on overall accuracy', 'Implement algorithmic fairness constraints', 'Increase overall sample size', 'Use simpler models'],
          correctAnswer: 1,
          explanation: 'Algorithmic fairness requires explicit consideration of model performance across different groups and may involve constraints to ensure equitable outcomes, not just overall accuracy.',
          concept: 'Algorithmic Fairness and Bias',
          difficulty: 5,
          realWorldContext: 'Healthcare predictive analytics ethics'
        },
        {
          id: 'bc6',
          question: 'A streaming service wants to optimize content recommendations using both explicit ratings and implicit behavior data. The data includes temporal patterns, user interactions, and content features. What modeling approach is most appropriate?',
          options: ['Simple collaborative filtering', 'Matrix factorization with temporal dynamics', 'Basic content-based filtering', 'Random recommendations'],
          correctAnswer: 1,
          explanation: 'Advanced matrix factorization with temporal dynamics can capture evolving user preferences, incorporate multiple data types, and provide personalized recommendations at scale.',
          concept: 'Advanced Recommendation Systems',
          difficulty: 5,
          realWorldContext: 'Streaming platform optimization'
        },
        {
          id: 'bc7',
          question: 'A supply chain analyst needs to forecast demand for 10,000 products across 500 locations. Individual time series models are impractical. What approach should they use?',
          options: ['Separate ARIMA for each series', 'Hierarchical time series forecasting', 'Simple moving averages', 'Linear regression only'],
          correctAnswer: 1,
          explanation: 'Hierarchical forecasting leverages relationships between series at different aggregation levels (product families, regions) to improve forecasts for individual series, especially with limited data.',
          concept: 'Hierarchical Time Series Forecasting',
          difficulty: 5,
          realWorldContext: 'Large-scale supply chain optimization'
        },
        {
          id: 'bc8',
          question: 'A pharmaceutical company analyzes clinical trial data where the primary endpoint shows marginal significance (p=0.048) but secondary endpoints are non-significant. How should they interpret and communicate these results?',
          options: ['Emphasize the significant result only', 'Apply holistic interpretation considering effect sizes, confidence intervals, and clinical significance', 'Declare the trial failed', 'Focus on p-values alone'],
          correctAnswer: 1,
          explanation: 'Proper clinical trial interpretation requires considering effect sizes, clinical significance, confidence intervals, and the totality of evidence, not just p-value significance.',
          concept: 'Clinical Trial Statistical Interpretation',
          difficulty: 5,
          realWorldContext: 'Pharmaceutical regulatory submissions'
        },
        {
          id: 'bc9',
          question: 'A social media platform analyzes user engagement using observational data. They find strong correlations between certain features and engagement but want to make causal claims for product decisions. What should they do?',
          options: ['Assume correlation implies causation', 'Use causal inference methods like instrumental variables or natural experiments', 'Run more correlational studies', 'Increase sample size only'],
          correctAnswer: 1,
          explanation: 'Causal inference from observational data requires specific methods like instrumental variables, regression discontinuity, or natural experiments to address confounding and establish causality.',
          concept: 'Causal Inference from Observational Data',
          difficulty: 5,
          realWorldContext: 'Social media product development'
        },
        {
          id: 'bc10',
          question: 'A consulting firm presents statistical findings to a CEO who asks: "What\'s the business impact and how confident are you?" The analysis shows p < 0.001 with a 95% CI of [0.1%, 0.3%] improvement. How should they respond?',
          options: ['Emphasize the strong significance (p < 0.001)', 'Explain that while statistically significant, the practical impact is small (0.1-0.3%)', 'Say they are 95% confident in the result', 'Recommend immediate implementation'],
          correctAnswer: 1,
          explanation: 'Effective business communication requires translating statistical significance into practical business impact. Here, while highly significant, the actual improvement is quite small (0.1-0.3%).',
          concept: 'Business Communication of Statistical Results',
          difficulty: 5,
          realWorldContext: 'Executive-level statistical consulting'
        }
      ]
    }
  ];

  // Calculate learning analytics
  const calculateLearningAnalytics = useCallback((): LearningAnalytics => {
    const totalExercises = exerciseSets.reduce((sum, set) => sum + set.exercises.length, 0);
    const completedExercises = Object.keys(userProgress.exerciseScores).length;
    
    const conceptScores: { [concept: string]: number[] } = {};
    Object.entries(userProgress.exerciseScores).forEach(([exerciseId, score]) => {
      const exercise = exerciseSets
        .flatMap(set => set.exercises)
        .find(ex => ex.id === exerciseId);
      if (exercise) {
        if (!conceptScores[exercise.concept]) {
          conceptScores[exercise.concept] = [];
        }
        conceptScores[exercise.concept].push(score);
      }
    });

    const conceptMastery: { [concept: string]: number } = {};
    Object.entries(conceptScores).forEach(([concept, scores]) => {
      conceptMastery[concept] = Math.round(
        scores.reduce((sum, score) => sum + score, 0) / scores.length * 100
      );
    });

    const strengthAreas = Object.entries(conceptMastery)
      .filter(([_, mastery]) => mastery >= 80)
      .map(([concept]) => concept);

    const improvementAreas = Object.entries(conceptMastery)
      .filter(([_, mastery]) => mastery < 70)
      .map(([concept]) => concept);

    const overallProgress = (completedExercises / totalExercises) * 100;

    const recommendedNextSteps: string[] = [];
    if (improvementAreas.length > 0) {
      recommendedNextSteps.push(`Focus on: ${improvementAreas.slice(0, 3).join(', ')}`);
    }
    if (overallProgress < 25) {
      recommendedNextSteps.push('Complete foundational topics first');
    } else if (overallProgress < 50) {
      recommendedNextSteps.push('Move to intermediate topics');
    } else if (overallProgress < 75) {
      recommendedNextSteps.push('Tackle advanced statistical methods');
    } else {
      recommendedNextSteps.push('Complete the capstone projects');
    }

    return {
      overallProgress: Math.round(overallProgress),
      conceptMastery,
      recommendedNextSteps,
      strengthAreas,
      improvementAreas,
      studyTimeRecommendation: Math.max(30, 60 - (overallProgress / 100) * 30),
      difficultyTrend: [] // This would be calculated from recent performance
    };
  }, [userProgress, exerciseSets]);

  // Generate daily practice problems based on performance
  const generateDailyPractice = () => {
    const analytics = calculateLearningAnalytics();
    const weakConcepts = analytics.improvementAreas.slice(0, 3);
    
    // Find exercises from weak concepts
    const practiceExercises = exerciseSets
      .flatMap(set => set.exercises)
      .filter(exercise => 
        weakConcepts.includes(exercise.concept) &&
        exercise.difficulty <= adaptiveDifficulty
      )
      .slice(0, 5);

    return practiceExercises;
  };

  // Assessment generation for bi-weekly evaluations
  const generateAssessment = (): Assessment => {
    const concepts = [...new Set(exerciseSets.flatMap(set => 
      set.exercises.map(ex => ex.concept)
    ))];
    
    const assessmentQuestions = concepts.slice(0, 10).map(concept => {
      const conceptExercises = exerciseSets
        .flatMap(set => set.exercises)
        .filter(ex => ex.concept === concept);
      
      return conceptExercises[Math.floor(Math.random() * conceptExercises.length)];
    }).filter(Boolean);

    return {
      id: `assessment-${Date.now()}`,
      title: 'Bi-weekly Progress Assessment',
      questions: assessmentQuestions,
      requiredScore: 0.8,
      timeLimit: 45,
      scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      completed: false
    };
  };

  // Adaptive difficulty adjustment
  const adjustDifficulty = (correct: boolean) => {
    if (correct && adaptiveDifficulty < 5) {
      setAdaptiveDifficulty(prev => Math.min(5, prev + 0.1));
    } else if (!correct && adaptiveDifficulty > 1) {
      setAdaptiveDifficulty(prev => Math.max(1, prev - 0.2));
    }
  };

  // Update analytics when progress changes
  useEffect(() => {
    setLearningAnalytics(calculateLearningAnalytics());
  }, [userProgress, calculateLearningAnalytics]);

  const startExerciseSet = (set: ExerciseSet) => {
    setSelectedSet(set);
    setCurrentView('exercise');
    setCurrentExerciseIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setExerciseStartTime(new Date());
  };

  const backToHub = () => {
    setCurrentView('hub');
    setSelectedSet(null);
    setCurrentExerciseIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setExerciseStartTime(null);
  };

  const selectAnswer = (answerIndex: number) => {
    if (!selectedSet || showExplanation) return;

    const currentExercise = selectedSet.exercises[currentExerciseIndex];
    const isCorrect = answerIndex === currentExercise.correctAnswer;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentExerciseIndex]: answerIndex
    }));
    
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      exerciseScores: {
        ...prev.exerciseScores,
        [currentExercise.id]: isCorrect ? 1 : 0
      },
      attemptCounts: {
        ...prev.attemptCounts,
        [currentExercise.id]: (prev.attemptCounts[currentExercise.id] || 0) + 1
      },
      lastActivity: new Date()
    }));

    // Adjust difficulty based on performance
    adjustDifficulty(isCorrect);
    
    setShowExplanation(true);

    // Auto-advance after explanation
    setTimeout(() => {
      if (currentExerciseIndex < selectedSet.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        // Calculate session time and update progress
        if (exerciseStartTime) {
          const sessionTime = Date.now() - exerciseStartTime.getTime();
          setUserProgress(prev => ({
            ...prev,
            timeSpent: {
              ...prev.timeSpent,
              [selectedSet.id]: (prev.timeSpent[selectedSet.id] || 0) + sessionTime
            },
            totalPracticeTime: prev.totalPracticeTime + sessionTime
          }));
        }
        
        // Check if set is completed successfully
        const score = Object.values(selectedAnswers).filter((answer, index) => 
          answer === selectedSet.exercises[index].correctAnswer
        ).length + (isCorrect ? 1 : 0);
        
        if (score >= selectedSet.exercises.length * 0.8) {
          setUserProgress(prev => ({
            ...prev,
            completedSets: new Set([...prev.completedSets, selectedSet.id])
          }));
        }
        
        setCurrentView('results');
      }
    }, 3000);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentExerciseIndex(0);
    setCurrentView('exercise');
    setExerciseStartTime(new Date());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Analytics Dashboard View
  if (currentView === 'analytics') {
    return (
      <div className="container-main section-padding">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={backToHub}
            className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learning Path</span>
          </button>
          <h1 className="text-title text-primary">Learning Analytics</h1>
          <div className="w-24"></div>
        </div>

        {learningAnalytics && (
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Overall Progress</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${learningAnalytics.overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary">{learningAnalytics.overallProgress}%</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted">Total Study Time</p>
                    <p className="text-lg font-semibold text-primary">
                      {Math.round(userProgress.totalPracticeTime / (1000 * 60))} min
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted">Streak Days</p>
                    <p className="text-lg font-semibold text-primary">{userProgress.streakDays}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted">Completed Sets</p>
                    <p className="text-lg font-semibold text-primary">
                      {userProgress.completedSets.size}/{exerciseSets.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted">Adaptive Level</p>
                    <p className="text-lg font-semibold text-primary">{adaptiveDifficulty.toFixed(1)}/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept Mastery */}
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Concept Mastery</h3>
              <div className="space-y-3">
                {Object.entries(learningAnalytics.conceptMastery).map(([concept, mastery]) => (
                  <div key={concept} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{concept}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            mastery >= 80 ? 'bg-green-500' : 
                            mastery >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${mastery}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-10">{mastery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Recommended Next Steps</h3>
                <ul className="space-y-2">
                  {learningAnalytics.recommendedNextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Study Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily goal:</span>
                    <span className="font-semibold">{dailyGoal} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recommended focus time:</span>
                    <span className="font-semibold">{learningAnalytics.studyTimeRecommendation} min/day</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted">
                      Based on your progress, focus on {learningAnalytics.improvementAreas.slice(0, 2).join(' and ')} 
                      to improve overall understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Results view with detailed analytics
  if (currentView === 'results' && selectedSet) {
    const score = Object.keys(selectedAnswers).length > 0 ? 
      selectedSet.exercises.filter((exercise, index) => 
        selectedAnswers[index] === exercise.correctAnswer
      ).length : 0;

    const sessionTime = exerciseStartTime ? 
      Math.round((Date.now() - exerciseStartTime.getTime()) / (1000 * 60)) : 0;

    return (
      <div className="container-main section-padding space-section">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <div className="text-center mb-6">
              {score >= selectedSet.exercises.length * 0.9 ? (
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              ) : score >= selectedSet.exercises.length * 0.8 ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              )}
              
              <h1 className="text-title text-primary mb-4">Session Complete!</h1>
              <h2 className="text-subtitle text-secondary mb-6">{selectedSet.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(score, selectedSet.exercises.length)}`}>
                  {score}/{selectedSet.exercises.length}
                </div>
                <div className="text-sm text-muted">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-blue-600">
                  {Math.round((score / selectedSet.exercises.length) * 100)}%
                </div>
                <div className="text-sm text-muted">Accuracy</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {score >= selectedSet.exercises.length * 0.9 ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                      🎉 Outstanding! Perfect mastery achieved!
                    </p>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    You've demonstrated excellent understanding. Ready for the next challenge!
                  </p>
                </div>
              ) : score >= selectedSet.exercises.length * 0.8 ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Excellent work! Topic mastered.
                    </p>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Strong performance indicates solid understanding of key concepts.
                  </p>
                </div>
              ) : score >= selectedSet.exercises.length * 0.6 ? (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-800 dark:text-blue-200 font-medium">
                      Good progress! Review and improve.
                    </p>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Solid foundation. Review explanations for missed questions to strengthen understanding.
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <p className="text-orange-800 dark:text-orange-200 font-medium">
                      Practice more to build confidence.
                    </p>
                  </div>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Spend more time with the concepts. Consider reviewing prerequisites before retrying.
                  </p>
                </div>
              )}

              {/* Performance insights */}
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-medium text-primary mb-2">Session Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted">Time spent:</span>
                    <span className="font-medium ml-2">{sessionTime} minutes</span>
                  </div>
                  <div>
                    <span className="text-muted">Difficulty level:</span>
                    <span className="font-medium ml-2">{adaptiveDifficulty.toFixed(1)}/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={resetExercise}
                className="btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry</span>
              </button>
              <button
                onClick={backToHub}
                className="btn-primary"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exercise view - enhanced with context and hints
  if (currentView === 'exercise' && selectedSet) {
    const currentExercise = selectedSet.exercises[currentExerciseIndex];
    const isAnswered = selectedAnswers.hasOwnProperty(currentExerciseIndex);

    return (
      <div className="container-main section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={backToHub}
            className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-medium text-primary">{selectedSet.title}</h1>
            <p className="text-sm text-muted">
              Question {currentExerciseIndex + 1} of {selectedSet.exercises.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Difficulty</p>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentExercise.difficulty ? 'bg-blue-500' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-8">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseIndex + 1) / selectedSet.exercises.length) * 100}%` }}
          ></div>
        </div>

        {/* Current Question */}
        <div className="max-w-3xl mx-auto">
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded">
                {currentExercise.concept}
              </span>
              {currentExercise.realWorldContext && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                  Real-world application
                </span>
              )}
            </div>
            
            {/* Real-world context */}
            {currentExercise.realWorldContext && (
              <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  <strong>Context:</strong> {currentExercise.realWorldContext}
                </p>
              </div>
            )}
            
            <h2 className="text-xl font-medium text-primary mb-6">
              {currentExercise.question}
            </h2>
            
            {/* Dataset context if available */}
            {currentExercise.datasetContext && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {currentExercise.datasetContext.name}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  {currentExercise.datasetContext.description}
                </p>
                {Array.isArray(currentExercise.datasetContext.data) && (
                  <div className="text-sm font-mono text-blue-700 dark:text-blue-300">
                    Data: [{currentExercise.datasetContext.data.slice(0, 8).join(', ')}
                    {currentExercise.datasetContext.data.length > 8 ? '...' : ''}]
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              {currentExercise.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => selectAnswer(optionIndex)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    showExplanation
                      ? optionIndex === currentExercise.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 ring-2 ring-green-200'
                        : selectedAnswers[currentExerciseIndex] === optionIndex
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30 ring-2 ring-red-200'
                        : 'border-neutral-200 dark:border-neutral-700'
                      : selectedAnswers[currentExerciseIndex] === optionIndex
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-200'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showExplanation
                        ? optionIndex === currentExercise.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : selectedAnswers[currentExerciseIndex] === optionIndex
                          ? 'border-red-500 bg-red-500'
                          : 'border-neutral-300 dark:border-neutral-600'
                        : selectedAnswers[currentExerciseIndex] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-neutral-300 dark:border-neutral-600'
                    }`}>
                      {showExplanation && optionIndex === currentExercise.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showExplanation && selectedAnswers[currentExerciseIndex] === optionIndex && optionIndex !== currentExercise.correctAnswer && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      {!showExplanation && selectedAnswers[currentExerciseIndex] === optionIndex && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-lg">{String.fromCharCode(65 + optionIndex)}.</span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-lg border-l-4 ${
                selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500'
              }`}>
                <div className="flex items-start space-x-3">
                  {selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium mb-3 ${
                      selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className={`text-sm mb-3 ${
                      selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {currentExercise.explanation}
                    </p>
                    {selectedAnswers[currentExerciseIndex] !== currentExercise.correctAnswer && (
                      <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                        Correct answer: {String.fromCharCode(65 + currentExercise.correctAnswer)}. {currentExercise.options[currentExercise.correctAnswer]}
                      </p>
                    )}

                    {currentExerciseIndex < selectedSet.exercises.length - 1 && (
                      <div className="mt-4 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <span>Next question in 3 seconds...</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main hub view with enhanced features
  return (
    <div className="container-main section-padding">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-title text-primary mb-4">Statistical Learning Path</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Master statistics through personalized practice exercises that adapt to your performance.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted">Progress</p>
              <p className="text-lg font-semibold text-primary">
                {learningAnalytics?.overallProgress || 0}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted">Completed</p>
              <p className="text-lg font-semibold text-primary">
                {userProgress.completedSets.size}/{exerciseSets.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted">Study Time</p>
              <p className="text-lg font-semibold text-primary">
                {Math.round(userProgress.totalPracticeTime / (1000 * 60))}m
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-muted">Streak</p>
              <p className="text-lg font-semibold text-primary">
                {userProgress.streakDays} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <button
          onClick={() => setCurrentView('analytics')}
          className="btn-secondary flex items-center space-x-2"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Analytics</span>
        </button>
        <button
          onClick={() => {
            const practiceExercises = generateDailyPractice();
            if (practiceExercises.length > 0) {
              // Create temporary practice set
              const practiceSet: ExerciseSet = {
                id: 'daily-practice',
                title: 'Daily Practice',
                description: 'Personalized practice based on your performance',
                difficulty: 'Intermediate',
                exercises: practiceExercises,
                icon: Calendar,
                color: 'bg-blue-500',
                learningObjectives: ['Reinforce weak areas', 'Build confidence'],
                estimatedTime: 15
              };
              startExerciseSet(practiceSet);
            }
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Practice</span>
        </button>
      </div>

      {/* Learning Path */}
      <div className="space-y-6">
        {exerciseSets.map((set, index) => {
          const IconComponent = set.icon;
          const isCompleted = userProgress.completedSets.has(set.id);
          const isUnlocked = !set.prerequisites || 
            set.prerequisites.every(prereq => userProgress.completedSets.has(prereq));
          
          return (
            <div
              key={set.id}
              className={`card relative ${
                isCompleted ? 'ring-2 ring-green-500' : 
                !isUnlocked ? 'opacity-60' : ''
              }`}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${set.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-primary">{set.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(set.difficulty)}`}>
                          {set.difficulty}
                        </span>
                        <span className="text-xs text-muted">{set.estimatedTime} min</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-secondary mb-3">{set.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-primary mb-2">Learning Objectives:</h4>
                      <ul className="text-xs text-muted space-y-1">
                        {set.learningObjectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted">
                        <span>{set.exercises.length} questions</span>
                        {set.prerequisites && (
                          <span>Prerequisites: {set.prerequisites.join(', ')}</span>
                        )}
                      </div>
                      <button
                        onClick={() => startExerciseSet(set)}
                        disabled={!isUnlocked}
                        className={`btn-primary text-sm ${
                          !isUnlocked ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isCompleted ? 'Review' : isUnlocked ? 'Start' : 'Locked'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Tips */}
      <div className="mt-12 card p-6">
        <h3 className="text-subtitle text-primary mb-4">Learning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-secondary">
          <div>
            <h4 className="font-medium text-primary mb-2">🎯 Stay Consistent</h4>
            <p>Practice 15-30 minutes daily rather than long irregular sessions. Consistency builds stronger neural pathways for statistical thinking.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">🧠 Connect Concepts</h4>
            <p>Look for connections between different statistical methods. Understanding relationships helps build comprehensive statistical intuition.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">📊 Apply to Real Data</h4>
            <p>Practice with real-world datasets when possible. This bridges the gap between theoretical knowledge and practical application.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalLearningPath;