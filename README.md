# Dragonball Z Character Database

![Dragonball Z Character Database](/img/dragonball-character-database.jpeg 'Dragonball Z Character Database')

## Installation and Setup

Download this repo to your local machine. Navigate to the root folder for both the backened and the client. Use your Terminal App to run the commands below.

You need to have the REST API Server and the Client App server running together at the same time for the app to work.

## backend folder

1. Run the command `npm install` to install node_modules

## client folder

1. Run the command `npm install` to install node_modules

## Running the app

1. Open the `app.js` file inside of client/public/js/app.js
2. Uncomment the variable for `localAPI` and replace the variable inside of `profileResponse` see the code snippet below.

```javascript
const localAPI = 'http://localhost:3000/';
// const onlineAPI = 'https://dbz-database-backend.onrender.com/';
const profileResponse = await fetch(`${localAPI}${user}`);
```

`cd` into the backend folder and run `npm run servers`

The client app is running locally, on port 8080 http://localhost:8080/

The backend server is running locally, on port 3000 http://localhost:3000/
