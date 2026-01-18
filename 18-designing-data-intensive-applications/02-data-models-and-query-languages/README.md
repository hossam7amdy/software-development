# Chapter 2: Data Models and Query Languages

## 1. Relational vs Document Model

## 2. Query Languages for Data

### Declarative Queries on the Web

- SQL is a declarative query language, whereas IMS and CODASYL queried the database using imperative code
- Imperative vs Declarative
  - Imperative: Ask for a specific order to execute an operation
  - Declarative: Tell what it needs
- Trade offs
  - Clear Interface (implementation details)
  - Performance
  - Concurrency

### MapReduce Querying

- It is a (_half-declarative_, _half-imperative_) programming model by _Google_ for processing large distributed data in bulk
- No-SQL databases (e.g., MongoDB, CouchDB) uses a limited version of it to perform _read-only_ queries across multiple documents
- Low level
- _map_ (collect) -> _reduce_ (fold)
- Pure function
- Allow programming language features or 3rd-party library
- MongoDB added a declarative version of it called _aggregation pipeline_

## 3. Graph-Like Data Models

- Graph representation has two main properties _vertices_ (Entity) and _edges_ (relationship) example (social network, web pages, road)
- What is the different between _Property Graph_ vs _Triple Store_?
- Graphs are good for evolvability: as you add features to your application, a graph can easily be extended to accommodate changes in your application’s data structures.

### Property Graphs

1. Vertex
2. Edge

### The Cyber Query Language

- _Declarative_ query language for _Property Graph_ created for _Neo4j_ graph database.

### Graph Queries in SQL

- How to query graph data in SQL?
  - Using _recursive common table expression_
- It is hard to query graph data using SQL
- It is important to choose the data model that is best for your application

### Triple Stores and SPARQL

- **Triple Stores**: is a data model similar to _Property Graph_ but in a different syntax
  - Subject -> Predicate -> Object
- **SPARQL**: is a query language for _Triple Stores_

### The Foundation: Datalog

**Datalog** is not popular query language used on Datomic data system and _Casclog_ is a Datalog implementation for _Hadoop_

---
