#!/bin/bash

# Script pour construire et pousser les images Docker vers Docker Hub
# Remplacez 'votre-username' par votre nom d'utilisateur Docker Hub

DOCKER_USERNAME="votre-username"
PROJECT_NAME="docker-fullstack-app"

echo "=== Construction et push des images Docker ==="

# Construction des images
echo "Construction de l'image frontend..."
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest ./frontend

echo "Construction de l'image backend..."
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest ./backend

# Push vers Docker Hub
echo "Push de l'image frontend vers Docker Hub..."
docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest

echo "Push de l'image backend vers Docker Hub..."
docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest

echo "=== Images poussées avec succès vers Docker Hub ==="
echo "Frontend: ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest"
echo "Backend: ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest"