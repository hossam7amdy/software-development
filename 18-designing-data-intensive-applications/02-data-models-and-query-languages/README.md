# Chapter 2: Data Models and Query Languages

Data models define how we think about the problem we are solving and how software is written. Applications are typically built by layering data models, where each layer hides the complexity of the layer below it.

This chapter compares three major data models: relational, document, and graph.

## 1. The Relational Model vs. The Document Model

The **relational model**, proposed by Edgar Codd in 1970, organizes data into **relations** (tables) containing **tuples** (rows). It dominates business data processing, such as **transaction processing** and **batch processing**. The **NoSQL** movement (Not Only SQL) emerged in the 2010s to address scalability needs, open-source preferences, and dynamic schema requirements.

**The Object-Relational Mismatch**
Development in object-oriented languages often requires a translation layer to communicate with relational tables. This disconnect is called the **impedance mismatch**.

- **Object-Relational Mapping (ORM):** Frameworks like Hibernate reduce boilerplate code but cannot completely hide the mismatch.
- **JSON Representation:** Storing data as JSON documents (supported by DBs like MongoDB, RethinkDB, and CouchDB) can reduce this mismatch and provide better **locality** than multi-table relational schemas.

**Relationships and Normalization**

- **One-to-many:** Relationships (e.g., a user having multiple jobs) imply a tree structure, which fits well into the document model.
- **Many-to-one:** Relationships (e.g., many people living in one region) require unique IDs to avoid data duplication. Removing such duplication is **normalization**. The document model supports this poorly due to weak support for **joins**.
- **Many-to-many:** As data becomes interconnected, the document model becomes awkward. The relational model handles this via joins; document databases often require application-side emulation of joins.

**History: Network and Hierarchical Models**
Document databases resemble the **hierarchical model** (used in **IMS**) from the 1970s. To solve the hierarchical model's inability to handle many-to-many relationships, two competitors emerged:

1.  **The Network Model (CODASYL):** Generalized the hierarchical model by allowing records to have multiple parents. It utilized pointers, requiring developers to manually navigate an **access path** (like a linked list).
2.  **The Relational Model:** Hid the access path behind a **query optimizer**. This allowed developers to declare _what_ they wanted rather than _how_ to get it, making it easier to add new features.

**Schema Flexibility**

- **Schema-on-write:** Relational databases enforce an explicit schema. This is similar to static type checking.
- **Schema-on-read:** Document databases (often called schemaless) do not enforce structure on write. The structure is interpreted when data is read. This is advantageous for heterogeneous data.

## 2. Query Languages for Data

- **Imperative Languages:** Tell the computer to perform specific operations in a specific order (e.g., IMS, CODASYL).
- **Declarative Languages:** Specify the pattern of data wanted, allowing the database to decide the optimal execution path and use indexes automatically (e.g., **SQL**, relational algebra, CSS). They are also easier to parallelize.
- **MapReduce:** A programming model for processing large datasets (popularized by Google). It is neither fully declarative nor imperative but allows logic to be expressed in code snippets (`map` and `reduce`). MongoDB uses a declarative **aggregation pipeline** instead of raw MapReduce for usability.

## 3. Graph-Like Data Models

When many-to-many relationships are very common, **graph** data models are the most natural. A graph consists of **vertices** (nodes) and **edges** (relationships).

**Property Graphs**
In this model (used by Neo4j, Titan), each vertex and edge can have properties (key-value pairs).

- **Cypher:** A declarative query language for property graphs using arrow notation (e.g., `(Idaho) -[:WITHIN]-> (USA)`).
- **Graph Queries in SQL:** Possible using **recursive common table expressions** (WITH RECURSIVE), though the syntax is clumsy compared to Cypher.

**Triple-Stores**
Store data as three-part statements: **(subject, predicate, object)**.

- **Semantic Web:** A movement to publish machine-readable data (RDF).
- **RDF (Resource Description Framework):** A data format where subjects, predicates, and objects are often URIs.
- **SPARQL:** The standard query language for RDF triple-stores.

**Datalog**
The foundation for later query languages. It defines rules to derive new predicates from data. It is used in Datomic and Cascalog.

## Key Terms and Concepts

- **Impedance Mismatch:** The disconnect between application objects and database tables.
- **Locality:** Storing related data together (e.g., in a single document) to reduce lookups.
- **Shredding:** Splitting a document-like structure into multiple relational tables.
- **Polyglot Persistence:** Using different data stores for different needs side-by-side.
- **Schema-on-read:** Implicit structure interpreted only when data is read.
- **Access Path:** The specific route used to locate a record in a database.
- **Declarative Query:** Specifies _what_ results are needed, not _how_ to achieve them.
- **MapReduce:** A model for batch processing data across many machines.
- **Property Graph:** A model where vertices and edges contain properties.
- **Triple-Store:** Stores data as (subject, predicate, object).
