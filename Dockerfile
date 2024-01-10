FROM node:lts as build
RUN node -v
WORKDIR /app

COPY package*.json .

RUN npm config set strict-ssl false
ENV NO_PROXY=registry.npmjs.org
RUN npm ci --maxsockets 1

COPY . .

ARG API_ENDPOINT="https://localhost:5133"

# set environment variables
RUN sed -i "s#%API_ENDPOINT%#${API_ENDPOINT}#g" src/environments/environment.ts

RUN npm run build --verbose

FROM nginx:stable-alpine3.17

COPY --from=build app/dist/pizza-demergenza-ui /usr/share/nginx/html

# Create ssl
RUN apk add openssl
RUN mkdir -p /etc/nginx/ssl \
    && openssl req -newkey rsa:2048 -new -x509 -nodes -days 3650 \
    -subj "/C=TR/L=Bursa/O=PizzaDemergenza/CN=Demergenza" \
    -keyout /etc/nginx/ssl/key.pem -out /etc/nginx/ssl/cert.pem

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]