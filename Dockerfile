FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
ENV VUE_APP_BACKEND_URL=https://api.findmycargo.ru
RUN npm config set legacy-peer-deps true
RUN npm install --force
COPY . .
RUN npm run build
# production stage
EXPOSE 8080
CMD [ "http-server", "dist" ]
