# Eco-Stock Front

Application frontend développée avec **Angular 22** pour la gestion d'une plateforme de gestion de stocks alimentaires.

Cette interface communique avec une API REST Django afin de permettre aux utilisateurs authentifiés de gérer les produits, les entrepôts et les opérations liées au stock.

---

## Présentation du projet

Eco-Stock est une solution permettant de centraliser la gestion des stocks alimentaires dans différents entrepôts.

L'application frontend permet :

- l'authentification des utilisateurs ;
- l'accès à un tableau de bord de pilotage des stocks ;
- la consultation des produits ;
- la création, modification et suppression des produits ;
- le déplacement des produits entre entrepôts ;
- la gestion des entrepôts ;
- la consultation des informations d'audit des entrepôts.

---

## Fonctionnalités

### Authentification

- Connexion utilisateur avec JWT.
- Protection des routes privées.
- Gestion automatique du token JWT dans les requêtes HTTP.

### Dashboard

Le tableau de bord permet aux équipes opérationnelles d'avoir une vue globale de l'activité des stocks.

Fonctionnalités :

- Affichage du nombre total de produits.
- Affichage du nombre total d'entrepôts.
- Visualisation de la répartition des produits :
  - disponibles ;
  - réservés ;
  - périmés.
- Affichage du nombre de produits présents dans chaque entrepôt grâce à l'audit fourni par l'API.
- Visualisation graphique des statistiques de stock avec Chart.js.
- Mise à jour automatique des données grâce aux Signals Angular.

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
- Affichage du nombre de produits par entrepôt grâce à l'endpoint d'audit.
- Consultation des produits associés à un entrepôt.

---

# Technologies utilisées

- **Angular 22**
- **TypeScript**
- **RxJS**
- **Bootstrap 5**
- **Bootstrap Icons**
- **Angular Router**
- **JWT Authentication**
- **Chart.js**
- **ng2-charts**

---

# Architecture du projet

L'application suit une architecture Angular basée sur la séparation des responsabilités.

L'organisation est structurée par fonctionnalité (feature-based architecture) avec une séparation entre :

- `core` : éléments partagés de l'application (services, modèles, guards, interceptors, configuration API) ;
- `features` : fonctionnalités métier de l'application ;
- `layout` : structure globale de l'interface.


```
src/app/
│
├── core/
│   │
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
│       ├── dashboard.ts
│       ├── product.ts
│       └── warehouse.ts
│
│
├── features/
│   │
│   ├── auth/
│   │   └── login/
│   │       ├── login.ts
│   │       ├── login.html
│   │       └── login.css
│   │
│   ├── dashboard/
│   │   ├── dashboard.ts
│   │   ├── dashboard.html
│   │   └── dashboard.css
│   │
│   ├── products/
│   │   │
│   │   ├── product-list/
│   │   ├── product-create/
│   │   ├── product-detail/
│   │   ├── product-edit/
│   │   └── product-move/
│   │
│   │
│   └── warehouses/
│       │
│       ├── warehouse-list/
│       ├── warehouse-create/
│       ├── warehouse-detail/
│       └── warehouse-edit/
│
│
├── layout/
│   │
│   └── main-layout/
│       ├── main-layout.ts
│       ├── main-layout.html
│       └── main-layout.css
│
│
├── app.config.ts
├── app.routes.ts
├── app.html
├── app.css
└── app.ts
```
# Organisation des dossiers

## Core

Contient les éléments techniques partagés :

- **config** : configuration centralisée des URLs API.
- **guards** : protection des routes selon l'état d'authentification.
- **interceptor** : ajout automatique du token JWT dans les requêtes HTTP.
- **models** : interfaces TypeScript représentant les données manipulées.
- **services** : gestion des appels API et de l'état applicatif avec Angular Signals.


## Features

Organisation par fonctionnalité métier.

### Auth

Gestion de l'authentification utilisateur avec JWT.

### Dashboard

Tableau de bord permettant :

- l'affichage des indicateurs globaux ;
- le suivi du nombre de produits par entrepôt ;
- la visualisation de la répartition des produits disponibles, réservés et périmés ;
- l'affichage graphique des statistiques de stock.

### Products

Gestion complète des produits :

- consultation ;
- création ;
- modification ;
- suppression ;
- détail ;
- transfert vers un autre entrepôt.

### Warehouses

Gestion complète des entrepôts :

- consultation ;
- création ;
- modification ;
- suppression ;
- détail ;
- consultation du nombre de produits associés grâce à l'audit fourni par l'API.
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