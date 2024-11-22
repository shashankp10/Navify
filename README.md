# Navify

Navify is an AI-powered web extension that transforms the way users interact with websites. By enabling natural language queries, Navify simplifies navigation and content discovery, improving user retention and solving the challenge of poor user experience. The backend system is designed to crawl, process, and serve relevant content efficiently, leveraging powerful tools like Playwright, Meilisearch, and Llama.

---

## Project Description

The Navify backend is a monolithic application built using **Node.js**, which handles crawling, content indexing, and processing natural language queries. It features two main functionalities:

1. **Pre-Crawling Websites**: 
   - Navify uses Playwright to dynamically crawl web pages, extract content, and store it in a structured JSON format.
   - The extracted content is stored in a `data` directory and indexed into Meilisearch for efficient keyword-based retrieval.

2. **User Query Processing**:
   - When a user submits a query via the frontend chatbot, Llama extracts relevant keywords from the prompt.
   - These keywords are used to search in Meilisearch, and the matching results are ranked based on sentiment analysis scores computed by Llama.
   - The top 3 results are returned to the client, providing precise and helpful recommendations.

## How It Works
1. **Crawling**: Playwright crawls the website and extracts content dynamically.
2. **Storing**: Extracted content is saved in JSON format and indexed into Meilisearch.
3. **Query Processing**: Llama processes user queries to extract keywords.
4. **Searching**: Keywords are used to search Meilisearch for relevant results.
5. **Ranking**: Llama analyzes sentiment to rank results.
6. **Delivering Results**: Top 3 results are returned to the client.


### Key Features

- **Dynamic Crawling**: Automatically extract structured data from websites.
- **Fast Search**: Meilisearch enables rapid content discovery.
- **AI Integration**: Llama powers natural language understanding and sentiment analysis.
- **Ease of Use**: Intuitive API endpoints for seamless integration with the frontend.
- **Performance-Oriented**: Designed for speed and scalability.

---

## Tech Stack

- **Backend**: Node.js
- **Crawling**: Playwright
- **Search Engine**: Meilisearch
- **Natural Language Processing**: Llama API
- **Frontend**: React.js (for chatbot)

---


### Prerequisites

- **Node.js**: Install Node.js (v14 or higher).
- **Meilisearch**: Install and run a Meilisearch instance.
- **Llama API**: Ensure access to the Llama API with a valid API key.

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/navify-backend.git
   cd navify-backend
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:
    ```bash
    MEILISEARCH_HOST=<your-meilisearch-host>
    MEILISEARCH_API_KEY=<your-meilisearch-api-key>
    GROQ_API_KEY=<your-llama-api-key>
4. Start the backend server:
    ```bash
    npm start
