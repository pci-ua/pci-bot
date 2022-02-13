# CommunityBot

![Logo](https://cdn.discordapp.com/avatars/890170798290141234/3997b18668946add0f1b1fdf89545b27.webp?size=128)

### Objectif


### Utilisation

Requis :
 - npm (min v7)
 - nodejs (min v16)
 - sqlite3 (min recommandé 3.27.2)

#### Gestions slashs commands
Pour chaque commande créé une pair de fichier en `.json` et `.js`
chaque fichier `x.json` servira à créé la commande `/x ...`
et chaque `x.js` gèrera le traitement de la commande `/x ...`

#### Installation
```bash
git clone https://...
cd ...
npm ci
```
#### Lancement
Développement :
```bash
npm run dev
```
Production :
```bash
npm run
```


## Structure

### SlashCommands

Pour créer une nouvelle SlashCommande sur discord : il faut créer un dossier avec pour nom celui de la commande, ce dernier doit au minimum contenir les fichier suivants :
 - `syntax.json` qui définie la syntaxe de la commande qui suis [la forme officiel](https://discord.com/developers/docs/interactions/application-commands#slash-commands-example-slash-command)
 - `run.js` qui exporte une fonction qui sera appelée lorsque la commande sera utilisé le premier paramètres étant l'interaction lié à la commande et le second est le bot qui a reçu la commande.

### Plugins

Si vous avez besoin que certaine(s) de vos fonctionnalité(s) soit disponible de partout, pour par exemple faire des polyfill de méthode ou affecter un comportement de manière global, vous pouvez créer un fichier `*.js` dans le dossier plugin il sera automatiquement charger au début du programme.

⚠️ Il est toujours préférable de déporté le cout de votre code une fois au chargement du fichier plutôt qu'à chaque appel d'une fonction.