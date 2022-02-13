<div align="center">

# PC[ Community ]

![Logo](https://cdn.discordapp.com/app-icons/890170798290141234/3997b18668946add0f1b1fdf89545b27.png?size=256)

</div>

## Description

PC[ Community ] est un robot discord développer et maintenu par PC[i] avec comme objectif de....

## Utilisation

### Pré-requis

Il vous faudra :
 - docker min : `18.x.x` , recommandé `18.09.x`
 - docker-compose min `1.29.x` , recommandé `1.29.x`


### Installation

```bash
git clone https://github.com/pci-ua/pci-community.git
cd pci-community/
cp .env.sample .env
```

Puis éditer le fichier `.env` pour rajouter vos token


### Execution

```bash
docker-compose up
```

Et ne pas oublier de lancer l'enregistrement automatique des backup



## Structure

### SlashCommands

Pour créer une nouvelle SlashCommande sur discord : il faut créer un dossier avec pour nom celui de la commande, ce dernier doit au minimum contenir les fichier suivants :
 - `syntax.json` qui définie la syntaxe de la commande qui suis [la forme officiel](https://discord.com/developers/docs/interactions/application-commands#slash-commands-example-slash-command)
 - `run.js` qui exporte une fonction qui sera appelée lorsque la commande sera utilisé le premier paramètres étant l'interaction lié à la commande et le second est le bot qui a reçu la commande.

### Plugins

Si vous avez besoin que certaine(s) de vos fonctionnalité(s) soit disponible de partout, pour par exemple faire des polyfill de méthode ou affecter un comportement de manière global, vous pouvez créer un fichier `*.js` dans le dossier plugin il sera automatiquement charger au début du programme.

⚠️ Il est toujours préférable de déporté le cout de votre code une fois au chargement du fichier plutôt qu'à chaque appel d'une fonction.