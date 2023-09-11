### Build stage ###
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --output-path=app/dist/summer-frontend

### Production stage ###
FROM nginx:alpine
COPY --from=build app/dist/summer-frontend /usr/share/nginx/html
EXPOSE 80
