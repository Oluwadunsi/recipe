# Recipe Application

A recipe application that allows users to search for recipes and save their favourite recipes.

## Requirements

- Docker Desktop
- Kubernetes enabled in Docker Desktop
- kubectl
- A RecipeAPI.io API key

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: PostgreSQL
- API communication: REST API and HTTP
- Containerisation: Docker
- Container orchestration: Kubernetes
- Image registry: Docker Hub
- Version control: Git and GitHub
- External API: RecipeAPI.io

## Setup

Clone the repository:

```bash
git clone https://github.com/Oluwadunsi/recipe.git
cd recipe

kubectl create secret generic recipe-api-secret --from-literal=RECIPEAPI_API_KEY="YOUR_API_KEY"
kubectl create secret generic postgres-secret --from-literal=POSTGRES_USER="user" --from-literal=POSTGRES_PASSWORD="YOUR_PASSWORD" --from-literal=POSTGRES_DB="recipe_app"
```


