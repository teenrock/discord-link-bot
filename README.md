# discord-chan-link

Note:
This script is an exemple of discord channels link by ID.
The Bot must be present on all discord servers that you need to link.

Install:

1°) Install nodeJS
>>> https://nodejs.org/en/ <<<

2°) Create your discord bot application
https://discordapp.com/developers/applications/me

3°) Add Bot to all discord servers you need to link
>>> https://discordapi.com/permissions.html <<<

4°) Install discord.js library in script bot directory
>>> npm install discord.js <<<

5°) Replace "TOKEN" in conf.json file with your bot token

6°) Replace serverA/B/C channel ID by yours

exemple: 
(before) => var serverC_chan = bot.channels.get('123456789123456789');
(after) => var serverC_chan = bot.channels.get('987654321987654321');

7°) Replace botID by your bot ID (same method with botID variable)

8°) Launch discord-chan-link script
>>> node index.js <<<

Enjoy ! :)


