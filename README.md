
## Description

This is a study project to get familiar with some Node-related technologies.

### The Stack

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [TypeScript](https://github.com/Microsoft/TypeScript) Typescript
- [Prisma](https://github.com/prisma/prisma/tree/HEAD/packages/cli) ORM for the client and database
- [GraphQL](https://github.com/graphql/graphql-js) the "new" way to API


## Bootstrap
Suggest running it in dockers. You will need Docker and Docker-compose installed.

- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/install/)

#### To boot app the app
```Bash
npm run dockers-build
```

Once up you will have a functioning backend that runs both the `REST API` and the `GraphQL` together.

##### GraphQL
available as a sandbox in the browser.

```
http://localhost:8794/graphql
```

##### REST API
available as series of routes

reading
```
curl localhost:8794/books
curl localhost:8794/book/1
```
creating
```
curl -X POST localhost:8794/create-book -d '{"title":"abc","authorFirstName":"ABC","authorLastName":"ABC","year":"2022-12-12"}' -H "Content-type: application/json"
```



#### To run tests
```Bash
npm run dockers-test
```
