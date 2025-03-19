# Étape 1 : Construction de l'application React
FROM node:18-alpine AS build
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copier le reste du code source
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Supprimer les fichiers de config par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés de l’application
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
