import React from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

// Content for "What is Statistics?"
const whatIsStatisticsContent = `
  <h3>What is Statistics?</h3>
  <h4>Definition and Core Purpose</h4>
  <p>Statistics is the science of collecting, organizing, analyzing, interpreting, and presenting data. It provides a framework for making informed decisions and drawing reliable conclusions in the face of uncertainty. Far from being just about numbers, statistics is about understanding the world around us through evidence.</p>
  <p>For example, when a pharmaceutical company tests a new drug, they use statistics to determine if the drug is effective and safe. They collect data on patients who receive the drug versus a placebo, and then use statistical analysis to see if any observed differences are likely due to the drug or just random chance.</p>
  
  <h4>Real-World Impact and Everyday Decision-Making</h4>
  <p>Statistics impacts nearly every aspect of modern life, from the weather forecast you check daily to the personalized recommendations you receive on streaming platforms. It helps us make sense of complex information and navigate uncertainty.</p>
  <ul>
    <li><strong>Weather Forecasting:</strong> Meteorologists use statistical models based on historical weather patterns and current atmospheric conditions to predict future weather. The "70% chance of rain" you see is a statistical probability.</li>
    <li><strong>Healthcare:</strong> Doctors use statistics to understand disease prevalence, evaluate treatment effectiveness, and assess patient risks. Clinical trials are heavily reliant on statistical methods to prove drug efficacy.</li>
    <li><strong>Business and Marketing:</strong> Companies use statistics to analyze market trends, understand consumer behavior, and optimize advertising campaigns. A/B testing, for instance, uses statistical hypothesis testing to determine which version of a webpage performs better.</li>
    <li><strong>Sports Analytics:</strong> Teams use statistics to evaluate player performance, strategize for games, and make recruitment decisions. Sabermetrics in baseball is a prime example of applying statistical analysis to sports.</li>
  </ul>
  
  <h4>Descriptive vs. Inferential Statistics</h4>
  <p>Statistics is broadly divided into two main branches:</p>
  <ul>
    <li>
      <strong>Descriptive Statistics:</strong> This branch focuses on summarizing and describing the main features of a dataset. It helps us organize and make sense of data.
      <p><strong>Example:</strong> If you collect the ages of all students in a classroom, descriptive statistics would involve calculating the average age, finding the most common age (mode), or creating a bar chart to show the distribution of ages. You are simply describing the data you have.</p>
    </li>
    <li>
      <strong>Inferential Statistics:</strong> This branch involves making predictions or inferences about a larger population based on a sample of data from that population. It allows us to draw conclusions beyond the immediate data.
      <p><strong>Example:</strong> Instead of surveying every student in a large university, you might survey a random sample of 500 students to estimate the average GPA of all students in the university. Inferential statistics would help you determine how confident you can be that your sample's average GPA is a good estimate for the entire university's average GPA.</p>
    </li>
  </ul>
  
  <h4>Statistical Thinking and Reasoning</h4>
  <p>Statistical thinking is a way of approaching problems that involves understanding variation, recognizing the role of randomness, and using data to make informed decisions. It's about asking the right questions, collecting relevant data, analyzing it appropriately, and interpreting the results in context.</p>
  <ul>
    <li><strong>Understanding Variation:</strong> Nothing is exactly the same. Statistical thinking acknowledges that data points will naturally vary. For example, not all apples from the same tree will have the exact same weight.</li>
    <li><strong>Role of Randomness:</strong> Many events are influenced by chance. Statistical reasoning helps us distinguish between patterns that are genuinely significant and those that could simply be due to random variation.</li>
    <li><strong>Data-Driven Decisions:</strong> Instead of relying on intuition or anecdotal evidence, statistical thinking encourages decisions based on empirical data.</li>
  </ul>
  <p>By applying statistical thinking, you can analyze a dataset, identify patterns, test hypotheses, and draw meaningful conclusions that are supported by evidence, rather than just assumptions. This systematic approach is invaluable in research, business, and everyday problem-solving.</p>
  
  <hr/>
  
  <h5>Key Terms:</h5>
  <ul>
    <li><strong>Statistics:</strong> The science of collecting, organizing, analyzing, interpreting, and presenting data.</li>
    <li><strong>Data:</strong> Facts, figures, or information collected for analysis.</li>
    <li><strong>Descriptive Statistics:</strong> Methods for summarizing and describing the main features of a dataset.</li>
    <li><strong>Inferential Statistics:</strong> Methods for making predictions or inferences about a population based on sample data.</li>
    <li><strong>Population:</strong> The entire group of individuals or items that we want to study.</li>
    <li><strong>Sample:</strong> A subset of the population that we actually observe and collect data from.</li>
    <li><strong>Variable:</strong> A characteristic or attribute that can take different values.</li>
    <li><strong>Parameter:</strong> A numerical summary of a population.</li>
    <li><strong>Statistic:</strong> A numerical summary of a sample.</li>
  </ul>
  
  <h5>Practice Problems:</h5>
  <h6>Problem 1:</h6>
  <p>Identify whether each scenario involves descriptive or inferential statistics:</p>
  <ol type="a">
    <li>A teacher calculates the average test score for her class of 30 students.</li>
    <li>A polling company surveys 1,000 voters to predict the outcome of an election.</li>
    <li>A company creates a pie chart showing the breakdown of their sales by region.</li>
    <li>Researchers test a new teaching method on 100 students to determine if it's more effective than traditional methods.</li>
  </ol>
  <h6>Solution 1:</h6>
  <ol type="a">
    <li><strong>Descriptive:</strong> The teacher is summarizing data from the entire class (complete dataset).</li>
    <li><strong>Inferential:</strong> Using a sample of 1,000 voters to make predictions about the entire voting population.</li>
    <li><strong>Descriptive:</strong> Creating a visual summary of existing company sales data.</li>
    <li><strong>Inferential:</strong> Using results from 100 students to make conclusions about the effectiveness for all students who might use this method.</li>
  </ol>
  
  <h5>Visual Aid Suggestion:</h5>
  <ul>
    <li>A flowchart showing the process: Question → Data Collection → Analysis → Interpretation → Decision</li>
    <li>A diagram comparing descriptive statistics (summarizing what we have) vs. inferential statistics (predicting beyond our data)</li>
  </ul>
  
  <h5>Summary Points:</h5>
  <ul>
    <li>Statistics is the science of making sense of data to make informed decisions.</li>
    <li>It impacts daily life through predictions, evaluations, and informed choices.</li>
    <li><strong>Descriptive statistics</strong> summarizes data; <strong>inferential statistics</strong> makes predictions about populations from samples.</li>
    <li><strong>Statistical thinking</strong> involves understanding variation, randomness, and making data-driven decisions.</li>
    <li>Statistics provides a systematic approach to problem-solving using evidence rather than assumptions.</li>
  </ul>
  
  <h5>Connection to Next Topic:</h5>
  <p>This introduction sets the stage for understanding the fundamental role of data. The next section, "Types of Data," will delve into the different forms data can take, which is crucial for selecting appropriate statistical methods.</p>
`;

// Content for "Types of Data"
const typesOfDataContent = `
  <h3>Types of Data</h3>
  <p>Data is the raw material of statistics. It refers to facts, figures, or information collected for analysis. Understanding the different types of data is crucial because it dictates which statistical methods are appropriate for analysis and how results can be interpreted. Misclassifying data can lead to incorrect conclusions.</p>

  <h4>Qualitative vs. Quantitative Data</h4>
  <p>Data can broadly be categorized into two main types: qualitative and quantitative.</p>
  <ul>
    <li>
      <strong>Qualitative Data (Categorical Data):</strong> This type of data describes qualities or characteristics that cannot be measured numerically. It represents categories or attributes.
      <ul>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Colors (red, blue, green), types of fruit (apple, banana, orange), gender (male, female, non-binary).</li>
            <li><strong>Complex:</strong> Customer feedback (positive, negative, neutral), political affiliation (Democrat, Republican, Independent), brand preferences (Nike, Adidas, Puma).</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> In a market research survey, collecting qualitative data on "favorite car brands" helps companies understand consumer preferences and segment their audience. For instance, knowing that a significant portion of your target demographic prefers "luxury sedans" over "economy hatchbacks" guides product development and marketing strategies.</li>
      </ul>
    </li>
    <li>
      <strong>Quantitative Data (Numerical Data):</strong> This type of data consists of numerical values that represent counts or measurements. It can be subjected to mathematical operations.
      <ul>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Age (in years), height (in cm), number of siblings, temperature (in Celsius).</li>
            <li><strong>Complex:</strong> Stock prices, population density, annual income, reaction time in milliseconds.</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> A hospital collects quantitative data on patient recovery times (e.g., days until discharge) after a specific surgery. Analyzing this data allows them to assess the effectiveness of new surgical techniques or post-operative care protocols, aiming to reduce recovery periods and improve patient outcomes.</li>
      </ul>
    </li>
  </ul>

  <h4>Discrete vs. Continuous Variables</h4>
  <p>Quantitative data can be further divided into discrete and continuous variables.</p>
  <ul>
    <li>
      <strong>Discrete Variables:</strong> These are quantitative variables whose values can only take on a finite number of values or a countably infinite number of values. They typically result from counting.
      <ul>
        <li><strong>Characteristics:</strong> Often integers, cannot be subdivided meaningfully.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Number of cars in a parking lot (10, 25, 100), number of heads when flipping a coin 5 times (0, 1, 2, 3, 4, 5), number of defects in a batch of products.</li>
            <li><strong>Complex:</strong> Number of successful transactions per hour on an e-commerce website, number of students enrolled in a specific course.</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> A quality control manager counts the number of defective items produced on an assembly line each day. This discrete data helps track production quality, identify trends, and implement corrective actions to minimize defects.</li>
      </ul>
    </li>
    <li>
      <strong>Continuous Variables:</strong> These are quantitative variables whose values can take on any value within a given range. They typically result from measuring.
      <ul>
        <li><strong>Characteristics:</strong> Can be infinitely subdivided, often involve decimals.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Height (175.3 cm, 180.1 cm), weight (65.7 kg, 72.4 kg), time taken to complete a task (3.5 minutes, 4.12 seconds).</li>
            <li><strong>Complex:</strong> Blood pressure readings, exact temperature of a chemical reaction, precise voltage in an electrical circuit.</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> Meteorologists collect continuous data on daily temperatures, humidity levels, and wind speeds. This data is used to create weather models, predict future conditions, and issue warnings for extreme weather events, impacting everything from agriculture to disaster preparedness.</li>
      </ul>
    </li>
  </ul>

  <h4>Levels of Measurement</h4>
  <p>Beyond qualitative and quantitative, data can also be classified by its level of measurement, which determines the type of statistical analysis that can be performed. There are four main levels, progressing from least to most informative:</p>
  <ol>
    <li>
      <strong>Nominal Scale:</strong>
      <ul>
        <li><strong>Explanation:</strong> This is the lowest level of measurement. Data at this level are categorized without any order or ranking. Numbers, if used, are merely labels and have no mathematical meaning.</li>
        <li><strong>Characteristics:</strong> Categories, no order, no numerical significance.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Eye color (blue, brown, green), marital status (single, married, divorced), country of origin.</li>
            <li><strong>Complex:</strong> Types of diseases (e.g., Type A, Type B), car manufacturers (Ford, Toyota, BMW).</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> A survey asks respondents for their favorite type of music. The responses (e.g., Rock, Pop, Jazz, Classical) are nominal data. You can count how many people prefer each genre, but you cannot rank them or perform arithmetic operations.</li>
      </ul>
    </li>
    <li>
      <strong>Ordinal Scale:</strong>
      <ul>
        <li><strong>Explanation:</strong> Data at this level can be categorized and ranked, but the differences between categories are not meaningful or cannot be precisely measured. The order matters, but the intervals between ranks are not necessarily equal.</li>
        <li><strong>Characteristics:</strong> Categories, ordered, unequal intervals.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Education level (High School, Bachelor's, Master's, PhD), satisfaction ratings (Very Dissatisfied, Dissatisfied, Neutral, Satisfied, Very Satisfied), military ranks.</li>
            <li><strong>Complex:</strong> Socioeconomic status (low, middle, high income), Olympic medals (Gold, Silver, Bronze).</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> In a restaurant survey, customers rate their dining experience as "Excellent," "Good," "Fair," or "Poor." We know "Excellent" is better than "Good," but we cannot quantify how much better, nor can we assume the difference between "Excellent" and "Good" is the same as between "Good" and "Fair."</li>
      </ul>
    </li>
    <li>
      <strong>Interval Scale:</strong>
      <ul>
        <li><strong>Explanation:</strong> Data at this level has all the properties of ordinal data, but the intervals between values are equal and meaningful. However, there is no true zero point, meaning zero does not indicate the complete absence of the quantity. Ratios are not meaningful.</li>
        <li><strong>Characteristics:</strong> Ordered, equal intervals, no true zero.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Temperature in Celsius or Fahrenheit (0°C does not mean no temperature), years (Year 0 does not mean no time).</li>
            <li><strong>Complex:</strong> IQ scores, standardized test scores (e.g., SAT, GRE).</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> Measuring temperature in Celsius. The difference between 20°C and 30°C is the same as between 30°C and 40°C (a 10-degree difference). However, 40°C is not "twice as hot" as 20°C because 0°C is an arbitrary point, not an absolute absence of heat.</li>
      </ul>
    </li>
    <li>
      <strong>Ratio Scale:</strong>
      <ul>
        <li><strong>Explanation:</strong> This is the highest level of measurement. Data at this level has all the properties of interval data, but it also has a true zero point, which indicates the complete absence of the quantity being measured. This allows for meaningful ratios.</li>
        <li><strong>Characteristics:</strong> Ordered, equal intervals, true zero, meaningful ratios.</li>
        <li><strong>Examples:</strong>
          <ul>
            <li><strong>Simple:</strong> Height (0 cm means no height), weight (0 kg means no weight), age (0 years means no age), income.</li>
            <li><strong>Complex:</strong> Number of products sold, reaction time, Kelvin temperature (0 Kelvin is absolute zero).</li>
          </ul>
        </li>
        <li><strong>Real-World Application:</strong> Measuring a person's weight in kilograms. 0 kg means no weight. A person weighing 80 kg is twice as heavy as a person weighing 40 kg. This ratio is meaningful because of the true zero point.</li>
      </ul>
    </li>
  </ol>

  <h4>Data Collection Methods and Sources (Brief Introduction)</h4>
  <p>The type of data collected often depends on the method used and the source from which it is obtained. Common methods include surveys, experiments, observations, and using existing records. Sources can range from primary (collected directly by the researcher) to secondary (data already collected by others). Understanding these aspects helps ensure data quality and relevance for statistical analysis. This topic will be explored in more detail in later chapters.</p>

  <hr/>

  <h5>Key Terms:</h5>
  <ul>
    <li><strong>Data:</strong> Facts, figures, or information collected for analysis.</li>
    <li><strong>Qualitative Data:</strong> Non-numerical data describing qualities or characteristics.</li>
    <li><strong>Quantitative Data:</strong> Numerical data representing counts or measurements.</li>
    <li><strong>Discrete Variable:</strong> Quantitative data that can only take specific, countable values.</li>
    <li><strong>Continuous Variable:</strong> Quantitative data that can take any value within a range.</li>
    <li><strong>Nominal Scale:</strong> Categorical data without order or ranking.</li>
    <li><strong>Ordinal Scale:</strong> Categorical data with a meaningful order, but unequal intervals.</li>
    <li><strong>Interval Scale:</strong> Numerical data with equal intervals, but no true zero point.</li>
    <li><strong>Ratio Scale:</strong> Numerical data with equal intervals and a true zero point, allowing for meaningful ratios.</li>
  </ul>

  <h5>Practice Problems:</h5>
  <h6>Problem 1:</h6>
  <p>Classify the following data as qualitative or quantitative, and if quantitative, as discrete or continuous:</p>
  <ol type="a">
    <li>Number of students in a classroom</li>
    <li>Brand of smartphone owned</li>
    <li>Time taken to run a marathon</li>
    <li>Rating of a movie (e.g., 1-5 stars)</li>
    <li>Weight of a newborn baby</li>
  </ol>
  <h6>Solution 1:</h6>
  <ol type="a">
    <li><strong>Quantitative, Discrete:</strong> You count the number of students.</li>
    <li><strong>Qualitative:</strong> Describes a characteristic (brand) that is not numerical.</li>
    <li><strong>Quantitative, Continuous:</strong> Time can be measured to any degree of precision.</li>
    <li><strong>Quantitative, Discrete:</strong> While numerical, it's typically a count of stars, and the intervals between ratings might not be equal (e.g., the difference between 1 and 2 stars might not feel the same as between 4 and 5). However, if treated as a scale where differences are meaningful, it could lean towards ordinal or even interval depending on context. For simplicity, often treated as discrete.</li>
    <li><strong>Quantitative, Continuous:</strong> Weight can take any value within a range.</li>
  </ol>
  <h6>Problem 2:</h6>
  <p>Identify the level of measurement (nominal, ordinal, interval, ratio) for each of the following:</p>
  <ol type="a">
    <li>Colors of cars in a parking lot</li>
    <li>Temperature in Kelvin</li>
    <li>Ranking of tennis players (1st, 2nd, 3rd)</li>
    <li>Years of birth (e.g., 1990, 2000)</li>
    <li>Socioeconomic status (low, middle, high)</li>
  </ol>
  <h6>Solution 2:</h6>
  <ol type="a">
    <li><strong>Nominal:</strong> Categories without order.</li>
    <li><strong>Ratio:</strong> Has a true zero point (absolute zero), allowing for meaningful ratios.</li>
    <li><strong>Ordinal:</strong> Has a clear order, but the difference in skill between 1st and 2nd might not be the same as between 2nd and 3rd.</li>
    <li><strong>Interval:</strong> Ordered, equal intervals (e.g., difference between 1990 and 2000 is 10 years, same as 2000 and 2010), but no true zero point (Year 0 is arbitrary).</li>
    <li><strong>Ordinal:</strong> Has an order, but the difference between "low" and "middle" might not be quantifiable or equal to the difference between "middle" and "high."</li>
  </ol>

  <h5>Visual Aid Suggestion:</h5>
  <ul>
    <li>A diagram illustrating the hierarchy of measurement levels, perhaps a pyramid or a flow chart, showing how each level builds upon the previous one (Nominal → Ordinal → Interval → Ratio).</li>
  </ul>

  <h5>Summary Points:</h5>
  <ul>
    <li>Data is the fundamental input for statistical analysis.</li>
    <li><strong>Qualitative data</strong> describes categories or attributes (e.g., colors, types).</li>
    <li><strong>Quantitative data</strong> consists of numerical measurements or counts (e.g., age, number of items).</li>
    <li>Quantitative data can be <strong>discrete</strong> (countable, finite values) or <strong>continuous</strong> (measurable, infinite values within a range).</li>
    <li>The four <strong>levels of measurement</strong> (Nominal, Ordinal, Interval, Ratio) determine the permissible statistical operations.</li>
    <li><strong>Nominal:</strong> Categories only (e.g., gender).</li>
    <li><strong>Ordinal:</strong> Categories with order (e.g., satisfaction ratings).</li>
    <li><strong>Interval:</strong> Ordered, equal intervals, no true zero (e.g., Celsius temperature).</li>
    <li><strong>Ratio:</strong> Ordered, equal intervals, true zero (e.g., height, weight).</li>
    <li>Understanding data types is crucial for selecting appropriate statistical methods and drawing valid conclusions.</li>
  </ul>

  <h5>Connection to Previous and Upcoming Concepts:</h5>
  <ul>
    <li><strong>Connection to "What is Statistics?":</strong> Data is the core subject of statistics. The methods discussed in the previous section (descriptive, inferential) are applied <em>to</em> data, and the type of data dictates which methods are appropriate.</li>
    <li><strong>Connection to "Descriptive Statistics" (Chapter 2):</strong> The type and level of measurement of your data directly influence which descriptive statistics (e.g., mean, median, mode) and visualizations (e.g., bar charts, histograms) are meaningful and appropriate to use. For example, calculating the mean of nominal data (like eye color) makes no sense.</li>
  </ul>
`;

// Content for "Data Collection Methods and Sources"
const dataCollectionContent = `
  <h3>Data Collection Methods and Sources</h3>
  <p>The quality and reliability of statistical analysis heavily depend on how data is collected. Understanding different data collection methods and sources is essential for ensuring that your analysis is valid, reliable, and appropriate for your research questions.</p>

  <h4>Primary vs. Secondary Data</h4>
  <ul>
    <li>
      <strong>Primary Data:</strong> Data collected directly by the researcher for the specific purpose of their study.
      <ul>
        <li><strong>Advantages:</strong> Tailored to research needs, current and relevant, researcher controls quality.</li>
        <li><strong>Disadvantages:</strong> Time-consuming, expensive, requires expertise in data collection.</li>
        <li><strong>Examples:</strong> Surveys you conduct, experiments you perform, interviews you conduct.</li>
      </ul>
    </li>
    <li>
      <strong>Secondary Data:</strong> Data that has been collected by someone else for a different purpose.
      <ul>
        <li><strong>Advantages:</strong> Time and cost-efficient, large datasets available, professional collection methods.</li>
        <li><strong>Disadvantages:</strong> May not perfectly match research needs, potential quality concerns, may be outdated.</li>
        <li><strong>Examples:</strong> Government census data, published research studies, company reports.</li>
      </ul>
    </li>
  </ul>

  <h4>Common Data Collection Methods</h4>
  <ol>
    <li>
      <strong>Surveys and Questionnaires:</strong>
      <ul>
        <li><strong>Description:</strong> Systematic collection of information from a sample of individuals.</li>
        <li><strong>Best for:</strong> Collecting data on opinions, behaviors, demographics.</li>
        <li><strong>Example:</strong> A company surveying customers about product satisfaction.</li>
      </ul>
    </li>
    <li>
      <strong>Experiments:</strong>
      <ul>
        <li><strong>Description:</strong> Controlled studies where researchers manipulate variables to observe effects.</li>
        <li><strong>Best for:</strong> Establishing cause-and-effect relationships.</li>
        <li><strong>Example:</strong> Testing the effectiveness of a new teaching method by comparing two groups of students.</li>
      </ul>
    </li>
    <li>
      <strong>Observational Studies:</strong>
      <ul>
        <li><strong>Description:</strong> Researchers observe and record behavior without manipulating variables.</li>
        <li><strong>Best for:</strong> Studying natural behaviors and phenomena.</li>
        <li><strong>Example:</strong> Observing traffic patterns at different times of day.</li>
      </ul>
    </li>
    <li>
      <strong>Existing Records:</strong>
      <ul>
        <li><strong>Description:</strong> Using data that has already been collected and recorded.</li>
        <li><strong>Best for:</strong> Historical analysis, large-scale patterns.</li>
        <li><strong>Example:</strong> Using hospital records to study disease trends over time.</li>
      </ul>
    </li>
  </ol>

  <h4>Data Quality Considerations</h4>
  <ul>
    <li><strong>Accuracy:</strong> How close the data is to the true value.</li>
    <li><strong>Precision:</strong> How consistent the measurements are.</li>
    <li><strong>Completeness:</strong> Whether all necessary data has been collected.</li>
    <li><strong>Relevance:</strong> How well the data addresses the research question.</li>
    <li><strong>Timeliness:</strong> Whether the data is current enough for the analysis.</li>
  </ul>

  <h5>Key Terms:</h5>
  <ul>
    <li><strong>Primary Data:</strong> Data collected directly by the researcher for their specific study.</li>
    <li><strong>Secondary Data:</strong> Data collected by others for different purposes.</li>
    <li><strong>Survey:</strong> A method of collecting data by asking questions to a sample of people.</li>
    <li><strong>Experiment:</strong> A controlled study where variables are manipulated to observe effects.</li>
    <li><strong>Data Quality:</strong> The degree to which data meets the requirements for its intended use.</li>
  </ul>

  <h5>Summary Points:</h5>
  <ul>
    <li>Data collection method affects the quality and validity of statistical analysis.</li>
    <li>Primary data is collected specifically for your study; secondary data was collected by others.</li>
    <li>Common methods include surveys, experiments, observations, and using existing records.</li>
    <li>Data quality depends on accuracy, precision, completeness, relevance, and timeliness.</li>
    <li>Choose collection methods based on your research questions and available resources.</li>
  </ul>

  <h5>Connection:</h5>
  <p>Understanding data collection sets the foundation for Chapter 2, where we'll learn how to analyze and summarize the data we've collected using descriptive statistics.</p>
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
              <div className="prose dark:prose-invert max-w-none mt-4 text-body text-secondary" dangerouslySetInnerHTML={{ __html: whatIsStatisticsContent }}></div>
            </details>

            {/* Topic: Types of Data */}
            <details className="card p-4 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center text-lg font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400">
                Types of Data
                <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-200" />
              </summary>
              <div className="prose dark:prose-invert max-w-none mt-4 text-body text-secondary" dangerouslySetInnerHTML={{ __html: typesOfDataContent }}></div>
            </details>

            {/* Topic: Data Collection Methods and Sources */}
            <details className="card p-4 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center text-lg font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400">
                Data Collection Methods and Sources
                <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-200" />
              </summary>
              <div className="prose dark:prose-invert max-w-none mt-4 text-body text-secondary" dangerouslySetInnerHTML={{ __html: dataCollectionContent }}></div>
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