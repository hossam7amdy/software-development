## Chapter 3. Data Models and Query Languages

Data models are foundational to our architecture because they fundamentally shape how we think about the problems we are solving and how our application logic interacts with underlying storage layers.

### 1. Relational vs. Document Models

The industry has long debated how best to model application data, largely split between traditional **relational models** (SQL) and **document models** (NoSQL/JSON).

- **The Object-Relational (Impedance) Mismatch**: This term describes the awkward translation layer required between object-oriented application code and relational database tables. While **Object-Relational Mapping (ORM)** tools like Hibernate reduce boilerplate, they can obscure inefficiencies, such as the **N+1 query problem**, where the ORM makes a separate database query for each item in a list instead of a single optimized join.
- **Document Models**: Representing data as JSON documents is highly effective for one-to-many (or "one-to-few") relationships, natively capturing tree-like data structures. They benefit from **data locality**, meaning the entire document can be fetched in a single continuous read, which is fast if the application needs the whole document at once.
- **Convergence**: Relational and document models are actively converging. Systems like PostgreSQL have added rich JSON support, while document databases like MongoDB have added relational-style joins.

### 2. Analytical Data Models (Data Warehousing)

When shifting from OLTP (Transaction Processing) to Analytics, schema designs change.

- **Star Schema**: Centers around a massive **fact table** (recording individual events like a user click or a sale) surrounded by **dimension tables** (the who, what, where, when, and why of the event).
- **Snowflake Schema**: A variation of the star schema where dimension tables are further normalized into subdimensions.
- **One Big Table (OBT)**: A heavily denormalized approach that folds dimension tables directly into the fact table to prioritize raw read speed over storage efficiency.

### 3. Graph-Like Data Models

While relational databases handle simple many-to-many relationships via join tables, complex, highly interconnected data (like social networks or map routing) is better suited for a graph model.

- **Property Graphs**: Consist of **vertices** (entities) and **edges** (relationships), where both can hold arbitrary key-value properties.
- **Triple Stores**: Store data as simple statements of `(subject, predicate, object)`. They are historically tied to the **Semantic Web** and RDF data models.

### 4. Query Languages

The chapter emphasizes the power of **declarative query languages** (like SQL, Cypher, and SPARQL). Unlike imperative code (where you tell the computer _how_ to loop through data), declarative languages let you specify _what_ pattern of data you want. This hides implementation details and allows the database's query optimizer to parallelize and improve execution under the hood.

- **Cypher**: A concise, pattern-matching query language for property graphs.
- **SPARQL**: The query language used for RDF triple stores.
- **Datalog**: An older, highly expressive logic-based language that creates recursive virtual tables via rules.
- **SQL for Graphs**: You _can_ query graphs in SQL using **recursive common table expressions** (`WITH RECURSIVE`), but it is incredibly clumsy. A 4-line Cypher query can easily take 30+ lines of SQL.
- **GraphQL**: Unlike the above, GraphQL is an OLTP query language designed for UI clients to request specific JSON structures. It intentionally limits complex operations (like recursion) to prevent denial-of-service attacks from untrusted clients.

### 5. Event Sourcing and CQRS

In complex business domains, the database shouldn't just store the current state; it should store the history of how it got there.

- **Event Sourcing**: Instead of updating rows, every state change is stored as an immutable event in an append-only log. Events are facts written in the past tense (e.g., "seat booked").
- **CQRS (Command Query Responsibility Segregation)**: Because an event log is terrible for querying, the system asynchronously derives **materialized views** (read models) from the log.

### 6. DataFrames, Matrices, and Arrays

For data science and machine learning, data is modeled using **DataFrames** (e.g., Pandas, Spark) or multidimensional arrays. A common engineering task is transforming relational tables into sparse matrices using techniques like **one-hot encoding** (creating binary columns for categorical data) so the data can be fed into linear algebra operations for ML algorithms.

---

### Key Terms and Concepts

- **Impedance Mismatch:** The disconnect between application objects and database tables.
- **Locality:** Storing related data together (e.g., in a single document) to reduce lookups.
- **Shredding:** Splitting a document-like structure into multiple relational tables.
- **Polyglot Persistence:** Using different data stores for different needs side-by-side.
- **Schema-on-Read vs. Schema-on-Write**: Document databases are often incorrectly called "schemaless." A better term is **schema-on-read** (data structure is implicit and interpreted by the application at runtime, like dynamic typing). Relational DBs use **schema-on-write** (the DB enforces explicit structure at write time, like static typing).
- **Normalization vs. Denormalization Trade-offs**:
  - _Normalized data_ (using IDs) is faster to write, ensures consistency, but requires expensive joins on read.
  - _Denormalized data_ (duplicating strings/data) is faster to read but costs more storage and runs the risk of inconsistencies during writes. Denormalization is essentially a form of derived data caching.
- **Event Sourcing Drawbacks**: While event sourcing is great for auditability and rebuilding views, immutability makes it incredibly difficult to comply with privacy laws like GDPR (deleting a user's data), sometimes requiring complex workarounds like "crypto-shredding".
