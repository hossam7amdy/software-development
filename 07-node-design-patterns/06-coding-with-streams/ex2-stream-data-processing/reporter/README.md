# London Crime Data Stream Processing

This project demonstrates the power of Node.js streams for efficiently processing and analyzing large datasets. It analyzes [London crime data](https://www.kaggle.com/datasets/jboysen/london-crime) (from the `london_crime_by_lsoa.csv` file) using a series of transform streams to extract meaningful insights.

## Project Overview

This application processes crime data from London using Node.js streams. Rather than loading the entire dataset into memory at once, it processes the data as a continuous flow, which is memory-efficient and ideal for large datasets.

## Features

The application performs four distinct analyses on the London crime dataset:

1. **Yearly Crime Trends**: Analyzes whether crime rates have increased or decreased over the years
2. **Dangerous Areas**: Identifies the most dangerous areas of London based on crime frequency
3. **Most Common Crimes by Area**: Determines the most predominant type of crime in each area
4. **Least Frequent Crime**: Finds the least common crime type across the entire dataset

## Implementation Details

- Uses Node.js readable, writable, and transform streams
- Custom parser to convert CSV data into structured objects
- Multiple stream pipelines running in parallel on the same data source
- Memory-efficient processing suitable for large datasets

## Project Structure

- `index.ts`: Main entry point that sets up stream pipelines
- `parser.ts`: Custom transform stream for CSV parsing
- `reporter/`: Contains various reporter streams for different analyses
- `london_crime_by_lsoa.csv`: Source data file

## How to Run

1. Make sure you have Node.js installed
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   node index.js london_crime_by_lsoa.csv
   ```

## Key Stream Processing Concepts Demonstrated

- Stream pipeline composition
- Stream forking (processing same data multiple ways)
- Custom transform streams
- Backpressure handling
- Memory-efficient data processing

This project serves as a practical demonstration of using Node.js streams to process large datasets in a memory-efficient manner.
