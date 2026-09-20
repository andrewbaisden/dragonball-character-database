# Dragon Ball Character Database

A character archive for looking up Dragon Ball fighters, their stats, and special abilities.

![Dragonball Z Character Database](img/dragonball-character-database.png 'Dragon Ball Character Database')

## Installation and Setup

Download this repo to your local machine. You need both the API and the client running at the same time.

### Backend

```bash
cd backend
npm install
```

### Client

```bash
cd client
npm install
```

## Running the app

From the `backend` folder:

```bash
npm run servers
```

This starts the API on [http://localhost:8080](http://localhost:8080/) and the client on [http://localhost:3000](http://localhost:3000/).

When the client is opened on localhost it talks to the local API automatically.

### API endpoints

- `GET /characters` — full roster
- `GET /:characterId` — one character, matched by id or name (`goku`, `android-17`, `Goku Black`)
