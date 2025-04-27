# London Crime Data Analysis

A Node.js application that processes and analyzes London crime data using streams for efficient memory usage.

## Overview

This application demonstrates the power of Node.js streams for processing large datasets. It reads a CSV file containing London crime statistics and performs several analyses:

1. Tracks crime trends over the years
2. Identifies the most dangerous areas of London
3. Finds the most common crime type per area
4. Identifies the least common crime overall

## Prerequisites

- Node.js (v14 or higher)
- TypeScript

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ex2-stream-data-processing

# Install dependencies
npm install
```

## Usage

1. Compile the TypeScript files:

```bash
npx tsc
```

2. Run the program with your CSV file:

```bash
node index.js path/to/your/london-crime-data.csv
```

## Data Format

The application expects a CSV file with London crime data in the following format:

```
borough,year,month,crime_type,value
Westminster,2008,1,Burglary,1234
...
```

## Analysis Features

### Yearly Crime Trends

Analyzes whether crime rates have increased or decreased over the recorded years, with year-by-year statistics.

### Most Dangerous Areas

Ranks London areas by total crime incidents to identify the most dangerous neighborhoods.

### Most Common Crime by Area

For each area, identifies the most frequently occurring crime type and its prevalence.

### Least Common Crime

Identifies the crime type that occurs least frequently across all areas.

## Implementation Details

This project implements stream processing techniques for efficient handling of large datasets:

- Uses Transform streams to process CSV data
- Implements pipeline pattern for stream composition
- Handles backpressure automatically through Node.js stream mechanisms
- Processes data incrementally to minimize memory usage

## License

ISC
