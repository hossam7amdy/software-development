## Chapter 1. Trade-offs in Data Systems Architecture

Explores the foundational concepts and trade-offs engineers face when building data-intensive applications, where storing, processing, and managing data are the primary challenges. The chapter breaks down these trade-offs into four main categories.

### 1. Operational Versus Analytical Systems

The chapter contrasts how different teams within an organization interact with data, leading to a split between two primary types of systems:

- **Operational Systems (OLTP - Online Transaction Processing)**: These systems typically handle user-facing backend services. They are optimized for point queries (fetching a small number of records by a key) and low-latency reads and writes. They represent the current state of data.
- **Analytical Systems (OLAP - Online Analytical Processing)**: Used by business analysts and data scientists, these systems contain a read-only copy of operational data. They are optimized for queries that scan and aggregate over large numbers of records to extract business intelligence (BI) or train machine learning models.

**Key Terms and Comparisons:**

- **Data Warehouse vs. Data Lake**:
  - **Data warehouse** is a separate relational database specifically optimized for analytics, which prevents analytical queries from degrading OLTP performance. Data is moved here via **ETL** (Extract-Transform-Load) pipelines.
  - **Data lake**, conversely, is a centralized repository that stores data as raw files without imposing schemas (like Avro or Parquet), offering more flexibility for data scientists using tools like Python or Spark.
- **Systems of Record vs. Derived Data**:
  - **System of record** (or source of truth) holds the authoritative, canonical version of newly ingested data.
  - **Derived data systems** (such as caches, search indexes, or materialized views) contain redundant data transformed from the system of record to optimize read performance; if lost, derived data can be recreated.

### 2. Cloud Versus Self-Hosting

Deciding where to deploy software involves a spectrum ranging from self-hosted (on-premises or IaaS) to fully managed cloud services or SaaS.

- **Self-Hosting**: Better suited for organizations with predictable workloads, specialized hardware needs, or strict data control requirements. It provides deep visibility into performance metrics and system logs.
- **Cloud Services**: Ideal for highly variable workloads, as computing resources can be quickly scaled up or down. It replaces upfront capacity planning with metered billing and frees teams from routine system administration. However, it risks vendor lock-in and a lack of granular control.

**Key Terms and Comparisons:**

- **Cloud Native Architecture**: Rather than just running traditional virtual machines (VMs), cloud-native systems build upon lower-level cloud abstractions, such as utilizing object storage (e.g., Amazon S3) instead of local disks.
- **Separation of Storage and Compute**: A defining feature of cloud-native architecture where storage (disk) and computation (CPU/RAM) are decoupled. Data is stored in services like S3 and must be transferred over the network to a separate computational service for processing.

### 3. Distributed Versus Single-Node Systems

While a single machine can be simpler and cheaper, **distributed systems**—multiple machines communicating via a network—are necessary for fault tolerance, scalability, geographic latency reduction, and elasticity. However, distributed systems introduce complexity, such as network failures, timeouts, and difficulties in troubleshooting (requiring **observability** tools like distributed tracing).

**Key Terms and Comparisons:**

- **Microservices vs. Monoliths**: A **microservices architecture** decomposes a complex application into multiple independent services, each with one well-defined purpose, its own database, and managed by a separate team. While this boosts team autonomy, it complicates testing, API evolution, and deployment.
- **Serverless (FaaS)**: An architecture where the cloud provider dynamically allocates hardware to execute code only when requests come in, enabling true pay-per-use execution without manual server provisioning.
- **Cloud Computing vs. Supercomputing (HPC)**: While cloud computing focuses on continuous online availability, multi-tenancy, and isolated virtual machines over Clos network topologies, high-performance computing (HPC) focuses on computationally intensive offline batch jobs, shared memory architectures, and check-pointing for fault tolerance.

### 4. Data Systems, Law, and Society

The architecture of data systems is heavily influenced by legal frameworks (like GDPR and CCPA) and social ethics. Engineers must balance business goals with user privacy and safety risks.

**Key Terms and Comparisons:**

- **Right to be Forgotten**: The legal mandate requiring organizations to delete a user's personal data upon request, which creates complex engineering challenges when systems rely on immutable, append-only logs.
- **Data Minimization**: The practice of storing only the data necessary for a specific, explicit purpose and discarding it afterward. This strongly contrasts with the traditional "big data" philosophy of hoarding data speculatively for undefined future use.
