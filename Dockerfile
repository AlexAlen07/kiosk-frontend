# -------- Build stage --------
FROM node:20-alpine AS build
WORKDIR /app

COPY kiosk-frontend/package*.json ./
RUN npm ci

COPY kiosk-frontend/ ./

# Inyectar variables de Vite en build-time
ARG VITE_CHAT_PROVIDER
ARG VITE_CHAT_API_ENDPOINT
ARG VITE_API_BASE

ENV VITE_CHAT_PROVIDER=${VITE_CHAT_PROVIDER}
ENV VITE_CHAT_API_ENDPOINT=${VITE_CHAT_API_ENDPOINT}
ENV VITE_API_BASE=${VITE_API_BASE}

RUN npm run build

# -------- Runtime stage (Nginx) --------
FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'  location / {' \
'    try_files $uri $uri/ /index.html;' \
'  }' \
'}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1