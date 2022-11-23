FROM node:12.18.2 as build


WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN yarn install
COPY . .
RUN yarn build


FROM nginx
COPY ./deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html