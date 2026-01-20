# TicTacTrip Back-Test - Text Justification API

## Objectif : 

Implémenter et déployer une API REST capable de justifier un texte en paramètre avec authentification par token et un système de rate limiting par utilisateur.

## Fonctionnalités : 

- **Justification de texte** : Justifie un texte à 80 caractères par ligne
- **Authentification par token** : Système de token unique par utilisateur
- **Rate limiting** : Limite de 80 000 mots par jour par token
- **Gestion d'erreurs** : Retour d'erreur 402 Payment Required en cas de dépassement
- **Code production-ready** : Entièrement développé en TypeScript

## Installation : 

### Prérequis : 

- Node.js 18+ 
- npm ou yarn

## Documentation : 

### 1. Générer un token

**Endpoint :** `POST /api/token`

Génère un token unique d'authentification pour accéder à l'endpoint de justification.

**Request :**
```bash
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email": "foo@bar.com"}'
```

**Response (200 / OK) :**
```json
{
  "token": "abc123xyz789..."
}
```

### 2. Justifier du texte : 

**Endpoint :** `POST /api/justify`

Justifie le texte fourni à 80 caractères par ligne.

**Headers :**
- `Authorization: Bearer <token>` - Token d'authentification requis
- `Content-Type: text/plain` - Type de contenu requis

**Request :**
```bash
curl -X POST http://localhost:3000/api/justify \
  -H "Authorization: Bearer abc123xyz789..." \
  -H "Content-Type: text/plain" \
  -d "Votre texte à justifier ici..."
```

**Response (200 / OK) :**
```
Texte justifié
à 80 caractères
par ligne
```

**Response (401 / Unauthorized) :**
```json
{
  "error": "Token invalide ou expiré"
}
```

**Response (402 / Payment Required) :**
```json
{
  "error": "Limite quotidienne de 80 000 mots dépassée",
  "wordCount": 85000,
  "dailyLimit": 80000
}
```

---

### 3. Structure du projet :

```
src/
├── middlewares/
│   ├── auth.middleware.ts          # Validation du token
│   └── rateLimit.middleware.ts     # Gestion du rate limiting
├── routes/
│   ├── justify.ts                  # Route de justification
│   └── token.ts                    # Route de génération de token
├── services/
│   ├── justify.service.ts          # Logique de justification
│   └── token.service.ts            # Gestion des tokens
├── app.ts                          # Configuration Express
└── server.ts                       # Point d'entrée
```

## 4. Configuration :

Les paramètres principaux peuvent être modifiés dans les fichiers de configuration :

- **Longueur des lignes** : 80 caractères (modifiable dans `justify.service.ts`)
- **Limite quotidienne** : 80 000 mots (modifiable dans `rateLimit.middleware.ts`)
- **Port du serveur** : 3000 (modifiable dans `server.ts`)

## Tests :

Des fichiers de test sont fournis pour valider les fonctionnalités :

```bash
# Lancer les tests sur la limite de caractère par ligne :
npx ts-node test.ts
# ou pour la ratelimite : 
npx ts-node test-ratemoùots.ts
```

## 5. Sécurité & Technologies : 

### Sécurité : 
- Tokens uniques générés pour chaque utilisateur
- Rate limiting pour prévenir les abus
- Validation des inputs
- Gestion d'erreurs appropriée

### Techno : 
- **Express.js** - Framework web
- **TypeScript** - Typage statique
- **Node.js** - Runtime JavaScript

## Projet réaliser par : 

[Styl1st](https://github.com/Styl1st)
