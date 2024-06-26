## Quick Start

Clone the repo:

```bash
git clone --depth 1 https://github.com/nupur4015/authentication-system.git
cd authentication-system
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install
```



## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

## Environment Variables

These environment variables need to be added in `.env` file. 

```bash
# Port number
PORT=3000

# URL of the PostgreSQL database
DATABASE_URL=postgresql://postgres:secret@localhost:5432/mydb?schema=public

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
GOOGLE_CLIENT_ID="abc.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="abc"

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.





