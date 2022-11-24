FROM node:16-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm config set legacy-peer-deps true
RUN npm install --force
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]