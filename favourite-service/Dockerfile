FROM node:22-alpine
WORKDIR /favourite-service
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT ["node", "server.js"]