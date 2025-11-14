Utilisation de "nom" en dur "countryName" lié a la navigation => Création d'une constante.

Calculs et "intelligence" dans les composants d'affichage => Déplacement dans classe utilitaires/service.

Appel http directement depuis les composants d'affichage et en doublon => Déplacement dans classe de service + vérification d'un chargement préalable pour éviter toute répétition. (Note : sur une période de 4 ans, on peut considérer les données valides pour toute session sans besoin de mettre à jour).

Multitude de variable non typé => application d'un type stricte systhématiquement et création de model pour les données récupérées de la "bdd"

Des éléments d'affichage directement appelé et gérer en dur depuis les pages principales => Création de composant standelone permettant, de créer un camenbert et un tableau de valeur par années.

Couleur attribué au entrée du camembert en Dur : un tableau unique de 5 couleurs, rendant impossible de nouvelle entrée => création d'une méthode qui renvoi une liste de couleur calculé selon le nombre d'entrée souhaités.
