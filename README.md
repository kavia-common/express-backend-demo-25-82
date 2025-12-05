# express-backend-demo-25-82

A modern Express.js backend demonstrating basic RESTful endpoints and OpenAPI docs.

## Quick Start

- Prerequisites: Node.js 18+
- Install dependencies:
  - cd express-backend-demo-25-82/express_backend
  - npm install
- Run in dev (with reload):
  - npm run dev
- Run in prod:
  - npm start

By default, the server listens on port 3001. You can override with `PORT` in environment variables (see `.env.example`).

Docs (Swagger UI): http://localhost:3001/docs

Minimal OpenAPI JSON: http://localhost:3001/openapi.json (static file in interfaces or generated via /docs)

## Endpoints

- GET /health → { status: 'ok', message: 'Service is healthy', ... }
- GET / → same as /health
- Items (in-memory):
  - GET /api/v1/items → list items
  - GET /api/v1/items/:id → get one item
  - POST /api/v1/items → create item (body: { name: string, description?: string })
  - PUT /api/v1/items/:id → update item (body: { name?: string, description?: string })
  - DELETE /api/v1/items/:id → delete item

## Project Structure

- express_backend/
  - src/
    - server.js (entry)
    - app.js (app config, routes, middleware)
    - routes/ (route modules)
    - controllers/ (business logic/adapters)
    - middleware/ (shared middleware)
    - services/ (aux services)
  - interfaces/openapi.json (minimal OpenAPI description)
  - swagger.js (swagger-jsdoc config)

## Notes

- In-memory storage is used for items; data resets on restart.
- CORS is enabled for all origins to simplify development.
- Error handling includes a not-found handler and a global error middleware.

Ocean Professional: Documentation aims to be clean and minimal, reflecting a professional tone with clarity.