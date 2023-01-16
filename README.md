# Iceman

A Tarkov-focused API and Discord bot, built with love for Hand Eye Incorporated.

The codebase is split into two parts with some shared components:

- bot: The discord bot
- server: The API

## Setup

To setup both the bot and the API:

Clone the repository
```
git clone git@github.com:chrisrowles/tarkov-iceman-bot.git
```

Install the dependencies with NPM:
```
npm install
```

Copy `.env.example` to `.env` and prepare to configure your environment variables.

### Database configuration

First of all, you'll need a MongoDB connection. Head over to https://account.mongodb.com/account/register and create an account, it's really easy to setup a free MongoDB cluster for personal use.

After you have created your account, create a database named tarkov and create the following collections:
- ammo
- armor
- backpacks
- medical
- provisions

After you have configured the database and collections, obtain your connection credentials and fill out the following environment variables:

```
MONGO_CLUSTER=
MONGO_USER=
MONGO_PASSWORD=
MONGO_DATABASE=tarkov
```

> NOTE: Ask Chris if you would like access to his MongoDB atlas cluster instead. It currently contains data for all the collections listed above in addition to configured search indexes for optimized performance.

### API authorization

Iceman comes with a simple CLI powered by [commander](https://www.npmjs.com/package/commander#installation). You can view the entire implementation at `./cli.ts`.

> NOTE: You will need to install [ts-node](https://www.npmjs.com/package/ts-node) globally in order to use the CLI provided, `npm i -g ts-node`. You don't have to if you don't want to, you can perform these steps manually, the CLI is just provided for convenience.

Use the cli to generate your app secret for API route authorization:
```
ts-node ./cli.ts app:secret
```

You should see the following output:
```
> ts-node ./cli.ts app:secret
Access token generated: x0&T3l72CoUfTCrcl921cXi4
```

You should note this down, this is the token you will use to make authenticated requests to the API.

### Compile
Compile once:
```
npm run build
```

Recompile whenever changes are detected
```
npm run watch
```

#### Serving the API

Run the api server:
```
npm run serve:api
```

With hot-reload:
```
npm run serve:api:hot
```

#### Swagger API documentation
Browse the API docs at `http://localhost:<port>/api/docs`

#### Example API response

#### Serving the Discord bot

If you want to run the bot:
```
npm run serve:bot
```

Please note the bot does not depend on the API, it contains it's own logic for accessing mongoDB. Both the bot and the API can be run separately, the bot performs read-only operations while the API performs read/write operations.

#### Example bot command

![image](https://i.imgur.com/TTvqIul.png)