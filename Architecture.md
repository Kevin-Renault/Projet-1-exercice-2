src/
├── app/
│   ├── components/                 # Composants utilisés par les pages principales (Les deux Chart())
│   │   ├── chart-card/             # Tableau des médailles d'un pays par années
│   │   ├── dashboard-pie-chart/    # Présentation générale de la répartions de médailles par pays
│   ├── constants/                  # Classe qui va réunir toutes les constants nécessaires à la maintenabilité de l'application
│   ├── models/                     # Interfaces et modèles de données
│   │   ├── country/                # Entrée principale (id)
│   │   ├── participation/          # Occurances des participations au JO avec toutes les infos
│   ├── pages/                      # Interfaces et modèles de données
│   │   ├── country/                # Page spécifique d'un pays utilisant notamment les stats et chart-card
│   │   ├── home/                   # Page principale avec informations générales et utilisations de dashboard-pie-chart
│   │   ├── not-found/              # Page à afficher si url non "routé"
│   ├── services/                   # Services (logique métier et appels API)
│   ├── utils/                      # Utilitaires (fonctions de calculs des couleurs)

