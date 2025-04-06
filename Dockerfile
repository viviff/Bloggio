# Build stage
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# ADD VISIBLE LOG
RUN echo "🟨 Début de l'étape nginx"

# FORCE CLEAR
RUN rm -f /etc/nginx/conf.d/default.conf

# COPY TON FICHIER (renommé pour test)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# CHECK COPY
RUN echo "🟩 nginx.conf copié :" && cat /etc/nginx/conf.d/default.conf

# FICHIERS DE L'APP
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]