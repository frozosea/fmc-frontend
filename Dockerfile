# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
ENV VUE_APP_BACKEND_URL=http://104.248.150.196
RUN npm config set legacy-peer-deps true
RUN npm install --force
COPY . .
RUN npm run build
ENV VUE_APP_BACKEND_URL=http://104.248.150.196
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]