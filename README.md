# R6Stats

A full stack React/GraphQL/Express application that collects player statistics on the game Rainbow Six Siege using Ubisoft's api. Polls Ubisoft and stores that data if something has changed since the last call. Changes indicate that a match has finished, so the difference between each record represents what happened in said match.

Stats and matches can be queried via a GraphQL endpoint.

## How to Run

Set up environment variables for things like the port or database uri. You can create a `.env` file and follow the `.env.example` file.

This app uses MongoDB and expects a server to already be running. Nothing is set up for passwords at the moment. Mongo related scripts are only for development purposes.

```shell
$ npm install
$ npm start
```

More to come. TODO: Tests, docs, frontend.
