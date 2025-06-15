#\!/bin/bash

# Script pour construire et publier les images sur Docker Hub
# Remplacez 'yourusername' par votre nom d'utilisateur Docker Hub

DOCKER_USERNAME="yourusername"
PROJECT_NAME="fullstack-docker-app"

echo "🔨 Construction des images Docker..."

# Construction de l'image frontend
echo "📦 Construction de l'image frontend..."
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest ./frontend

# Construction de l'image backend
echo "📦 Construction de l'image backend..."
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest ./backend

echo "🚀 Publication des images sur Docker Hub..."

# Connexion à Docker Hub (vous devrez entrer vos identifiants)
docker login

# Publication des images
docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest
docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest

echo "✅ Images publiées avec succès sur Docker Hub\!"
echo "Frontend: ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest"
echo "Backend: ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest"