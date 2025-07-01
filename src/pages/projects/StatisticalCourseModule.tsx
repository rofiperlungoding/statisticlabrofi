import React from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

// Content for "What is Statistics?" - Improved formatting
const whatIsStatisticsContent = `
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">What is Statistics?</h3>
    
    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Definition and Core Purpose
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistics is the science of collecting, organizing, analyzing, interpreting, and presenting data. 
        It provides a framework for making informed decisions and drawing reliable conclusions in the face of uncertainty. 
        Far from being just about numbers, statistics is about understanding the world around us through evidence.
      </p>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>Example:</strong> When a pharmaceutical company tests a new drug, they use statistics to determine 
          if the drug is effective and safe. They collect data on patients who receive the drug versus a placebo, 
          and then use statistical analysis to see if any observed differences are likely due to the drug or just random chance.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Real-World Impact and Everyday Decision-Making
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistics impacts nearly every aspect of modern life, from the weather forecast you check daily 
        to the personalized recommendations you receive on streaming platforms. It helps us make sense of 
        complex information and navigate uncertainty.
      </p>
      
      <div class="grid gap-4 mt-4">
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h5 class="font-semibold text-green-800 dark:text-green-200 mb-2">Weather Forecasting</h5>
          <p class="text-green-700 dark:text-green-300 text-sm leading-relaxed">
            Meteorologists use statistical models based on historical weather patterns and current atmospheric 
            conditions to predict future weather. The "70% chance of rain" you see is a statistical probability.
          </p>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Healthcare</h5>
          <p class="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
            Doctors use statistics to understand disease prevalence, evaluate treatment effectiveness, and assess 
            patient risks. Clinical trials are heavily reliant on statistical methods to prove drug efficacy.
          </p>
        </div>
        
        <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h5 class="font-semibold text-orange-800 dark:text-orange-200 mb-2">Business and Marketing</h5>
          <p class="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
            Companies use statistics to analyze market trends, understand consumer behavior, and optimize advertising 
            campaigns. A/B testing, for instance, uses statistical hypothesis testing to determine which version 
            of a webpage performs better.
          </p>
        </div>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
          <h5 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Sports Analytics</h5>
          <p class="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
            Teams use statistics to evaluate player performance, strategize for games, and make recruitment decisions. 
            Sabermetrics in baseball is a prime example of applying statistical analysis to sports.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Descriptive vs. Inferential Statistics
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistics is broadly divided into two main branches:
      </p>
      
      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
          <h5 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Descriptive Statistics</h5>
          <p class="text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
            This branch focuses on summarizing and describing the main features of a dataset. 
            It helps us organize and make sense of data.
          </p>
          <div class="bg-white dark:bg-gray-800 p-4 rounded border">
            <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Example:</h6>
            <p class="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              If you collect the ages of all students in a classroom, descriptive statistics would involve 
              calculating the average age, finding the most common age (mode), or creating a bar chart to 
              show the distribution of ages. You are simply describing the data you have.
            </p>
          </div>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
          <h5 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Inferential Statistics</h5>
          <p class="text-green-700 dark:text-green-300 leading-relaxed mb-4">
            This branch involves making predictions or inferences about a larger population based on 
            a sample of data from that population. It allows us to draw conclusions beyond the immediate data.
          </p>
          <div class="bg-white dark:bg-gray-800 p-4 rounded border">
            <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Example:</h6>
            <p class="text-green-700 dark:text-green-300 text-sm leading-relaxed">
              Instead of surveying every student in a large university, you might survey a random sample of 
              500 students to estimate the average GPA of all students in the university. Inferential statistics 
              would help you determine how confident you can be that your sample's average GPA is a good 
              estimate for the entire university's average GPA.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Statistical Thinking and Reasoning
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistical thinking is a way of approaching problems that involves understanding variation, 
        recognizing the role of randomness, and using data to make informed decisions. It's about asking 
        the right questions, collecting relevant data, analyzing it appropriately, and interpreting the 
        results in context.
      </p>
      
      <div class="grid gap-4">
        <div class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span class="text-white text-sm font-bold">1</span>
          </div>
          <div>
            <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Understanding Variation</h5>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Nothing is exactly the same. Statistical thinking acknowledges that data points will naturally vary. 
              For example, not all apples from the same tree will have the exact same weight.
            </p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span class="text-white text-sm font-bold">2</span>
          </div>
          <div>
            <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Role of Randomness</h5>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Many events are influenced by chance. Statistical reasoning helps us distinguish between patterns 
              that are genuinely significant and those that could simply be due to random variation.
            </p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span class="text-white text-sm font-bold">3</span>
          </div>
          <div>
            <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Data-Driven Decisions</h5>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Instead of relying on intuition or anecdotal evidence, statistical thinking encourages decisions 
              based on empirical data.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p class="text-yellow-800 dark:text-yellow-200 text-sm leading-relaxed">
          <strong>Key Insight:</strong> By applying statistical thinking, you can analyze a dataset, identify patterns, 
          test hypotheses, and draw meaningful conclusions that are supported by evidence, rather than just assumptions. 
          This systematic approach is invaluable in research, business, and everyday problem-solving.
        </p>
      </div>
    </section>

    <hr class="border-gray-300 dark:border-gray-600 my-8"/>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Key Terms</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Statistics:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">The science of collecting, organizing, analyzing, interpreting, and presenting data.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Facts, figures, or information collected for analysis.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Descriptive Statistics:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Methods for summarizing and describing the main features of a dataset.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Inferential Statistics:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Methods for making predictions or inferences about a population based on sample data.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Population:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">The entire group of individuals or items that we want to study.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Sample:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A subset of the population that we actually observe and collect data from.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Variable:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A characteristic or attribute that can take different values.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Parameter:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A numerical summary of a population.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Statistic:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A numerical summary of a sample.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Practice Problems</h4>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">Problem 1</h5>
        <p class="text-blue-700 dark:text-blue-300 mb-4 leading-relaxed">
          Identify whether each scenario involves descriptive or inferential statistics:
        </p>
        <ol class="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <span>A teacher calculates the average test score for her class of 30 students.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <span>A polling company surveys 1,000 voters to predict the outcome of an election.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <span>A company creates a pie chart showing the breakdown of their sales by region.</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <span>Researchers test a new teaching method on 100 students to determine if it's more effective than traditional methods.</span>
          </li>
        </ol>
      </div>
      
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h5 class="font-semibold text-green-800 dark:text-green-200 mb-3">Solution 1</h5>
        <ol class="space-y-3 text-green-700 dark:text-green-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <div>
              <span class="font-semibold">Descriptive:</span>
              <span class="ml-1">The teacher is summarizing data from the entire class (complete dataset).</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <div>
              <span class="font-semibold">Inferential:</span>
              <span class="ml-1">Using a sample of 1,000 voters to make predictions about the entire voting population.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <div>
              <span class="font-semibold">Descriptive:</span>
              <span class="ml-1">Creating a visual summary of existing company sales data.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <div>
              <span class="font-semibold">Inferential:</span>
              <span class="ml-1">Using results from 100 students to make conclusions about the effectiveness for all students who might use this method.</span>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Summary Points</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Statistics is the science of making sense of data to make informed decisions.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            It impacts daily life through predictions, evaluations, and informed choices.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            <strong>Descriptive statistics</strong> summarizes data; <strong>inferential statistics</strong> makes predictions about populations from samples.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            <strong>Statistical thinking</strong> involves understanding variation, randomness, and making data-driven decisions.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Statistics provides a systematic approach to problem-solving using evidence rather than assumptions.
          </span>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Connection to Next Topic</h4>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
        <p class="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
          This introduction sets the stage for understanding the fundamental role of data. The next section, 
          <strong>"Types of Data,"</strong> will delve into the different forms data can take, which is crucial 
          for selecting appropriate statistical methods.
        </p>
      </div>
    </section>
  </div>
`;

// Content for "Types of Data" - Improved formatting
const typesOfDataContent = `
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Types of Data</h3>
    
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
      <p class="text-blue-700 dark:text-blue-300 leading-relaxed">
        Data is the raw material of statistics. It refers to facts, figures, or information collected for analysis. 
        Understanding the different types of data is crucial because it dictates which statistical methods are 
        appropriate for analysis and how results can be interpreted. <strong>Misclassifying data can lead to incorrect conclusions.</strong>
      </p>
    </div>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Qualitative vs. Quantitative Data
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Data can broadly be categorized into two main types: qualitative and quantitative.
      </p>
      
      <div class="space-y-6">
        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
          <h5 class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
            Qualitative Data (Categorical Data)
          </h5>
          <p class="text-purple-700 dark:text-purple-300 leading-relaxed mb-4">
            This type of data describes qualities or characteristics that cannot be measured numerically. 
            It represents categories or attributes.
          </p>
          
          <div class="space-y-4">
            <div>
              <h6 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-purple-800 dark:text-purple-200">Simple:</span>
                  <span class="text-purple-700 dark:text-purple-300 ml-2 text-sm">
                    Colors (red, blue, green), types of fruit (apple, banana, orange), gender (male, female, non-binary)
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-purple-800 dark:text-purple-200">Complex:</span>
                  <span class="text-purple-700 dark:text-purple-300 ml-2 text-sm">
                    Customer feedback (positive, negative, neutral), political affiliation (Democrat, Republican, Independent), 
                    brand preferences (Nike, Adidas, Puma)
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Real-World Application:</h6>
              <p class="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                In a market research survey, collecting qualitative data on "favorite car brands" helps companies 
                understand consumer preferences and segment their audience. For instance, knowing that a significant 
                portion of your target demographic prefers "luxury sedans" over "economy hatchbacks" guides product 
                development and marketing strategies.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
          <h5 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
            Quantitative Data (Numerical Data)
          </h5>
          <p class="text-green-700 dark:text-green-300 leading-relaxed mb-4">
            This type of data consists of numerical values that represent counts or measurements. 
            It can be subjected to mathematical operations.
          </p>
          
          <div class="space-y-4">
            <div>
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-green-800 dark:text-green-200">Simple:</span>
                  <span class="text-green-700 dark:text-green-300 ml-2 text-sm">
                    Age (in years), height (in cm), number of siblings, temperature (in Celsius)
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-green-800 dark:text-green-200">Complex:</span>
                  <span class="text-green-700 dark:text-green-300 ml-2 text-sm">
                    Stock prices, population density, annual income, reaction time in milliseconds
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Real-World Application:</h6>
              <p class="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                A hospital collects quantitative data on patient recovery times (e.g., days until discharge) after 
                a specific surgery. Analyzing this data allows them to assess the effectiveness of new surgical 
                techniques or post-operative care protocols, aiming to reduce recovery periods and improve patient outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Discrete vs. Continuous Variables
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Quantitative data can be further divided into discrete and continuous variables.
      </p>
      
      <div class="space-y-6">
        <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
          <h5 class="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">Discrete Variables</h5>
          <p class="text-orange-700 dark:text-orange-300 leading-relaxed mb-4">
            These are quantitative variables whose values can only take on a finite number of values or 
            a countably infinite number of values. They typically result from counting.
          </p>
          
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Characteristics:</h6>
              <p class="text-orange-700 dark:text-orange-300 text-sm">
                Often integers, cannot be subdivided meaningfully.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-orange-800 dark:text-orange-200">Simple:</span>
                  <span class="text-orange-700 dark:text-orange-300 ml-2 text-sm">
                    Number of cars in a parking lot (10, 25, 100), number of heads when flipping a coin 5 times (0, 1, 2, 3, 4, 5), 
                    number of defects in a batch of products
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-orange-800 dark:text-orange-200">Complex:</span>
                  <span class="text-orange-700 dark:text-orange-300 ml-2 text-sm">
                    Number of successful transactions per hour on an e-commerce website, 
                    number of students enrolled in a specific course
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Real-World Application:</h6>
              <p class="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
                A quality control manager counts the number of defective items produced on an assembly line each day. 
                This discrete data helps track production quality, identify trends, and implement corrective actions 
                to minimize defects.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border-l-4 border-teal-500">
          <h5 class="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">Continuous Variables</h5>
          <p class="text-teal-700 dark:text-teal-300 leading-relaxed mb-4">
            These are quantitative variables whose values can take on any value within a given range. 
            They typically result from measuring.
          </p>
          
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Characteristics:</h6>
              <p class="text-teal-700 dark:text-teal-300 text-sm">
                Can be infinitely subdivided, often involve decimals.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-teal-800 dark:text-teal-200">Simple:</span>
                  <span class="text-teal-700 dark:text-teal-300 ml-2 text-sm">
                    Height (175.3 cm, 180.1 cm), weight (65.7 kg, 72.4 kg), time taken to complete a task (3.5 minutes, 4.12 seconds)
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-teal-800 dark:text-teal-200">Complex:</span>
                  <span class="text-teal-700 dark:text-teal-300 ml-2 text-sm">
                    Blood pressure readings, exact temperature of a chemical reaction, precise voltage in an electrical circuit
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Real-World Application:</h6>
              <p class="text-teal-700 dark:text-teal-300 text-sm leading-relaxed">
                Meteorologists collect continuous data on daily temperatures, humidity levels, and wind speeds. 
                This data is used to create weather models, predict future conditions, and issue warnings for extreme 
                weather events, impacting everything from agriculture to disaster preparedness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Levels of Measurement
      </h4>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Beyond qualitative and quantitative, data can also be classified by its level of measurement, which determines 
        the type of statistical analysis that can be performed. There are four main levels, progressing from least to most informative:
      </p>
      
      <div class="space-y-6">
        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">1</span>
            </div>
            <h5 class="text-lg font-semibold text-red-800 dark:text-red-200">Nominal Scale</h5>
          </div>
          
          <div class="space-y-4">
            <p class="text-red-700 dark:text-red-300 leading-relaxed">
              This is the lowest level of measurement. Data at this level are categorized without any order or ranking. 
              Numbers, if used, are merely labels and have no mathematical meaning.
            </p>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-red-800 dark:text-red-200 mb-2">Characteristics:</h6>
              <p class="text-red-700 dark:text-red-300 text-sm">
                Categories, no order, no numerical significance.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-red-800 dark:text-red-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-red-800 dark:text-red-200">Simple:</span>
                  <span class="text-red-700 dark:text-red-300 ml-2 text-sm">
                    Eye color (blue, brown, green), marital status (single, married, divorced), country of origin
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-red-800 dark:text-red-200">Complex:</span>
                  <span class="text-red-700 dark:text-red-300 ml-2 text-sm">
                    Types of diseases (e.g., Type A, Type B), car manufacturers (Ford, Toyota, BMW)
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-red-800 dark:text-red-200 mb-2">Real-World Application:</h6>
              <p class="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                A survey asks respondents for their favorite type of music. The responses (e.g., Rock, Pop, Jazz, Classical) 
                are nominal data. You can count how many people prefer each genre, but you cannot rank them or perform 
                arithmetic operations.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">2</span>
            </div>
            <h5 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Ordinal Scale</h5>
          </div>
          
          <div class="space-y-4">
            <p class="text-yellow-700 dark:text-yellow-300 leading-relaxed">
              Data at this level can be categorized and ranked, but the differences between categories are not meaningful 
              or cannot be precisely measured. The order matters, but the intervals between ranks are not necessarily equal.
            </p>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Characteristics:</h6>
              <p class="text-yellow-700 dark:text-yellow-300 text-sm">
                Categories, ordered, unequal intervals.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-yellow-800 dark:text-yellow-200">Simple:</span>
                  <span class="text-yellow-700 dark:text-yellow-300 ml-2 text-sm">
                    Education level (High School, Bachelor's, Master's, PhD), satisfaction ratings 
                    (Very Dissatisfied, Dissatisfied, Neutral, Satisfied, Very Satisfied), military ranks
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-yellow-800 dark:text-yellow-200">Complex:</span>
                  <span class="text-yellow-700 dark:text-yellow-300 ml-2 text-sm">
                    Socioeconomic status (low, middle, high income), Olympic medals (Gold, Silver, Bronze)
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Real-World Application:</h6>
              <p class="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                In a restaurant survey, customers rate their dining experience as "Excellent," "Good," "Fair," or "Poor." 
                We know "Excellent" is better than "Good," but we cannot quantify how much better, nor can we assume 
                the difference between "Excellent" and "Good" is the same as between "Good" and "Fair."
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">3</span>
            </div>
            <h5 class="text-lg font-semibold text-blue-800 dark:text-blue-200">Interval Scale</h5>
          </div>
          
          <div class="space-y-4">
            <p class="text-blue-700 dark:text-blue-300 leading-relaxed">
              Data at this level has all the properties of ordinal data, but the intervals between values are equal and meaningful. 
              However, there is no true zero point, meaning zero does not indicate the complete absence of the quantity. 
              Ratios are not meaningful.
            </p>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Characteristics:</h6>
              <p class="text-blue-700 dark:text-blue-300 text-sm">
                Ordered, equal intervals, no true zero.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-blue-800 dark:text-blue-200">Simple:</span>
                  <span class="text-blue-700 dark:text-blue-300 ml-2 text-sm">
                    Temperature in Celsius or Fahrenheit (0°C does not mean no temperature), years (Year 0 does not mean no time)
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-blue-800 dark:text-blue-200">Complex:</span>
                  <span class="text-blue-700 dark:text-blue-300 ml-2 text-sm">
                    IQ scores, standardized test scores (e.g., SAT, GRE)
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Real-World Application:</h6>
              <p class="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                Measuring temperature in Celsius. The difference between 20°C and 30°C is the same as between 30°C and 40°C 
                (a 10-degree difference). However, 40°C is not "twice as hot" as 20°C because 0°C is an arbitrary point, 
                not an absolute absence of heat.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">4</span>
            </div>
            <h5 class="text-lg font-semibold text-green-800 dark:text-green-200">Ratio Scale</h5>
          </div>
          
          <div class="space-y-4">
            <p class="text-green-700 dark:text-green-300 leading-relaxed">
              This is the highest level of measurement. Data at this level has all the properties of interval data, 
              but it also has a true zero point, which indicates the complete absence of the quantity being measured. 
              This allows for meaningful ratios.
            </p>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Characteristics:</h6>
              <p class="text-green-700 dark:text-green-300 text-sm">
                Ordered, equal intervals, true zero, meaningful ratios.
              </p>
            </div>
            
            <div>
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Examples:</h6>
              <div class="grid gap-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-green-800 dark:text-green-200">Simple:</span>
                  <span class="text-green-700 dark:text-green-300 ml-2 text-sm">
                    Height (0 cm means no height), weight (0 kg means no weight), age (0 years means no age), income
                  </span>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded border">
                  <span class="font-medium text-green-800 dark:text-green-200">Complex:</span>
                  <span class="text-green-700 dark:text-green-300 ml-2 text-sm">
                    Number of products sold, reaction time, Kelvin temperature (0 Kelvin is absolute zero)
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Real-World Application:</h6>
              <p class="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                Measuring a person's weight in kilograms. 0 kg means no weight. A person weighing 80 kg is twice as heavy 
                as a person weighing 40 kg. This ratio is meaningful because of the true zero point.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Data Collection Methods and Sources (Brief Introduction)
      </h4>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          The type of data collected often depends on the method used and the source from which it is obtained. 
          Common methods include surveys, experiments, observations, and using existing records. Sources can range 
          from primary (collected directly by the researcher) to secondary (data already collected by others). 
          Understanding these aspects helps ensure data quality and relevance for statistical analysis. 
          <strong>This topic will be explored in more detail in later chapters.</strong>
        </p>
      </div>
    </section>

    <hr class="border-gray-300 dark:border-gray-600 my-8"/>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Key Terms</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Facts, figures, or information collected for analysis.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Qualitative Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Non-numerical data describing qualities or characteristics.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Quantitative Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Numerical data representing counts or measurements.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Discrete Variable:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Quantitative data that can only take specific, countable values.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Continuous Variable:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Quantitative data that can take any value within a range.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Nominal Scale:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Categorical data without order or ranking.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Ordinal Scale:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Categorical data with a meaningful order, but unequal intervals.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Interval Scale:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Numerical data with equal intervals, but no true zero point.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Ratio Scale:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Numerical data with equal intervals and a true zero point, allowing for meaningful ratios.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Practice Problems</h4>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">Problem 1</h5>
        <p class="text-blue-700 dark:text-blue-300 mb-4 leading-relaxed">
          Classify the following data as qualitative or quantitative, and if quantitative, as discrete or continuous:
        </p>
        <ol class="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <span>Number of students in a classroom</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <span>Brand of smartphone owned</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <span>Time taken to run a marathon</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <span>Rating of a movie (e.g., 1-5 stars)</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">e)</span>
            <span>Weight of a newborn baby</span>
          </li>
        </ol>
      </div>
      
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h5 class="font-semibold text-green-800 dark:text-green-200 mb-3">Solution 1</h5>
        <ol class="space-y-3 text-green-700 dark:text-green-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <div>
              <span class="font-semibold">Quantitative, Discrete:</span>
              <span class="ml-1">You count the number of students.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <div>
              <span class="font-semibold">Qualitative:</span>
              <span class="ml-1">Describes a characteristic (brand) that is not numerical.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <div>
              <span class="font-semibold">Quantitative, Continuous:</span>
              <span class="ml-1">Time can be measured to any degree of precision.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <div>
              <span class="font-semibold">Quantitative, Discrete:</span>
              <span class="ml-1">While numerical, it's typically a count of stars, and the intervals between ratings might not be equal.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">e)</span>
            <div>
              <span class="font-semibold">Quantitative, Continuous:</span>
              <span class="ml-1">Weight can take any value within a range.</span>
            </div>
          </li>
        </ol>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">Problem 2</h5>
        <p class="text-purple-700 dark:text-purple-300 mb-4 leading-relaxed">
          Identify the level of measurement (nominal, ordinal, interval, ratio) for each of the following:
        </p>
        <ol class="space-y-2 text-purple-700 dark:text-purple-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <span>Colors of cars in a parking lot</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <span>Temperature in Kelvin</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <span>Ranking of tennis players (1st, 2nd, 3rd)</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <span>Years of birth (e.g., 1990, 2000)</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">e)</span>
            <span>Socioeconomic status (low, middle, high)</span>
          </li>
        </ol>
      </div>
      
      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
        <h5 class="font-semibold text-orange-800 dark:text-orange-200 mb-3">Solution 2</h5>
        <ol class="space-y-3 text-orange-700 dark:text-orange-300 text-sm">
          <li class="flex items-start space-x-2">
            <span class="font-medium">a)</span>
            <div>
              <span class="font-semibold">Nominal:</span>
              <span class="ml-1">Categories without order.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">b)</span>
            <div>
              <span class="font-semibold">Ratio:</span>
              <span class="ml-1">Has a true zero point (absolute zero), allowing for meaningful ratios.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">c)</span>
            <div>
              <span class="font-semibold">Ordinal:</span>
              <span class="ml-1">Has a clear order, but the difference in skill between 1st and 2nd might not be the same as between 2nd and 3rd.</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">d)</span>
            <div>
              <span class="font-semibold">Interval:</span>
              <span class="ml-1">Ordered, equal intervals, but no true zero point (Year 0 is arbitrary).</span>
            </div>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-medium">e)</span>
            <div>
              <span class="font-semibold">Ordinal:</span>
              <span class="ml-1">Has an order, but the difference between "low" and "middle" might not be quantifiable.</span>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Summary Points</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Data is the fundamental input for statistical analysis.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            <strong>Qualitative data</strong> describes categories or attributes; <strong>quantitative data</strong> consists of numerical measurements.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Quantitative data can be <strong>discrete</strong> (countable values) or <strong>continuous</strong> (measurable within a range).
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            The four <strong>levels of measurement</strong> (Nominal → Ordinal → Interval → Ratio) determine permissible statistical operations.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Understanding data types is crucial for selecting appropriate statistical methods and drawing valid conclusions.
          </span>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Connection to Previous and Upcoming Concepts</h4>
      
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
          <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Connection to "What is Statistics?"</h5>
          <p class="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            Data is the core subject of statistics. The methods discussed in the previous section (descriptive, inferential) 
            are applied <em>to</em> data, and the type of data dictates which methods are appropriate.
          </p>
        </div>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
          <h5 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Connection to "Descriptive Statistics" (Chapter 2)</h5>
          <p class="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
            The type and level of measurement of your data directly influence which descriptive statistics (e.g., mean, median, mode) 
            and visualizations (e.g., bar charts, histograms) are meaningful and appropriate to use. For example, calculating 
            the mean of nominal data (like eye color) makes no sense.
          </p>
        </div>
      </div>
    </section>
  </div>
`;

// Content for "Data Collection Methods and Sources" - Improved formatting
const dataCollectionContent = `
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Collection Methods and Sources</h3>
    
    <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
      <p class="text-yellow-700 dark:text-yellow-300 leading-relaxed">
        The quality and reliability of statistical analysis heavily depend on how data is collected. 
        Understanding different data collection methods and sources is essential for ensuring that your analysis 
        is valid, reliable, and appropriate for your research questions.
      </p>
    </div>

    <section class="space-y-6">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Primary vs. Secondary Data
      </h4>
      
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
          <h5 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Primary Data</h5>
          <p class="text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
            Data collected directly by the researcher for the specific purpose of their study.
          </p>
          
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Advantages:</h6>
              <ul class="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                <li>• Tailored to research needs</li>
                <li>• Current and relevant</li>
                <li>• Researcher controls quality</li>
              </ul>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Disadvantages:</h6>
              <ul class="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                <li>• Time-consuming</li>
                <li>• Expensive</li>
                <li>• Requires expertise in data collection</li>
              </ul>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Examples:</h6>
              <p class="text-blue-700 dark:text-blue-300 text-sm">
                Surveys you conduct, experiments you perform, interviews you conduct.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
          <h5 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Secondary Data</h5>
          <p class="text-green-700 dark:text-green-300 leading-relaxed mb-4">
            Data that has been collected by someone else for a different purpose.
          </p>
          
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Advantages:</h6>
              <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• Time and cost-efficient</li>
                <li>• Large datasets available</li>
                <li>• Professional collection methods</li>
              </ul>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Disadvantages:</h6>
              <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• May not perfectly match research needs</li>
                <li>• Potential quality concerns</li>
                <li>• May be outdated</li>
              </ul>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">Examples:</h6>
              <p class="text-green-700 dark:text-green-300 text-sm">
                Government census data, published research studies, company reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Common Data Collection Methods
      </h4>
      
      <div class="grid gap-4">
        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">1</span>
            </div>
            <h5 class="text-lg font-semibold text-purple-800 dark:text-purple-200">Surveys and Questionnaires</h5>
          </div>
          
          <div class="grid gap-4 lg:grid-cols-3">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Description:</h6>
              <p class="text-purple-700 dark:text-purple-300 text-sm">
                Systematic collection of information from a sample of individuals.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Best for:</h6>
              <p class="text-purple-700 dark:text-purple-300 text-sm">
                Collecting data on opinions, behaviors, demographics.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Example:</h6>
              <p class="text-purple-700 dark:text-purple-300 text-sm">
                A company surveying customers about product satisfaction.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">2</span>
            </div>
            <h5 class="text-lg font-semibold text-orange-800 dark:text-orange-200">Experiments</h5>
          </div>
          
          <div class="grid gap-4 lg:grid-cols-3">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Description:</h6>
              <p class="text-orange-700 dark:text-orange-300 text-sm">
                Controlled studies where researchers manipulate variables to observe effects.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Best for:</h6>
              <p class="text-orange-700 dark:text-orange-300 text-sm">
                Establishing cause-and-effect relationships.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Example:</h6>
              <p class="text-orange-700 dark:text-orange-300 text-sm">
                Testing the effectiveness of a new teaching method by comparing two groups of students.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border-l-4 border-teal-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">3</span>
            </div>
            <h5 class="text-lg font-semibold text-teal-800 dark:text-teal-200">Observational Studies</h5>
          </div>
          
          <div class="grid gap-4 lg:grid-cols-3">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Description:</h6>
              <p class="text-teal-700 dark:text-teal-300 text-sm">
                Researchers observe and record behavior without manipulating variables.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Best for:</h6>
              <p class="text-teal-700 dark:text-teal-300 text-sm">
                Studying natural behaviors and phenomena.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-teal-800 dark:text-teal-200 mb-2">Example:</h6>
              <p class="text-teal-700 dark:text-teal-300 text-sm">
                Observing traffic patterns at different times of day.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-500">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white text-sm font-bold">4</span>
            </div>
            <h5 class="text-lg font-semibold text-indigo-800 dark:text-indigo-200">Existing Records</h5>
          </div>
          
          <div class="grid gap-4 lg:grid-cols-3">
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Description:</h6>
              <p class="text-indigo-700 dark:text-indigo-300 text-sm">
                Using data that has already been collected and recorded.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Best for:</h6>
              <p class="text-indigo-700 dark:text-indigo-300 text-sm">
                Historical analysis, large-scale patterns.
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border">
              <h6 class="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Example:</h6>
              <p class="text-indigo-700 dark:text-indigo-300 text-sm">
                Using hospital records to study disease trends over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        Data Quality Considerations
      </h4>
      
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
          <h5 class="font-semibold text-red-800 dark:text-red-200 mb-2">Accuracy</h5>
          <p class="text-red-700 dark:text-red-300 text-sm">How close the data is to the true value.</p>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
          <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Precision</h5>
          <p class="text-blue-700 dark:text-blue-300 text-sm">How consistent the measurements are.</p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
          <h5 class="font-semibold text-green-800 dark:text-green-200 mb-2">Completeness</h5>
          <p class="text-green-700 dark:text-green-300 text-sm">Whether all necessary data has been collected.</p>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
          <h5 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Relevance</h5>
          <p class="text-yellow-700 dark:text-yellow-300 text-sm">How well the data addresses the research question.</p>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Timeliness</h5>
          <p class="text-purple-700 dark:text-purple-300 text-sm">Whether the data is current enough for the analysis.</p>
        </div>
      </div>
    </section>

    <hr class="border-gray-300 dark:border-gray-600 my-8"/>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Key Terms</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Primary Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Data collected directly by the researcher for their specific study.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Secondary Data:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">Data collected by others for different purposes.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Survey:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A method of collecting data by asking questions to a sample of people.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Experiment:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">A controlled study where variables are manipulated to observe effects.</span>
          </div>
        </div>
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <span class="font-semibold text-gray-800 dark:text-gray-200">Data Quality:</span>
            <span class="text-gray-600 dark:text-gray-400 ml-2">The degree to which data meets the requirements for its intended use.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Summary Points</h4>
      <div class="grid gap-3">
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Data collection method affects the quality and validity of statistical analysis.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Primary data is collected specifically for your study; secondary data was collected by others.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Common methods include surveys, experiments, observations, and using existing records.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Data quality depends on accuracy, precision, completeness, relevance, and timeliness.
          </span>
        </div>
        <div class="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span class="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
            Choose collection methods based on your research questions and available resources.
          </span>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Connection</h4>
      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
        <p class="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
          Understanding data collection sets the foundation for <strong>Chapter 2</strong>, where we'll learn how to analyze 
          and summarize the data we've collected using descriptive statistics.
        </p>
      </div>
    </section>
  </div>
`;

const StatisticalCourseModule: React.FC = () => {
  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Complete Statistics Course</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          This comprehensive module takes learners from basic statistical concepts to advanced statistical modeling and research methodology. Each level builds upon previous knowledge while introducing increasingly sophisticated techniques and applications.
        </p>
      </div>

      <div className="space-section">
        {/* Course Overview */}
        <div className="card p-6 mb-8">
          <h2 className="text-subtitle text-primary mb-4">Course Overview</h2>
          <p className="text-body text-secondary mb-4">
            This comprehensive module takes learners from basic statistical concepts to advanced statistical modeling and research methodology. Each level builds upon previous knowledge while introducing increasingly sophisticated techniques and applications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Beginner</h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">4-6 weeks</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-medium text-green-900 dark:text-green-100">Intermediate</h3>
              <p className="text-xs text-green-700 dark:text-green-300">6-8 weeks</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-medium text-purple-900 dark:text-purple-100">Professional</h3>
              <p className="text-xs text-purple-700 dark:text-purple-300">8-10 weeks</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-medium text-orange-900 dark:text-orange-100">Expert</h3>
              <p className="text-xs text-orange-700 dark:text-orange-300">10-12 weeks</p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">5</span>
              </div>
              <h3 className="font-medium text-red-900 dark:text-red-100">Senior</h3>
              <p className="text-xs text-red-700 dark:text-red-300">12-16 weeks</p>
            </div>
          </div>
        </div>

        {/* LEVEL 1: BEGINNER (Foundations) */}
        <div className="card p-6 mb-8">
          <h2 className="text-subtitle text-primary mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
            LEVEL 1: BEGINNER (Foundations)
          </h2>
          <p className="text-sm text-secondary mb-4">Duration: 4-6 weeks | Prerequisites: Basic arithmetic and algebra</p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Learning Objectives</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">By the end of this level, students will be able to:</p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Understand what statistics is and why it matters</li>
              <li>• Differentiate between descriptive and inferential statistics</li>
              <li>• Calculate and interpret basic measures of central tendency and variability</li>
              <li>• Create and interpret basic graphs and charts</li>
              <li>• Understand the concept of probability</li>
            </ul>
          </div>

          {/* Chapter 1: Introduction to Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-3 border-l-4 border-blue-500 pl-3">
              Chapter 1: Introduction to Statistics
            </h3>

            {/* Topic: What is Statistics? */}
            <details className="card p-4 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center text-lg font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400">
                What is Statistics?
                <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-200" />
              </summary>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: whatIsStatisticsContent }}></div>
            </details>

            {/* Topic: Types of Data */}
            <details className="card p-4 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center text-lg font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400">
                Types of Data
                <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-200" />
              </summary>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: typesOfDataContent }}></div>
            </details>

            {/* Topic: Data Collection Methods and Sources */}
            <details className="card p-4 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center text-lg font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400">
                Data Collection Methods and Sources
                <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-200" />
              </summary>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: dataCollectionContent }}></div>
            </details>
          </div>

          {/* Chapter 1 Assessment */}
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <h4 className="font-medium text-primary mb-2">Chapter 1 Assessment</h4>
            <ul className="text-sm text-secondary space-y-1">
              <li>• Multiple choice questions on statistical concepts</li>
              <li>• Data classification exercises</li>
              <li>• Real-world scenario analysis</li>
              <li>• Basic statistical terminology quiz</li>
            </ul>
          </div>
        </div>

        {/* Placeholder for Chapter 2: Descriptive Statistics */}
        <div className="card p-6 mb-8 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-primary mb-3">Chapter 2: Descriptive Statistics</h3>
          <p className="text-sm text-secondary mb-4">
            Learn to calculate and interpret measures of central tendency, variability, and distribution shape.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Measures of Central Tendency</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">Mean, Median, Mode</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Measures of Variability</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">Range, Variance, Standard Deviation</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Shape of Distributions</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">Skewness, Kurtosis, Normal Distribution</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-muted italic">Content coming soon...</span>
          </div>
        </div>

        {/* Placeholder for other Levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 opacity-50 cursor-not-allowed">
            <h2 className="text-subtitle text-primary mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-500" />
              LEVEL 2: INTERMEDIATE
            </h2>
            <p className="text-sm text-secondary">Applied Statistics - Coming Soon</p>
            <div className="mt-3 text-xs text-muted">
              • Probability Distributions<br/>
              • Sampling and Central Limit Theorem<br/>
              • Confidence Intervals<br/>
              • Hypothesis Testing<br/>
              • Correlation and Regression
            </div>
          </div>

          <div className="card p-6 opacity-50 cursor-not-allowed">
            <h2 className="text-subtitle text-primary mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              LEVEL 3: PROFESSIONAL
            </h2>
            <p className="text-sm text-secondary">Advanced Methods - Coming Soon</p>
            <div className="mt-3 text-xs text-muted">
              • Multiple Regression Analysis<br/>
              • ANOVA<br/>
              • Non-Parametric Tests<br/>
              • Experimental Design<br/>
              • Categorical Data Analysis
            </div>
          </div>

          <div className="card p-6 opacity-50 cursor-not-allowed">
            <h2 className="text-subtitle text-primary mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
              LEVEL 4: EXPERT
            </h2>
            <p className="text-sm text-secondary">Specialized Applications - Coming Soon</p>
            <div className="mt-3 text-xs text-muted">
              • Advanced Regression Techniques<br/>
              • Multivariate Statistics<br/>
              • Time Series Analysis<br/>
              • Longitudinal Data<br/>
              • Bayesian Statistics
            </div>
          </div>

          <div className="card p-6 opacity-50 cursor-not-allowed">
            <h2 className="text-subtitle text-primary mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-red-500" />
              LEVEL 5: SENIOR
            </h2>
            <p className="text-sm text-secondary">Research and Innovation - Coming Soon</p>
            <div className="mt-3 text-xs text-muted">
              • Statistical Research Methods<br/>
              • Modern Statistical Computing<br/>
              • Advanced Specialized Topics<br/>
              • Professional Development<br/>
              • Capstone Project
            </div>
          </div>
        </div>

        {/* Course Resources */}
        <div className="card p-6 mt-8">
          <h2 className="text-subtitle text-primary mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-primary mb-2">Software and Tools</h3>
              <ul className="text-sm text-secondary space-y-1">
                <li><strong>Beginner:</strong> Excel, Google Sheets, basic calculators</li>
                <li><strong>Intermediate:</strong> R, Python (pandas, scipy), SPSS</li>
                <li><strong>Professional:</strong> SAS, Stata, advanced R packages</li>
                <li><strong>Expert:</strong> Specialized software, custom programming</li>
                <li><strong>Senior:</strong> High-performance computing, cloud platforms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-primary mb-2">Professional Development</h3>
              <ul className="text-sm text-secondary space-y-1">
                <li>• American Statistical Association (ASA)</li>
                <li>• Royal Statistical Society (RSS)</li>
                <li>• International Statistical Institute (ISI)</li>
                <li>• Regional statistical societies</li>
                <li>• Industry-specific organizations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalCourseModule;