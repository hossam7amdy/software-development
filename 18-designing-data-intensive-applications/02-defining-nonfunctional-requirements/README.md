## Chapter 2. Defining Nonfunctional Requirements

**Functional requirements** define what an application is supposed to do, while **nonfunctional requirements** describe the general qualities the system must possess, such as _performance_, _reliability_, _scalability_, and _maintainability_.

### 1. The Case Study: Social Network Home Timelines

The chapter grounds these abstract concepts in a case study of a social network (like X/Twitter). It highlights the challenge of serving user timelines using standard relational queries, which can require hundreds of millions of expensive database lookups per second.

To optimize reads, we can use **materialization**, precomputing the results of a query and storing them in a cache (a **materialized view**). When a user posts, the system actively pushes the new post to the precomputed timelines of their followers. This downstream amplification of a single request into multiple requests is called **fan-out**. While it speeds up read operations, it makes writes much heavier, especially when dealing with celebrity accounts with millions of followers.

### 2. Describing Performance

When evaluating performance, we rely on two primary metrics:

- **Throughput:** The volume of data or number of requests the system processes per second.
- **Response time:** The total time from when a client sends a request to when they receive the response.

**Key Terminology in Performance:**

- **Latency vs. Response Time:**
  - **Latency** is the time a request spends strictly waiting (latent), such as network delay.
  - **Response time** is what the client actually experiences. Response time includes both latency/queueing delays and **service time** (the duration the server is actively processing the request).
- **Queueing and Head-of-line blocking:** As throughput approaches maximum hardware capacity, **queueing delays** spike. A single slow request can hold up the processing of subsequent fast requests, an effect known as **head-of-line blocking**.
- **Percentiles and Tail Latencies:** Because network delay varies (known as **jitter**), averages (means) are not good indicators of user experience. Instead, we use **percentiles** like the **median (p50)**, **p95**, **p99**, and **p999**. High percentiles are called **tail latencies**.
- **Tail Latency Amplification:** If an end-user request requires multiple backend calls, just one slow backend call delays the entire response, amplifying the chance that users experience tail latencies.
- **SLOs and SLAs:** Percentiles are commonly used to define **service level objectives (SLOs)** (internal performance targets) and **service level agreements (SLAs)** (business contracts promising specific performance).
- **Handling Overload:** Spikes in queueing delays can cause client timeouts, leading them to resend requests. This creates a **retry storm** and pushes the system into a **metastable failure**, where it remains overloaded even after the initial traffic spike passes. To mitigate this, engineers use **exponential backoff**, **circuit breakers**, **token bucket algorithms**, **load shedding**, and **backpressure**.

### 3. Reliability and Fault Tolerance

Reliability means the system continues to work correctly even when things break.

- **Fault vs. Failure:** A **fault** is a localized issue, like a single disk crashing. A **failure** is when the system as a whole stops meeting its SLOs. Reliable systems are **fault-tolerant**; they prevent faults from escalating into failures. A component that will bring down the whole system if it fails is called a **single point of failure (SPOF)**.
- **Fault Injection & Chaos Engineering:** To build confidence in a system, engineers deliberately trigger faults in production (e.g., killing processes) to ensure fault-tolerance mechanisms work, a practice known as **chaos engineering**.
- **Types of Faults:**
  - **Hardware Faults:** Mitigated by adding redundancy (e.g., RAID arrays, backup power, deploying across multiple cloud **availability zones**). Multi-node systems also allow for **rolling upgrades**, patching one node at a time without downtime.
  - **Software Faults:** Harder to anticipate and highly correlated (e.g., memory leaks, **cascading failures**, or runaway processes that exhaust shared resources).
  - **Human Errors:** Operators inevitably make mistakes. Rather than blaming individuals, mature engineering cultures treat "human error" as a symptom of a poorly designed sociotechnical system and utilize **blameless postmortems** to learn from incidents.

### 4. Scalability

Scalability is the system's ability to cope with increased load. Doing this too early is a **premature optimization**. If doubling your hardware resources allows you to handle twice the load with the same performance, the system has **linear scalability**.

**Architectural Approaches to Scaling:**

- **Shared-Memory (Vertical Scaling / Scaling Up):** Moving to a single, more powerful machine with shared RAM. Cost grows faster than linearly and is bottlenecked by physical hardware limits.
- **Shared-Disk:** Multiple independent compute nodes sharing an array of disks over a network (NAS/SAN). Often bottlenecked by network contention and locking overhead.
- **Shared-Nothing (Horizontal Scaling / Scaling Out):** A distributed system where each node has its own CPU, RAM, and disk, coordinating over a standard network. This is the standard for modern scaling, but it introduces the complex necessity of distributed system coordination and data sharding. Remember, there is no **magic scaling sauce**; architectures must be purpose-built for their specific load profile.

### 5. Maintainability

The vast majority of software cost is in ongoing maintenance, not initial development. We can design legacy-proof systems by focusing on three principles:

- **Operability:** Making the system easy for operations teams to run through automation, **observability**, good default behaviors, and predictable self-healing.
- **Simplicity:** Preventing the codebase from becoming a highly coupled **big ball of mud**. We differentiate between **essential complexity** (inherent to the problem domain) and **accidental complexity** (caused by bad tooling or architecture). The best tool for managing complexity is **abstraction**, which hides complex implementation details behind clean, reusable interfaces.
- **Evolvability:** Making it easy to change the system for future, unanticipated requirements. We achieve this by decoupling systems and minimizing **irreversibility** (making sure actions like database migrations can be safely rolled back).
