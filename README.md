# Application Full Stack Conteneurisée avec Docker

## Description du Projet

Cette application démontre la conteneurisation d'une application full stack complète utilisant Docker et Docker Compose. L'application comprend :

- **Frontend** : Application React (port 3000)
- **Backend** : API REST Node.js/Express (port 3001)  
- **Base de données** : PostgreSQL (port 5432)

## Architecture Docker

### Services Configurés

1. **database** : Conteneur PostgreSQL avec persistance des données
2. **backend** : API Node.js/Express connectée à la base de données
3. **frontend** : Application React communicant avec l'API

### Volumes Configurés

- `postgres_data` : Volume persistant pour les données PostgreSQL
- `./database/init.sql` : Script d'initialisation de la base de données

### Réseau Personnalisé

- `fullstack_network` : Réseau bridge personnalisé (172.20.0.0/16)
- Communication sécurisée entre les conteneurs
- Isolation du trafic réseau

## Prérequis

- Docker (version 20.10 ou supérieure)
- Docker Compose (version 2.0 ou supérieure)
- Au moins 2 GB de RAM libre
- Ports 3000, 3001, et 5432 disponibles

## Installation et Démarrage

### 1. Cloner le Repository

```bash
git clone <votre-repository-url>
cd dockers
```

### 2. Construire et Démarrer l'Application

```bash
# Construire et démarrer tous les services
docker-compose up --build

# Ou en arrière-plan
docker-compose up --build -d
```

### 3. Vérifier le Démarrage

```bash
# Vérifier l'état des conteneurs
docker-compose ps

# Consulter les logs
docker-compose logs -f
```

## Accès à l'Application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001
- **Base de données** : localhost:5432 (postgres/password)

### Endpoints API Disponibles

- `GET /health` : Status de l'API
- `GET /api/users` : Liste des utilisateurs
- `POST /api/users` : Créer un utilisateur
- `DELETE /api/users/:id` : Supprimer un utilisateur

## Tests de Communication et Persistance

### 1. Test de Communication Frontend-Backend

1. Ouvrir http://localhost:3000
2. Ajouter un nouvel utilisateur via le formulaire
3. Vérifier que l'utilisateur apparaît dans la liste

### 2. Test de Persistance des Données

```bash
# Arrêter les conteneurs
docker-compose down

# Redémarrer (sans --build pour tester la persistance)
docker-compose up

# Vérifier que les données sont toujours présentes
```

### 3. Test de Communication Backend-Database

```bash
# Se connecter au conteneur backend
docker-compose exec backend sh

# Tester la connexion à la base de données (depuis le conteneur)
curl http://localhost:3001/api/users
```

### 4. Test de Réseau Sécurisé

```bash
# Inspecter le réseau
docker network inspect dockers_fullstack_network

# Vérifier les connexions entre conteneurs
docker-compose exec backend ping database
docker-compose exec frontend ping backend
```

## Commandes Utiles

### Gestion des Conteneurs

```bash
# Démarrer les services
docker-compose up

# Arrêter les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart backend

# Voir les logs d'un service
docker-compose logs frontend

# Reconstruire une image
docker-compose build backend
```

### Gestion des Volumes et Données

```bash
# Lister les volumes
docker volume ls

# Supprimer tous les volumes (ATTENTION: perte de données)
docker-compose down -v

# Backup de la base de données
docker-compose exec database pg_dump -U postgres fullstack_app > backup.sql
```

### Debugging

```bash
# Se connecter à un conteneur
docker-compose exec backend sh
docker-compose exec database psql -U postgres -d fullstack_app

# Inspecter les réseaux
docker network ls
docker network inspect dockers_fullstack_network
```

## Structure du Projet

```
dockers/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── backend/
│   ├── server.js
│   ├── .env
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## Configuration Environnement

### Variables d'Environnement Backend

- `PORT` : Port du serveur (défaut: 3001)
- `DB_HOST` : Hôte de la base de données (défaut: database)
- `DB_NAME` : Nom de la base de données (défaut: fullstack_app)
- `DB_USER` : Utilisateur PostgreSQL (défaut: postgres)
- `DB_PASSWORD` : Mot de passe PostgreSQL (défaut: password)
- `DB_PORT` : Port PostgreSQL (défaut: 5432)

### Variables d'Environnement Frontend

- `REACT_APP_API_URL` : URL de l'API backend (défaut: http://localhost:3001)

## Fonctionnalités Implémentées

✅ Conteneurisation de chaque composant (frontend, backend, database)  
✅ Orchestration avec Docker Compose  
✅ Volumes pour persistance des données PostgreSQL  
✅ Réseau personnalisé pour communication sécurisée  
✅ Health checks pour tous les services  
✅ Gestion des dépendances entre services  
✅ Configuration environnement pour chaque service  
✅ Scripts d'initialisation de base de données  

## Troubleshooting

### Problèmes Courants

1. **Port déjà utilisé**
   ```bash
   # Changer les ports dans docker-compose.yml
   ports:
     - "3001:3001"  # Changer le premier port
   ```

2. **Échec de connexion à la base de données**
   ```bash
   # Vérifier que le service database est démarré
   docker-compose ps
   docker-compose logs database
   ```

3. **Problème de build**
   ```bash
   # Nettoyer les images et reconstruire
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

## Contribution

Ce projet a été développé dans le cadre du TP "Conteneurisation d'une Application Full Stack avec Docker".

## License

Ce projet est à des fins éducatives uniquement.
