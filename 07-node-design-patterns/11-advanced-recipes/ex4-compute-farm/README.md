# Compute Farm

This project demonstrates a compute farm implementation using Node.js, where tasks are distributed across multiple worker processes for parallel processing.

## Description

The compute farm is a distributed computing system that:

- Uses multiple worker processes to handle computational tasks
- Distributes work efficiently across available workers
- Implements a task queue for managing workload
- Provides fault tolerance and worker recovery

## Installation

```bash
npm install
```

## Usage

Start the compute farm:

```bash
node index.js
```

## Architecture

- Master process distributes tasks to workers
- Workers perform computations in parallel
- Results are collected and aggregated by master
- Dynamic worker scaling based on system load

## License

MIT
