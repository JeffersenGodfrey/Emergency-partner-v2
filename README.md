# Emergency Partner

AI-powered offline emergency resource finder. React + Node.js.

## Setup

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`

## Development

**Lint/Format:**

```bash
npm run lint
npm run format
```

**Build:**

```bash
npm run build
```

## Deployment

### Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages on every push to `main`.

1. **Prerequisites:**
   - Repository must be public (for free GitHub Pages)
   - Enable GitHub Pages in repository settings (Settings → Pages → Deploy from a branch → main)

2. **Configuration:**
   - Ensure `GITHUB_PAGES` environment variable is set during build
   - The workflow automatically deploys the `frontend/dist` folder
   - Update `GITHUB_PAGES` base URL in [frontend/vite.config.js](frontend/vite.config.js) if repo name differs

3. **Access:**
   - Frontend will be available at: `https://<username>.github.io/Emergency-partner/`

### Backend Deployment (Render)

The backend is automatically deployed to Render on every push to `main` (in the `backend/` directory).

1. **Prerequisites:**
   - Create a free Render account at https://render.com
   - For production, use paid tier for continuous uptime

2. **Setup:**
   - Push code to GitHub
   - In Render Dashboard: Create New → Web Service
   - Connect your GitHub repository
   - Use [render.yaml](render.yaml) for automatic configuration
   - Add environment variables:
     - `NODE_ENV=production`
     - `PORT=3001`
     - `CORS_ORIGIN=https://<username>.github.io/Emergency-partner/`

3. **Setup Deployment Webhook (Optional):**
   - Get your Deploy Hook URL from Render service settings
   - Add it as a GitHub secret named `RENDER_DEPLOY_HOOK`
   - The GitHub Actions workflow will automatically trigger deployments

4. **Access:**
   - Backend API will be available at: `https://emergency-partner-api.<region>.render.com`

### Environment Variables

Create `.env` files based on `.env.example` files provided:

**Root (.env):**

```env
PORT=3001
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3001/api
```

**Backend (.env):**

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env):**

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## CI/CD Pipeline

GitHub Actions workflows are configured for:

- **CI Pipeline** ([.github/workflows/ci.yml](.github/workflows/ci.yml)):
  - Runs on all pushes and pull requests to main/develop
  - Tests: Format check, Linting, Build validation
- **Frontend CD** ([.github/workflows/deploy-frontend.yml](.github/workflows/deploy-frontend.yml)):
  - Deploys to GitHub Pages on main branch
  - Only triggers on frontend changes

- **Backend CD** ([.github/workflows/deploy-backend.yml](.github/workflows/deploy-backend.yml)):
  - Validates code and deploys to Render on main branch
  - Only triggers on backend changes

## Stack

- React 18 + Vite
- Node.js + Express
- ESLint + Prettier
- GitHub Actions CI/CD
- GitHub Pages (Frontend Hosting)
- Render (Backend Hosting)
