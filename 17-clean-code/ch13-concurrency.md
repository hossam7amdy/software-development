# Concurrency

This chapter, written by Brett L. Schuchert, discusses the complexities of writing clean concurrent programs, noting that it is "hard—very hard" and that multithreaded code can appear fine but have underlying issues that surface under stress.

The chapter covers several important aspects of concurrency:

- **The Need for Concurrency:** The chapter explores why concurrency is necessary, citing examples where response time and throughput constraints require concurrent solutions, such as an information aggregator fetching data from multiple websites. It also mentions the "Servlet" model in web applications as an example where concurrency is partially managed by a container.
- **Myths and Misconceptions:** The chapter addresses common misunderstandings about concurrency, such as the belief that understanding concurrency issues isn't important when using containers, or that concurrency bugs are usually repeatable. It emphasizes that you need to know what your container is doing and how to guard against concurrent updates and deadlocks.
- **Challenges:** The chapter highlights the inherent difficulties of concurrent programming, using a simple example of incrementing a shared variable to illustrate how multiple threads can lead to unexpected outcomes and a large number of possible execution paths.
- **Concurrency Defense Principles:** Several principles and techniques for writing clean and safe concurrent code are presented:
  - **Single Responsibility Principle (SRP):** Concurrency design is complex enough to be a reason for a class or method to change and should be separated from other code. Concurrency-related code has its own lifecycle and challenges.
  - **Corollary: Limit the Scope of Data:** Sharing data between threads can lead to interference. Minimizing the number of critical sections and, if possible, avoiding sharing objects altogether (using copies of data) is recommended.
  - **Corollary: Use Copies of Data:** Using copies of objects can help avoid the need for synchronization.
  - **Corollary: Threads Should Be as Independent as Possible:** Keeping threads independent minimizes the risk of interference.
- **Know Your Library:** Understanding the concurrency features provided by your language's standard library is crucial. Examples include thread-safe collections and the Executor Framework in Java.
- **Know Your Execution Models:** Familiarity with common concurrent execution models like Producer-Consumer, Readers-Writers, and Dining Philosophers can aid in designing concurrent solutions.
- **Beware Dependencies Between Synchronized Methods:** Calling one synchronized method from another can lead to issues.
- **Keep Synchronized Sections Small:** Locks introduce overhead and delays, so synchronized sections should be as minimal as possible to reduce contention and improve performance.
- **Writing Correct Shut-Down Code Is Hard:** Graceful shutdown of concurrent systems can be challenging due to the possibility of deadlocks where threads wait indefinitely.
- **Testing Threaded Code:** Testing concurrent code is difficult because concurrency bugs are often not repeatable. The chapter provides several recommendations for testing, such as treating spurious failures as potential threading issues, getting non-threaded code working first, making threaded code pluggable and tunable, running with more threads than processors, and using "jiggling" strategies to force errors. Tools like IBM's ConTest can also help in instrumenting code to expose non-thread-safe behavior.
- **Conclusion:** The chapter concludes by emphasizing that writing concurrent code requires rigor and clean code practices to avoid subtle and infrequent failures. It also recommends further reading, such as Doug Lea's "Concurrent Programming in Java: Design Principles and Patterns".

Appendix A, titled "**Concurrency II**", expands on the topics discussed in Chapter 13 and provides more detailed explanations and examples, including a client/server example demonstrating threading .

Therefore, Chapter 13 focuses on the principles and practices for writing clean and correct concurrent code, highlighting the challenges and offering defense mechanisms.
