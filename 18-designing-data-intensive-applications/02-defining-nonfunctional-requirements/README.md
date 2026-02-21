## Chapter 2. Defining Nonfunctional Requirements

**Functional requirements** define what an application is supposed to do, while **nonfunctional requirements** describe the general qualities the system must possess, such as _performance_, _reliability_, _scalability_, and _maintainability_. Chapter 2 explores these core nonfunctional requirements, using a social network timeline case study to demonstrate how architectural decisions (like **fan-out** and **materialization**) impact system design at scale.

### 1. Performance

Performance is typically described using two main metrics:

- **Throughput:** The number of requests processed per second, or the data volume handled per second.
- **Response time:** The time elapsed from a client making a request to receiving the answer.

**Key Terms & Comparisons:**

- **Response Time vs. Latency:** While often used interchangeably,
  - **Response time** is what the client actually experiences (including network and queueing delays)
  - **Latency** strictly refers to the time a request spends waiting or being latent (not actively being processed).
- **Averages vs. Percentiles:** The average (mean) response time is poor for understanding typical user experiences; instead **percentiles** (like the median/p50, p95, p99, and p999) are preferred. High percentiles, known as **tail latencies**, are critical because they affect the user experience of the most active users, and a single slow backend call can delay an entire end-user request (an effect called **tail latency amplification**).
- **Queueing and Overload:** As throughput reaches hardware limits, queueing delays spike. This can cause clients to resend requests, triggering a **retry storm** and leading to a **metastable failure** where the system remains overloaded. Techniques like **exponential backoff**, **circuit breakers**, and **load shedding** prevent this.

### 2. Reliability and Fault Tolerance

Reliability means the system continues to work correctly even when things go wrong.

**Key Terms & Comparisons:**

- **Fault vs. Failure:** A **fault** occurs when a specific component (like a hard drive or a single machine) stops working. A **failure** occurs when the system _as a whole_ stops providing the required service to the user. Reliable systems are **fault-tolerant**—they prevent component faults from escalating into system-wide failures.
- **Types of Faults:**
  - **Hardware Faults:** Hard drive crashes, RAM corruption, or datacenter power outages. They are often mitigated by adding **redundancy** (e.g., RAID arrays, backup power, or multi-node clusters).
  - **Software Faults:** Bugs, runaway processes, or cascading failures. These are harder to handle because they are strongly correlated across nodes and can cause simultaneous crashes.
  - **Human Errors:** Mistakes made by operators (e.g., misconfigurations). Instead of blaming individuals, organizations are shifting toward **blameless postmortems** to learn from incidents and improve system resilience.

### 3. Scalability

Scalability is a system's ability to cope with increased load (e.g., concurrent users, data volume) while maintaining performance.

**Key Comparisons in Scalability Architectures:**

- **Shared-Memory (Scaling Up/Vertical Scaling):** Uses a single, powerful machine with multiple CPUs and threads that share the same RAM. While simple, cost grows faster than linearly and hardware bottlenecks limit ultimate scale.
- **Shared-Disk:** Multiple machines with independent CPUs and RAM that store data on a shared network-attached storage array (NAS or SAN). It is common in data warehousing but limited by locking overhead and network contention.
- **Shared-Nothing (Scaling Out/Horizontal Scaling):** A distributed system of multiple independent nodes, each with its own CPU, RAM, and disk, coordinating via a standard network. This approach dominates cloud deployments because it scales linearly and offers better fault tolerance, though it introduces the complexities of data sharding and distributed systems.

### 4. Maintainability

Because the majority of software costs lie in ongoing maintenance rather than initial development, systems should be designed to minimize pain for the engineers running them. This relies on three principles:

- **Operability:** Making routine tasks easy for operations teams through automation, good default behaviors, self-healing, and strong observability.
- **Simplicity:** Managing complexity so new engineers can easily understand the system. A key tool here is **abstraction**, which hides complex implementation details (like machine code or complex data structures) behind a clean, reusable interface.
- **Evolvability:** Making it easy to change the system to meet future, unanticipated requirements. Simple, loosely coupled systems reduce the risk of changes, and minimizing **irreversibility** (e.g., easily reverting a database migration) greatly improves flexibility.
