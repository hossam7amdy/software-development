## Chapter 5. Encoding and Evolution

Applications inevitably evolve, requiring changes to the data they store and process. To minimize downtime, large applications use **rolling upgrades** (deploying new versions to a few nodes at a time), which means old and new versions of code will coexist in the system simultaneously. For systems to run smoothly during these transitions, data encodings must maintain two guarantees:

- **Backward compatibility**: Newer code can read data written by older code.
- **Forward compatibility**: Older code can read data written by newer code.

### Formats for Encoding Data

Programs work with data in two forms: **in-memory representations** (like objects or hash tables, optimized for CPUs) and self-contained **byte sequences** (for network transmission or disk storage). The translation from in-memory objects to a byte sequence is called **encoding** (or serialization), and the reverse process is called **decoding** (or parsing).

**Language-Specific Formats**
Programming languages often provide built-in encoding libraries (e.g., Java's `Serializable` or Python's `pickle`). While convenient, they are tied to a single language and suffer from deep problems, including **security vulnerabilities** (an attacker manipulating the byte sequence to execute arbitrary code), bad performance, bloated data sizes, and poor versioning support.

**JSON, XML, and Binary Variants**
JSON, XML, and CSV are popular, standardized textual formats, but they have notable drawbacks:

- They can be verbose and suffer from ambiguity around numbers (e.g., JavaScript's inability to accurately parse integers larger than 2^53).
- They lack support for native binary strings, forcing developers to use Base64 encoding.
- Schema languages for them (like JSON Schema or XML Schema) are powerful but highly complex.
  To reduce size, **binary variants** like MessagePack exist for JSON, but they only yield minor space savings because they must still include the raw string names of every field within the encoded data.

**Protocol Buffers**
Protocol Buffers (protobuf) is a binary, _schema-driven_ encoding developed by Google. It is exceptionally compact because it entirely omits field names from the encoded byte sequence. Instead, it uses numerical **field tags** defined in the schema to identify fields.

- **Compatibility:** Schema evolution relies entirely on field tags. Forward compatibility is achieved because old code will safely ignore newly added tags. Backward compatibility is maintained because new code can read old data, filling in default values for missing tags.

**Avro**
Developed as a subproject of Hadoop, Apache Avro is the most compact binary format. Its schema does not use tag numbers; instead, the encoded data is simply a concatenated sequence of values without any field identifiers.

- **Compatibility:** To decode data, Avro uses the **writer’s schema** (the exact schema used to encode) and the **reader’s schema** (what the consuming code expects). Avro compares the two side-by-side, matching fields by their names. Adding or removing a field is only compatible if the field has a default value.
- **Dynamic Generation:** Because Avro does not require manually assigned tag numbers, it is excellent for creating **dynamically generated schemas**, such as dumping the contents of a changing relational database into files.

**The Merits of Schemas**
Overall, schema-driven binary formats offer significant advantages over textual formats: they are more compact, act as up-to-date documentation, allow for automated compatibility checks, and enable compile-time type checking through code generation.

### Modes of Dataflow

**Databases**

In databases, the process writing the data encodes it, and the reader decodes it. Because **data outlives code**, a database might contain records written five years ago directly alongside records written five milliseconds ago. Thus, backward compatibility is strictly necessary. Databases typically avoid rewriting old data formats entirely; instead, they might update formats slowly during background compaction, or simply provide `null` values when old records are missing newly added columns.

**Services (REST and RPC)**
When processes communicate over a network via APIs, clients encode requests and servers encode responses. To allow independent deployments of services, API requests generally need backward compatibility, while responses need forward compatibility.

- **REST** uses HTTP principles, URLs, and typically JSON to handle data.
- **RPC (Remote Procedure Calls)** attempts to make remote network requests look like local function calls. This model is fundamentally flawed because network requests suffer from unpredictability, variable latency, timeouts, and idempotence issues (duplicated actions during retries).
  In robust service architectures, tools like hardware/software load balancers, DNS, service discovery, and **service meshes** are used to route traffic and handle service outages dynamically.

**Durable Execution and Workflows**
Complex actions that span multiple service calls are modeled as **workflows**. **Durable execution frameworks** (like Temporal) provide exactly-once semantics for these workflows by logging all RPCs to durable storage (like a write-ahead log). If a task fails, the workflow re-executes without duplicating the previously successful network calls. However, this requires developers to write strictly deterministic code.

**Event-Driven Architectures**
This dataflow model uses an intermediary **message broker** (like Kafka, RabbitMQ, or Pub/Sub) to pass asynchronous messages (events) from a sender to a recipient. Brokers act as buffers if the recipient is down, prevent data loss, enable one-to-many message broadcasting, and decouple the sender from the consumer. Similarly, **distributed actor frameworks** integrate the actor concurrency model with a message broker, scaling systems by transparently encoding asynchronous messages between independent actors across a network. During rolling upgrades in event-driven systems, forward and backward compatibility remain critical to handle messages seamlessly between older and newer code.
