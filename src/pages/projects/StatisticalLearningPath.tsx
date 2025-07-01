import React, { useState } from 'react';
import { GraduationCap, BookOpen, CheckCircle, XCircle, Eye, RotateCcw, TrendingUp, Clock } from 'lucide-react';

interface Question {
  id: number;
  type: 'multiple-choice' | 'numerical' | 'text';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
  realWorldContext: string;
}

const StatisticalLearningPath: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({});
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState<{ [key: number]: boolean }>({});
  const [sessionStarted, setSessionStarted] = useState(false);

  const exercises: Exercise[] = [
    // BEGINNER LEVEL EXERCISES
    {
      id: 1,
      title: "Descriptive Statistics Fundamentals",
      description: "Master the basics of describing data with measures of central tendency and variability",
      timeLimit: 25,
      difficulty: 'Beginner',
      realWorldContext: "Analyzing student test scores to understand class performance",
      questions: [
        {
          id: 1,
          type: 'numerical',
          question: "Given the dataset [85, 92, 78, 96, 89, 84, 91, 87], calculate the mean (round to 2 decimal places).",
          correctAnswer: 87.75,
          explanation: "Mean = (85+92+78+96+89+84+91+87)/8 = 702/8 = 87.75",
          hint: "Add all values and divide by the number of observations"
        },
        {
          id: 2,
          type: 'numerical',
          question: "For the same dataset [85, 92, 78, 96, 89, 84, 91, 87], find the median.",
          correctAnswer: 88,
          explanation: "Sorted: [78, 84, 85, 87, 89, 91, 92, 96]. Median = (87+89)/2 = 88",
          hint: "Sort the data first, then find the middle value(s)"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "Which measure of central tendency is most affected by outliers?",
          options: ["Mean", "Median", "Mode", "All equally"],
          correctAnswer: "Mean",
          explanation: "The mean is most sensitive to outliers because it uses all values in its calculation, while median only depends on middle values.",
          hint: "Think about which measure uses all data points in its calculation"
        },
        {
          id: 4,
          type: 'numerical',
          question: "Calculate the range for the dataset [85, 92, 78, 96, 89, 84, 91, 87].",
          correctAnswer: 18,
          explanation: "Range = Maximum - Minimum = 96 - 78 = 18",
          hint: "Range is the difference between the highest and lowest values"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "In a perfectly normal distribution, what percentage of data falls within one standard deviation of the mean?",
          options: ["68%", "95%", "99.7%", "50%"],
          correctAnswer: "68%",
          explanation: "This is part of the empirical rule (68-95-99.7 rule) for normal distributions.",
          hint: "This is known as the empirical rule or 68-95-99.7 rule"
        },
        {
          id: 6,
          type: 'numerical',
          question: "If a dataset has a mean of 100 and standard deviation of 15, what is the z-score for a value of 130?",
          correctAnswer: 2,
          explanation: "Z-score = (X - μ) / σ = (130 - 100) / 15 = 30/15 = 2",
          hint: "Z-score formula: (value - mean) / standard deviation"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "Which statement about the median is correct?",
          options: [
            "It's always equal to the mean",
            "It's the middle value when data is sorted",
            "It's the most frequently occurring value",
            "It's calculated by adding all values"
          ],
          correctAnswer: "It's the middle value when data is sorted",
          explanation: "The median is the middle value in a sorted dataset, making it resistant to outliers.",
          hint: "Think about what 'median' means in terms of position"
        },
        {
          id: 8,
          type: 'numerical',
          question: "For the dataset [10, 12, 15, 15, 18, 20, 22], what is the mode?",
          correctAnswer: 15,
          explanation: "The mode is 15 because it appears twice, more than any other value.",
          hint: "Mode is the value that appears most frequently"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "When is it most appropriate to use the median instead of the mean?",
          options: [
            "When data is normally distributed",
            "When there are outliers in the data",
            "When sample size is large",
            "When all values are the same"
          ],
          correctAnswer: "When there are outliers in the data",
          explanation: "Median is resistant to outliers and provides a better measure of central tendency when extreme values are present.",
          hint: "Consider which measure is resistant to extreme values"
        },
        {
          id: 10,
          type: 'numerical',
          question: "If Q1 = 25 and Q3 = 75, what is the Interquartile Range (IQR)?",
          correctAnswer: 50,
          explanation: "IQR = Q3 - Q1 = 75 - 25 = 50",
          hint: "IQR is the difference between the third and first quartiles"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "What does a coefficient of variation of 0.2 mean?",
          options: [
            "Standard deviation is 20% of the mean",
            "Mean is 20% of standard deviation",
            "Data has 20% outliers",
            "20% of data is missing"
          ],
          correctAnswer: "Standard deviation is 20% of the mean",
          explanation: "Coefficient of variation = (standard deviation / mean) × 100%. A CV of 0.2 means the standard deviation is 20% of the mean.",
          hint: "CV measures relative variability as a percentage of the mean"
        },
        {
          id: 12,
          type: 'numerical',
          question: "Given variance = 144, what is the standard deviation?",
          correctAnswer: 12,
          explanation: "Standard deviation = √variance = √144 = 12",
          hint: "Standard deviation is the square root of variance"
        }
      ]
    },
    {
      id: 2,
      title: "Probability and Distributions",
      description: "Understand probability concepts and common probability distributions",
      timeLimit: 30,
      difficulty: 'Beginner',
      realWorldContext: "Quality control in manufacturing and risk assessment",
      questions: [
        {
          id: 1,
          type: 'numerical',
          question: "A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. What is the probability of drawing a red marble? (Express as decimal to 2 places)",
          correctAnswer: 0.50,
          explanation: "P(Red) = Number of red marbles / Total marbles = 5/10 = 0.50",
          hint: "Probability = favorable outcomes / total outcomes"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "Two dice are rolled. What is the probability of getting a sum of 7?",
          options: ["1/36", "6/36", "1/6", "5/36"],
          correctAnswer: "6/36",
          explanation: "Combinations that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways out of 36 total",
          hint: "Count all the ways to get a sum of 7, then divide by total possible outcomes"
        },
        {
          id: 3,
          type: 'numerical',
          question: "If P(A) = 0.4 and P(B) = 0.3, and A and B are mutually exclusive events, what is P(A or B)?",
          correctAnswer: 0.7,
          explanation: "For mutually exclusive events: P(A or B) = P(A) + P(B) = 0.4 + 0.3 = 0.7",
          hint: "Mutually exclusive means the events cannot happen at the same time"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "In a normal distribution, approximately what percentage of data falls within 2 standard deviations of the mean?",
          options: ["68%", "95%", "99.7%", "50%"],
          correctAnswer: "95%",
          explanation: "This is the empirical rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ",
          hint: "Remember the 68-95-99.7 rule for normal distributions"
        },
        {
          id: 5,
          type: 'numerical',
          question: "A coin is flipped 4 times. What is the probability of getting exactly 2 heads? (Express as fraction in lowest terms, e.g., 3/8)",
          correctAnswer: "3/8",
          explanation: "Using binomial probability: C(4,2) × (1/2)² × (1/2)² = 6 × (1/16) = 6/16 = 3/8",
          hint: "Use the binomial probability formula with n=4, k=2, p=0.5"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "Which of the following is NOT a property of a probability distribution?",
          options: [
            "All probabilities are between 0 and 1",
            "Sum of all probabilities equals 1",
            "Mean equals median",
            "No negative probabilities"
          ],
          correctAnswer: "Mean equals median",
          explanation: "Mean equals median only in symmetric distributions. The other properties are fundamental requirements for any probability distribution.",
          hint: "Think about what must be true for ALL probability distributions"
        },
        {
          id: 7,
          type: 'numerical',
          question: "If X follows a normal distribution with μ = 50 and σ = 10, what is the probability that X is less than 40? (Use z-table: P(Z < -1) ≈ 0.16)",
          correctAnswer: 0.16,
          explanation: "Z = (40-50)/10 = -1. From z-table, P(Z < -1) ≈ 0.16",
          hint: "Convert to z-score first: z = (x - μ) / σ"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "In a Poisson distribution, what does λ (lambda) represent?",
          options: [
            "Standard deviation",
            "Variance",
            "Mean rate of occurrence",
            "Maximum value"
          ],
          correctAnswer: "Mean rate of occurrence",
          explanation: "In Poisson distribution, λ represents both the mean and variance, specifically the average rate of events in a given interval.",
          hint: "λ is the key parameter that defines the Poisson distribution"
        },
        {
          id: 9,
          type: 'numerical',
          question: "A factory produces items with a 2% defect rate. In a batch of 100 items, what is the expected number of defective items?",
          correctAnswer: 2,
          explanation: "Expected value = n × p = 100 × 0.02 = 2",
          hint: "Expected value for binomial = sample size × probability"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "Which distribution is most appropriate for modeling the number of customers arriving at a store per hour?",
          options: ["Normal", "Binomial", "Poisson", "Uniform"],
          correctAnswer: "Poisson",
          explanation: "Poisson distribution is used for counting events over time or space when events occur independently at a constant rate.",
          hint: "Think about distributions used for counting events over time"
        },
        {
          id: 11,
          type: 'numerical',
          question: "If P(A|B) = 0.8, P(B) = 0.3, what is P(A and B)?",
          correctAnswer: 0.24,
          explanation: "P(A and B) = P(A|B) × P(B) = 0.8 × 0.3 = 0.24",
          hint: "Use the conditional probability formula: P(A|B) = P(A and B) / P(B)"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "The Central Limit Theorem states that as sample size increases:",
          options: [
            "Population becomes normal",
            "Sample mean approaches population mean",
            "Sampling distribution of mean becomes normal",
            "Standard deviation decreases"
          ],
          correctAnswer: "Sampling distribution of mean becomes normal",
          explanation: "CLT states that sampling distribution of the sample mean approaches normality regardless of population distribution shape.",
          hint: "Focus on what happens to the distribution of sample means"
        }
      ]
    },
    {
      id: 3,
      title: "Data Visualization and Interpretation",
      description: "Learn to choose appropriate charts and interpret visual data representations",
      timeLimit: 20,
      difficulty: 'Beginner',
      realWorldContext: "Business reporting and data communication",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Which chart type is best for showing the relationship between two continuous variables?",
          options: ["Bar chart", "Pie chart", "Scatter plot", "Histogram"],
          correctAnswer: "Scatter plot",
          explanation: "Scatter plots are ideal for showing relationships between two continuous variables and identifying patterns or correlations.",
          hint: "Think about which chart shows points plotted against two axes"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "When should you use a histogram instead of a bar chart?",
          options: [
            "For categorical data",
            "For continuous data distribution",
            "For comparing groups",
            "For showing percentages"
          ],
          correctAnswer: "For continuous data distribution",
          explanation: "Histograms show the distribution of continuous data by grouping values into bins, while bar charts display categorical data.",
          hint: "Consider the type of data each chart is designed for"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "What does a box plot primarily show?",
          options: [
            "Mean and standard deviation",
            "Frequency distribution",
            "Five-number summary",
            "Correlation coefficient"
          ],
          correctAnswer: "Five-number summary",
          explanation: "Box plots display the five-number summary: minimum, Q1, median, Q3, and maximum, along with potential outliers.",
          hint: "Think about the quartiles and extremes shown in a box plot"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "In a scatter plot, what suggests a strong positive correlation?",
          options: [
            "Points randomly scattered",
            "Points forming a line from bottom-left to top-right",
            "Points forming a line from top-left to bottom-right",
            "Points forming a horizontal line"
          ],
          correctAnswer: "Points forming a line from bottom-left to top-right",
          explanation: "A strong positive correlation appears as points closely following an upward trend from left to right.",
          hint: "Positive correlation means as one variable increases, the other increases too"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "What is misleading about a pie chart with 10 categories?",
          options: [
            "Too many slices make comparison difficult",
            "Cannot show percentages",
            "Only works with positive numbers",
            "Requires equal-sized categories"
          ],
          correctAnswer: "Too many slices make comparison difficult",
          explanation: "Pie charts become hard to read and compare when they have too many categories. Bar charts are better for many categories.",
          hint: "Think about visual clarity and comparison ability"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "Which chart type best shows changes over time?",
          options: ["Scatter plot", "Line chart", "Bar chart", "Pie chart"],
          correctAnswer: "Line chart",
          explanation: "Line charts are specifically designed to show trends and changes over time by connecting data points chronologically.",
          hint: "Consider which chart connects points to show progression"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "What does a bimodal distribution look like in a histogram?",
          options: [
            "One peak in the center",
            "Two distinct peaks",
            "Flat with no peaks",
            "Continuously decreasing"
          ],
          correctAnswer: "Two distinct peaks",
          explanation: "A bimodal distribution has two modes, appearing as two distinct peaks in a histogram.",
          hint: "The prefix 'bi-' means two"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "In a box plot, what do the 'whiskers' represent?",
          options: [
            "Standard deviations",
            "Range to Q1 and Q3",
            "Extent of non-outlier data",
            "Confidence intervals"
          ],
          correctAnswer: "Extent of non-outlier data",
          explanation: "Whiskers extend to the furthest points that are not considered outliers, typically 1.5×IQR from the box edges.",
          hint: "Whiskers show how far the data extends beyond the box"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "What makes a chart misleading?",
          options: [
            "Using bright colors",
            "Starting y-axis at zero",
            "Truncated y-axis scale",
            "Including a legend"
          ],
          correctAnswer: "Truncated y-axis scale",
          explanation: "Truncated y-axis scales can exaggerate differences and mislead viewers about the magnitude of changes.",
          hint: "Think about what can distort the visual perception of data"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "Which chart is best for showing parts of a whole?",
          options: ["Line chart", "Scatter plot", "Pie chart", "Histogram"],
          correctAnswer: "Pie chart",
          explanation: "Pie charts are designed to show how parts make up a whole, with each slice representing a proportion of the total.",
          hint: "Think about which chart shows percentages of a total"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "What does a flat line in a time series chart indicate?",
          options: [
            "No data available",
            "No change over time",
            "Exponential growth",
            "High variability"
          ],
          correctAnswer: "No change over time",
          explanation: "A flat horizontal line indicates that the values remain constant over the time period shown.",
          hint: "Consider what a horizontal line means in terms of change"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "In comparing multiple groups, which chart type is most appropriate?",
          options: [
            "Pie chart",
            "Grouped bar chart",
            "Single histogram",
            "Line chart"
          ],
          correctAnswer: "Grouped bar chart",
          explanation: "Grouped (clustered) bar charts allow easy comparison of multiple groups across different categories.",
          hint: "Think about which chart allows side-by-side comparisons"
        }
      ]
    },
    {
      id: 4,
      title: "Sampling Methods and Bias",
      description: "Understand different sampling techniques and sources of bias in data collection",
      timeLimit: 25,
      difficulty: 'Beginner',
      realWorldContext: "Survey design and market research",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Which sampling method gives every member of the population an equal chance of being selected?",
          options: ["Convenience sampling", "Simple random sampling", "Stratified sampling", "Cluster sampling"],
          correctAnswer: "Simple random sampling",
          explanation: "Simple random sampling ensures each population member has an equal probability of selection, making it unbiased.",
          hint: "Look for the method that treats all population members equally"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "What is selection bias?",
          options: [
            "Choosing the wrong statistical test",
            "Systematic error in choosing participants",
            "Random measurement errors",
            "Using too small a sample size"
          ],
          correctAnswer: "Systematic error in choosing participants",
          explanation: "Selection bias occurs when the sample is not representative due to systematic differences in how participants are chosen.",
          hint: "Think about bias in the selection process itself"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "A researcher surveys people leaving a gym about exercise habits. What type of bias is this?",
          options: ["Response bias", "Selection bias", "Confirmation bias", "Measurement bias"],
          correctAnswer: "Selection bias",
          explanation: "This is selection bias because gym-goers are not representative of the general population regarding exercise habits.",
          hint: "Consider whether the sample represents the intended population"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "When should you use stratified sampling?",
          options: [
            "When population is homogeneous",
            "When you want to ensure representation of subgroups",
            "When sampling is expensive",
            "When population size is unknown"
          ],
          correctAnswer: "When you want to ensure representation of subgroups",
          explanation: "Stratified sampling divides the population into strata and samples from each to ensure all subgroups are represented.",
          hint: "Think about when you need specific subgroups represented"
        },
        {
          id: 5,
          type: 'numerical',
          question: "A population has 60% females and 40% males. In a stratified sample of 100 people, how many should be female?",
          correctAnswer: 60,
          explanation: "In stratified sampling, maintain population proportions: 60% of 100 = 60 females",
          hint: "Keep the same proportions as in the population"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "What is survivorship bias?",
          options: [
            "Only studying people who survived a treatment",
            "Bias toward older populations",
            "Only including successful cases in analysis",
            "Both A and C"
          ],
          correctAnswer: "Both A and C",
          explanation: "Survivorship bias occurs when analysis focuses only on successful outcomes or survivors, ignoring failures or non-survivors.",
          hint: "Think about what happens when you only look at 'winners'"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "Non-response bias occurs when:",
          options: [
            "Surveys are too long",
            "Some groups are less likely to respond",
            "Questions are poorly worded",
            "Sample size is too small"
          ],
          correctAnswer: "Some groups are less likely to respond",
          explanation: "Non-response bias happens when certain types of people systematically don't respond, making the sample unrepresentative.",
          hint: "Consider what happens when certain groups don't participate"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "Cluster sampling is most useful when:",
          options: [
            "Population is geographically dispersed",
            "You need exact proportions",
            "Population is very homogeneous",
            "You have unlimited resources"
          ],
          correctAnswer: "Population is geographically dispersed",
          explanation: "Cluster sampling is cost-effective for geographically spread populations by sampling entire clusters (like cities or schools).",
          hint: "Think about when it's expensive to reach individual members"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "Leading questions in surveys cause:",
          options: ["Selection bias", "Response bias", "Measurement bias", "Sampling bias"],
          correctAnswer: "Response bias",
          explanation: "Leading questions influence how people respond, creating response bias by steering answers in a particular direction.",
          hint: "Consider how the wording affects people's answers"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "What is the main advantage of systematic sampling?",
          options: [
            "Guarantees representativeness",
            "Easier to implement than random sampling",
            "Eliminates all bias",
            "Works with any sample size"
          ],
          correctAnswer: "Easier to implement than random sampling",
          explanation: "Systematic sampling (every nth item) is simpler to execute than true random sampling while still providing good coverage.",
          hint: "Think about practical implementation advantages"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Volunteer bias is a problem because:",
          options: [
            "Volunteers cost more money",
            "Volunteers may be systematically different",
            "Volunteers are unreliable",
            "Volunteers inflate sample size"
          ],
          correctAnswer: "Volunteers may be systematically different",
          explanation: "People who volunteer for studies may have different characteristics than non-volunteers, creating bias.",
          hint: "Consider whether volunteers represent the general population"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "The best way to minimize sampling bias is to:",
          options: [
            "Use a larger sample",
            "Use random sampling methods",
            "Survey more locations",
            "Ask more questions"
          ],
          correctAnswer: "Use random sampling methods",
          explanation: "Random sampling methods give each population member an equal chance of selection, minimizing systematic bias.",
          hint: "Focus on the fundamental principle of unbiased selection"
        }
      ]
    },
    {
      id: 5,
      title: "Measures of Variability",
      description: "Understand how data spreads and varies around central values",
      timeLimit: 30,
      difficulty: 'Beginner',
      realWorldContext: "Quality control and process improvement",
      questions: [
        {
          id: 1,
          type: 'numerical',
          question: "For the dataset [4, 6, 8, 10, 12], calculate the variance (population variance).",
          correctAnswer: 8,
          explanation: "Mean = 8. Variance = [(4-8)² + (6-8)² + (8-8)² + (10-8)² + (12-8)²] / 5 = [16+4+0+4+16] / 5 = 8",
          hint: "Variance = average of squared deviations from the mean"
        },
        {
          id: 2,
          type: 'numerical',
          question: "If the variance is 25, what is the standard deviation?",
          correctAnswer: 5,
          explanation: "Standard deviation = √variance = √25 = 5",
          hint: "Standard deviation is the square root of variance"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "Which measure of variability is in the same units as the original data?",
          options: ["Variance", "Range", "Standard deviation", "Both B and C"],
          correctAnswer: "Both B and C",
          explanation: "Range and standard deviation are in original units, while variance is in squared units.",
          hint: "Think about which measures don't involve squaring"
        },
        {
          id: 4,
          type: 'numerical',
          question: "For scores [70, 75, 80, 85, 90], what is the range?",
          correctAnswer: 20,
          explanation: "Range = Maximum - Minimum = 90 - 70 = 20",
          hint: "Range is the difference between highest and lowest values"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "Why is standard deviation preferred over variance for interpretation?",
          options: [
            "It's easier to calculate",
            "It's in the same units as the data",
            "It's always smaller",
            "It can't be negative"
          ],
          correctAnswer: "It's in the same units as the data",
          explanation: "Standard deviation is the square root of variance, bringing it back to the original units for easier interpretation.",
          hint: "Consider the units of measurement"
        },
        {
          id: 6,
          type: 'numerical',
          question: "If Q1 = 30 and Q3 = 50, what is the interquartile range (IQR)?",
          correctAnswer: 20,
          explanation: "IQR = Q3 - Q1 = 50 - 30 = 20",
          hint: "IQR is the difference between the 75th and 25th percentiles"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "The coefficient of variation is useful for:",
          options: [
            "Comparing variability between datasets with different means",
            "Finding outliers",
            "Calculating percentiles",
            "Determining sample size"
          ],
          correctAnswer: "Comparing variability between datasets with different means",
          explanation: "CV = (std dev / mean) × 100% allows comparison of relative variability across different scales.",
          hint: "Think about comparing relative variability"
        },
        {
          id: 8,
          type: 'numerical',
          question: "A dataset has mean = 40 and standard deviation = 8. What is the coefficient of variation? (Express as percentage)",
          correctAnswer: 20,
          explanation: "CV = (standard deviation / mean) × 100% = (8/40) × 100% = 20%",
          hint: "CV = (std dev / mean) × 100%"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "Which measure of variability is most affected by outliers?",
          options: ["Range", "IQR", "Standard deviation", "All equally"],
          correctAnswer: "Range",
          explanation: "Range uses only extreme values, so a single outlier can dramatically change it. IQR is resistant to outliers.",
          hint: "Consider which measure depends on extreme values"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "When comparing two datasets, what does a larger standard deviation indicate?",
          options: [
            "Higher mean",
            "More spread out data",
            "More outliers",
            "Larger sample size"
          ],
          correctAnswer: "More spread out data",
          explanation: "Standard deviation measures how spread out data points are from the mean. Larger SD means more variability.",
          hint: "Standard deviation measures spread or dispersion"
        },
        {
          id: 11,
          type: 'numerical',
          question: "In a normal distribution with mean = 100 and SD = 15, what percentage of data falls between 85 and 115?",
          correctAnswer: 68,
          explanation: "85 and 115 are exactly 1 standard deviation below and above the mean. By the empirical rule, 68% of data falls within 1 SD.",
          hint: "Use the empirical rule (68-95-99.7)"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "Sample variance uses (n-1) in the denominator instead of n because:",
          options: [
            "It makes calculation easier",
            "It provides an unbiased estimate",
            "It gives a larger value",
            "It's a mathematical convention"
          ],
          correctAnswer: "It provides an unbiased estimate",
          explanation: "Using (n-1) corrects for the bias that occurs when estimating population variance from a sample (Bessel's correction).",
          hint: "This is called Bessel's correction and relates to bias"
        }
      ]
    },
    {
      id: 6,
      title: "Introduction to Hypothesis Testing",
      description: "Learn the fundamental concepts of statistical hypothesis testing",
      timeLimit: 35,
      difficulty: 'Beginner',
      realWorldContext: "Medical research and A/B testing",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "What is the null hypothesis in hypothesis testing?",
          options: [
            "The hypothesis we want to prove",
            "The hypothesis of no effect or difference",
            "The alternative to our main hypothesis",
            "The hypothesis about the sample"
          ],
          correctAnswer: "The hypothesis of no effect or difference",
          explanation: "The null hypothesis (H₀) typically states that there is no effect, no difference, or no relationship - the status quo.",
          hint: "Think about what 'null' means - nothing or no effect"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "What does a p-value represent?",
          options: [
            "Probability that the null hypothesis is true",
            "Probability of observing results at least as extreme, given H₀ is true",
            "Probability that the alternative hypothesis is true",
            "Percentage of the population in the sample"
          ],
          correctAnswer: "Probability of observing results at least as extreme, given H₀ is true",
          explanation: "P-value is the probability of getting results as extreme or more extreme than observed, assuming the null hypothesis is true.",
          hint: "P-value is about the probability of the data, given the null hypothesis"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "If p-value = 0.03 and α = 0.05, what should you conclude?",
          options: [
            "Accept the null hypothesis",
            "Reject the null hypothesis",
            "Need more data",
            "The test is invalid"
          ],
          correctAnswer: "Reject the null hypothesis",
          explanation: "When p-value < α, we reject the null hypothesis. Here 0.03 < 0.05, so we reject H₀.",
          hint: "Compare p-value to significance level α"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "What is a Type I error?",
          options: [
            "Accepting a false null hypothesis",
            "Rejecting a true null hypothesis",
            "Using the wrong test",
            "Having too small a sample"
          ],
          correctAnswer: "Rejecting a true null hypothesis",
          explanation: "Type I error occurs when we reject the null hypothesis when it's actually true (false positive).",
          hint: "Type I = rejecting truth (false positive)"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "What is a Type II error?",
          options: [
            "Rejecting a true null hypothesis",
            "Accepting a false null hypothesis",
            "Using wrong significance level",
            "Sampling error"
          ],
          correctAnswer: "Accepting a false null hypothesis",
          explanation: "Type II error occurs when we fail to reject (accept) the null hypothesis when it's actually false (false negative).",
          hint: "Type II = accepting falsehood (false negative)"
        },
        {
          id: 6,
          type: 'numerical',
          question: "If the significance level α = 0.05, what is the probability of making a Type I error?",
          correctAnswer: 0.05,
          explanation: "The significance level α directly represents the probability of Type I error - rejecting a true null hypothesis.",
          hint: "Alpha is the probability of Type I error"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "What does statistical power represent?",
          options: [
            "Probability of Type I error",
            "Probability of correctly rejecting false H₀",
            "Sample size needed",
            "Effect size"
          ],
          correctAnswer: "Probability of correctly rejecting false H₀",
          explanation: "Statistical power = 1 - β = probability of correctly rejecting the null hypothesis when it's false.",
          hint: "Power is about detecting true effects"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "Which factor increases statistical power?",
          options: [
            "Smaller sample size",
            "Larger effect size",
            "Higher α level",
            "Both B and C"
          ],
          correctAnswer: "Both B and C",
          explanation: "Power increases with larger effect sizes (easier to detect) and higher α levels (more lenient criteria), as well as larger samples.",
          hint: "Think about what makes effects easier to detect"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "What is the most common significance level used in research?",
          options: ["0.01", "0.05", "0.10", "0.20"],
          correctAnswer: "0.05",
          explanation: "α = 0.05 (5%) is the conventional significance level in most fields, representing a 5% chance of Type I error.",
          hint: "This is the standard convention in most research"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "A one-tailed test is used when:",
          options: [
            "We predict direction of the effect",
            "We have a small sample",
            "We want more power",
            "Both A and C"
          ],
          correctAnswer: "Both A and C",
          explanation: "One-tailed tests are used when we predict the direction of effect and provide more power for detecting effects in that direction.",
          hint: "Consider when you'd look in only one direction"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "What does 'statistically significant' mean?",
          options: [
            "The result is important",
            "The effect is large",
            "p-value < α",
            "The study is well-designed"
          ],
          correctAnswer: "p-value < α",
          explanation: "Statistical significance simply means the p-value is less than the chosen significance level, not that the result is practically important.",
          hint: "Focus on the mathematical criterion, not practical importance"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "Why might a statistically significant result not be practically significant?",
          options: [
            "The p-value is too small",
            "The effect size is very small",
            "The sample is too large",
            "Both B and C"
          ],
          correctAnswer: "Both B and C",
          explanation: "With very large samples, even tiny (practically unimportant) effects can be statistically significant. Always consider effect size.",
          hint: "Think about the difference between statistical and practical importance"
        }
      ]
    },

    // INTERMEDIATE LEVEL EXERCISES
    {
      id: 7,
      title: "T-Tests and Comparing Means",
      description: "Master different types of t-tests for comparing means between groups",
      timeLimit: 40,
      difficulty: 'Intermediate',
      realWorldContext: "Comparing treatment effectiveness and group differences",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "When should you use a one-sample t-test?",
          options: [
            "Comparing two groups",
            "Comparing sample mean to known population value",
            "Testing correlation",
            "Comparing variances"
          ],
          correctAnswer: "Comparing sample mean to known population value",
          explanation: "One-sample t-test compares a sample mean to a hypothesized population mean when population SD is unknown.",
          hint: "One sample vs. one known value"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "What assumption is required for t-tests?",
          options: [
            "Large sample size",
            "Known population variance",
            "Approximately normal distribution",
            "Equal group sizes"
          ],
          correctAnswer: "Approximately normal distribution",
          explanation: "T-tests assume the data (or residuals) are approximately normally distributed, especially important for small samples.",
          hint: "Think about distribution shape assumptions"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "For a two-sample t-test comparing groups with sample sizes n₁=15 and n₂=20, what are the degrees of freedom (assuming equal variances)?",
          options: ["33", "34", "35", "19"],
          correctAnswer: "33",
          explanation: "df = n₁ + n₂ - 2 = 15 + 20 - 2 = 33 for pooled variance t-test",
          hint: "df = total sample size minus 2"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "When should you use a paired t-test instead of a two-sample t-test?",
          options: [
            "When sample sizes are different",
            "When observations are related/matched",
            "When variances are unequal",
            "When you have more than two groups"
          ],
          correctAnswer: "When observations are related/matched",
          explanation: "Paired t-tests are used when observations are naturally paired (before/after, matched subjects, etc.).",
          hint: "Think about when observations are connected"
        },
        {
          id: 5,
          type: 'numerical',
          question: "A sample of 25 students has a mean score of 78 and SD of 12. Test if the mean differs from 75. What is the t-statistic? (Round to 2 decimal places)",
          correctAnswer: 1.25,
          explanation: "t = (x̄ - μ₀)/(s/√n) = (78-75)/(12/√25) = 3/(12/5) = 3/2.4 = 1.25",
          hint: "Use the one-sample t-test formula"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "What does the p-value tell you in a t-test?",
          options: [
            "The probability the null hypothesis is true",
            "The probability of getting this result if H₀ is true",
            "The size of the difference between groups",
            "The confidence in your conclusion"
          ],
          correctAnswer: "The probability of getting this result if H₀ is true",
          explanation: "P-value represents the probability of observing a t-statistic as extreme or more extreme, assuming the null hypothesis is true.",
          hint: "P-value is about the probability of the data given H₀"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "Welch's t-test is used when:",
          options: [
            "Sample sizes are equal",
            "Variances are unequal",
            "Data is not normal",
            "You have paired data"
          ],
          correctAnswer: "Variances are unequal",
          explanation: "Welch's t-test (unequal variances t-test) is used when the assumption of equal variances is violated.",
          hint: "This test handles unequal variances"
        },
        {
          id: 8,
          type: 'numerical',
          question: "In a paired t-test with 20 pairs, what are the degrees of freedom?",
          correctAnswer: 19,
          explanation: "For paired t-test, df = n - 1 = 20 - 1 = 19 (n is the number of pairs)",
          hint: "Paired t-test df = number of pairs minus 1"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "A t-statistic of 2.5 with df=20 gives approximately what p-value for a two-tailed test?",
          options: ["0.01", "0.02", "0.05", "0.10"],
          correctAnswer: "0.02",
          explanation: "With df=20, a t-statistic of 2.5 corresponds to a two-tailed p-value of approximately 0.02.",
          hint: "Use t-table or remember that larger |t| means smaller p-value"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "What increases the power of a t-test?",
          options: [
            "Larger effect size",
            "Larger sample size", 
            "Less variability in data",
            "All of the above"
          ],
          correctAnswer: "All of the above",
          explanation: "Power increases with larger effects (easier to detect), larger samples (more precision), and less noise (clearer signal).",
          hint: "Think about what makes differences easier to detect"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Cohen's d is used to measure:",
          options: [
            "Statistical significance",
            "Effect size",
            "Sample size adequacy",
            "Type I error rate"
          ],
          correctAnswer: "Effect size",
          explanation: "Cohen's d measures effect size - the standardized difference between means, independent of sample size.",
          hint: "This measures the magnitude of difference"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "A Cohen's d of 0.8 represents:",
          options: [
            "Small effect",
            "Medium effect", 
            "Large effect",
            "No effect"
          ],
          correctAnswer: "Large effect",
          explanation: "Cohen's conventions: d = 0.2 (small), 0.5 (medium), 0.8 (large effect size).",
          hint: "Remember Cohen's effect size conventions"
        },
        {
          id: 13,
          type: 'multiple-choice',
          question: "When comparing before/after measurements on the same individuals, you should use:",
          options: [
            "One-sample t-test",
            "Two-sample t-test",
            "Paired t-test",
            "ANOVA"
          ],
          correctAnswer: "Paired t-test",
          explanation: "Paired t-test is appropriate for before/after comparisons on the same subjects because the measurements are dependent.",
          hint: "Same individuals = paired/dependent data"
        },
        {
          id: 14,
          type: 'multiple-choice',
          question: "What happens to the t-distribution as degrees of freedom increase?",
          options: [
            "Becomes more skewed",
            "Approaches normal distribution",
            "Becomes more variable",
            "Mean changes"
          ],
          correctAnswer: "Approaches normal distribution",
          explanation: "As df increases, the t-distribution converges to the standard normal distribution (mean=0, sd=1).",
          hint: "Think about what happens with larger samples"
        }
      ]
    },
    {
      id: 8,
      title: "Correlation and Association",
      description: "Analyze relationships between variables using correlation coefficients",
      timeLimit: 35,
      difficulty: 'Intermediate',
      realWorldContext: "Financial analysis and behavioral research",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Pearson correlation coefficient measures:",
          options: [
            "Any type of relationship",
            "Linear relationship strength",
            "Causal relationship",
            "Non-linear patterns"
          ],
          correctAnswer: "Linear relationship strength",
          explanation: "Pearson's r specifically measures the strength and direction of linear relationships between two continuous variables.",
          hint: "Focus on the type of relationship Pearson correlation detects"
        },
        {
          id: 2,
          type: 'numerical',
          question: "What is the range of possible values for Pearson correlation coefficient r?",
          correctAnswer: "-1 to 1",
          explanation: "Pearson correlation ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation), with 0 indicating no linear relationship.",
          hint: "Think about the extremes: perfect negative and perfect positive correlation"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "A correlation of r = -0.85 indicates:",
          options: [
            "Strong positive relationship",
            "Strong negative relationship",
            "Weak relationship",
            "No relationship"
          ],
          correctAnswer: "Strong negative relationship",
          explanation: "r = -0.85 indicates a strong negative linear relationship (as one variable increases, the other decreases).",
          hint: "Consider both magnitude (0.85) and direction (negative)"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "Which statement about correlation is FALSE?",
          options: [
            "Correlation implies causation",
            "Correlation measures linear relationship",
            "Correlation is unitless",
            "Correlation can be positive or negative"
          ],
          correctAnswer: "Correlation implies causation",
          explanation: "Correlation does NOT imply causation. Two variables can be correlated due to confounding factors or coincidence.",
          hint: "Remember the fundamental rule about correlation and causation"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "When should you use Spearman's rank correlation instead of Pearson's?",
          options: [
            "When data is normally distributed",
            "When relationship is non-linear or data is ordinal",
            "When sample size is large",
            "When variables are independent"
          ],
          correctAnswer: "When relationship is non-linear or data is ordinal",
          explanation: "Spearman's correlation works with ranks, making it suitable for ordinal data or non-linear monotonic relationships.",
          hint: "Spearman works with ranks rather than raw values"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "An r² value of 0.64 means:",
          options: [
            "64% correlation",
            "64% of variance in Y is explained by X",
            "36% error rate",
            "The correlation is 0.64"
          ],
          correctAnswer: "64% of variance in Y is explained by X",
          explanation: "r² (coefficient of determination) represents the proportion of variance in the dependent variable explained by the independent variable.",
          hint: "r² is about explained variance"
        },
        {
          id: 7,
          type: 'numerical',
          question: "If the correlation between height and weight is r = 0.8, what is the coefficient of determination? (Express as decimal)",
          correctAnswer: 0.64,
          explanation: "r² = (0.8)² = 0.64. This means 64% of variance in weight is explained by height.",
          hint: "Square the correlation coefficient"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "What can cause a spurious correlation?",
          options: [
            "Large sample size",
            "Third variable influencing both variables",
            "Normal distribution",
            "Linear relationship"
          ],
          correctAnswer: "Third variable influencing both variables",
          explanation: "Spurious correlations occur when a third variable (confounding variable) influences both measured variables, creating apparent correlation.",
          hint: "Think about hidden factors that could affect both variables"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "The correlation between ice cream sales and drowning deaths is positive. This is likely because:",
          options: [
            "Ice cream causes drowning",
            "Drowning causes ice cream purchases",
            "Both increase in summer (confounding variable)",
            "Random coincidence"
          ],
          correctAnswer: "Both increase in summer (confounding variable)",
          explanation: "Temperature/season is a confounding variable that increases both ice cream sales and swimming activity (thus drowning risk).",
          hint: "Look for a common cause affecting both variables"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "What does a correlation of r = 0 indicate?",
          options: [
            "No relationship of any kind",
            "No linear relationship",
            "Perfect relationship",
            "Measurement error"
          ],
          correctAnswer: "No linear relationship",
          explanation: "r = 0 indicates no linear relationship, but there could still be non-linear relationships between the variables.",
          hint: "Pearson correlation only detects linear relationships"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Which factor does NOT affect the correlation coefficient?",
          options: [
            "Outliers",
            "Scale of measurement",
            "Linear transformation",
            "Units of measurement"
          ],
          correctAnswer: "Units of measurement",
          explanation: "Correlation is unitless and unaffected by units. However, outliers and non-linear transformations can affect correlation.",
          hint: "Correlation is a standardized measure"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "To test if a correlation is significantly different from zero, you would:",
          options: [
            "Use a t-test",
            "Calculate confidence interval",
            "Use chi-square test",
            "Both A and B"
          ],
          correctAnswer: "Both A and B",
          explanation: "You can test correlation significance using a t-test or by examining if zero falls within the confidence interval for r.",
          hint: "Think about testing if r is significantly different from 0"
        }
      ]
    },
    {
      id: 9,
      title: "Confidence Intervals",
      description: "Understand and calculate confidence intervals for various parameters",
      timeLimit: 40,
      difficulty: 'Intermediate',
      realWorldContext: "Political polling and market research accuracy",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "A 95% confidence interval means:",
          options: [
            "95% probability the true parameter is in the interval",
            "95% of samples will produce intervals containing the true parameter",
            "95% of the data falls in the interval",
            "95% confidence in the sample"
          ],
          correctAnswer: "95% of samples will produce intervals containing the true parameter",
          explanation: "95% CI means that if we repeated the sampling process many times, 95% of the resulting intervals would contain the true parameter.",
          hint: "Think about what happens if you repeat the study many times"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "What happens to a confidence interval when you increase the confidence level from 95% to 99%?",
          options: [
            "Gets narrower",
            "Gets wider",
            "Stays the same",
            "Becomes more accurate"
          ],
          correctAnswer: "Gets wider",
          explanation: "Higher confidence requires a wider interval to be more certain of capturing the true parameter.",
          hint: "Higher confidence = need to cast a wider net"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "What happens to the width of a confidence interval when sample size increases?",
          options: [
            "Gets wider",
            "Gets narrower", 
            "Stays the same",
            "Becomes unreliable"
          ],
          correctAnswer: "Gets narrower",
          explanation: "Larger samples provide more precise estimates, resulting in narrower confidence intervals.",
          hint: "More data = more precision"
        },
        {
          id: 4,
          type: 'numerical',
          question: "For a 95% confidence interval, what is the critical z-value? (Round to 2 decimal places)",
          correctAnswer: 1.96,
          explanation: "For 95% CI, α = 0.05, so α/2 = 0.025. The critical z-value is 1.96.",
          hint: "This is a standard value you should memorize"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "When should you use a t-distribution instead of z-distribution for confidence intervals?",
          options: [
            "When sample size is small and σ is unknown",
            "When data is not normal",
            "When you want higher confidence",
            "When dealing with proportions"
          ],
          correctAnswer: "When sample size is small and σ is unknown",
          explanation: "Use t-distribution when population standard deviation is unknown and sample size is small (typically n < 30).",
          hint: "Think about when you don't know the population standard deviation"
        },
        {
          id: 6,
          type: 'numerical',
          question: "A sample of 100 people has mean income $50,000 and SD $15,000. What is the margin of error for a 95% CI? (Round to nearest dollar)",
          correctAnswer: 2940,
          explanation: "Margin of error = 1.96 × (15000/√100) = 1.96 × 1500 = 2940",
          hint: "Margin of error = critical value × standard error"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "A confidence interval for a proportion requires:",
          options: [
            "Normal approximation conditions",
            "At least 5 successes and 5 failures",
            "Random sampling",
            "All of the above"
          ],
          correctAnswer: "All of the above",
          explanation: "Proportion CIs need random sampling, sufficient sample size (np ≥ 5, n(1-p) ≥ 5), and normal approximation validity.",
          hint: "Think about all the assumptions needed"
        },
        {
          id: 8,
          type: 'numerical',
          question: "In a survey of 400 voters, 240 support a candidate. What is the sample proportion? (Express as decimal to 2 places)",
          correctAnswer: 0.60,
          explanation: "Sample proportion p̂ = 240/400 = 0.60",
          hint: "Proportion = successes / total sample size"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "If a 95% CI for mean weight is [150, 170] pounds, what can you conclude?",
          options: [
            "The sample mean is definitely 160 pounds",
            "95% of people weigh between 150-170 pounds",
            "We're 95% confident the true mean is between 150-170",
            "The margin of error is 160 pounds"
          ],
          correctAnswer: "We're 95% confident the true mean is between 150-170",
          explanation: "The CI provides a range of plausible values for the population parameter with specified confidence.",
          hint: "CI is about the population parameter, not individual values"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "What does NOT affect the width of a confidence interval?",
          options: [
            "Sample size",
            "Confidence level",
            "Population variability",
            "Population size (when large)"
          ],
          correctAnswer: "Population size (when large)",
          explanation: "For large populations, the population size doesn't affect CI width. Width depends on sample size, confidence level, and variability.",
          hint: "Think about what goes into the margin of error formula"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "A political poll reports 52% ± 3% support. This means:",
          options: [
            "Support is exactly 52%",
            "Support is between 49% and 55%",
            "The poll is 3% accurate",
            "52% of people were polled"
          ],
          correctAnswer: "Support is between 49% and 55%",
          explanation: "The ± 3% represents the margin of error, so the confidence interval is 52% - 3% to 52% + 3% = 49% to 55%.",
          hint: "± represents the margin of error"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "To halve the width of a confidence interval, you need to:",
          options: [
            "Double the sample size",
            "Quadruple the sample size",
            "Halve the sample size",
            "Reduce confidence level by half"
          ],
          correctAnswer: "Quadruple the sample size",
          explanation: "Since margin of error ∝ 1/√n, to halve the margin of error (and interval width), you need 4 times the sample size.",
          hint: "Think about the relationship between sample size and standard error"
        }
      ]
    },
    {
      id: 10,
      title: "Chi-Square Tests",
      description: "Test relationships and goodness of fit using chi-square statistics",
      timeLimit: 45,
      difficulty: 'Intermediate',
      realWorldContext: "Market research and genetics studies",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Chi-square tests are used for:",
          options: [
            "Continuous variables only",
            "Categorical variables only",
            "Testing means",
            "Measuring correlation"
          ],
          correctAnswer: "Categorical variables only",
          explanation: "Chi-square tests are specifically designed for categorical (nominal or ordinal) data, not continuous variables.",
          hint: "Think about the type of data chi-square works with"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "The chi-square goodness of fit test compares:",
          options: [
            "Observed vs expected frequencies",
            "Two sample means",
            "Sample correlation to zero",
            "Two sample proportions"
          ],
          correctAnswer: "Observed vs expected frequencies",
          explanation: "Goodness of fit tests whether observed frequencies match expected frequencies under a hypothesized distribution.",
          hint: "Think about what 'goodness of fit' means"
        },
        {
          id: 3,
          type: 'numerical',
          question: "For a 2×3 contingency table, what are the degrees of freedom for a chi-square test of independence?",
          correctAnswer: 2,
          explanation: "df = (rows - 1) × (columns - 1) = (2-1) × (3-1) = 1 × 2 = 2",
          hint: "df = (r-1) × (c-1) for contingency tables"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "What assumption is required for chi-square tests?",
          options: [
            "Normal distribution",
            "Expected frequency ≥ 5 in each cell",
            "Equal sample sizes",
            "Continuous data"
          ],
          correctAnswer: "Expected frequency ≥ 5 in each cell",
          explanation: "Chi-square tests require expected frequencies of at least 5 in each cell for the approximation to be valid.",
          hint: "Think about minimum expected counts needed"
        },
        {
          id: 5,
          type: 'numerical',
          question: "If observed frequency = 20 and expected frequency = 15, what is the contribution to chi-square for this cell?",
          correctAnswer: 1.67,
          explanation: "χ² contribution = (O-E)²/E = (20-15)²/15 = 25/15 = 1.67",
          hint: "Use the chi-square formula: (O-E)²/E"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "A chi-square test of independence tests whether:",
          options: [
            "Two variables are independent",
            "Sample represents population",
            "Means are different",
            "Variance is constant"
          ],
          correctAnswer: "Two variables are independent",
          explanation: "Test of independence determines if two categorical variables are related or independent of each other.",
          hint: "Focus on the relationship between two variables"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "In a 2×2 contingency table, if chi-square = 4.5 and α = 0.05, what do you conclude?",
          options: [
            "Variables are independent",
            "Variables are dependent",
            "Need more data",
            "Test is invalid"
          ],
          correctAnswer: "Variables are dependent",
          explanation: "With df = 1, critical value ≈ 3.84. Since 4.5 > 3.84, reject independence; variables are dependent.",
          hint: "Compare calculated chi-square to critical value"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "What does Cramér's V measure?",
          options: [
            "Chi-square significance",
            "Effect size for chi-square tests",
            "Expected frequencies",
            "Degrees of freedom"
          ],
          correctAnswer: "Effect size for chi-square tests",
          explanation: "Cramér's V measures the strength of association in chi-square tests, ranging from 0 (no association) to 1 (perfect association).",
          hint: "This is the effect size measure for categorical data"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "When can't you use a chi-square test?",
          options: [
            "When expected frequencies are too small",
            "When you have continuous data",
            "When assumptions are violated",
            "All of the above"
          ],
          correctAnswer: "All of the above",
          explanation: "Chi-square tests require categorical data, adequate expected frequencies, and other assumptions to be valid.",
          hint: "Consider all the limitations of chi-square tests"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "The null hypothesis for a chi-square test of independence is:",
          options: [
            "Variables are related",
            "Variables are independent",
            "Frequencies are equal",
            "Sample is representative"
          ],
          correctAnswer: "Variables are independent",
          explanation: "H₀ for independence test states that the two categorical variables are independent (not related).",
          hint: "What is the default assumption about relationship?"
        },
        {
          id: 11,
          type: 'numerical',
          question: "A coin is flipped 100 times: 60 heads, 40 tails. What is the chi-square statistic for testing fairness?",
          correctAnswer: 4,
          explanation: "Expected = 50 each. χ² = (60-50)²/50 + (40-50)²/50 = 100/50 + 100/50 = 2 + 2 = 4",
          hint: "Expected frequency for fair coin = 50 heads, 50 tails"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "Fisher's exact test is used instead of chi-square when:",
          options: [
            "Sample size is very large",
            "Expected frequencies are small",
            "Data is continuous",
            "Variables are independent"
          ],
          correctAnswer: "Expected frequencies are small",
          explanation: "Fisher's exact test provides exact p-values when expected frequencies are too small for chi-square approximation.",
          hint: "This is an alternative when chi-square assumptions are violated"
        }
      ]
    },
    {
      id: 11,
      title: "ANOVA Fundamentals",
      description: "Analyze differences between multiple groups using Analysis of Variance",
      timeLimit: 50,
      difficulty: 'Intermediate',
      realWorldContext: "Comparing multiple treatments or interventions",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "ANOVA is used to:",
          options: [
            "Compare two means",
            "Compare three or more means",
            "Test correlation",
            "Test independence"
          ],
          correctAnswer: "Compare three or more means",
          explanation: "ANOVA extends the t-test to compare means across three or more groups simultaneously.",
          hint: "Think about when you have more than two groups"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "Why use ANOVA instead of multiple t-tests?",
          options: [
            "ANOVA is easier to calculate",
            "Multiple t-tests inflate Type I error rate",
            "ANOVA gives more power",
            "T-tests only work for two groups"
          ],
          correctAnswer: "Multiple t-tests inflate Type I error rate",
          explanation: "Multiple t-tests increase the family-wise Type I error rate. ANOVA controls this by testing all groups simultaneously.",
          hint: "Think about what happens to alpha when you do many tests"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "The F-statistic in ANOVA is the ratio of:",
          options: [
            "Between-group variance to within-group variance",
            "Sample variance to population variance",
            "Mean square error to total variance",
            "Treatment effect to random error"
          ],
          correctAnswer: "Between-group variance to within-group variance",
          explanation: "F = MSbetween/MSwithin, comparing variance between groups to variance within groups.",
          hint: "F compares systematic differences to random variation"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "What does a large F-statistic suggest?",
          options: [
            "Groups are similar",
            "Large differences between groups relative to within-group variation",
            "Small sample size",
            "Violated assumptions"
          ],
          correctAnswer: "Large differences between groups relative to within-group variation",
          explanation: "Large F indicates between-group differences are large compared to within-group variation, suggesting group means differ.",
          hint: "Large F = signal >> noise"
        },
        {
          id: 5,
          type: 'numerical',
          question: "With 4 groups and 20 participants total, what are the degrees of freedom for the denominator of the F-test?",
          correctAnswer: 16,
          explanation: "df denominator = N - k = 20 - 4 = 16 (total sample size minus number of groups)",
          hint: "df denominator = total N minus number of groups"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "The assumptions of ANOVA include:",
          options: [
            "Independence, normality, equal variances",
            "Independence, linearity, normality",
            "Normality, equal sample sizes, randomness",
            "Equal variances, large samples, independence"
          ],
          correctAnswer: "Independence, normality, equal variances",
          explanation: "ANOVA assumes independent observations, normal distributions within groups, and equal variances (homoscedasticity).",
          hint: "Remember the three key assumptions"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "If ANOVA is significant, what should you do next?",
          options: [
            "Stop - you've found the answer",
            "Increase sample size",
            "Perform post-hoc tests",
            "Report means and standard deviations"
          ],
          correctAnswer: "Perform post-hoc tests",
          explanation: "Significant ANOVA means at least one group differs, but doesn't tell which ones. Post-hoc tests identify specific differences.",
          hint: "ANOVA tells you 'something is different' but not 'what is different'"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "Tukey's HSD test is used for:",
          options: [
            "Testing ANOVA assumptions",
            "Post-hoc pairwise comparisons",
            "Calculating effect size",
            "Planning sample size"
          ],
          correctAnswer: "Post-hoc pairwise comparisons",
          explanation: "Tukey's HSD (Honestly Significant Difference) controls Type I error when making all possible pairwise comparisons.",
          hint: "This is a post-hoc test for multiple comparisons"
        },
        {
          id: 9,
          type: 'numerical',
          question: "In a one-way ANOVA with 3 groups, what are the degrees of freedom for the numerator?",
          correctAnswer: 2,
          explanation: "df numerator = k - 1 = 3 - 1 = 2 (number of groups minus 1)",
          hint: "df numerator = number of groups minus 1"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "What does eta-squared (η²) measure in ANOVA?",
          options: [
            "Statistical significance",
            "Effect size - proportion of variance explained",
            "Power of the test",
            "Assumption violations"
          ],
          correctAnswer: "Effect size - proportion of variance explained",
          explanation: "η² = SSbetween/SStotal, representing the proportion of total variance explained by group differences.",
          hint: "This is the effect size measure for ANOVA"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Levene's test is used to check:",
          options: [
            "Normality assumption",
            "Independence assumption",
            "Equal variances assumption",
            "Effect size"
          ],
          correctAnswer: "Equal variances assumption",
          explanation: "Levene's test checks homogeneity of variances (equal variances) across groups.",
          hint: "This tests one of the key ANOVA assumptions"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "If ANOVA assumptions are violated, you might:",
          options: [
            "Use Kruskal-Wallis test",
            "Transform the data",
            "Use Welch's ANOVA",
            "All of the above"
          ],
          correctAnswer: "All of the above",
          explanation: "When assumptions are violated, options include non-parametric tests (Kruskal-Wallis), data transformation, or robust alternatives (Welch's ANOVA).",
          hint: "Multiple strategies exist for handling assumption violations"
        }
      ]
    },
    {
      id: 12,
      title: "Effect Size and Practical Significance",
      description: "Distinguish between statistical and practical significance using effect sizes",
      timeLimit: 35,
      difficulty: 'Intermediate',
      realWorldContext: "Medical research and intervention effectiveness",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "What is the difference between statistical and practical significance?",
          options: [
            "Statistical significance is more important",
            "Statistical significance indicates magnitude of effect",
            "Practical significance considers real-world importance",
            "They are the same thing"
          ],
          correctAnswer: "Practical significance considers real-world importance",
          explanation: "Statistical significance only indicates if an effect exists; practical significance considers if the effect is large enough to matter in practice.",
          hint: "Think about p-values vs. real-world importance"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "Cohen's d measures:",
          options: [
            "Statistical significance",
            "Standardized difference between means",
            "Correlation strength",
            "Sample size adequacy"
          ],
          correctAnswer: "Standardized difference between means",
          explanation: "Cohen's d is the standardized effect size: d = (mean₁ - mean₂) / pooled standard deviation.",
          hint: "This standardizes the difference between groups"
        },
        {
          id: 3,
          type: 'numerical',
          question: "If Group 1 mean = 100, Group 2 mean = 85, and pooled SD = 10, what is Cohen's d?",
          correctAnswer: 1.5,
          explanation: "Cohen's d = (100 - 85) / 10 = 15 / 10 = 1.5",
          hint: "d = (mean difference) / pooled standard deviation"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "According to Cohen's conventions, d = 0.2 represents:",
          options: [
            "No effect",
            "Small effect",
            "Medium effect", 
            "Large effect"
          ],
          correctAnswer: "Small effect",
          explanation: "Cohen's conventions: d = 0.2 (small), 0.5 (medium), 0.8 (large effect).",
          hint: "Learn Cohen's effect size benchmarks"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "A study finds p < 0.001 but Cohen's d = 0.1. This suggests:",
          options: [
            "Important practical finding",
            "Statistically significant but practically trivial",
            "Study should be repeated",
            "Effect size calculation is wrong"
          ],
          correctAnswer: "Statistically significant but practically trivial",
          explanation: "Very small p-value with tiny effect size often indicates large sample detecting a trivial difference.",
          hint: "Small effect size despite significance suggests trivial practical importance"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "Why can large samples lead to misleading statistical significance?",
          options: [
            "Large samples introduce bias",
            "Large samples make small effects detectable",
            "Large samples violate assumptions",
            "Large samples reduce power"
          ],
          correctAnswer: "Large samples make small effects detectable",
          explanation: "With large samples, even trivially small effects can achieve statistical significance, which may not be practically meaningful.",
          hint: "Think about the relationship between sample size and detecting tiny effects"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "For correlations, what effect size measure is commonly used?",
          options: [
            "Cohen's d",
            "r² (coefficient of determination)",
            "Eta-squared",
            "Omega-squared"
          ],
          correctAnswer: "r² (coefficient of determination)",
          explanation: "r² indicates the proportion of variance in one variable explained by another, serving as the effect size for correlations.",
          hint: "This shows proportion of explained variance"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "An r² of 0.25 means:",
          options: [
            "25% correlation",
            "25% of variance explained",
            "25% chance of significance",
            "25% margin of error"
          ],
          correctAnswer: "25% of variance explained",
          explanation: "r² = 0.25 means 25% of the variance in the dependent variable is explained by the independent variable.",
          hint: "r² is about explained variance"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "What does it mean when a result is practically significant but not statistically significant?",
          options: [
            "The effect is important but sample was too small to detect it",
            "The study is flawed",
            "Statistical tests were wrong",
            "This situation cannot occur"
          ],
          correctAnswer: "The effect is important but sample was too small to detect it",
          explanation: "Large, meaningful effects might not reach statistical significance with small samples due to insufficient power.",
          hint: "Power depends on effect size AND sample size"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "Number Needed to Treat (NNT) is:",
          options: [
            "Sample size calculation",
            "Clinical effect size measure",
            "Statistical significance test",
            "Type of confidence interval"
          ],
          correctAnswer: "Clinical effect size measure",
          explanation: "NNT indicates how many patients need treatment for one additional patient to benefit, providing practical significance information.",
          hint: "This translates statistical results into practical terms"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Glass's Δ (delta) differs from Cohen's d in that it uses:",
          options: [
            "Control group SD only",
            "Pooled SD",
            "Population SD",
            "Sample size correction"
          ],
          correctAnswer: "Control group SD only",
          explanation: "Glass's Δ uses only the control group standard deviation as the standardizer, useful when groups have different variabilities.",
          hint: "This variant uses only one group's variability"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "Which statement about effect sizes is correct?",
          options: [
            "Effect sizes are not affected by sample size",
            "Larger effect sizes always mean more importance",
            "Effect sizes should always be reported with significance tests",
            "Effect sizes are only useful in experimental studies"
          ],
          correctAnswer: "Effect sizes should always be reported with significance tests",
          explanation: "Effect sizes provide crucial information about magnitude and practical importance that p-values alone cannot provide.",
          hint: "Effect sizes complement significance testing"
        }
      ]
    },

    // ADVANCED LEVEL EXERCISES
    {
      id: 13,
      title: "Linear and Multiple Regression",
      description: "Build and interpret linear regression models with single and multiple predictors",
      timeLimit: 60,
      difficulty: 'Advanced',
      realWorldContext: "Predictive modeling and business analytics",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "In simple linear regression Y = a + bX, what does 'b' represent?",
          options: [
            "Y-intercept",
            "Slope - change in Y per unit change in X",
            "Correlation coefficient",
            "Standard error"
          ],
          correctAnswer: "Slope - change in Y per unit change in X",
          explanation: "The slope coefficient 'b' represents the expected change in Y for a one-unit increase in X.",
          hint: "Think about rise over run"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "R-squared represents:",
          options: [
            "Correlation coefficient",
            "Proportion of variance in Y explained by X",
            "Standard error of estimate",
            "Statistical significance"
          ],
          correctAnswer: "Proportion of variance in Y explained by X",
          explanation: "R² indicates what proportion of the total variance in the dependent variable is explained by the independent variable(s).",
          hint: "R² is about explained variance"
        },
        {
          id: 3,
          type: 'numerical',
          question: "If the correlation between X and Y is r = 0.6, what is R-squared? (Express as decimal)",
          correctAnswer: 0.36,
          explanation: "R² = r² = (0.6)² = 0.36, meaning 36% of variance in Y is explained by X.",
          hint: "R-squared equals correlation squared"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "What does a residual represent?",
          options: [
            "Predicted value",
            "Observed value",
            "Difference between observed and predicted values",
            "Standard error"
          ],
          correctAnswer: "Difference between observed and predicted values",
          explanation: "Residual = Observed Y - Predicted Y, representing the error in prediction for each data point.",
          hint: "Residuals show prediction errors"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "Multicollinearity in multiple regression refers to:",
          options: [
            "Non-linear relationships",
            "High correlations among predictor variables",
            "Heteroscedasticity",
            "Outliers in the data"
          ],
          correctAnswer: "High correlations among predictor variables",
          explanation: "Multicollinearity occurs when predictor variables are highly correlated, making it difficult to determine individual effects.",
          hint: "This is about predictors being too similar"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "What is the purpose of adjusted R-squared?",
          options: [
            "Increase model accuracy",
            "Account for number of predictors in model comparison",
            "Remove outliers",
            "Test significance"
          ],
          correctAnswer: "Account for number of predictors in model comparison",
          explanation: "Adjusted R² penalizes for additional predictors, allowing fair comparison between models with different numbers of variables.",
          hint: "This prevents inflation from adding variables"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "The assumptions of linear regression include:",
          options: [
            "Linearity, independence, normality of residuals, homoscedasticity",
            "Normality of X, large sample size, equal variances",
            "Independence, linearity, equal sample sizes",
            "Normality of Y, randomness, linearity"
          ],
          correctAnswer: "Linearity, independence, normality of residuals, homoscedasticity",
          explanation: "Key assumptions: linear relationship, independent observations, normal distribution of residuals, constant variance (homoscedasticity).",
          hint: "Focus on the four main assumptions"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "What does heteroscedasticity mean?",
          options: [
            "Non-linear relationship",
            "Unequal variance of residuals",
            "Missing data",
            "Outliers present"
          ],
          correctAnswer: "Unequal variance of residuals",
          explanation: "Heteroscedasticity means the variance of residuals is not constant across values of the predictor(s).",
          hint: "Hetero = different, scedasticity = variance"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "In multiple regression, what does a partial correlation measure?",
          options: [
            "Total correlation between variables",
            "Correlation between Y and X controlling for other variables",
            "Correlation between two predictors",
            "Overall model fit"
          ],
          correctAnswer: "Correlation between Y and X controlling for other variables",
          explanation: "Partial correlation shows the relationship between Y and one predictor while holding other predictors constant.",
          hint: "This controls for other variables"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "Forward selection in regression involves:",
          options: [
            "Adding variables one at a time based on significance",
            "Removing variables one at a time",
            "Adding all variables simultaneously",
            "Randomly selecting variables"
          ],
          correctAnswer: "Adding variables one at a time based on significance",
          explanation: "Forward selection starts with no variables and adds them one by one based on statistical significance criteria.",
          hint: "Forward = adding variables step by step"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "What does the F-test in regression test?",
          options: [
            "Individual coefficient significance",
            "Overall model significance",
            "Assumption violations",
            "Multicollinearity"
          ],
          correctAnswer: "Overall model significance",
          explanation: "The F-test tests whether the overall regression model explains a significant amount of variance (H₀: all slopes = 0).",
          hint: "This tests the whole model together"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "Cook's distance is used to identify:",
          options: [
            "Multicollinearity",
            "Heteroscedasticity",
            "Influential observations",
            "Non-linearity"
          ],
          correctAnswer: "Influential observations",
          explanation: "Cook's distance measures how much the regression coefficients change when each observation is removed, identifying influential points.",
          hint: "This finds points that heavily influence the model"
        },
        {
          id: 13,
          type: 'multiple-choice',
          question: "What is the difference between prediction and confidence intervals in regression?",
          options: [
            "Prediction intervals are narrower",
            "Confidence intervals are for mean Y, prediction intervals for individual Y",
            "They use different formulas",
            "Confidence intervals are more accurate"
          ],
          correctAnswer: "Confidence intervals are for mean Y, prediction intervals for individual Y",
          explanation: "Confidence intervals estimate the mean Y for given X; prediction intervals estimate individual Y values (wider due to additional uncertainty).",
          hint: "One predicts means, the other predicts individual values"
        },
        {
          id: 14,
          type: 'multiple-choice',
          question: "Stepwise regression can lead to:",
          options: [
            "Optimal model selection",
            "Overfitting and instability",
            "Perfect predictions",
            "Eliminated multicollinearity"
          ],
          correctAnswer: "Overfitting and instability",
          explanation: "Stepwise regression can capitalize on random variations in data, leading to models that don't generalize well and unstable variable selection.",
          hint: "Automatic selection methods have drawbacks"
        }
      ]
    },
    {
      id: 14,
      title: "Non-parametric Statistical Tests",
      description: "Apply distribution-free statistical methods when parametric assumptions are violated",
      timeLimit: 50,
      difficulty: 'Advanced',
      realWorldContext: "Medical research with skewed data and small samples",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "When should you use non-parametric tests?",
          options: [
            "Always, they're more powerful",
            "When data is non-normal or sample size is small",
            "Only for categorical data",
            "When you want exact p-values"
          ],
          correctAnswer: "When data is non-normal or sample size is small",
          explanation: "Non-parametric tests don't assume normal distributions, making them suitable when parametric assumptions are violated.",
          hint: "These tests make fewer assumptions about data distribution"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "The Mann-Whitney U test is the non-parametric equivalent of:",
          options: [
            "One-sample t-test",
            "Two-sample t-test",
            "Paired t-test",
            "ANOVA"
          ],
          correctAnswer: "Two-sample t-test",
          explanation: "Mann-Whitney U test compares medians of two independent groups without assuming normal distributions.",
          hint: "This compares two independent groups"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "The Wilcoxon signed-rank test is the non-parametric equivalent of:",
          options: [
            "One-sample t-test",
            "Two-sample t-test", 
            "Paired t-test",
            "Chi-square test"
          ],
          correctAnswer: "Paired t-test",
          explanation: "Wilcoxon signed-rank test compares paired observations without assuming normal differences.",
          hint: "This works with paired/matched data"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "Non-parametric tests typically compare:",
          options: [
            "Means",
            "Variances",
            "Medians or distributions",
            "Correlations"
          ],
          correctAnswer: "Medians or distributions",
          explanation: "Non-parametric tests usually focus on medians, ranks, or entire distribution shapes rather than means.",
          hint: "These tests focus on medians rather than means"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "The Kruskal-Wallis test is the non-parametric equivalent of:",
          options: [
            "Two-sample t-test",
            "Paired t-test",
            "One-way ANOVA",
            "Chi-square test"
          ],
          correctAnswer: "One-way ANOVA",
          explanation: "Kruskal-Wallis test compares medians across three or more independent groups.",
          hint: "This extends Mann-Whitney to multiple groups"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "What do non-parametric tests work with instead of raw data values?",
          options: [
            "Means",
            "Standard deviations",
            "Ranks",
            "Percentiles"
          ],
          correctAnswer: "Ranks",
          explanation: "Most non-parametric tests convert data to ranks, making them robust to outliers and distribution shape.",
          hint: "These tests rank-order the data"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "What is an advantage of non-parametric tests?",
          options: [
            "More powerful than parametric tests",
            "Robust to outliers and distribution assumptions",
            "Provide exact parameter estimates",
            "Work better with large samples"
          ],
          correctAnswer: "Robust to outliers and distribution assumptions",
          explanation: "Non-parametric tests are less sensitive to outliers and don't require specific distribution assumptions.",
          hint: "Think about robustness to assumption violations"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "What is a disadvantage of non-parametric tests?",
          options: [
            "More complex calculations",
            "Lower statistical power when parametric assumptions are met",
            "Cannot handle tied values",
            "Require larger sample sizes"
          ],
          correctAnswer: "Lower statistical power when parametric assumptions are met",
          explanation: "When parametric assumptions are satisfied, parametric tests are more powerful (better at detecting true effects).",
          hint: "Trade-off: robustness for power"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "Spearman's rank correlation is used when:",
          options: [
            "Data is normally distributed",
            "Relationship is non-linear or data is ordinal",
            "Sample size is large",
            "Variables are independent"
          ],
          correctAnswer: "Relationship is non-linear or data is ordinal",
          explanation: "Spearman's correlation works with ranks, suitable for monotonic (but not necessarily linear) relationships or ordinal data.",
          hint: "This works with ranks and monotonic relationships"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "The sign test is used to:",
          options: [
            "Test for normality",
            "Compare medians in paired data",
            "Test independence",
            "Compare variances"
          ],
          correctAnswer: "Compare medians in paired data",
          explanation: "The sign test compares paired observations by counting how many differences are positive vs. negative.",
          hint: "This is the simplest test for paired data"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "What does the Friedman test examine?",
          options: [
            "Independence of two variables",
            "Differences among repeated measures",
            "Correlation between variables",
            "Goodness of fit"
          ],
          correctAnswer: "Differences among repeated measures",
          explanation: "Friedman test is the non-parametric version of repeated measures ANOVA, comparing multiple related groups.",
          hint: "This is for repeated measures with multiple time points"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "When might you choose a parametric test over a non-parametric test?",
          options: [
            "Data has outliers",
            "Sample size is small",
            "Assumptions are met and you want maximum power",
            "Data is ordinal"
          ],
          correctAnswer: "Assumptions are met and you want maximum power",
          explanation: "When parametric assumptions are satisfied, parametric tests provide greater statistical power to detect effects.",
          hint: "Parametric tests are more powerful when their assumptions hold"
        }
      ]
    },
    {
      id: 15,
      title: "Statistical Power and Sample Size Planning",
      description: "Understand power analysis and plan adequate sample sizes for studies",
      timeLimit: 55,
      difficulty: 'Advanced',
      realWorldContext: "Research planning and grant proposal development",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Statistical power is the probability of:",
          options: [
            "Making a Type I error",
            "Making a Type II error",
            "Correctly rejecting a false null hypothesis",
            "Correctly accepting a true null hypothesis"
          ],
          correctAnswer: "Correctly rejecting a false null hypothesis",
          explanation: "Power = 1 - β = probability of detecting a true effect (rejecting false H₀).",
          hint: "Power is about detecting true effects"
        },
        {
          id: 2,
          type: 'numerical',
          question: "If β (Type II error rate) = 0.20, what is the statistical power?",
          correctAnswer: 0.80,
          explanation: "Power = 1 - β = 1 - 0.20 = 0.80 or 80%",
          hint: "Power = 1 - probability of Type II error"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "What is the conventional minimum acceptable power level?",
          options: ["0.70", "0.80", "0.90", "0.95"],
          correctAnswer: "0.80",
          explanation: "80% power is the conventional standard, meaning 80% chance of detecting a true effect if it exists.",
          hint: "This is the standard benchmark in research"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "Which factors affect statistical power?",
          options: [
            "Effect size, sample size, alpha level",
            "Effect size only",
            "Sample size and alpha only",
            "Effect size, sample size, alpha level, and variability"
          ],
          correctAnswer: "Effect size, sample size, alpha level, and variability",
          explanation: "Power increases with larger effect sizes, larger samples, higher alpha levels, and lower variability.",
          hint: "Think of all factors that make effects easier to detect"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "Increasing the significance level from 0.05 to 0.10 will:",
          options: [
            "Decrease power",
            "Increase power",
            "Not affect power",
            "Make the test invalid"
          ],
          correctAnswer: "Increase power",
          explanation: "Higher alpha (more lenient criteria) increases power but also increases Type I error risk.",
          hint: "More lenient criteria make it easier to detect effects"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "A post-hoc power analysis on a non-significant result typically shows:",
          options: [
            "High power",
            "Low power",
            "Power equal to alpha",
            "Power cannot be calculated"
          ],
          correctAnswer: "Low power",
          explanation: "Non-significant results often reflect insufficient power to detect the effect, though post-hoc power analysis has limitations.",
          hint: "Failed to reject H₀ often means insufficient power"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "To detect a small effect size, you typically need:",
          options: [
            "Smaller sample size",
            "Larger sample size",
            "Lower alpha level",
            "Higher variability"
          ],
          correctAnswer: "Larger sample size",
          explanation: "Smaller effects are harder to detect and require larger samples to achieve adequate power.",
          hint: "Small effects need more data to be detected reliably"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "In a two-tailed test vs. one-tailed test with the same alpha:",
          options: [
            "Two-tailed has more power",
            "One-tailed has more power",
            "Power is the same",
            "Cannot be compared"
          ],
          correctAnswer: "One-tailed has more power",
          explanation: "One-tailed tests concentrate alpha in one direction, providing more power to detect effects in that specific direction.",
          hint: "Concentrating alpha in one direction increases power for that direction"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "What is the relationship between Type I and Type II errors?",
          options: [
            "They are independent",
            "Reducing one increases the other (for fixed sample size)",
            "They always decrease together",
            "They are perfectly correlated"
          ],
          correctAnswer: "Reducing one increases the other (for fixed sample size)",
          explanation: "For a fixed sample size, there's a trade-off: reducing α (Type I) typically increases β (Type II) and vice versa.",
          hint: "There's a trade-off between the two error types"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "A study needs to detect a medium effect size (d = 0.5) with 80% power and α = 0.05. Approximately how many participants per group?",
          options: ["15", "25", "35", "65"],
          correctAnswer: "65",
          explanation: "For medium effect size (d = 0.5), approximately 64 participants per group are needed for 80% power in a two-group comparison.",
          hint: "This is a standard power calculation result to remember"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Prospective power analysis is conducted:",
          options: [
            "After data collection",
            "During data analysis",
            "Before data collection for planning",
            "Only for significant results"
          ],
          correctAnswer: "Before data collection for planning",
          explanation: "Prospective power analysis is done during study planning to determine adequate sample size before collecting data.",
          hint: "This is done in the planning phase"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "What is the minimum detectable effect size?",
          options: [
            "The smallest effect worth detecting",
            "The effect size that can be detected with given power",
            "Always Cohen's d = 0.2",
            "The observed effect size"
          ],
          correctAnswer: "The effect size that can be detected with given power",
          explanation: "Minimum detectable effect is the smallest effect that can be reliably detected given the study's power, sample size, and alpha level.",
          hint: "This depends on your study design parameters"
        }
      ]
    },
    {
      id: 16,
      title: "Time Series Analysis Basics",
      description: "Analyze temporal data patterns, trends, and seasonal components",
      timeLimit: 60,
      difficulty: 'Advanced',
      realWorldContext: "Economic forecasting and business trend analysis",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "Time series data is characterized by:",
          options: [
            "Independence between observations",
            "Temporal ordering and potential dependence",
            "Normal distribution",
            "Equal time intervals only"
          ],
          correctAnswer: "Temporal ordering and potential dependence",
          explanation: "Time series data has a natural time order and often shows dependence between consecutive observations.",
          hint: "Time order and dependence are key characteristics"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "The four main components of time series are:",
          options: [
            "Mean, variance, skewness, kurtosis",
            "Trend, seasonality, cyclical, irregular",
            "Linear, quadratic, cubic, exponential",
            "Past, present, future, unknown"
          ],
          correctAnswer: "Trend, seasonality, cyclical, irregular",
          explanation: "Classical decomposition identifies trend (long-term direction), seasonal (regular patterns), cyclical (irregular cycles), and random components.",
          hint: "Think about different types of patterns over time"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "A trend in time series refers to:",
          options: [
            "Short-term fluctuations",
            "Long-term direction or movement",
            "Regular seasonal patterns",
            "Random variations"
          ],
          correctAnswer: "Long-term direction or movement",
          explanation: "Trend represents the long-term directional movement in the data, showing overall increase, decrease, or stability over time.",
          hint: "This is about long-term direction"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "Seasonality in time series is:",
          options: [
            "Random fluctuations",
            "Long-term trends",
            "Regular patterns repeating over fixed periods",
            "One-time events"
          ],
          correctAnswer: "Regular patterns repeating over fixed periods",
          explanation: "Seasonality consists of predictable patterns that repeat at regular intervals (daily, weekly, monthly, yearly).",
          hint: "Think about patterns that repeat regularly"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "Autocorrelation measures:",
          options: [
            "Correlation between two different variables",
            "Correlation between a series and its lagged values",
            "Seasonal variation",
            "Trend strength"
          ],
          correctAnswer: "Correlation between a series and its lagged values",
          explanation: "Autocorrelation measures how strongly a series is correlated with its own past values at various lags.",
          hint: "Auto = self; correlation with past self"
        },
        {
          id: 6,
          type: 'multiple-choice',
          question: "A moving average is used to:",
          options: [
            "Increase variability",
            "Smooth out short-term fluctuations",
            "Add seasonal patterns",
            "Predict exact future values"
          ],
          correctAnswer: "Smooth out short-term fluctuations",
          explanation: "Moving averages smooth time series data by reducing noise and highlighting underlying trends.",
          hint: "This technique smooths out noise"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "In exponential smoothing, recent observations are:",
          options: [
            "Given equal weight to older observations",
            "Given more weight than older observations",
            "Ignored completely",
            "Given less weight than older observations"
          ],
          correctAnswer: "Given more weight than older observations",
          explanation: "Exponential smoothing gives exponentially decreasing weights to observations as they get older, emphasizing recent data.",
          hint: "Recent data is more important in exponential smoothing"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "Stationarity in time series means:",
          options: [
            "No trend or seasonal patterns",
            "Constant mean, variance, and autocorrelation over time",
            "Perfect predictability",
            "No randomness"
          ],
          correctAnswer: "Constant mean, variance, and autocorrelation over time",
          explanation: "A stationary series has statistical properties that don't change over time - constant mean, variance, and autocorrelation structure.",
          hint: "Statistical properties remain constant over time"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "Differencing is used to:",
          options: [
            "Add seasonal patterns",
            "Remove trends and achieve stationarity",
            "Increase autocorrelation",
            "Smooth the data"
          ],
          correctAnswer: "Remove trends and achieve stationarity",
          explanation: "Differencing (subtracting previous values) removes trends and can help make a non-stationary series stationary.",
          hint: "This technique removes trends"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "The Box-Jenkins methodology is used for:",
          options: [
            "Regression analysis",
            "ARIMA model building",
            "Correlation analysis",
            "Hypothesis testing"
          ],
          correctAnswer: "ARIMA model building",
          explanation: "Box-Jenkins is a systematic approach for building ARIMA (AutoRegressive Integrated Moving Average) models.",
          hint: "This is a model-building methodology"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "Mean Absolute Error (MAE) in forecasting measures:",
          options: [
            "Average of forecast errors",
            "Average absolute deviation of forecasts from actual values",
            "Percentage of accurate forecasts",
            "Maximum forecast error"
          ],
          correctAnswer: "Average absolute deviation of forecasts from actual values",
          explanation: "MAE = average of |actual - forecast|, providing the average magnitude of forecast errors without considering direction.",
          hint: "This measures average absolute forecast error"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "What does MAPE (Mean Absolute Percentage Error) measure?",
          options: [
            "Maximum error percentage",
            "Average percentage accuracy",
            "Average absolute percentage error",
            "Standard deviation of errors"
          ],
          correctAnswer: "Average absolute percentage error",
          explanation: "MAPE = average of |actual - forecast|/actual × 100%, expressing forecast accuracy as a percentage.",
          hint: "This gives percentage forecast error"
        }
      ]
    },
    {
      id: 17,
      title: "Bayesian Statistics Introduction",
      description: "Understand Bayesian inference, prior beliefs, and posterior distributions",
      timeLimit: 55,
      difficulty: 'Advanced',
      realWorldContext: "Medical diagnosis and machine learning applications",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: "What is the key philosophical difference between Bayesian and frequentist statistics?",
          options: [
            "Bayesian uses larger samples",
            "Bayesian treats parameters as random variables",
            "Frequentist is more accurate",
            "Bayesian requires normal distributions"
          ],
          correctAnswer: "Bayesian treats parameters as random variables",
          explanation: "Bayesian statistics treats parameters as random variables with probability distributions, while frequentist treats them as fixed unknowns.",
          hint: "Think about how parameters are conceptualized"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "Bayes' theorem states that:",
          options: [
            "P(A|B) = P(B|A) × P(A) / P(B)",
            "P(A|B) = P(A) × P(B)",
            "P(A|B) = P(B|A)",
            "P(A|B) = 1 - P(A)"
          ],
          correctAnswer: "P(A|B) = P(B|A) × P(A) / P(B)",
          explanation: "Bayes' theorem shows how to update probability of A given evidence B, using prior P(A) and likelihood P(B|A).",
          hint: "This is the fundamental formula for updating beliefs"
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: "In Bayesian inference, what is a prior distribution?",
          options: [
            "The distribution of the data",
            "Initial belief about parameter before seeing data",
            "The final answer",
            "The sampling distribution"
          ],
          correctAnswer: "Initial belief about parameter before seeing data",
          explanation: "Prior distribution represents your initial beliefs or knowledge about a parameter before observing any data.",
          hint: "This represents beliefs before seeing data"
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: "The posterior distribution is:",
          options: [
            "The same as the prior",
            "Updated belief about parameter after seeing data",
            "The likelihood function",
            "The data distribution"
          ],
          correctAnswer: "Updated belief about parameter after seeing data",
          explanation: "Posterior distribution combines prior beliefs with data (via likelihood) to give updated beliefs about parameters.",
          hint: "This is your belief after seeing the evidence"
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: "The likelihood function represents:",
          options: [
            "Probability of parameters given data",
            "Probability of data given parameters",
            "Prior beliefs",
            "Posterior distribution"
          ],
          correctAnswer: "Probability of data given parameters",
          explanation: "Likelihood function shows how probable the observed data is for different parameter values.",
          hint: "This is about probability of the data given parameter values"
        },
        {
          id: 6,
          type: 'numerical',
          question: "A test has 90% sensitivity and 95% specificity. If disease prevalence is 1%, what is the posterior probability of disease given a positive test? (Express as percentage, rounded to nearest whole number)",
          correctAnswer: 15,
          explanation: "Using Bayes: P(Disease|+) = (0.9 × 0.01) / [(0.9 × 0.01) + (0.05 × 0.99)] = 0.009 / 0.0585 ≈ 0.15 = 15%",
          hint: "Use Bayes' theorem: prior × sensitivity / total probability of positive test"
        },
        {
          id: 7,
          type: 'multiple-choice',
          question: "A non-informative (flat) prior indicates:",
          options: [
            "Strong prior knowledge",
            "No prior knowledge or equal probability for all values",
            "The data is uninformative",
            "The analysis is wrong"
          ],
          correctAnswer: "No prior knowledge or equal probability for all values",
          explanation: "Non-informative priors assign equal probability to all parameter values, representing lack of prior knowledge.",
          hint: "This represents no prior preference"
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: "What is a conjugate prior?",
          options: [
            "A prior that conflicts with data",
            "A prior that yields a posterior in the same family",
            "A prior based on previous studies",
            "A prior that is always normal"
          ],
          correctAnswer: "A prior that yields a posterior in the same family",
          explanation: "Conjugate priors, when combined with certain likelihoods, produce posterior distributions in the same family as the prior.",
          hint: "This mathematical convenience keeps distributions in the same family"
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: "Bayesian credible intervals differ from frequentist confidence intervals because:",
          options: [
            "They're always wider",
            "They represent probability that parameter lies in interval",
            "They're more accurate",
            "They require larger samples"
          ],
          correctAnswer: "They represent probability that parameter lies in interval",
          explanation: "Credible intervals give the probability that the parameter lies within the interval, while confidence intervals have a different interpretation.",
          hint: "Direct probability interpretation vs. long-run frequency"
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: "As sample size increases in Bayesian analysis:",
          options: [
            "Prior becomes more important",
            "Likelihood dominates and posterior approaches MLE",
            "Analysis becomes invalid",
            "Posterior becomes uninformative"
          ],
          correctAnswer: "Likelihood dominates and posterior approaches MLE",
          explanation: "With large samples, the likelihood overwhelms the prior, and Bayesian estimates converge to maximum likelihood estimates.",
          hint: "More data reduces influence of prior beliefs"
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: "MCMC (Markov Chain Monte Carlo) is used in Bayesian statistics to:",
          options: [
            "Test assumptions",
            "Sample from complex posterior distributions",
            "Calculate p-values",
            "Validate models"
          ],
          correctAnswer: "Sample from complex posterior distributions",
          explanation: "MCMC methods generate samples from posterior distributions when analytical solutions are intractable.",
          hint: "This is a computational sampling method"
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: "What is the main advantage of Bayesian methods?",
          options: [
            "Always give significant results",
            "Don't require assumptions",
            "Incorporate prior knowledge and provide intuitive probability statements",
            "Are computationally simpler"
          ],
          correctAnswer: "Incorporate prior knowledge and provide intuitive probability statements",
          explanation: "Bayesian methods naturally incorporate prior information and provide direct probability statements about parameters.",
          hint: "Think about incorporating prior knowledge and direct probability interpretation"
        }
      ]
    }
  ];

  const getExercisesByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    return exercises.filter(ex => ex.difficulty === difficulty);
  };

  const handleStartExercise = (exerciseId: number) => {
    setCurrentExercise(exerciseId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setShowHint({});
    setSessionStarted(true);
  };

  const handleAnswerSubmit = (answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    const exercise = exercises.find(ex => ex.id === currentExercise);
    if (exercise && currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const toggleHint = (questionId: number) => {
    setShowHint(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const resetSession = () => {
    setCurrentExercise(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setShowHint({});
    setSessionStarted(false);
  };

  const calculateScore = () => {
    const exercise = exercises.find(ex => ex.id === currentExercise);
    if (!exercise) return 0;

    let correct = 0;
    exercise.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (question.type === 'numerical') {
        const tolerance = 0.01;
        const correctNum = typeof question.correctAnswer === 'number' ? question.correctAnswer : parseFloat(question.correctAnswer.toString());
        const userNum = parseFloat(userAnswer);
        if (Math.abs(userNum - correctNum) <= tolerance) correct++;
      } else {
        if (userAnswer === question.correctAnswer) correct++;
      }
    });

    return Math.round((correct / exercise.questions.length) * 100);
  };

  const currentExerciseData = exercises.find(ex => ex.id === currentExercise);
  const currentQuestionData = currentExerciseData?.questions[currentQuestion];

  if (currentExercise && !showResults) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Exercise Header */}
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    currentExerciseData?.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    currentExerciseData?.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentExerciseData?.difficulty}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Question {currentQuestion + 1} of {currentExerciseData?.questions.length}
                  </span>
                </div>
                <h1 className="text-title text-primary">{currentExerciseData?.title}</h1>
              </div>
              <button
                onClick={resetSession}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentQuestion + 1) / (currentExerciseData?.questions.length || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          {currentQuestionData && (
            <div className="card p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-subtitle text-primary mb-4">
                    {currentQuestionData.question}
                  </h2>
                  
                  {currentQuestionData.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {currentQuestionData.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSubmit(option)}
                          className="w-full text-left p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQuestionData.type === 'numerical' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter your answer"
                        className="input"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            handleAnswerSubmit(input.value);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector('input') as HTMLInputElement;
                          if (input?.value) {
                            handleAnswerSubmit(input.value);
                          }
                        }}
                        className="btn-primary"
                      >
                        Submit Answer
                      </button>
                    </div>
                  )}

                  {currentQuestionData.type === 'text' && (
                    <div className="space-y-4">
                      <textarea
                        placeholder="Enter your answer"
                        className="input min-h-24"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.ctrlKey) {
                            const textarea = e.target as HTMLTextAreaElement;
                            handleAnswerSubmit(textarea.value);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                          if (textarea?.value) {
                            handleAnswerSubmit(textarea.value);
                          }
                        }}
                        className="btn-primary"
                      >
                        Submit Answer
                      </button>
                    </div>
                  )}
                </div>

                {/* Hint */}
                {currentQuestionData.hint && (
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => toggleHint(currentQuestionData.id)}
                      className="btn-ghost text-sm"
                    >
                      Show Hint
                    </button>
                    
                    {showHint[currentQuestionData.id] && (
                      <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          💡 {currentQuestionData.hint}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showResults && currentExerciseData) {
    const score = calculateScore();
    
    return (
      <div className="container-main section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="card p-6 mb-6">
            <div className="text-center">
              <h1 className="text-title text-primary mb-4">Exercise Complete!</h1>
              <div className="text-6xl font-bold mb-4">
                <span className={
                  score >= 80 ? 'text-green-500' :
                  score >= 60 ? 'text-yellow-500' : 'text-red-500'
                }>
                  {score}%
                </span>
              </div>
              <p className="text-body text-secondary mb-6">
                You scored {calculateScore()}% on {currentExerciseData.title}
              </p>
              <div className="flex justify-center space-x-4">
                <button onClick={resetSession} className="btn-primary">
                  Try Another Exercise
                </button>
                <button 
                  onClick={() => setShowResults(false)}
                  className="btn-secondary"
                >
                  Review Answers
                </button>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="space-y-4">
            {currentExerciseData.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = question.type === 'numerical' 
                ? Math.abs(parseFloat(userAnswer) - parseFloat(question.correctAnswer.toString())) <= 0.01
                : userAnswer === question.correctAnswer;

              return (
                <div key={index} className="card p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-subtitle text-primary mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-body text-secondary mb-3">
                        {question.question}
                      </p>
                      
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Your answer: </span>
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {userAnswer}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Correct answer: </span>
                          <span className="text-green-600">{question.correctAnswer}</span>
                        </p>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Statistical Learning Path</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Master statistics through progressive practice exercises. Start with fundamentals and advance to complex analysis techniques.
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getExercisesByDifficulty(selectedDifficulty).map((exercise) => (
          <div key={exercise.id} className="card card-hover p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {exercise.difficulty}
              </span>
            </div>

            <h3 className="text-subtitle text-primary mb-3">{exercise.title}</h3>
            <p className="text-body text-secondary mb-4">{exercise.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Clock className="w-4 h-4 mr-2" />
                {exercise.timeLimit} minutes
              </div>
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <TrendingUp className="w-4 h-4 mr-2" />
                {exercise.questions.length} questions
              </div>
            </div>

            <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Real-world context:</p>
              <p className="text-sm text-neutral-800 dark:text-neutral-200">{exercise.realWorldContext}</p>
            </div>

            <button
              onClick={() => handleStartExercise(exercise.id)}
              className="btn-primary w-full"
            >
              Start Exercise
            </button>
          </div>
        ))}
      </div>

      {/* Learning Path Guide */}
      <div className="mt-16 card p-6">
        <h2 className="text-title text-primary mb-6 text-center">Your Learning Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">Beginner Level</h3>
            <p className="text-body text-secondary">Master descriptive statistics, probability basics, and fundamental concepts. Perfect for starting your statistics journey.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">Intermediate Level</h3>
            <p className="text-body text-secondary">Dive into hypothesis testing, t-tests, ANOVA, and correlation analysis. Build practical statistical analysis skills.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">Advanced Level</h3>
            <p className="text-body text-secondary">Explore regression modeling, Bayesian statistics, and advanced techniques for professional data analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalLearningPath;