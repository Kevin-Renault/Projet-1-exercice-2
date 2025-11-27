# Projet-1

Dépôt contenant une application Angular modulaire pour afficher des statistiques et des graphiques (par pays / par année). Ce README décrit l'installation, la structure du projet, les fonctionnalités et un aperçu du fonctionnement général.

## Installation

Pré-requis :
- Node.js (version 14 ou supérieure recommandée)
- npm ou yarn
- Angular CLI (optionnel, pour utiliser `ng serve` / `ng build`)

Étapes :

1. Installer les dépendances :

```powershell
npm install
# ou
yarn install
```

2. Lancer l'application en développement :

```powershell
npm start
# ou (si Angular CLI est installé)
ng serve --open
```

3. Construire pour la production :

```powershell
npm run build
# ou
ng build --configuration production
```

4. Lancer les tests unitaires :

```powershell
npm test
```

Les scripts sont définis dans `package.json`.

## Structure du projet

Organisation principale (chemin relatif à la racine) :

- `src/` — code source de l'application
	- `main.ts` — point d'entrée qui bootstrappe `AppModule`
	- `index.html` — page HTML principale
	- `styles.scss` — styles globaux
	- `app/` — code de l'application
		- `app.module.ts` — module racine
		- `app-routing.module.ts` — configuration des routes
		- `app.component.*` — composant racine
		- `components/` — composants réutilisables (ex : `chart-card`, `dashboard-pie-chart`, `header`)
		- `pages/` — pages principales (ex : `home`, `country`, `error`, `not-found`)
		- `services/` — services pour la logique métier et l'accès aux données
		- `models/` — interfaces et modèles TypeScript
		- `constants/` — constantes partagées
		- `utils/` — utilitaires (ex : gestion des couleurs)
- `assets/` — images et fichiers statiques (inclut `mock/olympic.json` pour les données de test)
- `environments/` — configurations d'environnement (`environment.ts`, `environment.prod.ts`)

Fichiers de configuration principaux : `tsconfig.json`, `angular.json`, `karma.conf.js`, `package.json`.

## Fonctionnalitéss

- Navigation par routes entre les pages (home, détail d'un pays, page d'erreur).
- Composants de visualisation des données : cartes et graphiques (exemples : diagrammes en secteurs, cartes de statistiques).
- Services centralisés pour charger et transformer les données (possibilité d'utiliser des mocks ou une API vraie).
- Modèles TypeScript pour typage fort des données (pays, participations, options de graphique).
- Structure modulaire facilitant l'ajout de nouvelles pages et composants réutilisables.
- Tests unitaires configurés avec Karma + Jasmine.

## Aperçu du fonctionnement général

1. Le fichier `src/main.ts` démarre l'application et bootstrape `AppModule`.
2. Le routage (défini dans `src/app/app-routing.module.ts`) dirige vers les différentes pages (`home`, `country`, `error`, etc.).
3. Chaque page assemble des composants réutilisables depuis `src/app/components/` pour construire l'interface utilisateur.
4. Les composants qui affichent des graphiques s'appuient sur des données fournies par les services de `src/app/services/`.
5. Les données peuvent provenir d'un backend réel ou d'un fichier mock situé dans `src/assets/mock/olympic.json`.
6. Les modèles dans `src/app/models/` définissent la structure des données échangées et facilitent la maintenance et l'évolution du code.

## Développement et bonnes pratiques

- Utiliser des composants petits et réutilisables plutôt que de gros composants monolithiques.
- Placer la logique métier dans les services et garder les composants concentrés sur l'affichage.
- Ajouter des tests unitaires pour les fonctions critiques et composants clefs.

## Liens et ressources

- Architecture détaillée : `Architecture.md`
- Scripts et dépendances : `package.json`

---

Fichier `README.md` mis à jour.
