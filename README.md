# Background and motivation
Trying to learn GraphQL (https://graphql.org/) I found the "Code Challenge for Scoutbase" (https://medium.com/scoutbase/we-are-hiring-javascript-developers-e7833762a40d). 
 
The drawback of the challenge was that I've never done a nodejs app but as I knew JS and I have many many years of experience building web apps (mainly .net) and I love to learn new thing, I decided to go for it! 
 
So I went from nothing (0) using NodeJs, GraphQL, Sequelize, PostgreSQL to this in just a couple of hours.
 
Here you have the code (it's an MVP or a prototype) and the code challenge description
 
The app is deployed to Azure through Azure pipelines. [![Build Status](https://dev.azure.com/hernanzaldivar/scoutbase-code-challenge/_apis/build/status/vackup.scoutbase-code-challenge-back-end?branchName=master)](https://dev.azure.com/hernanzaldivar/scoutbase-code-challenge/_build/latest?definitionId=26&branchName=master)

The app is using an Azure Database for PostgreSQL. 

You can access the Graphql playground here https://scoutbase-code-challenge-backend.azurewebsites.net/graphql 

# Back-end task of Code Challenge for Scoutbase

This task is for demonstrating your understanding of HTTP, GraphQL, Node.js and general API practices.

Instructions:

1. Implement a Node.js-based server with raw `http`, Koa or Express.
2. Add a `/graphql` endpoint serving the apollo-server or any other GraphQL implementation.
3. Schema must be able to return proper response for the following public query:

```graphql
{
  movies {
    title
    year
    rating
    actors {
      name
      birthday
      country
      directors {
        name
        birthday
        country
      }
    }
  }
}
```

4. Add support for the following mutation:
```graphql
mutation createUser($username: String, $password: String) {
  createUser(username: $username, password: $password) {
    token
    user {
      id
      name
    }
  }
}
```

5. To expand on the number four, add a mutation-based authentication that accepts:
```graphql
mutation login($username: String, $password: String) {
  login(username: $username, password: $password) {
    token
    user {
      id
      name
    }
  }
}
```

6. Authenticated users may request additional fields for the query used earlier. New `scoutbase_rating` field must return the a random string between 5.0-9.0:

```graphql
{
  movies {
    scoutbase_rating

    title
    year
    rating
    actors {
      name
      birthday
      country
      directors {
        name
        birthday
        country
      }
    }
  }
}
```

7. `/graphql` must be accessible for external clients.

8. End.
