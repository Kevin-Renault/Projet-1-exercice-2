```bash
src/
├── app/
│   ├── components/                 # Composants réutilisables (UI)
│   │   ├── chart-card/             # Affiche les médailles d'un pays par année (composant "dumb")
│   │   └── dashboard-pie-chart/    # Répartition des médailles par pays (composant "dumb")
│   ├── constants/                  # Constantes globales pour la maintenabilité
│   ├── models/                     # Modèles de données TypeScript
│   │   ├── country/                # Interface `Country` (données principales)
│   │   └── participation/          # Interface `Participation` (détails des JO)
│   ├── pages/                      # Pages principales (composants "smart")
│   │   ├── country/                # Page détaillée d'un pays (utilise `chart-card`)
│   │   ├── home/                   # Page d'accueil (utilise `dashboard-pie-chart`)
│   │   └── not-found/              # Page 404
│   ├── services/                   # Logique métier et appels API
│   └── utils/                      # Fonctions utilitaires (ex: calculs de couleurs)
```

### Arborescence du projet
Voici la structure des dossiers et fichiers du projet :

![Schéma d'arborescence du projet](./ArborescencesP1.jpg)

*Source : ArborescencesP1.jpg*



### Pattern **Smart/Dumb Components** (Container/Presentational)

#### **Description**
- **Smart Components (Conteneurs)** :
  Gèrent la logique métier, les appels API et l'état.
  **Exemples** : `HeaderComponent`, `DashboardPieChartComponent`, `ChartCardComponent`
  **Caractéristiques** :
  - Connectés aux services et stores.
  - Centralisent la gestion des données et des états.

- **Dumb Components (Présentationnels)** :
  Reçoivent des données via `@Input()` et émettent des événements via `@Output()`.
  **Exemples** : `CountryList`, `MedalChart`.
  **Caractéristiques** :
  - Se concentrent **uniquement sur l'affichage**.
  - Agnostiques des sources de données.

#### **Pourquoi ce pattern ?**
- **Séparation claire** entre la logique métier et l'UI.
- **Avantages** :
  - Code plus **modulaire**, **testable** et **réutilisable**.
  - Respect des principes **SRP** (Single Responsibility Principle) et **DRY** (Don't Repeat Yourself).

---

### **Architecture globale du projet**
Le projet suit une **architecture mixte** :
1. **Par feature** pour l'interface utilisateur :
   - Les pages et leurs composants sont regroupés par **feature/route** (ex: `pages/`, `components/`).
   - **Objectif** : Faciliter la maintenance et l'évolution des fonctionnalités.

2. **Par type** pour les éléments transverses :
   - **Services**, **modèles**, **utilitaires** et **constantes** sont mutualisés.
   - **Dossiers dédiés** : `services/`, `models/`, `utils/`, `constants/`.
   - **Objectif** : Maximiser la réutilisabilité.

3. **Structure modulaire Angular** :
   - Respect de l'**Angular Style Guide** :
     - Routage centralisé dans `app-routing.module.ts`.
     - Déclaration des modules dans `app.module.ts`.

4. **Documentation** :
   - L'arborescence et les conventions sont détaillées dans [Architecture.md](./Architecture.md).

---
#### **Résumé des conventions**
- **Organisation component-based** :
  - Les pages sont structurées **par feature** (UI).
- **Éléments partagés** :
  - La logique métier et technique est organisée **par type** pour une meilleure réutilisation.
- **Alignement** :
  - Conventions inspirées de l'**Angular Style Guide** et des bonnes pratiques modulaire.


