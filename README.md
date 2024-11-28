# Katsumeme Backend

API RESTful pour la plateforme Katsumeme, permettant la gestion des utilisateurs, des memes, des likes, des commentaires et des bookmarks. Développé comme partie backend du projet de fin de formation.

## 🛠 Technologies Utilisées

- Node.js avec Express
- PostgreSQL comme base de données
- Prisma comme ORM
- JWT pour l'authentification
- Multer pour la gestion des uploads
- Zod pour la validation des données
- Express Rate Limit pour la sécurité

## ✨ Fonctionnalités Principales

- 👤 Authentification complète (JWT avec refresh tokens)
- 📤 Upload et gestion sécurisée des fichiers
- ❤️ Système de likes et de commentaires
- 🔖 Gestion des favoris (bookmarks)
- 🔒 Validation robuste des données avec Zod
- 🚦 Protection anti-abus avec rate limiting

## 📋 Prérequis

- Node.js 18+
- PostgreSQL
- npm ou pnpm

## 🚀 Installation

1. Clonez le repository :

   ```bash
   git clone https://github.com/moulinetsamuel/katsumeme-back-sam.git
   cd katsumeme-back-sam
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configuration :

- Copiez le fichier `.env.example` vers `.env`
- Modifiez les variables d'environnement :

  - **PORT** : Le port sur lequel l'API sera lancée (par défaut : `3000`)
  - **FRONTEND_URL** : L'URL du frontend qui consomme cette API
  - **DATABASE_URL** : Chaîne de connexion PostgreSQL
  - **JWT_SECRET** : Clé secrète pour signer les tokens JWT
  - **JWT_EXPIRES_IN** : Durée d'expiration des tokens (en millisecondes)
  - **JWT_REFRESH_EXPIRES_IN** : Durée d'expiration des refresh tokens (en millisecondes)
  - **NB_OF_SALT_ROUNDS** : Nombre de tours pour le hash des mots de passe
  - **DEBUG_LEVEL** : Niveau de logs (0 : silencieux, 1 : debug activé)

1. Initialisez la base de données :

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

2. Démarrez le serveur :

   ```bash
   npm run dev
   ```

## 📝 Scripts Disponibles

- `npm start` : Démarre le serveur en production
- `npm run dev` : Démarre le serveur en mode développement avec watch
- `npm run prisma:deploy` : Applique les migrations Prisma
- `npm run prisma:generate` : Génère le client Prisma

## 🔗 Liens Utiles

- [Frontend Repository](https://github.com/moulinetsamuel/katsumeme-front-sam)
- [Démo en ligne](http://i4w0scw4sw4wgw44osk04ww0.82.65.221.75.sslip.io/)

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.
