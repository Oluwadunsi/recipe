FROM node:22-alpine
WORKDIR /recipe-service
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]