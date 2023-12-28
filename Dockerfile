FROM node:20-alpine3.19 as build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ARG API_ENDPOINT="https://localhost:5133"

# set environment variables
RUN sed -i "s#%API_ENDPOINT%#${API_ENDPOINT}#g" src/environments/environment.ts

RUN npm run build

# FROM nginx:stable-alpine3.17-slim
FROM nginx

COPY --from=build app/dist/pizza-demergenza-ui /usr/share/nginx/html

# Creates ssl
RUN mkdir -p /etc/nginx/ssl \
    && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/ssl.key -out /etc/nginx/ssl/ssl.crt \
    -subj "/C=TR/ST=TR/L=Bursa/O=demergenza/CN=demergenza.com"

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]