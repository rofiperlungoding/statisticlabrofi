import React, { useState } from 'react';
import { BookOpen, Clock, Users, Award, ChevronRight, ChevronDown, CheckCircle, Circle, Star, Target, Briefcase, Trophy, Crown, Book, FileText, Code, BarChart3, GraduationCap, Lightbulb, Zap } from 'lucide-react';

interface Chapter {
  number: number;
  title: string;
  duration: string;
  topics: {
    title: string;
    content: string[];
  }[];
}

interface Level {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  prerequisites: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  objectives: string[];
  chapters: Chapter[];
  practicalExercises: string[];
  assessment: string[];
}

const StatisticalCourseModule: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());

  const toggleChapterCompletion = (levelId: number, chapterId: number) => {
    const key = `${levelId}-${chapterId}`;
    const newCompleted = new Set(completedChapters);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedChapters(newCompleted);
  };

  const levels: Level[] = [
    {
      id: 1,
      title: "Beginner",
      subtitle: "Foundations",
      duration: "4-6 weeks",
      prerequisites: "Basic arithmetic and algebra",
      description: "Master fundamental statistical concepts, basic probability, and descriptive statistics. Perfect for newcomers to statistics.",
      icon: BookOpen,
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-600",
      objectives: [
        "Understand what statistics is and why it matters",
        "Differentiate between descriptive and inferential statistics",
        "Calculate and interpret basic measures of central tendency and variability",
        "Create and interpret basic graphs and charts",
        "Understand the concept of probability"
      ],
      practicalExercises: [
        "Calculate descriptive statistics for real datasets",
        "Create various types of charts",
        "Solve basic probability problems",
        "Interpret statistical summaries"
      ],
      assessment: [
        "Multiple choice questions on concepts",
        "Calculation problems",
        "Data interpretation exercises",
        "Simple probability scenarios"
      ],
      chapters: [
        {
          number: 1,
          title: "Introduction to Statistics",
          duration: "1 week",
          topics: [
            {
              title: "What is Statistics?",
              content: [
                "Statistics is the science of collecting, analyzing, interpreting, and presenting data to uncover meaningful patterns and make informed decisions. At its core, statistics transforms raw numbers into actionable insights, serving as a bridge between data and understanding. This discipline encompasses both the mathematical methods used to process information and the practical application of these techniques to solve real-world problems.",
                
                "The importance of statistics extends far beyond academic settings, permeating virtually every aspect of modern society. In healthcare, statistics help researchers determine the effectiveness of new treatments through clinical trials, enabling doctors to make evidence-based decisions about patient care. For instance, when a pharmaceutical company tests a new medication, statistical analysis reveals whether observed improvements are due to the drug's effectiveness or merely random chance, potentially saving countless lives through rigorous validation.",
                
                "Statistics plays a crucial role in everyday decision-making, often in ways we might not immediately recognize. When you check weather forecasts, you're relying on statistical models that analyze atmospheric data to predict future conditions. Online recommendation systems use statistical algorithms to suggest products, movies, or music based on your past behavior and similarities with other users. Even something as simple as reading product reviews involves interpreting statistical patterns in customer feedback to make purchasing decisions.",
                
                "The field divides into two main branches: descriptive and inferential statistics, each serving distinct but complementary purposes. Descriptive statistics focuses on summarizing and describing the characteristics of a dataset, providing clear snapshots of what the data reveals. This includes calculating measures like averages, identifying the most common values, and determining how spread out the data points are. For example, a school might use descriptive statistics to report that the average test score was 85%, with most students scoring between 75% and 95%.",
                
                "Inferential statistics, in contrast, uses sample data to make educated guesses or draw conclusions about larger populations. This branch employs probability theory to quantify uncertainty and assess the reliability of conclusions. Consider a political poll surveying 1,000 voters to predict election outcomes for millions of citizens. Inferential statistics helps determine not just the predicted winner, but also the margin of error and confidence level of that prediction, acknowledging the inherent uncertainty in extrapolating from limited data.",
                
                "Statistical thinking and reasoning represent a fundamental shift in how we approach problems and evaluate information. This mindset emphasizes evidence-based decision-making, recognizing that random variation is natural and that patterns must be distinguished from noise. Statistical reasoning involves questioning assumptions, considering alternative explanations, and quantifying uncertainty rather than seeking absolute certainty. For instance, if a company's sales increase after launching an advertising campaign, statistical thinking prompts questions about other factors that might have contributed to the increase, such as seasonal trends, competitor actions, or economic conditions, rather than immediately attributing all success to the advertisement."
              ]
            },
            {
              title: "Types of Data",
              content: [
                "Qualitative vs. quantitative data",
                "Discrete vs. continuous variables",
                "Levels of measurement: nominal, ordinal, interval, ratio",
                "Data collection methods and sources"
              ]
            }
          ]
        },
        {
          number: 2,
          title: "Descriptive Statistics",
          duration: "1.5 weeks",
          topics: [
            {
              title: "Measures of Central Tendency",
              content: [
                "Mean (arithmetic, geometric, harmonic)",
                "Median and its properties",
                "Mode and multimodal distributions",
                "When to use each measure",
                "Comparison and practical applications"
              ]
            },
            {
              title: "Measures of Variability",
              content: [
                "Range and interquartile range",
                "Variance and standard deviation",
                "Coefficient of variation",
                "Understanding spread in data"
              ]
            },
            {
              title: "Shape of Distributions",
              content: [
                "Symmetry and skewness",
                "Kurtosis and tail behavior",
                "Normal distribution introduction",
                "Outliers and their impact"
              ]
            }
          ]
        },
        {
          number: 3,
          title: "Data Visualization",
          duration: "1 week",
          topics: [
            {
              title: "Basic Charts and Graphs",
              content: [
                "Bar charts and histograms",
                "Pie charts and when to use them",
                "Line graphs and time series",
                "Scatter plots for relationships",
                "Box plots and whisker diagrams"
              ]
            },
            {
              title: "Principles of Good Visualization",
              content: [
                "Choosing appropriate chart types",
                "Avoiding misleading graphics",
                "Color and design principles",
                "Interpretation of visual data"
              ]
            }
          ]
        },
        {
          number: 4,
          title: "Basic Probability",
          duration: "1.5 weeks",
          topics: [
            {
              title: "Probability Fundamentals",
              content: [
                "Definition and interpretation of probability",
                "Sample spaces and events",
                "Classical, empirical, and subjective probability",
                "Probability rules and properties"
              ]
            },
            {
              title: "Basic Probability Calculations",
              content: [
                "Addition rule",
                "Multiplication rule",
                "Conditional probability basics",
                "Independence concept"
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Intermediate",
      subtitle: "Applied Statistics",
      duration: "6-8 weeks",
      prerequisites: "Beginner level completion",
      description: "Learn probability distributions, sampling theory, hypothesis testing, and basic regression analysis.",
      icon: Target,
      color: "text-blue-600",
      gradient: "from-blue-500 to-cyan-600",
      objectives: [
        "Work with probability distributions",
        "Understand sampling and sampling distributions",
        "Perform basic hypothesis testing",
        "Calculate and interpret confidence intervals",
        "Conduct simple correlation and regression analysis"
      ],
      practicalExercises: [
        "Work with statistical software (Excel, R, or Python)",
        "Analyze real datasets",
        "Conduct hypothesis tests",
        "Build simple regression models",
        "Interpret statistical output"
      ],
      assessment: [
        "Statistical analysis projects",
        "Hypothesis testing scenarios",
        "Regression analysis assignments",
        "Interpretation of results"
      ],
      chapters: [
        {
          number: 5,
          title: "Probability Distributions",
          duration: "1.5 weeks",
          topics: [
            {
              title: "Common Discrete Distributions",
              content: [
                "Binomial distribution",
                "Poisson distribution",
                "Geometric and negative binomial",
                "Applications and when to use each"
              ]
            },
            {
              title: "Continuous Distributions",
              content: [
                "Normal distribution properties",
                "Standard normal distribution",
                "t-distribution",
                "Chi-square distribution",
                "F-distribution"
              ]
            },
            {
              title: "Working with Distributions",
              content: [
                "Calculating probabilities",
                "Finding percentiles and critical values",
                "Applications in real scenarios"
              ]
            }
          ]
        },
        {
          number: 6,
          title: "Sampling and Sampling Distributions",
          duration: "1.5 weeks",
          topics: [
            {
              title: "Sampling Methods",
              content: [
                "Simple random sampling",
                "Stratified sampling",
                "Cluster sampling",
                "Systematic sampling",
                "Sampling bias and errors"
              ]
            },
            {
              title: "Central Limit Theorem",
              content: [
                "Understanding the theorem",
                "Sampling distribution of the mean",
                "Standard error concept",
                "Applications and implications"
              ]
            }
          ]
        },
        {
          number: 7,
          title: "Confidence Intervals",
          duration: "1 week",
          topics: [
            {
              title: "Concept and Interpretation",
              content: [
                "What confidence intervals represent",
                "Confidence level vs. confidence interval",
                "Margin of error"
              ]
            },
            {
              title: "Types of Confidence Intervals",
              content: [
                "Confidence intervals for means",
                "Confidence intervals for proportions",
                "Confidence intervals for differences",
                "Sample size determination"
              ]
            }
          ]
        },
        {
          number: 8,
          title: "Hypothesis Testing",
          duration: "2 weeks",
          topics: [
            {
              title: "Fundamentals of Hypothesis Testing",
              content: [
                "Null and alternative hypotheses",
                "Type I and Type II errors",
                "Significance level and p-values",
                "Test statistics and critical regions"
              ]
            },
            {
              title: "Common Tests",
              content: [
                "One-sample t-test",
                "Two-sample t-tests (independent and paired)",
                "Tests for proportions",
                "Chi-square goodness of fit test",
                "Chi-square test of independence"
              ]
            }
          ]
        },
        {
          number: 9,
          title: "Correlation and Simple Regression",
          duration: "2 weeks",
          topics: [
            {
              title: "Correlation Analysis",
              content: [
                "Pearson correlation coefficient",
                "Spearman rank correlation",
                "Interpretation and limitations",
                "Correlation vs. causation"
              ]
            },
            {
              title: "Simple Linear Regression",
              content: [
                "Least squares method",
                "Regression equation and interpretation",
                "Coefficient of determination (R²)",
                "Assumptions and diagnostics",
                "Prediction and confidence intervals"
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Professional",
      subtitle: "Advanced Methods",
      duration: "8-10 weeks",
      prerequisites: "Intermediate level completion",
      description: "Master multiple regression, ANOVA, non-parametric tests, and experimental design for professional statistical practice.",
      icon: Briefcase,
      color: "text-purple-600",
      gradient: "from-purple-500 to-violet-600",
      objectives: [
        "Perform multiple regression analysis",
        "Understand and apply ANOVA",
        "Work with non-parametric tests",
        "Design experiments and analyze results",
        "Handle more complex statistical scenarios"
      ],
      practicalExercises: [
        "Complex data analysis projects",
        "Experimental design scenarios",
        "Statistical consulting problems",
        "Software proficiency development",
        "Report writing and presentation"
      ],
      assessment: [
        "Comprehensive data analysis projects",
        "Experimental design proposals",
        "Statistical consulting scenarios",
        "Professional report writing"
      ],
      chapters: [
        {
          number: 10,
          title: "Multiple Regression Analysis",
          duration: "2.5 weeks",
          topics: [
            {
              title: "Multiple Linear Regression",
              content: [
                "Model specification and assumptions",
                "Parameter estimation and interpretation",
                "Multiple correlation and adjusted R²",
                "Partial correlation coefficients"
              ]
            },
            {
              title: "Model Building and Selection",
              content: [
                "Variable selection techniques",
                "Stepwise regression methods",
                "Model comparison criteria (AIC, BIC)",
                "Cross-validation approaches"
              ]
            },
            {
              title: "Regression Diagnostics",
              content: [
                "Residual analysis",
                "Detecting multicollinearity",
                "Influential observations",
                "Model assumptions checking",
                "Remedial measures"
              ]
            }
          ]
        },
        {
          number: 11,
          title: "Analysis of Variance (ANOVA)",
          duration: "2 weeks",
          topics: [
            {
              title: "One-Way ANOVA",
              content: [
                "F-test for comparing means",
                "Post-hoc tests (Tukey, Bonferroni)",
                "Assumptions and violations",
                "Effect size measures"
              ]
            },
            {
              title: "Two-Way ANOVA",
              content: [
                "Main effects and interactions",
                "Factorial designs",
                "Interpretation of results",
                "Follow-up analyses"
              ]
            },
            {
              title: "Repeated Measures ANOVA",
              content: [
                "Within-subjects designs",
                "Sphericity assumption",
                "Mixed-effects models introduction"
              ]
            }
          ]
        },
        {
          number: 12,
          title: "Non-Parametric Statistics",
          duration: "1.5 weeks",
          topics: [
            {
              title: "When to Use Non-Parametric Tests",
              content: [
                "Assumptions violations",
                "Ordinal data analysis",
                "Small sample sizes",
                "Robust alternatives"
              ]
            },
            {
              title: "Common Non-Parametric Tests",
              content: [
                "Mann-Whitney U test",
                "Wilcoxon signed-rank test",
                "Kruskal-Wallis test",
                "Friedman test",
                "Spearman correlation"
              ]
            }
          ]
        },
        {
          number: 13,
          title: "Experimental Design",
          duration: "1.5 weeks",
          topics: [
            {
              title: "Principles of Experimental Design",
              content: [
                "Randomization and control",
                "Blocking and stratification",
                "Factorial designs",
                "Sample size and power analysis"
              ]
            },
            {
              title: "Common Experimental Designs",
              content: [
                "Completely randomized design",
                "Randomized block design",
                "Latin square design",
                "Split-plot design"
              ]
            }
          ]
        },
        {
          number: 14,
          title: "Categorical Data Analysis",
          duration: "2.5 weeks",
          topics: [
            {
              title: "Contingency Table Analysis",
              content: [
                "Chi-square tests of independence",
                "Fisher's exact test",
                "Measures of association",
                "Odds ratios and risk ratios"
              ]
            },
            {
              title: "Logistic Regression Introduction",
              content: [
                "Binary logistic regression",
                "Interpretation of coefficients",
                "Model assessment",
                "Prediction and classification"
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Expert",
      subtitle: "Specialized Applications",
      duration: "10-12 weeks",
      prerequisites: "Professional level completion",
      description: "Advanced statistical modeling, multivariate methods, time series analysis, and Bayesian statistics for specialized applications.",
      icon: Trophy,
      color: "text-orange-600",
      gradient: "from-orange-500 to-red-600",
      objectives: [
        "Apply advanced statistical modeling techniques",
        "Understand and use multivariate methods",
        "Work with time series and longitudinal data",
        "Implement Bayesian statistical methods",
        "Handle big data and modern statistical challenges"
      ],
      practicalExercises: [
        "Advanced modeling projects",
        "Real-world consulting problems",
        "Method comparison studies",
        "Software package development",
        "Research paper critiques"
      ],
      assessment: [
        "Independent research projects",
        "Method implementation assignments",
        "Statistical consulting portfolio",
        "Peer review exercises"
      ],
      chapters: [
        {
          number: 15,
          title: "Advanced Regression Techniques",
          duration: "3 weeks",
          topics: [
            {
              title: "Generalized Linear Models (GLMs)",
              content: [
                "Exponential family distributions",
                "Link functions and model specification",
                "Poisson regression for count data",
                "Gamma regression for continuous positive data",
                "Model diagnostics and interpretation"
              ]
            },
            {
              title: "Regularization Methods",
              content: [
                "Ridge regression",
                "Lasso regression",
                "Elastic net",
                "Cross-validation for parameter tuning",
                "Variable selection and shrinkage"
              ]
            },
            {
              title: "Non-Linear Regression",
              content: [
                "Polynomial regression",
                "Spline regression",
                "Generalized additive models (GAMs)",
                "Non-parametric regression techniques"
              ]
            }
          ]
        },
        {
          number: 16,
          title: "Multivariate Statistics",
          duration: "2.5 weeks",
          topics: [
            {
              title: "Principal Component Analysis (PCA)",
              content: [
                "Dimensionality reduction concepts",
                "Eigenvalues and eigenvectors",
                "Component interpretation",
                "Applications and limitations"
              ]
            },
            {
              title: "Factor Analysis",
              content: [
                "Exploratory factor analysis",
                "Factor extraction methods",
                "Factor rotation",
                "Confirmatory factor analysis introduction"
              ]
            },
            {
              title: "Cluster Analysis",
              content: [
                "Hierarchical clustering",
                "K-means clustering",
                "Model-based clustering",
                "Validation and interpretation"
              ]
            },
            {
              title: "Discriminant Analysis",
              content: [
                "Linear discriminant analysis",
                "Quadratic discriminant analysis",
                "Classification accuracy",
                "Applications in pattern recognition"
              ]
            }
          ]
        },
        {
          number: 17,
          title: "Time Series Analysis",
          duration: "2.5 weeks",
          topics: [
            {
              title: "Time Series Components",
              content: [
                "Trend, seasonality, and cyclical patterns",
                "Decomposition methods",
                "Stationarity and differencing"
              ]
            },
            {
              title: "ARIMA Models",
              content: [
                "Autoregressive models",
                "Moving average models",
                "Integrated models",
                "Model identification and estimation",
                "Forecasting and prediction intervals"
              ]
            },
            {
              title: "Advanced Time Series Methods",
              content: [
                "Exponential smoothing",
                "State space models",
                "Vector autoregression (VAR)",
                "GARCH models for volatility"
              ]
            }
          ]
        },
        {
          number: 18,
          title: "Longitudinal Data Analysis",
          duration: "2 weeks",
          topics: [
            {
              title: "Repeated Measures Data",
              content: [
                "Data structure and challenges",
                "Missing data patterns",
                "Growth curve modeling"
              ]
            },
            {
              title: "Mixed-Effects Models",
              content: [
                "Random effects and fixed effects",
                "Hierarchical linear models",
                "Model specification and interpretation",
                "Software implementation"
              ]
            }
          ]
        },
        {
          number: 19,
          title: "Bayesian Statistics",
          duration: "2 weeks",
          topics: [
            {
              title: "Bayesian Fundamentals",
              content: [
                "Bayes' theorem and posterior distributions",
                "Prior distributions and their selection",
                "Conjugate priors",
                "Bayesian vs. frequentist approaches"
              ]
            },
            {
              title: "Computational Methods",
              content: [
                "Markov Chain Monte Carlo (MCMC)",
                "Gibbs sampling",
                "Metropolis-Hastings algorithm",
                "Convergence diagnostics"
              ]
            },
            {
              title: "Bayesian Applications",
              content: [
                "Bayesian regression",
                "Hierarchical Bayesian models",
                "Bayesian hypothesis testing",
                "Model selection and averaging"
              ]
            }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Senior",
      subtitle: "Research and Innovation",
      duration: "12-16 weeks",
      prerequisites: "Expert level completion",
      description: "Original statistical research, method development, leadership, and contribution to the statistical literature at the highest professional level.",
      icon: Crown,
      color: "text-red-600",
      gradient: "from-red-500 to-pink-600",
      objectives: [
        "Conduct original statistical research",
        "Develop new statistical methods",
        "Lead complex statistical projects",
        "Mentor others in statistical practice",
        "Contribute to the statistical literature"
      ],
      practicalExercises: [
        "Original research thesis",
        "Method development project",
        "Professional portfolio",
        "Leadership demonstration",
        "Contribution to statistical community"
      ],
      assessment: [
        "Independent research project",
        "Original research question",
        "Method development or application",
        "Comprehensive analysis",
        "Professional presentation",
        "Peer review process"
      ],
      chapters: [
        {
          number: 20,
          title: "Statistical Research Methods",
          duration: "3 weeks",
          topics: [
            {
              title: "Research Design and Planning",
              content: [
                "Formulating research questions",
                "Literature review and gap analysis",
                "Study design considerations",
                "Ethics in statistical research"
              ]
            },
            {
              title: "Simulation Studies",
              content: [
                "Monte Carlo methods",
                "Bootstrap and resampling techniques",
                "Simulation design principles",
                "Performance evaluation metrics"
              ]
            },
            {
              title: "Method Development",
              content: [
                "Identifying methodological gaps",
                "Theoretical development",
                "Computational implementation",
                "Validation and comparison"
              ]
            }
          ]
        },
        {
          number: 21,
          title: "Modern Statistical Computing",
          duration: "3 weeks",
          topics: [
            {
              title: "High-Performance Computing",
              content: [
                "Parallel processing",
                "Distributed computing",
                "Cloud computing for statistics",
                "Scalability considerations"
              ]
            },
            {
              title: "Machine Learning Integration",
              content: [
                "Statistical learning vs. machine learning",
                "Ensemble methods",
                "Deep learning basics",
                "Model interpretability"
              ]
            },
            {
              title: "Big Data Statistics",
              content: [
                "Streaming data analysis",
                "Dimensionality reduction for big data",
                "Approximate methods",
                "Scalable algorithms"
              ]
            }
          ]
        },
        {
          number: 22,
          title: "Advanced Specialized Topics",
          duration: "3 weeks",
          topics: [
            {
              title: "Survival Analysis",
              content: [
                "Kaplan-Meier estimation",
                "Cox proportional hazards model",
                "Parametric survival models",
                "Competing risks analysis"
              ]
            },
            {
              title: "Spatial Statistics",
              content: [
                "Spatial correlation and autocorrelation",
                "Kriging and spatial interpolation",
                "Spatial regression models",
                "Geographic information systems integration"
              ]
            },
            {
              title: "Network Analysis",
              content: [
                "Graph theory basics",
                "Network measures and properties",
                "Statistical models for networks",
                "Social network analysis"
              ]
            }
          ]
        },
        {
          number: 23,
          title: "Statistical Consulting and Communication",
          duration: "3 weeks",
          topics: [
            {
              title: "Consulting Skills",
              content: [
                "Client communication",
                "Problem identification and scoping",
                "Statistical collaboration",
                "Project management"
              ]
            },
            {
              title: "Statistical Communication",
              content: [
                "Writing for different audiences",
                "Data storytelling",
                "Visualization for communication",
                "Presentation skills"
              ]
            },
            {
              title: "Reproducible Research",
              content: [
                "Documentation standards",
                "Version control",
                "Literate programming",
                "Open science practices"
              ]
            }
          ]
        },
        {
          number: 24,
          title: "Professional Development",
          duration: "4 weeks",
          topics: [
            {
              title: "Career Paths in Statistics",
              content: [
                "Academic careers",
                "Industry applications",
                "Government and policy",
                "Entrepreneurship in statistics"
              ]
            },
            {
              title: "Continuing Education",
              content: [
                "Professional organizations",
                "Conference participation",
                "Peer review process",
                "Lifelong learning strategies"
              ]
            },
            {
              title: "Leadership in Statistics",
              content: [
                "Team leadership",
                "Mentoring junior statisticians",
                "Strategic planning",
                "Innovation management"
              ]
            }
          ]
        }
      ]
    }
  ];

  const currentLevel = levels.find(level => level.id === selectedLevel) || levels[0];

  const resources = {
    software: {
      beginner: ["Excel", "Google Sheets", "Basic calculators"],
      intermediate: ["R", "Python (pandas, scipy)", "SPSS"],
      professional: ["SAS", "Stata", "Advanced R packages"],
      expert: ["Specialized software", "Custom programming"],
      senior: ["High-performance computing", "Cloud platforms"]
    },
    textbooks: {
      beginner: "Statistics for People Who (Think They) Hate Statistics",
      intermediate: "Introduction to Statistical Learning",
      professional: "Applied Linear Statistical Models",
      expert: "The Elements of Statistical Learning",
      senior: "Current journal articles and research papers"
    },
    organizations: [
      "American Statistical Association (ASA)",
      "Royal Statistical Society (RSS)",
      "International Statistical Institute (ISI)",
      "Regional statistical societies",
      "Industry-specific organizations"
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container-main section-padding space-section">
        {/* Course Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-display text-primary mb-6">Statistical Course Module</h1>
          <p className="text-subtitle text-secondary max-w-4xl mx-auto mb-8">
            Complete Statistics Knowledge Framework
          </p>
          <p className="text-body text-muted max-w-3xl mx-auto">
            This comprehensive module takes learners from basic statistical concepts to advanced statistical modeling 
            and research methodology. Each level builds upon previous knowledge while introducing increasingly 
            sophisticated techniques and applications.
          </p>
        </div>

        {/* Level Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const isSelected = selectedLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-card'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${level.gradient}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-primary'}`}>
                  Level {level.id}: {level.title}
                </h3>
                <p className={`text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-secondary'}`}>
                  {level.subtitle}
                </p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-muted">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{level.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Level Overview */}
        <div className="card p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentLevel.gradient}`}>
                  <currentLevel.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-title text-primary">Level {currentLevel.id}: {currentLevel.title}</h2>
                  <p className="text-subtitle text-secondary">{currentLevel.subtitle}</p>
                </div>
              </div>
              
              <p className="text-body text-secondary mb-6">{currentLevel.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-primary">Duration</span>
                  </div>
                  <p className="text-sm text-secondary">{currentLevel.duration}</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-primary">Prerequisites</span>
                  </div>
                  <p className="text-sm text-secondary">{currentLevel.prerequisites}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                Learning Objectives
              </h3>
              <div className="space-y-3">
                {currentLevel.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm text-secondary">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-8">
          <h2 className="text-title text-primary">Course Chapters</h2>
          
          <div className="space-y-6">
            {currentLevel.chapters.map((chapter) => {
              const isExpanded = expandedChapter === chapter.number;
              const isCompleted = completedChapters.has(`${currentLevel.id}-${chapter.number}`);
              
              return (
                <div key={chapter.number} className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleChapterCompletion(currentLevel.id, chapter.number)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isCompleted
                              ? 'bg-green-500 border-green-500'
                              : 'border-neutral-300 dark:border-neutral-600 hover:border-green-500'
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                        </button>
                        <div>
                          <h3 className="text-lg font-medium text-primary">
                            Chapter {chapter.number}: {chapter.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{chapter.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Book className="w-3 h-3" />
                              <span>{chapter.topics.length} topics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedChapter(isExpanded ? null : chapter.number)}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-neutral-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-neutral-500" />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="space-y-6 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                        {chapter.topics.map((topic, topicIndex) => {
                          const topicKey = `${chapter.number}-${topicIndex}`;
                          const isTopicExpanded = expandedTopic === topicKey;
                          
                          return (
                            <div key={topicIndex} className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                              <button
                                onClick={() => setExpandedTopic(isTopicExpanded ? null : topicKey)}
                                className="w-full flex items-center justify-between text-left"
                              >
                                <h4 className="text-base font-medium text-primary">{topic.title}</h4>
                                {isTopicExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                                )}
                              </button>
                              
                              {isTopicExpanded && (
                                <div className="mt-4 space-y-4">
                                  {topic.content.map((item, itemIndex) => (
                                    <div key={itemIndex} className="prose prose-sm max-w-none dark:prose-invert">
                                      <p className="text-sm text-secondary leading-relaxed mb-4">{item}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practical Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Practical Exercises */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-orange-500" />
              Practical Exercises
            </h3>
            <div className="space-y-3">
              {currentLevel.practicalExercises.map((exercise, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Code className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-sm text-secondary">{exercise}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-500" />
              Assessment Methods
            </h3>
            <div className="space-y-3">
              {currentLevel.assessment.map((assessment, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm text-secondary">{assessment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-title text-primary mb-8">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Software and Tools */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-purple-500" />
                Software & Tools
              </h3>
              <div className="space-y-4">
                {Object.entries(resources.software).map(([level, tools]) => (
                  <div key={level}>
                    <h4 className="text-sm font-medium text-secondary capitalize mb-2">{level}</h4>
                    <div className="space-y-1">
                      {(tools as string[]).map((tool, index) => (
                        <p key={index} className="text-xs text-muted pl-3 border-l-2 border-neutral-200 dark:border-neutral-700">
                          {tool}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Textbooks */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-green-500" />
                Recommended Textbooks
              </h3>
              <div className="space-y-4">
                {Object.entries(resources.textbooks).map(([level, book]) => (
                  <div key={level}>
                    <h4 className="text-sm font-medium text-secondary capitalize mb-2">{level}</h4>
                    <p className="text-xs text-muted pl-3 border-l-2 border-neutral-200 dark:border-neutral-700">
                      {book}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Organizations */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Professional Development
              </h3>
              <div className="space-y-3">
                {resources.organizations.map((org, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-secondary">{org}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Online Resources */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            Online Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">Documentation</h4>
              <p className="text-xs text-muted">Statistical software documentation</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">Educational</h4>
              <p className="text-xs text-muted">Open courseware materials</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">Community</h4>
              <p className="text-xs text-muted">Statistical blogs and forums</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-secondary mb-2">Research</h4>
              <p className="text-xs text-muted">Research databases and journals</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-medium text-primary mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {levels.map((level) => {
              const completedCount = level.chapters.filter(chapter => 
                completedChapters.has(`${level.id}-${chapter.number}`)
              ).length;
              const totalChapters = level.chapters.length;
              const progress = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;
              
              return (
                <div key={level.id} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-neutral-200 dark:text-neutral-700"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                        className="text-blue-500 transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-primary">Level {level.id}</h4>
                  <p className="text-xs text-muted">{completedCount}/{totalChapters} chapters</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalCourseModule;