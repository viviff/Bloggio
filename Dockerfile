# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copier et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet et build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Port d'écoute
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
