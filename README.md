# 🐳 EcoDeli - Application Fullstack Conteneurisée avec Docker

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Docker](#architecture-docker)
3. [Prérequis](#prérequis)
4. [Installation et Démarrage](#installation-et-démarrage)
5. [Services et Configuration](#services-et-configuration)
6. [Persistance des Données](#persistance-des-données)
7. [Réseaux Docker](#réseaux-docker)
8. [Tests et Validation](#tests-et-validation)
9. [Images Docker Hub](#images-docker-hub)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Vue d'ensemble

**EcoDeli** est une application fullstack de gestion d'utilisateurs conteneurisée avec Docker, développée dans le cadre du projet de conteneurisation. L'application démontre une architecture microservices avec :

- **Frontend** : React.js avec interface moderne
- **Backend** : Node.js + Express.js avec API REST
- **Base de données** : PostgreSQL avec persistance des données
- **Orchestration** : Docker Compose pour la gestion des services

### Fonctionnalités
- ✅ Gestion CRUD des utilisateurs
- ✅ Interface utilisateur responsive
- ✅ API REST documentée
- ✅ Persistance des données
- ✅ Communication sécurisée entre services

---

## 🏗️ Architecture Docker

### Diagramme de l'architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │    │   (Node.js)     │    │   (PostgreSQL)  │
│   Port: 3000    │◄──►│   Port: 3001    │◄──►│   Port: 5432    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                    ┌─────────────────────────┐
                    │  Réseau Docker         │
                    │  fullstack_network     │
                    │  (Bridge Network)      │
                    └─────────────────────────┘
```

### Conteneurs
| Service | Image | Port | Volumes |
|---------|-------|------|---------|
| **frontend** | `ecodeli-frontend:latest` | 3000 | - |
| **backend** | `ecodeli-backend:latest` | 3001 | - |
| **database** | `postgres:15-alpine` | 5432 | `postgres_data` |

---

## 🔧 Prérequis

### Logiciels requis
- **Docker** : Version 20.10.0 ou supérieure
- **Docker Compose** : Version 2.0.0 ou supérieure
- **Git** : Pour cloner le repository

### Vérification des installations
```bash
# Vérifier Docker
docker --version
docker-compose --version

# Vérifier que Docker est en cours d'exécution
docker ps
```

---

## 🚀 Installation et Démarrage

### 1. Cloner le repository
```bash
git clone https://github.com/therebzu/dockers
cd dockers
```

### 2. Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Modifier si nécessaire (optionnel pour développement)
nano .env
```

### 3. Construire et démarrer l'application
```bash
# Construction et démarrage en mode détaché
docker-compose up --build -d

# Vérifier l'état des conteneurs
docker-compose ps
```

### 4. Accéder à l'application
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001
- **Health Check** : http://localhost:3001/health

### 5. Arrêter l'application
```bash
# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down --volumes
```

---

## ⚙️ Services et Configuration

### 🌐 Frontend (React)
- **Image** : Node.js 18 Alpine
- **Port** : 3000
- **Build** : Production optimisé
- **Fonctionnalités** :
  - Interface utilisateur moderne
  - Formulaire d'ajout d'utilisateurs
  - Liste des utilisateurs avec suppression
  - Design responsive

### 🔧 Backend (Node.js)
- **Image** : Node.js 18 Alpine
- **Port** : 3001
- **Endpoints** :
  - `GET /health` - Status de l'API
  - `GET /api/users` - Liste des utilisateurs
  - `POST /api/users` - Créer un utilisateur
  - `DELETE /api/users/:id` - Supprimer un utilisateur

### 🗄️ Database (PostgreSQL)
- **Image** : PostgreSQL 15 Alpine
- **Port** : 5432
- **Schéma** :
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 💾 Persistance des Données

### Configuration des volumes
```yaml
volumes:
  postgres_data:
    driver: local
```

### Localisation des données
- **Volume Docker** : `postgres_data`
- **Montage** : `/var/lib/postgresql/data` dans le conteneur
- **Persistance** : Les données survivent aux redémarrages

### Sauvegarde et restauration
```bash
# Sauvegarde
docker exec fullstack_database pg_dump -U postgres fullstack_app > backup.sql

# Restauration
docker exec -i fullstack_database psql -U postgres fullstack_app < backup.sql
```

---

## 🔐 Réseaux Docker

### Configuration réseau
```yaml
networks:
  fullstack_network:
    driver: bridge
```

### Communication entre services
- **Frontend ↔ Backend** : HTTP via nom de service
- **Backend ↔ Database** : PostgreSQL via nom de service
- **Isolation** : Les services ne sont accessibles qu'entre eux
- **Sécurité** : Communication interne sécurisée

### Test de connectivité
```bash
# Tester la connectivité backend → database
docker exec fullstack_backend ping database

# Tester la connectivité frontend → backend
docker exec fullstack_frontend ping backend
```

---

## 🧪 Tests et Validation

### 1. Vérification des services
```bash
# Status des conteneurs
docker-compose ps

# Logs des services
docker-compose logs frontend
docker-compose logs backend
docker-compose logs database
```

### 2. Tests de l'API
```bash
# Health check
curl http://localhost:3001/health

# Lister les utilisateurs
curl http://localhost:3001/api/users

# Créer un utilisateur
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### 3. Test de persistance
```bash
# 1. Ajouter des données via l'interface
# 2. Arrêter les conteneurs
docker-compose down

# 3. Redémarrer
docker-compose up -d

# 4. Vérifier que les données sont toujours présentes
curl http://localhost:3001/api/users
```

### 4. Test de communication réseau
```bash
# Vérifier la communication interne
docker exec fullstack_backend nc -zv database 5432
docker exec fullstack_frontend nc -zv backend 3001
```

---

## 📦 Images Docker Hub

### Images publiées
- **Frontend** : `therebzu/ecodeli-frontend:latest`
- **Backend** : `therebzu/ecodeli-backend:latest`

### Tags et commandes pour pousser
```bash
# Tag des images
docker tag ecodeli-frontend:latest therebzu/ecodeli-frontend:latest
docker tag ecodeli-backend:latest therebzu/ecodeli-backend:latest

# Push vers Docker Hub
docker push therebzu/ecodeli-frontend:latest
docker push therebzu/ecodeli-backend:latest
```

### Utiliser les images depuis Docker Hub
```bash
# Modifier docker-compose.yml pour utiliser les images publiques
# frontend:
#   image: therebzu/ecodeli-frontend:latest
# backend:
#   image: therebzu/ecodeli-backend:latest
```

---

## 🔧 Troubleshooting

### Problèmes courants

#### Port déjà utilisé
```bash
# Identifier le processus utilisant le port
netstat -tulpn | grep :3000

# Changer les ports dans docker-compose.yml si nécessaire
```

#### Échec de connexion à la base de données
```bash
# Vérifier les logs
docker-compose logs database

# Vérifier la connectivité
docker exec fullstack_backend ping database
```

#### Problème de build
```bash
# Nettoyer les images et rebuild
docker-compose down
docker system prune -f
docker-compose up --build
```

#### Volumes corrompus
```bash
# ⚠️ Supprime toutes les données
docker-compose down --volumes
docker volume prune -f
docker-compose up --build
```

### Commandes utiles
```bash
# Voir l'utilisation des ressources
docker stats

# Inspecter un conteneur
docker inspect fullstack_frontend

# Shell dans un conteneur
docker exec -it fullstack_backend sh

# Voir les réseaux
docker network ls
docker network inspect dockers_fullstack_network
```

---

## 📝 Informations du projet

### Architecture technique
- **Frontend** : React 18, JavaScript ES6+, CSS3 avec variables
- **Backend** : Node.js 18, Express.js, dotenv, cors
- **Database** : PostgreSQL 15, Volumes Docker
- **Orchestration** : Docker Compose v3.8

### Conformité aux exigences
- ✅ **Conteneurisation** : 3 services distincts
- ✅ **Docker Compose** : Orchestration complète
- ✅ **Persistance** : Volume PostgreSQL
- ✅ **Réseau** : Communication sécurisée
- ✅ **Images** : Publiées sur Docker Hub
- ✅ **Documentation** : Guide complet

### Auteur
**Projet Conteneurisation** - Année 2024-2025  
LENOIR Romain - romain.lenoir@outlook.com

---

## 📄 Licence

Ce projet est développé dans le cadre académique.

---

**🚀 L'application EcoDeli démontre une maîtrise complète de la conteneurisation Docker pour une architecture fullstack moderne !**
