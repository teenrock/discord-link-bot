# discord-chan-link

Note:
This script is an exemple of discord channels link by ID.
Bot must be present on all discord servers that you need to link.

# Install:

## 1°) Install nodeJS
  https://nodejs.org/en/

## 2°) Create your discord bot application
  https://discordapp.com/developers/applications/me

## 3°) Add Bot to all discord servers you need to link
  https://discordapi.com/permissions.html

## 4°) Install discord.js library in script bot directory
  npm install --save discord.js
  npm install --save events
  npm install --save express 
  npm install --save fs-extra
  npm install --save decache

## 5°) Replace "TOKEN" in config.json file with your bot token
  Replace in config_SM.json too if you choose to use the DLB SafeMode for more service stability)

## 8°) Launch discord-chan-link script
  node DLB.js
  node DLB_SM.js (only if you want to launch the SafeMode next to DLB master service)

## 9°) Add Bot to all servers you need to link
  https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot&permissions=2080767185
  (Replace CLIENT_ID_HERE by your bot ID)

**NB** (Optionally) **:** DLB_SM.js is a safe mode (relay) of DLB main script.
If launched, it will automaticaly relay the service on DLB presence status change
from **ONLINE** to **INVISIBLE**
(case of bug if it wasn't launched with **nodemon/forever** or others alternative

   **Enjoy ! :)**


