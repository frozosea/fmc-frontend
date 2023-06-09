FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock /app
ENV VUE_APP_BACKEND_URL=https://api.findmycargo.ru
RUN yarn install
COPY . .
RUN yarn build
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]