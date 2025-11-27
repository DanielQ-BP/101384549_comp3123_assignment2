# comp3123 Assignment 2 — Backend & Docker

This repository contains a Node.js/Express backend and a React frontend scaffold prepared for Docker Compose.

Key items added:
- Backend Express server in `backend/src/server.js` (existing)
- JWT auth middleware `backend/src/middleware/auth.js`
- Multer upload middleware `backend/src/middleware/upload.js` (saves uploads to `backend/src/uploads`)
- `docker-compose.yml` to run `mongo`, `backend`, and `frontend` services
- Dockerfiles for backend and frontend

Quick run using Docker Compose (from repository root):

```powershell
docker-compose up --build
```

Notes:
- Update `docker-compose.yml` `JWT_SECRET` and other env values for production.
- Run `npm install` inside `backend` and `frontend` when developing locally if you prefer not to use Docker.
