# quart

## docker run

```
docker run -it -p 8080:8080 -v ${PWD}:/local node:10 bash -c "cd local && yarn && yarn serve"
```

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
