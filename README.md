# Purzelbaum - German Learning with OpenAI

A language learning application that uses OpenAI to act as a digital teacher fixing your errors.

## Tech Stack

### Frontend

- React
- Jotai
- Tailwind CSS
- Vite
- PWA Support

### Backend

- Node.js
- Express
- OpenAI API

## Backend Setup

Create a `.env` file in the `api` directory with the following content:

```env
PORT=3005
OPENAI_KEY=your_openai_api_key_here
```

Start the development server:

```bash
cd api
npm install
npm run dev
```

The server will start on port 3005 by default.

## Frontend Setup

Create a `sentences.js` file in the `frontend/learning-material` directory based on the example file `sentences-example.js`.

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on port 3000 by default.

## API Endpoints

### OpenAI Analysis

- **POST** `/api/openai/analyze`
- **Body**: `{ "sentence": "Your German sentence here" }`
- **Response**: Analysis of the sentence

### Database

- **GET** `/api/database/hello`
- **Response**: Test message from the database

## Development

- Backend runs with hot-reload enabled (nodemon)
- Frontend runs with React's development server
- Both servers can run simultaneously on different ports
