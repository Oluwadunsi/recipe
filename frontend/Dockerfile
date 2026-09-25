FROM node:22-alpine AS build
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80