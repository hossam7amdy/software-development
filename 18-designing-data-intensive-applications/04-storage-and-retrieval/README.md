## Chapter 4. Storage and Retrieval

The chapter divides storage systems into two primary categories: those optimized for **transaction processing (OLTP)** and those optimized for **analytics (OLAP)**.

### Storage and Indexing for Transaction Processing (OLTP)

OLTP systems are designed for high volumes of fast read and write requests for a small number of records, typically accessed via indexes. The chapter details two main philosophies for OLTP storage engines:

**1. Log-Structured Storage and LSM-Trees**

- **Core Concepts:** This approach relies on an append-only log, where data is sequentially appended to files rather than overwritten. To make searching efficient, systems use **SSTables (Sorted String Tables)**, which group key-value pairs into blocks and sort them by key.
- **Architecture:** Writes are first added to an in-memory data structure called a **memtable**. When the memtable reaches a certain size, it is flushed to disk as an immutable SSTable segment. Over time, a background process merges and compacts these segments to remove deleted or overwritten values. This architecture is known as a **Log-Structured Merge-Tree (LSM-Tree)**.
- **Bloom Filters:** Because reading from an LSM-tree might require checking multiple segments, **Bloom filters** (probabilistic data structures) are used to quickly determine if a key does _not_ exist, saving unnecessary disk reads.

**2. Update-in-Place Storage and B-Trees**

- **Core Concepts:** **B-trees** remain the standard index in almost all relational databases. Instead of appending to logs, a B-tree breaks data down into fixed-size pages or blocks (e.g., 4 KiB to 16 KiB) and overwrites these pages in place.
- **Architecture:** The pages form a balanced tree structure where each parent page contains references to child pages covering specific key ranges, allowing a database to traverse down to a leaf page holding the target data. The depth of the tree scales efficiently at $O(\log n)$.
- **Write-Ahead Log (WAL):** Overwriting pages is risky if a system crashes mid-write. To ensure data resilience, B-trees maintain an append-only **Write-Ahead Log (WAL)** that records modifications before they are applied to the actual tree.

**Comparison: LSM-Trees vs. B-Trees**

- **Workload Suitability:** As a general rule, LSM-trees handle write-heavy workloads better, whereas B-trees provide faster and more predictable read performance.
- **Write Amplification:** This refers to one application write turning into multiple disk writes. Both systems experience write amplification, but LSM-trees typically have a lower rate than B-trees, making them more efficient for SSD lifespan and write throughput.
- **Write Patterns:** LSM-trees convert scattered random writes into sequential writes, which hardware processes much faster. However, B-trees do not require background compaction, which can sometimes cause latency spikes in LSM-trees when write throughput outpaces the compaction process.

### Additional Indexing and Memory Concepts

- **Secondary Indexes:** While primary keys uniquely identify a row, secondary indexes allow searching by other attributes, though the values may not be unique.
- **Storing Values in Indexes:** A **clustered index** stores the actual row data inside the index. A **heap file** stores data without specific order while indexes point to it, and a **covering index** stores a specific subset of columns inside the index to speed up certain queries.
- **In-Memory Databases:** As RAM becomes cheaper, some databases keep entire datasets in memory (e.g., Redis). They achieve higher performance not just by avoiding disk reads, but by avoiding the CPU overhead of encoding data structures into a disk-readable format.

### Data Storage for Analytics (OLAP)

Data warehouses handle complex analytical queries that scan millions of records and aggregate data.

- **Cloud Data Warehouses:** Modern cloud warehouses decouple query computation from the object storage layer to scale resources independently. They separate components like the query engine, storage format (e.g., Parquet), table format (e.g., Iceberg), and data catalogs.
- **Column-Oriented Storage:** Instead of a row-oriented layout (where all attributes of a row sit together), analytical databases store all values from a single column together. Since analytical queries often only need a few columns out of a 100-column table, this drastically reduces the amount of data loaded from disk.
- **Compression and Sorting:** Columnar storage allows for highly efficient compression. **Bitmap encoding** and **run-length encoding** can shrink columns containing repetitive data down to a fraction of their size. Sorting the table by specific columns further groups identical values, boosting compression rates.
- **Query Execution:** To maximize CPU efficiency, query engines use either **query compilation** (generating machine code on the fly) or **vectorized processing** (processing batches of column data sequentially in tight CPU loops).
- **Materialized Views and Data Cubes:** To avoid repeatedly calculating complex aggregates (like SUM or COUNT), databases use **materialized views** to write query results to disk. A **data cube** (or OLAP cube) is a multidimensional materialized view that caches aggregates grouped by different dimensions to dramatically speed up reporting.

### Advanced Indexing

- **Multidimensional Indexes:** Standard concatenated indexes cannot search multiple distinct ranges simultaneously. Specialized indexes like **R-trees** are used for geospatial data to find points within a specific latitude and longitude simultaneously.
- **Full-Text Search:** To search for keywords within text, search engines build an **inverted index** mapping terms to a "postings list" of all document IDs containing that term. Systems like Lucene use Levenshtein automatons to allow for typo tolerance (searching within a certain edit distance).
- **Vector Embeddings:** Used for semantic search (understanding meaning rather than exact keywords), embedding models (like Large Language Models) translate documents into vectors representing points in a multidimensional space. Distance functions like **cosine similarity** determine how semantically close two documents are. These are stored in specialized **vector indexes** (such as Flat, IVF, or HNSW indexes) to rapidly find the nearest neighbor to a user's search query.
