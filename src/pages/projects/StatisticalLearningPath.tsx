import React, { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap, Target, Trophy, BarChart3, Calculator, TrendingUp, CheckCircle, XCircle, RotateCcw, Play, ChevronRight } from 'lucide-react';

interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
}

interface ExerciseSet {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  icon: any;
  color: string;
}

const StatisticalLearningPath: React.FC = () => {
  const [currentView, setCurrentView] = useState<'hub' | 'exercise' | 'results'>('hub');
  const [selectedSet, setSelectedSet] = useState<ExerciseSet | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());

  const exerciseSets: ExerciseSet[] = [
    {
      id: 'descriptive-basics',
      title: 'Descriptive Statistics Fundamentals',
      description: 'Master the basics of descriptive statistics including measures of central tendency and dispersion.',
      difficulty: 'Beginner',
      icon: BarChart3,
      color: 'bg-blue-500',
      exercises: [
        {
          id: 'ds1',
          question: 'What is the mean of the dataset: 2, 4, 6, 8, 10?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 1,
          explanation: 'The mean is calculated by adding all values (2+4+6+8+10=30) and dividing by the number of values (5). 30/5 = 6.',
          concept: 'Mean (Average)'
        },
        {
          id: 'ds2',
          question: 'What is the median of the dataset: 1, 3, 5, 7, 9, 11?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 1,
          explanation: 'For an even number of values, the median is the average of the two middle values. The middle values are 5 and 7, so the median is (5+7)/2 = 6.',
          concept: 'Median'
        },
        {
          id: 'ds3',
          question: 'In the dataset 2, 2, 3, 4, 4, 4, 5, what is the mode?',
          options: ['2', '3', '4', '5'],
          correctAnswer: 2,
          explanation: 'The mode is the value that appears most frequently. The value 4 appears three times, more than any other value.',
          concept: 'Mode'
        },
        {
          id: 'ds4',
          question: 'Which measure of central tendency is most affected by outliers?',
          options: ['Mean', 'Median', 'Mode', 'Range'],
          correctAnswer: 0,
          explanation: 'The mean is most affected by outliers because it uses all values in its calculation. Extreme values can significantly change the mean.',
          concept: 'Outlier Sensitivity'
        },
        {
          id: 'ds5',
          question: 'What does the standard deviation measure?',
          options: ['Central tendency', 'Variability', 'Skewness', 'Sample size'],
          correctAnswer: 1,
          explanation: 'Standard deviation measures how spread out the data points are from the mean. It quantifies the variability or dispersion in the dataset.',
          concept: 'Standard Deviation'
        },
        {
          id: 'ds6',
          question: 'If a dataset has a standard deviation of 0, what can you conclude?',
          options: ['All values are different', 'The mean is 0', 'All values are the same', 'The dataset is normally distributed'],
          correctAnswer: 2,
          explanation: 'A standard deviation of 0 means there is no variability in the data, which only occurs when all values are identical.',
          concept: 'Standard Deviation Properties'
        },
        {
          id: 'ds7',
          question: 'What is the range of the dataset: 12, 8, 15, 3, 20, 7?',
          options: ['12', '15', '17', '20'],
          correctAnswer: 2,
          explanation: 'Range is calculated as maximum value minus minimum value. Max = 20, Min = 3, so Range = 20 - 3 = 17.',
          concept: 'Range'
        },
        {
          id: 'ds8',
          question: 'What percentage of data falls within one standard deviation of the mean in a normal distribution?',
          options: ['68%', '95%', '99.7%', '50%'],
          correctAnswer: 0,
          explanation: 'According to the empirical rule (68-95-99.7 rule), approximately 68% of data falls within one standard deviation of the mean.',
          concept: 'Empirical Rule'
        },
        {
          id: 'ds9',
          question: 'Which quartile represents the median?',
          options: ['Q1', 'Q2', 'Q3', 'Q4'],
          correctAnswer: 1,
          explanation: 'Q2 (the second quartile) is the median, which divides the dataset into two equal halves.',
          concept: 'Quartiles'
        },
        {
          id: 'ds10',
          question: 'What is the interquartile range (IQR)?',
          options: ['Q3 - Q1', 'Q4 - Q2', 'Q2 - Q1', 'Maximum - Minimum'],
          correctAnswer: 0,
          explanation: 'The IQR is calculated as Q3 minus Q1, representing the range of the middle 50% of the data.',
          concept: 'Interquartile Range'
        }
      ]
    },
    {
      id: 'probability-foundations',
      title: 'Probability Foundations',
      description: 'Learn the fundamental concepts of probability theory and basic probability calculations.',
      difficulty: 'Beginner',
      icon: Target,
      color: 'bg-green-500',
      exercises: [
        {
          id: 'pf1',
          question: 'What is the probability of rolling a 6 on a fair six-sided die?',
          options: ['1/6', '1/5', '1/4', '1/3'],
          correctAnswer: 0,
          explanation: 'There is one favorable outcome (rolling a 6) out of six possible outcomes, so P(6) = 1/6.',
          concept: 'Basic Probability'
        },
        {
          id: 'pf2',
          question: 'What is the probability of getting heads on a fair coin toss?',
          options: ['0.25', '0.5', '0.75', '1.0'],
          correctAnswer: 1,
          explanation: 'A fair coin has two equally likely outcomes: heads or tails. Therefore, P(heads) = 1/2 = 0.5.',
          concept: 'Fair Coin Probability'
        },
        {
          id: 'pf3',
          question: 'If events A and B are mutually exclusive, what is P(A and B)?',
          options: ['P(A) + P(B)', 'P(A) × P(B)', '0', '1'],
          correctAnswer: 2,
          explanation: 'Mutually exclusive events cannot occur at the same time, so P(A and B) = 0.',
          concept: 'Mutually Exclusive Events'
        },
        {
          id: 'pf4',
          question: 'What is the complement rule in probability?',
          options: ['P(A) = 1 - P(not A)', 'P(not A) = 1 - P(A)', 'P(A) = P(not A)', 'P(A) + P(not A) = 2'],
          correctAnswer: 1,
          explanation: 'The complement rule states that P(not A) = 1 - P(A), since the probabilities of an event and its complement must sum to 1.',
          concept: 'Complement Rule'
        },
        {
          id: 'pf5',
          question: 'If you draw a card from a standard deck, what is the probability of drawing a red card?',
          options: ['1/4', '1/3', '1/2', '2/3'],
          correctAnswer: 2,
          explanation: 'A standard deck has 52 cards: 26 red (hearts and diamonds) and 26 black. P(red) = 26/52 = 1/2.',
          concept: 'Classical Probability'
        },
        {
          id: 'pf6',
          question: 'What does it mean for two events to be independent?',
          options: ['They cannot occur together', 'They must occur together', 'One event does not affect the probability of the other', 'They have equal probabilities'],
          correctAnswer: 2,
          explanation: 'Independent events are those where the occurrence of one event does not change the probability of the other event occurring.',
          concept: 'Independent Events'
        },
        {
          id: 'pf7',
          question: 'If P(A) = 0.3 and P(B) = 0.4, and A and B are independent, what is P(A and B)?',
          options: ['0.12', '0.7', '0.35', '0.1'],
          correctAnswer: 0,
          explanation: 'For independent events, P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12.',
          concept: 'Independent Events Multiplication'
        },
        {
          id: 'pf8',
          question: 'What is the probability of rolling an even number on a fair six-sided die?',
          options: ['1/3', '1/2', '2/3', '3/4'],
          correctAnswer: 1,
          explanation: 'Even numbers on a die are 2, 4, and 6. That\'s 3 favorable outcomes out of 6 possible, so P(even) = 3/6 = 1/2.',
          concept: 'Counting Favorable Outcomes'
        },
        {
          id: 'pf9',
          question: 'In a bag with 5 red balls and 3 blue balls, what is the probability of drawing a blue ball?',
          options: ['3/8', '3/5', '5/8', '5/3'],
          correctAnswer: 0,
          explanation: 'There are 3 blue balls out of 8 total balls (5 red + 3 blue), so P(blue) = 3/8.',
          concept: 'Basic Probability Calculation'
        },
        {
          id: 'pf10',
          question: 'What is the sum of all probabilities in a probability distribution?',
          options: ['0', '0.5', '1', 'It depends on the distribution'],
          correctAnswer: 2,
          explanation: 'The fundamental rule of probability distributions is that all probabilities must sum to 1, representing certainty that one of the outcomes will occur.',
          concept: 'Probability Distribution Properties'
        }
      ]
    },
    {
      id: 'hypothesis-testing',
      title: 'Hypothesis Testing',
      description: 'Understand the principles of hypothesis testing, p-values, and statistical significance.',
      difficulty: 'Intermediate',
      icon: Calculator,
      color: 'bg-purple-500',
      exercises: [
        {
          id: 'ht1',
          question: 'What is the null hypothesis typically designed to represent?',
          options: ['The research hypothesis', 'No effect or no difference', 'The alternative hypothesis', 'The experimental condition'],
          correctAnswer: 1,
          explanation: 'The null hypothesis (H₀) typically represents the status quo, no effect, or no difference between groups.',
          concept: 'Null Hypothesis'
        },
        {
          id: 'ht2',
          question: 'What does a p-value represent?',
          options: ['The probability that the null hypothesis is true', 'The probability of the alternative hypothesis', 'The probability of observing the data given the null hypothesis is true', 'The effect size'],
          correctAnswer: 2,
          explanation: 'A p-value is the probability of observing the data (or more extreme data) assuming the null hypothesis is true.',
          concept: 'P-value Definition'
        },
        {
          id: 'ht3',
          question: 'If α = 0.05 and p-value = 0.03, what should you conclude?',
          options: ['Accept the null hypothesis', 'Reject the null hypothesis', 'The test is inconclusive', 'Increase the sample size'],
          correctAnswer: 1,
          explanation: 'Since the p-value (0.03) is less than α (0.05), we reject the null hypothesis.',
          concept: 'Statistical Decision Making'
        },
        {
          id: 'ht4',
          question: 'What is a Type I error?',
          options: ['Accepting a false null hypothesis', 'Rejecting a true null hypothesis', 'Accepting a true null hypothesis', 'Rejecting a false null hypothesis'],
          correctAnswer: 1,
          explanation: 'A Type I error occurs when we reject a true null hypothesis. The probability of Type I error is α.',
          concept: 'Type I Error'
        },
        {
          id: 'ht5',
          question: 'What is statistical power?',
          options: ['The probability of Type I error', 'The probability of Type II error', 'The probability of correctly rejecting a false null hypothesis', 'The effect size'],
          correctAnswer: 2,
          explanation: 'Statistical power is the probability of correctly rejecting a false null hypothesis (1 - β, where β is the probability of Type II error).',
          concept: 'Statistical Power'
        },
        {
          id: 'ht6',
          question: 'What happens to the probability of Type I error if you decrease the significance level from 0.05 to 0.01?',
          options: ['It increases', 'It decreases', 'It stays the same', 'It becomes undefined'],
          correctAnswer: 1,
          explanation: 'Decreasing the significance level (α) from 0.05 to 0.01 decreases the probability of Type I error.',
          concept: 'Significance Level and Type I Error'
        },
        {
          id: 'ht7',
          question: 'In a two-tailed test with α = 0.05, what is the critical value region in each tail?',
          options: ['0.05', '0.025', '0.01', '0.1'],
          correctAnswer: 1,
          explanation: 'In a two-tailed test, the significance level is split between both tails, so each tail contains α/2 = 0.05/2 = 0.025.',
          concept: 'Two-tailed Tests'
        },
        {
          id: 'ht8',
          question: 'What is the relationship between confidence intervals and hypothesis testing?',
          options: ['They are unrelated', 'If the null value is outside the confidence interval, reject H₀', 'If the null value is inside the confidence interval, reject H₀', 'Confidence intervals cannot be used for hypothesis testing'],
          correctAnswer: 1,
          explanation: 'If the null hypothesis value falls outside the confidence interval, we reject the null hypothesis.',
          concept: 'Confidence Intervals and Hypothesis Testing'
        },
        {
          id: 'ht9',
          question: 'What does it mean when a result is "statistically significant"?',
          options: ['The result is practically important', 'The p-value is less than α', 'The effect size is large', 'The sample size is adequate'],
          correctAnswer: 1,
          explanation: 'Statistical significance means the p-value is less than the predetermined significance level (α), leading to rejection of the null hypothesis.',
          concept: 'Statistical Significance'
        },
        {
          id: 'ht10',
          question: 'Which of the following can help increase statistical power?',
          options: ['Increasing sample size', 'Using a more reliable measurement', 'Increasing effect size', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Statistical power can be increased by: increasing sample size, reducing measurement error (more reliable measures), and having larger effect sizes.',
          concept: 'Factors Affecting Statistical Power'
        }
      ]
    },
    {
      id: 'regression-analysis',
      title: 'Regression Analysis',
      description: 'Explore linear regression, correlation, and interpretation of regression models.',
      difficulty: 'Intermediate',
      icon: TrendingUp,
      color: 'bg-orange-500',
      exercises: [
        {
          id: 'ra1',
          question: 'In the equation y = 2x + 5, what does the coefficient 2 represent?',
          options: ['The y-intercept', 'The slope', 'The correlation', 'The error term'],
          correctAnswer: 1,
          explanation: 'In the linear equation y = mx + b, the coefficient of x (here, 2) represents the slope, indicating the change in y for each unit change in x.',
          concept: 'Slope Interpretation'
        },
        {
          id: 'ra2',
          question: 'What does R² measure in regression analysis?',
          options: ['The correlation coefficient', 'The proportion of variance explained', 'The standard error', 'The significance level'],
          correctAnswer: 1,
          explanation: 'R² (coefficient of determination) measures the proportion of variance in the dependent variable that is explained by the independent variable(s).',
          concept: 'R-squared'
        },
        {
          id: 'ra3',
          question: 'If R² = 0.64, what percentage of variance is explained by the model?',
          options: ['64%', '36%', '0.64%', '80%'],
          correctAnswer: 0,
          explanation: 'R² is already expressed as a proportion, so R² = 0.64 means 64% of the variance is explained by the model.',
          concept: 'R-squared Interpretation'
        },
        {
          id: 'ra4',
          question: 'What is the range of possible values for the correlation coefficient (r)?',
          options: ['0 to 1', '-1 to 1', '0 to 100', '-100 to 100'],
          correctAnswer: 1,
          explanation: 'The correlation coefficient ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation), with 0 indicating no linear relationship.',
          concept: 'Correlation Coefficient Range'
        },
        {
          id: 'ra5',
          question: 'What does a correlation coefficient of -0.8 indicate?',
          options: ['Weak positive relationship', 'Strong positive relationship', 'Strong negative relationship', 'No relationship'],
          correctAnswer: 2,
          explanation: 'A correlation of -0.8 indicates a strong negative relationship, meaning as one variable increases, the other tends to decrease.',
          concept: 'Correlation Interpretation'
        },
        {
          id: 'ra6',
          question: 'What is the primary assumption about residuals in linear regression?',
          options: ['They should be normally distributed', 'They should be constant across all predicted values', 'They should be independent', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Key assumptions about residuals include: normality, homoscedasticity (constant variance), and independence.',
          concept: 'Regression Assumptions'
        },
        {
          id: 'ra7',
          question: 'What does it mean if there is multicollinearity in a regression model?',
          options: ['The residuals are correlated', 'The independent variables are highly correlated', 'The model fits poorly', 'The dependent variable is categorical'],
          correctAnswer: 1,
          explanation: 'Multicollinearity occurs when independent variables are highly correlated with each other, which can cause problems in regression analysis.',
          concept: 'Multicollinearity'
        },
        {
          id: 'ra8',
          question: 'In simple linear regression, what does the y-intercept represent?',
          options: ['The slope of the line', 'The value of y when x = 0', 'The correlation coefficient', 'The standard error'],
          correctAnswer: 1,
          explanation: 'The y-intercept is the predicted value of y when x equals zero.',
          concept: 'Y-intercept Interpretation'
        },
        {
          id: 'ra9',
          question: 'What is heteroscedasticity?',
          options: ['Equal variances of residuals', 'Unequal variances of residuals', 'Normal distribution of residuals', 'Linear relationship between variables'],
          correctAnswer: 1,
          explanation: 'Heteroscedasticity refers to unequal variances of residuals across different levels of predicted values, violating the homoscedasticity assumption.',
          concept: 'Heteroscedasticity'
        },
        {
          id: 'ra10',
          question: 'What does a standardized regression coefficient (beta) tell you?',
          options: ['The raw change in y for a unit change in x', 'The change in y (in standard deviations) for a one standard deviation change in x', 'The correlation between variables', 'The significance level'],
          correctAnswer: 1,
          explanation: 'Standardized coefficients (beta weights) indicate the change in the dependent variable (in standard deviations) for a one standard deviation change in the independent variable.',
          concept: 'Standardized Coefficients'
        }
      ]
    },
    {
      id: 'advanced-inference',
      title: 'Advanced Statistical Inference',
      description: 'Master complex statistical concepts including ANOVA, non-parametric tests, and advanced modeling.',
      difficulty: 'Advanced',
      icon: Trophy,
      color: 'bg-red-500',
      exercises: [
        {
          id: 'ai1',
          question: 'In a one-way ANOVA, what does the F-statistic represent?',
          options: ['Within-group variance / Between-group variance', 'Between-group variance / Within-group variance', 'Total variance / Error variance', 'Sample size / Number of groups'],
          correctAnswer: 1,
          explanation: 'The F-statistic in ANOVA is the ratio of between-group variance to within-group variance. A larger F indicates more difference between groups relative to within-group variation.',
          concept: 'ANOVA F-statistic'
        },
        {
          id: 'ai2',
          question: 'When should you use a non-parametric test instead of a parametric test?',
          options: ['When sample size is large', 'When data violates parametric assumptions', 'When you want more power', 'When variables are continuous'],
          correctAnswer: 1,
          explanation: 'Non-parametric tests are used when data violates assumptions of parametric tests, such as normality, equal variances, or when dealing with ordinal data.',
          concept: 'Non-parametric Tests'
        },
        {
          id: 'ai3',
          question: 'What is the non-parametric equivalent of the independent samples t-test?',
          options: ['Wilcoxon signed-rank test', 'Mann-Whitney U test', 'Kruskal-Wallis test', 'Chi-square test'],
          correctAnswer: 1,
          explanation: 'The Mann-Whitney U test (also called Wilcoxon rank-sum test) is the non-parametric equivalent of the independent samples t-test.',
          concept: 'Non-parametric Equivalents'
        },
        {
          id: 'ai4',
          question: 'In factorial ANOVA, what is an interaction effect?',
          options: ['The effect of one factor only', 'The combined effect of two factors that is different from their individual effects', 'The total effect of all factors', 'The error in the model'],
          correctAnswer: 1,
          explanation: 'An interaction effect occurs when the effect of one factor depends on the level of another factor - the combined effect is different from what you\'d expect from adding individual effects.',
          concept: 'Interaction Effects'
        },
        {
          id: 'ai5',
          question: 'What is the purpose of post-hoc tests in ANOVA?',
          options: ['To calculate the F-statistic', 'To determine which specific groups differ after finding a significant omnibus test', 'To test assumptions', 'To calculate effect sizes'],
          correctAnswer: 1,
          explanation: 'Post-hoc tests are conducted after a significant ANOVA to determine which specific group comparisons are significantly different while controlling for multiple comparisons.',
          concept: 'Post-hoc Tests'
        },
        {
          id: 'ai6',
          question: 'What does effect size measure?',
          options: ['Statistical significance', 'Practical significance', 'Sample size requirements', 'p-value magnitude'],
          correctAnswer: 1,
          explanation: 'Effect size measures the magnitude or practical significance of an effect, indicating how meaningful the difference is in real-world terms, not just statistical significance.',
          concept: 'Effect Size'
        },
        {
          id: 'ai7',
          question: 'In repeated measures ANOVA, what is sphericity?',
          options: ['The assumption that variances are equal across groups', 'The assumption that correlations between all pairs of repeated measures are equal', 'The assumption of normality', 'The assumption of independence'],
          correctAnswer: 1,
          explanation: 'Sphericity assumes that the variances of differences between all pairs of repeated measures are equal. Violation of sphericity affects the validity of F-tests.',
          concept: 'Sphericity Assumption'
        },
        {
          id: 'ai8',
          question: 'What is the Bonferroni correction used for?',
          options: ['Correcting for small sample sizes', 'Controlling Type I error when conducting multiple comparisons', 'Increasing statistical power', 'Correcting for non-normality'],
          correctAnswer: 1,
          explanation: 'The Bonferroni correction adjusts significance levels when conducting multiple statistical tests to control the family-wise error rate (overall Type I error).',
          concept: 'Multiple Comparisons Correction'
        },
        {
          id: 'ai9',
          question: 'What is bootstrapping in statistics?',
          options: ['A method for increasing sample size', 'A resampling technique for estimating sampling distributions', 'A way to transform non-normal data', 'A type of regression analysis'],
          correctAnswer: 1,
          explanation: 'Bootstrapping is a resampling method that involves repeatedly sampling with replacement from the original data to estimate the sampling distribution of a statistic.',
          concept: 'Bootstrapping'
        },
        {
          id: 'ai10',
          question: 'In logistic regression, what does the odds ratio represent?',
          options: ['The probability of success', 'The change in probability for a unit change in the predictor', 'The change in odds for a unit change in the predictor', 'The correlation between variables'],
          correctAnswer: 2,
          explanation: 'The odds ratio in logistic regression represents how much the odds of the outcome change for a one-unit increase in the predictor variable.',
          concept: 'Odds Ratio'
        }
      ]
    }
  ];

  const startExerciseSet = (set: ExerciseSet) => {
    setSelectedSet(set);
    setCurrentView('exercise');
    setCurrentExerciseIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const backToHub = () => {
    setCurrentView('hub');
    setSelectedSet(null);
    setCurrentExerciseIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const selectAnswer = (answerIndex: number) => {
    if (!selectedSet || showExplanation) return;

    const currentAnswer = answerIndex;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentExerciseIndex]: currentAnswer
    }));
    setShowExplanation(true);

    // Auto-advance to next question after showing explanation for 3 seconds
    setTimeout(() => {
      if (currentExerciseIndex < selectedSet.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        // Finished all questions, show results
        setCurrentView('results');
        const correctCount = selectedSet.exercises.filter((exercise, index) => 
          selectedAnswers[index] === exercise.correctAnswer || 
          (index === currentExerciseIndex && currentAnswer === exercise.correctAnswer)
        ).length;
        
        if (correctCount >= selectedSet.exercises.length * 0.8) {
          setCompletedSets(prev => new Set([...prev, selectedSet.id]));
        }
      }
    }, 3000);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentExerciseIndex(0);
    setCurrentView('exercise');
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  // Results view
  if (currentView === 'results' && selectedSet) {
    const score = Object.keys(selectedAnswers).length > 0 ? 
      selectedSet.exercises.filter((exercise, index) => 
        selectedAnswers[index] === exercise.correctAnswer
      ).length : 0;

    return (
      <div className="container-main section-padding space-section">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-8">
            <div className="mb-6">
              {score >= selectedSet.exercises.length * 0.8 ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <Target className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              )}
              
              <h1 className="text-title text-primary mb-4">Quiz Complete!</h1>
              <h2 className="text-subtitle text-secondary mb-6">{selectedSet.title}</h2>
            </div>

            <div className={`text-4xl font-bold mb-4 ${getScoreColor(score, selectedSet.exercises.length)}`}>
              {score}/{selectedSet.exercises.length}
            </div>
            <div className={`text-lg mb-6 ${getScoreColor(score, selectedSet.exercises.length)}`}>
              {Math.round((score / selectedSet.exercises.length) * 100)}% Correct
            </div>

            <div className="mb-8">
              {score >= selectedSet.exercises.length * 0.8 ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    🎉 Excellent work! You've mastered this topic.
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    Keep up the great progress in your statistical learning journey!
                  </p>
                </div>
              ) : score >= selectedSet.exercises.length * 0.6 ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    Good effort! You're making progress.
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                    Review the explanations and try again to improve your understanding.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    Keep practicing! Statistics takes time to master.
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    Review the concepts and explanations, then try the quiz again.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={resetExercise}
                className="btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={backToHub}
                className="btn-primary"
              >
                Back to Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exercise view - single question display
  if (currentView === 'exercise' && selectedSet) {
    const currentExercise = selectedSet.exercises[currentExerciseIndex];
    const isAnswered = selectedAnswers.hasOwnProperty(currentExerciseIndex);

    return (
      <div className="container-main section-padding space-section">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={backToHub}
            className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Practice Hub</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-primary">{selectedSet.title}</h1>
            <p className="text-sm text-muted">
              Question {currentExerciseIndex + 1} of {selectedSet.exercises.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-primary">Progress</h3>
            <span className="text-sm text-muted">
              {currentExerciseIndex + 1} / {selectedSet.exercises.length}
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / selectedSet.exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Question */}
        <div className="max-w-3xl mx-auto">
          <div className="card p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {currentExercise.concept}
                </span>
              </div>
            </div>
            
            <h2 className="text-xl font-medium text-primary mb-8">
              {currentExercise.question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {currentExercise.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => selectAnswer(optionIndex)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    showExplanation
                      ? optionIndex === currentExercise.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : selectedAnswers[currentExerciseIndex] === optionIndex
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-neutral-200 dark:border-neutral-700'
                      : selectedAnswers[currentExerciseIndex] === optionIndex
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
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
                    <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Show explanation */}
            {showExplanation && (
              <div className={`p-6 rounded-lg border-l-4 ${
                selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500'
              }`}>
                <div className="flex items-start space-x-3">
                  {selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-1" />
                  )}
                  <div>
                    <p className={`font-semibold text-lg mb-2 ${
                      selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className={`${
                      selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {currentExercise.explanation}
                    </p>
                    {selectedAnswers[currentExerciseIndex] !== currentExercise.correctAnswer && (
                      <p className="text-green-700 dark:text-green-300 mt-3 font-medium">
                        Correct answer: {String.fromCharCode(65 + currentExercise.correctAnswer)}. {currentExercise.options[currentExercise.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>

                {currentExerciseIndex < selectedSet.exercises.length - 1 && (
                  <div className="mt-4 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <span>Moving to next question...</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main section-padding space-section">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Statistical Learning Path</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Master statistics through interactive practice exercises. Progress from basic concepts to advanced statistical inference with step-by-step guidance.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-subtitle text-primary">Learning Progress</h3>
          <span className="text-sm text-muted">
            {completedSets.size} / {exerciseSets.length} sets completed
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedSets.size / exerciseSets.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted mt-2">
          Complete practice sets by scoring 80% or higher to unlock your progress.
        </p>
      </div>

      {/* Exercise Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseSets.map((set) => {
          const IconComponent = set.icon;
          const isCompleted = completedSets.has(set.id);
          
          return (
            <div
              key={set.id}
              className={`card card-hover group relative overflow-hidden ${
                isCompleted ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              )}
              
              <div className="p-6 space-element">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${set.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(set.difficulty)}`}>
                    {set.difficulty}
                  </span>
                </div>
                
                <h3 className="text-subtitle text-primary mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {set.title}
                </h3>
                
                <p className="text-body text-secondary mb-4">
                  {set.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {set.exercises.length} questions
                  </span>
                  <button
                    onClick={() => startExerciseSet(set)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>{isCompleted ? 'Practice Again' : 'Start'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Tips */}
      <div className="card p-6 mt-8">
        <h3 className="text-subtitle text-primary mb-4">Learning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-body text-secondary">
          <div>
            <h4 className="font-medium text-primary mb-2">Practice Regularly</h4>
            <p className="text-sm">
              Consistent practice helps reinforce statistical concepts. Try to complete one exercise set per week.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Read Explanations</h4>
            <p className="text-sm">
              Each question includes detailed explanations. Review these carefully to understand the underlying concepts.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Progress Gradually</h4>
            <p className="text-sm">
              Start with beginner concepts and work your way up. Master the fundamentals before moving to advanced topics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalLearningPath;