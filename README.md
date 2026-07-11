# Eco-Stock Front

Application frontend développée avec **Angular 22** pour la gestion d'une plateforme de gestion de stocks alimentaires.

Cette interface communique avec une API REST Django afin de permettre aux utilisateurs authentifiés de gérer les produits, les entrepôts et les opérations liées au stock.

---

## Présentation du projet

Eco-Stock est une solution permettant de centraliser la gestion des stocks alimentaires dans différents entrepôts.

L'application frontend permet :

- l'authentification des utilisateurs ;
- la consultation des produits ;
- la création, modification et suppression des produits ;
- le déplacement des produits entre entrepôts ;
- la gestion des entrepôts ;
- la consultation des informations d'audit.

---

## Fonctionnalités

### Authentification

- Connexion utilisateur avec JWT.
- Protection des routes privées.
- Gestion automatique du token JWT dans les requêtes HTTP.

### Gestion des produits

- Affichage de la liste des produits.
- Création d'un produit.
- Modification d'un produit.
- Suppression d'un produit.
- Consultation du détail d'un produit.
- Transfert d'un produit vers un autre entrepôt.

### Gestion des entrepôts

- Affichage des entrepôts.
- Création d'un entrepôt.
- Modification d'un entrepôt.
- Suppression d'un entrepôt.
- Consultation du détail d'un entrepôt.
- Affichage du nombre de produits par entrepôt grâce à l'audit.

---

# Technologies utilisées

- **Angular 22**
- **TypeScript**
- **RxJS**
- **Bootstrap 5**
- **Bootstrap Icons**
- **Angular Router**
- **JWT Authentication**

---

# Architecture du projet

L'application suit une architecture Angular basée sur la séparation des responsabilités :

```
src/app/
│
├── core/
│   ├── config/
│   │   └── api.config.ts
│   │
│   ├── guards/
│   │   ├── auth-guard.ts
│   │   └── guest-guard.ts
│   │
│   ├── interceptors/
│   │   └── jwt-interceptor.ts
│   │
│   ├── models/
│   │   ├── auth-response.ts
│   │   ├── product.ts
│   │   ├── product-create.ts
│   │   ├── product-update.ts
│   │   ├── warehouse.ts
│   │   ├── warehouse-create.ts
│   │   └── warehouse-update.ts
│   │
│   └── services/
│       ├── auth.ts
│       ├── product.ts
│       └── warehouse.ts
│
├── features/
│   ├── auth/
│   │   └── login/
│   │
│   ├── products/
│   │   ├── product-list/
│   │   ├── product-create/
│   │   ├── product-detail/
│   │   ├── product-edit/
│   │   └── product-move/
│   │
│   └── warehouses/
│       ├── warehouse-list/
│       ├── warehouse-create/
│       ├── warehouse-detail/
│       └── warehouse-edit/
│
├── layout/
│   └── main-layout/
│
├── app.config.ts
├── app.routes.ts
└── app.ts
```

---

# Organisation des dossiers

## Core

Contient les éléments partagés de l'application :

- **config** : configuration de l'API backend.
- **guards** : protection des routes.
- **interceptors** : gestion automatique des requêtes HTTP.
- **models** : interfaces TypeScript.
- **services** : logique métier et appels API.

---

## Features

Organisation par fonctionnalité :

### Auth

Gestion de la connexion utilisateur.

### Products

Gestion complète des produits :

- liste ;
- création ;
- modification ;
- détail ;
- déplacement.

### Warehouses

Gestion des entrepôts :

- liste ;
- création ;
- modification ;
- détail.

---

# Authentification JWT

L'application utilise une authentification basée sur JWT.

Le fonctionnement :

1. L'utilisateur se connecte.
2. L'API retourne un access token et un refresh token.
3. Le token d'accès est ajouté automatiquement aux requêtes HTTP grâce à l'intercepteur JWT.

Exemple :

```http
Authorization: Bearer <access_token>
```

Les routes sont protégées grâce aux guards :

- `authGuard` : protège les pages privées.
- `guestGuard` : empêche un utilisateur connecté d'accéder à la page de connexion.

---

# Communication avec l'API

La configuration des endpoints est centralisée dans :

```
src/app/core/config/api.config.ts
```

Endpoints utilisés :

```
/api/products/
/api/warehouses/
/api/token/
/api/token/refresh/
```

---

# Installation

## Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/eco-stock-front.git
```

## Installer les dépendances

```bash
npm install
```

## Lancer l'application

```bash
npm start
```

L'application sera disponible sur :

```
http://localhost:4200
```

---

# Commandes disponibles

| Commande | Description |
|---|---|
| `npm start` | Lance le serveur Angular |
| `npm run build` | Génère la version production |
| `npm test` | Lance les tests |

---

# Backend associé

Cette application frontend fonctionne avec l'API backend **Eco-Stock développée avec Django REST Framework**.

Le backend gère :

- les utilisateurs ;
- les produits ;
- les entrepôts ;
- les règles métier ;
- l'authentification JWT.

---

# Auteur

**Dado Watt**

Projet développé dans le cadre d'un projet de développement Full Stack.

**Frontend : Angular 22**  
**Backend : Django REST Framework**