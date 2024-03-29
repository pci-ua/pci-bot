<div align="center">
	<br/>
	<p>
		<a href="https://projetcohesion.info/"> <img src="https://projetcohesion.info/assets/icon.png" /> </a>
	</p>
</div>

# PC[bot]

## Table des matières
 - [À propos](#À)
 - [Installation](#Installation)
 - [contribution](#contribuer)
 - [aide](#aide)

## À propos

PC\[bot\] est un robot de gestion du discord de PC\[i\]


## Installation

Prérequis :
 - docker : min `v20.10.0`
 - docker-compose : min `v1.29.2`

Une fois ces pré-requis satisfait :
``` bash
git clone https://github.com/pci-ua/pci-bot.git
cd pci-bot
docker-compose build
```

Une fois installer il vous faudra juste mettre en place le token, pour cela copier le fichier `safety.js.example` en `safety.js` et inséré votre token à la place du placeholder.
Vous pourrez aussi éditer les différentes config disponibles dans le fichier `config.json`

Pour lancer le bot :
```bash
docker-compose up
```

## Contribution

Vous êtes libres de contribuer à ce projet, mais vérifiez tout de même ces quelques points :
 - Avant de créer une `issue` assurez-vous qu'elle n'existe pas déjà
 - Avant de faire une `pull request` assurez-vous que votre code fonctionne et qu'il est commenté

## Aide

Si vous rencontrez un quelconque problème, n'hésitez pas à contacter les gérants de ce repository.
