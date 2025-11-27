src/
├── app/
│   ├── components/                 # Composants utilisés par les pages principales (Les deux Chart())
│   │   ├── chart-card/             # Tableau des médailles d'un pays par années
│   │   ├── dashboard-pie-chart/    # Présentation générale de la répartions de médailles par pays
│   │   ├── header/                 # Composent d'affichage basique : Titre et tableau de libellés
│   ├── constants/                  # Classe qui va réunir toutes les constants nécessaires à la maintenabilité de l'application
│   ├── models/                     # Interfaces et modèles de données
│   │   ├── country/                # Entrée principale (id)
│   │   ├── participation/          # Occurances des participations au JO avec toutes les infos
│   ├── pages/                      # Interfaces et modèles de données
│   │   ├── country/                # Page spécifique d'un pays utilisant notamment les stats et chart-card
│   │   ├── home/                   # Page principale avec informations générales et utilisations de dashboard-pie-chart
│   │   ├── error/                  # Page à afficher si un élément n'est pas trouvé (ex : pays introuvable)
│   ├── services/                   # Services (logique métier et appels API)
│   ├── utils/                      # Utilitaires (fonctions de calculs des couleurs)




C'est une architecture mixte (par feature + par type) avec séparation claire des responsabilités :

 * Mixing "par feature" pour l'interface : pages et leurs composants sont regroupés par feature/route — voir pages et components.
 *  "Par type" pour les éléments transverses : services, modèles, utilitaires et constantes sont mutualisés pour réutilisabilité — voir services, models, utils et constants.
 * Structure modulaire Angular + style guide (routes et module) : voir app-routing.module.ts et app.module.ts.
 * Documentation et description de l’arborescence : Architecture.md.

Résumé : organisation component-based, pages par feature (UI), et éléments métier/techniques partagés par type pour faciliter réutilisation et maintenabilité.

j'ai suivi une convention Angular/modulaire, proche de l'Angular Style Guide.

