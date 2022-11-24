# findMyCargo frontend

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

# Instructions

### How to deploy:

For deploy using docker as containerizing system and docker swarm for managing containers. Also have UI dashboard for
managing containers - portainer. Also have docker-compose if you need it. You can do step by step deploy:

- go to `deploy/deploy.yaml`
- set env variables
- go to root project directory
- run command `make deploy`
- go to < your_machine_url >:9000 and register user in dashboard.
- enjoy :)
