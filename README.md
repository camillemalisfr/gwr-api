# Global Wellness Retreats API

GWR API is a REST API that allows external partners (travel agencies, wellness platforms) to securely transmit and retrieve GWR clients data.

This API is built with:

- [Nest](https://github.com/nestjs/nest) Nodejs framework for building APIs.
- [Objection.js](https://vincit.github.io/objection.js/) A lightweight SQL ORM based on [Knex](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/) for the database

## Installation

Run:

```bash
$ npm install
```

Then create a _.env_ file at the root of the project and copy-paste the ._env.template_ file content. Fill in missing environnment variables.

Then run :

```bash
$ npm run migrate
```

To create tables in your database.

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

## API usage

Please follow the Swagger documentation available at [http://localhost:3000/api](http://localhost:3000/api)

This API requires to be authenticated by providing a Bearer token in your request's headers.
To get a token, run:

```
curl --request POST \
  --url https://dev-kokd1cr05tjza577.us.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"your_client_id","client_secret":"your_client_secret","audience":"https://dev-kokd1cr05tjza577.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
```

## Security

This API is secured by using the security package [Helmet](https://www.npmjs.com/package/helme). It also implements Rate limiting, for protection against brute-force attacks.
All inputs coming from users are checked against a Validation schema.

For Authentification &Authorization, the industry standard Oauth2 protocal is used, and specifically the [Oauth2 Client Credentials Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow), which is the recommended flow for server-to-server authentification.

The flow works as follow:

1. The Client Application calls the authorization server with its credentials (see the Curl command in [API Usage](#api-usage)). The authorization server validates the credentials and returns a JWT Access Token signed with the RS256 Algorithm.
2. The Client Application makes request to GWR API with the JWT in the _Authorization_ header. (Bearer Authentication)
3. GWR verifies the JWT signature with the public signing key and authorize the request.

## Test

```bash
# e2e tests
$ npm run test:e2e

```

## Todo / Next steps

- Add Unit tests
- Add Dockerfiles to run the API + the database in containers
- Add more validation checks on data, like travelDateStart & travelDateEnd (both dates are in the future, travelDateStart is before travelDateEnd ...)
- Implement Logging suitable for production (using a robust library like Winston)
- Implement Authorization, with the scopes decoded in the JWT, to check wether the client has access to this particuliar route / action
- improve Swagger documentation
