[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1bb9c0f3548340fbb0707aa9ae5e6f5c)](https://www.codacy.com/gh/denkylabs/denkybot/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=denkylabs/denkybot&amp;utm_campaign=Badge_Grade) [![CodeFactor](https://www.codefactor.io/repository/github/denkylabs/denkybot/badge)](https://www.codefactor.io/repository/github/denkylabs/denkybot) [![DeepSource](https://deepsource.io/gh/denkylabs/denkybot.svg/?label=active+issues&show_trend=true&token=UQOnl2qHFX3H7dzvR077PMnv)](https://deepsource.io/gh/denkylabs/denkybot/?ref=repository-badge) [![GitHub issues](https://img.shields.io/github/issues/denkylabs/denkybot.svg)](https://GitHub.com/denkylabs/denkybot/issues/) [![GitHub contributors](https://badgen.net/github/contributors/denkylabs/denkybot)](https://GitHub.com/denkylabs/denkybot/graphs/contributors/)

[![Discord Bots](https://top.gg/api/widget/704517722100465746.svg)](https://top.gg/bot/704517722100465746)

# 🤖 Denky Bot

Denky is a brazilian [Discord](https://discord.com) bot, built with [Node.js](https://nodejs.org), [TypeScript](https://www.typescriptlang.org/) and [discord.js](https://discord.js.org).

Denky is totally modular, you can enable or disable features that you don't want, for example, http interactions, data posting to Discord bot lists, server/command logs etc.

## ⚙️ Self hosting

> ⚠️ Support will not be provided for CUSTOM self-hosted instances. Issues with custom self-hosted instances opened in this repository will be closed immediately. 

1. Create a Discord application. [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
2. Install Node.js v16.9.0 or newer.
3. Fork or clone this repository.
4. Install dependecies using `yarn`.
5. Generate the Prisma Client using `yarn prisma`.
6. Go to `packages/bot`, `packages/logger` & `packages/prisma` and rename `.env.example` to `.env` and fill out the values.
7. Go to `packages/bot` and rename `config.example.json` to `config.json` and fill out the values.
8. Build the entire project using `yarn build`.
9. Go to `dist/bot` and start the bot using `npm start`.

## License
This project is licensed under the [GPL-3.0](LICENSE) license.
