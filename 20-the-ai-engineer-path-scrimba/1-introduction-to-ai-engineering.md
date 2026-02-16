# Into to AI Engineering

### Chat Completion API vs Responses API

| Feature               | Chat Completion API                                                                                                | Responses API                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Endpoint              | `/v1/chat/completions`                                                                                             | `/v1/responses`                                                                                                               |
| State Management      | Stateless: You provide the full `messages[]` array every time.                                                     | Stateful: Can reference `conversation_id` or `thread_id`. The API "remembers" previous turns.                                 |
| Input Structure       | Rigid messages array with strictly defined roles (system, user, assistant).                                        | More flexible Items or simplified inputs. Handles text and images (multimodal) more natively.                                 |
| Tool/Function Calling | Manual Loop: Model returns a tool call → You execute code → You send result back → Model generates final response. | Agentic Loop: Can handle the execution loop more autonomously (depending on implementation), reducing client-side code bloat. |
| Output                | Choices array (text chunks).                                                                                       | Response Objects: Structured data that may include thoughts, tool results, and final text.                                    |
| Latency/Perf          | Slower for long conversations (re-processing full history).                                                        | Faster for long conversations (caching and server-side context).                                                              |

### System-prompts vs. User-prompts

- System-prompt: Sets the "job description" and remains active in the background.
- User-prompt: The specific questions or tasks requested by the user during the chat.

Key aspects of system-prompts include:

- Role & Persona: Establishing who the AI is, such as "You are a helpful coding assistant".
- Constraints & Rules: Defining boundaries, such as "Only answer questions about biology".
- Response Formatting: Enforcing structure (e.g., "Always respond in JSON format").
- Context Setting: Providing background information to guide the AI's knowledge base.

### What language modes do:

- Process tokens, not messages
- Tokens cost time and money
- Have no built-in conversations history
- Only see the context you sent
- Models have hard limits on how many tokens they can process at once (**Context window**)

### Few-Shot prompting

- A **shot** is just an example to the AI to follow
- Zero shots means no examples
- Few/multi-shot means a small number of examples

### Temperature and Top P

- **Temperature**: a hyperparameter that controls the randomness and creativity of generated text
  - Higher = take creative risks
  - Lower = play it safe
- **Top P** (selectivity): limits how wide a slice of possibilities the model should consider (from 0 to 1)
  - top_p 1.0 (default) = consider everything
  - top_p 0.9 ignore the least likely options
- **Temperature** and **Top P** in Production
  - Never touched once things are stable
  - Extreme values are almost never used
  - Don't aggressively tune _temperature_ and _top_p_ as the same time
  - If you don't have a strong reason, adjust _temperature_ only

### Solo Project - PollyGlot

PollyGlot is a multilingual translation tool that uses OpenAI's language models to provide accurate translations between multiple languages. The system allows users to input text in one language and receive translations in their desired target language, leveraging the capabilities of the language model to understand and generate text in various languages.

- [Figma design](https://www.figma.com/design/5zQQiaSDdUu8AqVGlg9PZ3/OpenAi-API---PollyGlot?node-id=0-1&p=f)
