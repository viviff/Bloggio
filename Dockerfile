# Étape 1 : build Vite
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Nginx avec vraie conf React
FROM nginx:alpine

# Supprime la conf par défaut et les scripts foireux
RUN rm -f /etc/nginx/conf.d/* \
    && rm -f /docker-entrypoint.d/*-envsubst-on-templates.sh

# Ajoute ta conf React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers statiques Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]