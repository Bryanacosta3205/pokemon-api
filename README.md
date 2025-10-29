# Pokémon API Backend
A scalable Node.js + Express + TypeScript backend API that fetches and serves all 1302 Pokémon from the PokeAPI.

## Folder structure 
```
pokemon-api-backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic layer
│   ├── interfaces/       # TypeScript interfaces
│   ├── middlewares/      # Express middlewares
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── cache/           # Caching implementation
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/               # Test files
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── package.json         # Dependencies and scripts
```
## API Endpoints
### Get All Pokémon
```
GET /pokemon
```
### Response
```
{
  "success": true,
  "count": 1302,
  "data": [
    {
      "name": "charizard",
      "types": ["fire", "flying"],
      "image": "https://..."
    },
    ...
  ]
}
```
### Clear Cache (Development)
```
GET /clear
```

### Health check
```
GET /health
```


## Setup

### Prerequisites:

- Node.js 18+ and npm
- Docker (optional)

## Local Setup

1. Clone the repository
```
git clone <your-repo-url>
cd pokemon-api-backend
```

2. Install dependencies
```
npm install
```
3. Create environment file
```
cp .env.example .env
```

4. Run in development mode
```
npm run dev
```

The API will be available at http://localhost:3001


## Using docker
```
docker-compose -f docker-compose.dev.yml up
```

## Testing
```
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test
```

## Code quality
```
# Run linter
npm run lint

# Format code
npm run format
```
