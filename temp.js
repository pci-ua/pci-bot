//Token, ID and secrets
const app_id = '762668260499914752'
const guild_id = '771366085868912671'
const botToken = 'NzYyNjY4MjYwNDk5OTE0NzUy.X3sgKg.XRDbCzCjZAUzlscRNzEIWOL5FC0'

//access link
const apiEndpoint = `https://discord.com/api/v8/applications/${app_id}/guilds/${guild_id}/commands`

//data
const commandData = {
  "name": "sub",
  "description": "Gère vos abonnements à des flux d'informations.",
  "options": [
      {
          "name": "action",
          "description": "L'action souhaité",
          "type": 3,
          "required": true,
          "choices": [
              {
                  "name": "Liste",
                  "value": "ls"
              },
              {
                  "name": "Liste",
                  "value": "list"
              },
              {
                  "name": "Inscription",
                  "value": "add"
              },
              {
                  "name": "Inscription",
                  "value": "join"
              },
              {
                  "name": "Désinscription",
                  "value": "remove"
              },
              {
                  "name": "Désinscription",
                  "value": "leave"
              }
          ]
      },
      {
          "name": "role",
          "description": "Nom du flux souhaité (sauf pour list)",
          "type": 5,
          "required": false
      }
  ]
}

async function main () {
  const fetch = require('node-fetch')

  const response = await fetch(apiEndpoint, {
    method: 'post',
    body: JSON.stringify(commandData),
    headers: {
      'Authorization': 'Bot ' + botToken,
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()

  console.log(json)
}
main()
