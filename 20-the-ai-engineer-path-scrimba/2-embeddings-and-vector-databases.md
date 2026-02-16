# Embeddings and Vector Databases

## Embeddings

An embedding is a numerical representation that aims to capture the meaning of the original data.

## Vector databases

A vector database is a specialized database designed to store and query high-dimensional vectors, such as embeddings. It allows for efficient similarity search and retrieval of relevant information based on the distance between vectors.

## Semantic vs Lexical search

- Lexical search: Matches exact words or phrases in the query with the text in the database. It relies on keyword matching and does not consider the meaning of the words.
- Semantic search: Uses embeddings to capture the meaning of the query and the text in the database. It allows for more flexible and accurate search results by considering the context and relationships between words.

## Chunking text from documents

Chunking is the process of breaking down a large document into smaller, manageable pieces (chunks) that can be processed by embedding models. This is important because embedding models have token limits, and large documents may exceed these limits. [LangChain](https://docs.langchain.com/oss/javascript/langchain/overview) provides tools to help with chunking text from documents.

### Choosing a chunk size

- Depend on the type of the content: short content vs large document
- Consider embedding models and its token limits
- User queries; short and specific vs long and detailed
- Consider how you'll use the returned results

## Retrieval Augmented Generation (RAG)

RAG is a technique that combines retrieval of relevant information from a knowledge base with generation of responses using a language model. It allows the model to access external information and generate more accurate and contextually relevant responses.

- Retrieval: The system retrieves relevant information from a knowledge base (e.g., vector database) based on the user's query.
- Augmentation: The retrieved information is then used to augment the input to the language model.
- Generation: The language model generates a response based on the augmented input, which includes both the user's query and the retrieved information.

## Solo project: PopChoice

PopChoice is a movie recommendation system that uses embeddings and vector databases to provide personalized movie recommendations based on user preferences. The system retrieves relevant movie information from a vector database and generates recommendations using a language model.

### Requirements

- Build from scratch a movie recommendation system using OpenAI's embedding models and vector databases.
- The system should allow users to input their movie preferences and receive personalized recommendations.
- The system should be able to handle a large dataset of movies and provide relevant recommendations based on
  user preferences.
- The system should be able to retrieve relevant movie information from a vector database and generate recommendations using a language model.
- Follow the [Figma design](https://www.figma.com/design/v7vyKvGJOjBieBdiP7TXBY/PopChoice?node-id=0-1&p=f).
