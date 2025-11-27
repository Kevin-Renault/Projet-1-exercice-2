
# OlympicGamesStarter

## Description

Ce dépôt contient une application Angular d'exemple (starter) qui affiche des données d'olympiades à partir d'un fichier mock. Le contenu suivant explique comment installer, lancer et comprendre rapidement la structure du projet ainsi que ses principales fonctionnalités.

## Installation

- Installer les dépendances :

```
npm install
```

- Lancer le serveur de développement :

```
npm run start
```

L'application sera disponible sur `http://localhost:4200/`.

## Structure du projet

Organisation principale (dossier `src/`) :

- `src/app/` : code applicatif principal
	- `components/` : composants réutilisables (ex. `chart-card`, `dashboard-pie-chart`)
	- `pages/` : composants de page et routage (`home`, `country`, `not-found`)
	- `services/` : services Angular (ex. `data.service.ts`)
	- `models/` : interfaces/types TypeScript (`country.model.ts`, `participation.model.ts`)
	- `constants/` et `utils/` : utilitaires et constantes partagées

- `src/assets/mock/olympic.json` : données mock utilisées par l'application

- Fichiers de configuration :
	- `angular.json`, `tsconfig.json`, `karma.conf.js`, etc.

## Fonctionnalités

- Lecture de données mock (JSON) et affichage sous forme de graphiques et listes
- Composants réutilisables pour cartes et graphiques
- Pages : tableau de bord (`home`), détail par pays (`country`), page 404 (`not-found`)
- Architecture modulable prête pour extension (ajout de nouveaux composants, services, ou intégration d'une API réelle)

## Scripts utiles

- `npm install` : installe les dépendances
- `npm run start` ou `ng serve` : lance le serveur de développement
- `npm run build` ou `ng build` : construit l'application pour la production
- `npm test` : lance les tests unitaires (Karma/Jasmine si configurés)

## Conseils pour démarrer

- Examiner `src/app/app-routing.module.ts` pour comprendre les routes
- Regarder `src/app/services/data.service.ts` pour voir comment les données sont chargées
- Vérifier `src/assets/mock/olympic.json` pour connaître la structure des données
