# Équipements et services — Catalogue des clés

Ce document liste toutes les prestations (équipements, services, activités) qui peuvent
être affichées sur les pages des logements, ainsi que la clé unique à utiliser dans le
front matter de chaque logement (`amenities:` dans `_logements/*.md`).

Les icônes utilisées sont les [Material Design Icons (MDI)](https://pictogrammers.com/library/mdi/),
chargées depuis le CDN `jsDelivr` dans `_layouts/default.html` :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" />
```

## Utilisation

Dans le front matter d'un logement, référencer les clés souhaitées :

```yaml
amenities:
  - wifi
  - cuisine_equipee
  - parking
```

Les éléments à afficher dans la section « Non inclus » (en bas de la liste, grisés)
sont à lister explicitement dans `not_included` :

```yaml
not_included:
  - lave_vaisselle
  - climatisation
```

Seuls ces éléments sont affichés comme non inclus : tous les autres éléments du
catalogue qui ne sont pas dans `amenities` ne sont simplement pas affichés.

## Catalogue

### Cuisine

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![chef-hat](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/chef-hat.svg) | `cuisine_equipee` | Cuisine équipée |
| ![dishwasher](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/dishwasher.svg) | `lave_vaisselle` | Lave-vaisselle |
| ![toaster-oven](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/toaster-oven.svg) | `four` | Four |
| ![stove](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/stove.svg) | `plaque_cuisson` | Plaques de cuisson |
| ![microwave](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/microwave.svg) | `micro_ondes` | Micro-ondes |
| ![toaster](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/toaster.svg) | `grille_pain` | Grille-pain |
| ![coffee-maker](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/coffee-maker.svg) | `cafetiere` | Machine à café |
| ![kettle](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/kettle.svg) | `bouilloire` | Bouilloire |
| ![fridge](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/fridge.svg) | `refrigerateur` | Réfrigérateur |
| ![fridge-outline](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/fridge-outline.svg) | `congelateur` | Congélateur |
| ![silverware-fork-knife](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/silverware-fork-knife.svg) | `vaisselle` | Vaisselle |

### Confort & Équipements

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![bed](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/bed.svg) | `literie_fournie` | Literie fournie |
| ![shower-head](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/shower-head.svg) | `serviettes_fournies` | Serviettes fournies |
| ![wifi](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/wifi.svg) | `wifi` | Wifi |
| ![television](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/television.svg) | `television` | Télévision |
| ![air-conditioner](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/air-conditioner.svg) | `climatisation` | Climatisation |
| ![snowflake](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/snowflake.svg) | `fraicheur` | Fraîcheur en été |
| ![radiator](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/radiator.svg) | `chauffage` | Chauffage |
| ![fireplace](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/fireplace.svg) | `cheminee` | Cheminée / Poêle |
| ![fan](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/fan.svg) | `ventilateur` | Ventilateur |
| ![washing-machine](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/washing-machine.svg) | `machine_a_laver` | Machine à laver |
| ![iron](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/iron.svg) | `fer_a_repasser` | Fer à repasser |
| ![vacuum](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/vacuum.svg) | `aspirateur` | Aspirateur |
| ![hair-dryer](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/hair-dryer.svg) | `seche_cheveux` | Sèche-cheveux |
| ![baby](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/baby.svg) | `lit_bebe` | Lit bébé |
| ![baby-face-outline](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/baby-face-outline.svg) | `chaise_haute` | Chaise haute |
| ![desk](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/desk.svg) | `bureau` | Espace de travail |
| ![safe](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/safe.svg) | `coffre_fort` | Coffre-fort |

### Salle de bain

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![shower](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/shower.svg) | `douche` | Douche |
| ![bathtub](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/bathtub.svg) | `baignoire` | Baignoire |
| ![toilet](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/toilet.svg) | `toilette` | Toilettes |
| ![spray](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/spray.svg) | `produits_accueil` | Produits d'accueil |

### Extérieur

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![parking](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/parking.svg) | `parking` | Parking privé |
| ![balcony](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/balcony.svg) | `balcon` | Balcon |
| ![tree](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/tree.svg) | `jardin` | Jardin / Cour |
| ![pool](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/pool.svg) | `piscine` | Piscine |
| ![grill](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/grill.svg) | `barbecue` | Barbecue / Grill |
| ![bowling](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/bowling.svg) | `petanque` | Terrain de pétanque |
| ![image-filter-hdr](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/image-filter-hdr.svg) | `vue` | Vue dégagée |

### Activités & Loisirs

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![hiking](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/hiking.svg) | `randonnee` | Randonnée |
| ![bike](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/bike.svg) | `velo` | Cyclotourisme |
| ![kayaking](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/kayaking.svg) | `canoe` | Canoë-kayak |
| ![swim](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/swim.svg) | `baignade_riviere` | Baignade en rivière |
| ![dumbbell](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/dumbbell.svg) | `sport` | Sport / Fitness |
| ![table-tennis](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/table-tennis.svg) | `ping_pong` | Ping-pong |
| ![puzzle](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/puzzle.svg) | `jeux` | Jeux de société |
| ![music](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/music.svg) | `musique` | Musique / Enceinte |
| ![book-open](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/book-open.svg) | `bibliotheque` | Bibliothèque |

### Services & Sécurité

| Icône | Clé | Libellé |
| --- | --- | --- |
| ![paw](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/paw.svg) | `animaux` | Animaux acceptés |
| ![wheelchair-accessibility](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/wheelchair-accessibility.svg) | `pmr` | Accessible PMR |
| ![human-male-female-child](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/human-male-female-child.svg) | `famille` | Adapté aux familles |
| ![smoke-detector](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/smoke-detector.svg) | `detecteur_fumee` | Détecteur de fumée |
| ![fire-extinguisher](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/fire-extinguisher.svg) | `extincteur` | Extincteur |
| ![shield-alert](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/shield-alert.svg) | `alarme` | Alarme |
| ![ev-station](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/ev-station.svg) | `borne_recharge` | Borne de recharge |
| ![broom](https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/broom.svg) | `menage` | Ménage possible |

## Ajouter une nouvelle prestation

1. Ajouter l'entrée au catalogue dans `_data/logement_amenities.yml` (section, clé unique, icône MDI, libellé).
2. Vérifier que l'icône existe : `https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/<nom>.svg`
   doit répondre `200`.
3. Documenter la nouvelle clé dans ce fichier, avec l'icône correspondante.
4. Référencer la clé dans le front matter du logement concerné.