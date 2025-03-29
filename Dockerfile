# Étape 1 : Build avec Vite
FROM node:18-alpine AS build
WORKDIR /app

# Copier et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet et build
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Port d'écoute
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
