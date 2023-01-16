# Iceman

A Tarkov-focused API and Discord bot, built with love for Hand Eye Incorporated.

The codebase is split into two parts with some shared components:

- bot: The discord bot
- server: The API

## Setup

To setup both the bot and the API:

Start by cloning the repository
```
git clone git@github.com:chrisrowles/tarkov-iceman-bot.git
```

#### Quick setup

Iceman comes with a quick setup script - `./setup` - that automates most of the steps below. It will create an .env file, install dependencies, generate an app secret for route authorization and ask you to confirm that you have configured the required environment variables for running the provided docker development environment before spinning up the containers.

To run the quick setup script:
```
./setup
```

Example guided setup:
```
> ./setup
No .env detected, creating .env from .env.example
Dependencies already installed, continuing...
[action required] Generate app secret for authenticated client requests? (y/n): y
Access token generated: eDAxNGp2RElkTEFCUTdKJnI5TnEwRXRv
[info] don't forget to store the access token above for making requests from your client!

[info] Starting docker development environment
Before continuing, please make sure you have configured environment variables:
PROXY_PUBLIC_PORT, ICEMAN_PROJECT, ICEMAN_API_HOST
Consult the README for more details.
[action required] Please confirm once you are ready to continue (y): y
[action required] Would you like to rebuild images when spinning up containers? (y/n): n
Spinning up containers
[+] Running 5/5
 ⠿ Network iceman-dev_default  Created 0.0s
 ⠿ Network iceman-development  Created 0.0s
 ⠿ Container iceman-watch      Started 0.4s
 ⠿ Container iceman-web        Started 2.2s
 ⠿ Container iceman-proxy      Started 2.5s
```

Read the manual setup section below to gain a better understanding of the environment.

### Manual setup

Install the dependencies with NPM:
```
npm install
```

Copy `.env.example` to `.env` and prepare to configure your environment variables.

### CLI

Iceman comes with a simple CLI powered by [commander](https://www.npmjs.com/package/commander#installation), for making standard development tasks easier.

You can view the entire implementation at `./cli.ts`.

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

Use the cli to generate your app secret for API route authorization, if you are not using the CLI, use a randomly generated 24-character string instead:
```
npx ts-node ./cli.ts app:secret
```

You should see the following output, a base-64 encoded representation of your app secret:
```
> npx ts-node ./cli.ts app:secret
Access token generated: eDA3TkQwT2xISGZjTWF4UCE3ZkVvUWNa
```

You should note this down, this is the token you will use to make authenticated requests to the API.

### Docker

Iceman comes with a fully configured docker environment that handles compilation and hot-reloading in addition to providing ease-of-access through an nginx proxy.

To use the docker environment:

Configure the following environment variables:
```
PROXY_PUBLIC_PORT=80
ICEMAN_PROJECT=  # i.e "/home/chris/workspace/iceman-dev"
ICEMAN_API_HOST= # i.e. "iceman-api.tarkov.local"
```

Start the docker containers:

```
docker-compose up -d
```

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

If you would like to change the port, you can either update the environment variable manually, or use the CLI:
```
ts-node ./cli.ts app:port 8080
```

#### Swagger API documentation

Browse the API docs at `http://localhost:<port>/api/docs`

![API Docs](https://i.imgur.com/hgUPWON.png)

#### Example API request

Request:

```
curl --location --request GET 'http://localhost:3000/api/ammo/search?name=7.62x39%20BP' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer eDA3TkQwT2xISGZjTWF4UCE3ZkVvUWNa'
```

Response:
```json
[
    {
        "_id": "63c29f7e5cbf95a0bfed5774",
        "Icon": "",
        "Name": "7.62x39mm BP gzh",
        "Damage": "58",
        "Penetration Power": "47",
        "Armor Damage %": "63",
        "Accuracy %": "-3",
        "Recoil": "+5",
        "Fragmentation Chance": "12%",
        "Ricochet Chance": "31.5%",
        "Light Bleeding Chance %": "",
        "Heavy Bleeding Chance %": "",
        "Projectile Speed (m/s)": "730",
        "Special Effects": "",
        "Obtainable by": "Workbench LV3"
    }
]
```

#### Serving the Discord bot

If you want to run the bot:
```
npm run serve:bot
```

Please note the bot does not depend on the API, it contains it's own logic for accessing mongoDB. Both the bot and the API can be run separately, the bot performs read-only operations while the API performs read/write operations.

#### Example bot commands

![Raid Times](https://i.imgur.com/hnjSEWc.png)

![Misc](https://i.imgur.com/PEnB4rf.png)