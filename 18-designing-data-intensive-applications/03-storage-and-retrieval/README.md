# Chapter 3: Storage and Retrieval

Explores the fundamental principles of how databases store data on disk and find it again. The chapter highlights that there is no single "best" storage engine; rather, different engines are optimized for different workloads—specifically distinguishing between transactional (OLTP) and analytical (OLAP) use cases.

Here is a summary of the core concepts, data structures, and architectures discussed in the chapter.

## 1. The Core Data Structures of Storage

At its most basic level, a database can be a text file where new entries are simply appended to the end. While this **log** (an append-only sequence of records) offers excellent write performance, it requires an **index** to allow for efficient read performance ($O(1)$) rather than scanning the entire file ($O(n)$).

The chapter details two primary families of storage engines used in modern databases:

### Log-Structured Storage Engines

These engines rely on appending data to files and merging them in the background.

- **Hash Indexes:** The simplest strategy involves keeping an in-memory hash map where every key maps to a byte offset in a data file on disk. This is fast but requires all keys to fit in RAM.
- **SSTables (Sorted String Tables):** To overcome the limitations of hash indexes, data is stored in **Sorted String Tables**, where key-value pairs are sorted by key. This allows for efficient merging of files (similar to mergesort) and sparse in-memory indexing (you don't need to keep every key in RAM).
- **LSM-Trees (Log-Structured Merge-Trees):** Storage engines based on the principle of merging and compacting sorted files are called **LSM-Trees**.
  - Writes are first added to an in-memory balanced tree called a **memtable**.
  - When the **memtable** fills up, it is flushed to disk as an **SSTable**.
  - **Bloom filters** are often used to optimize performance by quickly checking if a key does _not_ exist in the database, saving unnecessary disk reads.

### Page-Oriented Storage Engines

- **B-Trees:** The most widely used indexing structure (standard in SQL databases). Unlike LSM-trees, **B-trees** break the database down into fixed-size **pages** (usually 4KB) and read or write one page at a time.
  - They enable efficient lookups by following pointers down a tree structure with a high **branching factor**.
  - To modify data, B-trees overwrite pages on disk. To ensure reliability in the event of a crash, they utilize a **write-ahead log (WAL)** (or redo log), which records every modification before it is applied to the tree.

**Comparison:**

- **LSM-trees** generally offer faster write throughput (due to sequential writes) but may suffer from slower reads and **write amplification** (rewriting data during compaction).
- **B-trees** typically offer faster, more predictable read performance.

## 2. Advanced Indexing Strategies

Beyond basic key-value lookups, the chapter introduces variations on indexing:

- **Clustered Index:** Stores the actual row data directly within the index (e.g., the primary key index in InnoDB) to avoid an extra disk seek.
- **Covering Index:** Stores specific columns within the index so that some queries can be answered by the index alone.
- **Multi-column Indexes:** Used when queries target multiple columns. A **concatenated index** combines fields into one key (e.g., _lastname, firstname_).
- **Multi-dimensional Indexes:** Used for geospatial data (e.g., R-trees) to search for points within a range.
- **Full-Text Indexes:** Specialized indexes for searching text data, often using an inverted index structure.

## 3. Transaction Processing (OLTP) vs. Analytics (OLAP)

The chapter distinguishes between two broad categories of access patterns:

- **OLTP (Online Transaction Processing):** Characterized by user-facing applications, huge volumes of requests, small queries, and random-access writes. These systems typically use row-oriented storage.
- **OLAP (Online Analytic Processing):** Characterized by business intelligence and data analysis. Queries scan massive numbers of records to calculate aggregates (sum, count, average) rather than returning raw rows.

## 4. Column-Oriented Storage for Analytics

For **OLAP** workloads, row-oriented storage is inefficient because an analytic query might read millions of rows but only need a few columns.

- **Data Warehousing:** A separate database populated via an **Extract–Transform–Load (ETL)** process, designed specifically for analytics without affecting OLTP performance.
- **Star Schema:** A standard modeling pattern for analytics consisting of a central **fact table** (events) surrounded by **dimension tables** (who, what, where).
- **Column-Oriented Storage:** Stores values from each column together rather than storing all values for a row together. This allows queries to read only the specific columns they need.
- **Column Compression:** Because column data is often repetitive, it compresses very well using techniques like **bitmap encoding**.
- **Vectorized Processing:** A technique where the CPU processes a chunk of compressed column data in a tight loop, significantly speeding up analytic queries.
- **Materialized Views:** Precomputed caches of query results (aggregates) used to speed up expensive read queries. A common special case is a **data cube** (or OLAP cube), which caches aggregates across multiple dimensions.
