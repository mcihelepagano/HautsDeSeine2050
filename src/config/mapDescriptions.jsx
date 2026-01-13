import imageBoat from "../assets/images/boat.png";
import imagePanneaux from "../assets/images/Panneaux.png";
import imagePasserelle from "../assets/images/Passerelle.png";
import imagePiezo from "../assets/images/Piezo.png";
import imageSeine from "../assets/images/seine.png";
import imageHydra from "../assets/images/centrale-hydra.png";
import imageGeotherm from "../assets/images/Geotherm.png";
import imagePiste from "../assets/images/Piste-cyclabile.png";
import imageLamp from "../assets/images/Lampadaires.png";
import imageSols from "../assets/images/Sols.png";
import imageArbres from "../assets/images/arbres.png";
import imageBench from "../assets/images/Bench.png";

export const MAP_DESCRIPTIONS = {
  piezo: {
    title: "Pavés piézoélectriques",
    image: imagePiezo,
    body: `Les pavés piézoélectriques constituent un système de micro‑génération énergétique basé sur la conversion directe de la pression mécanique exercée par les pas en électricité. Ils s'appuient sur des matériaux piézoélectriques capables de générer une tension lorsqu'ils sont soumis à une déformation.
Principe de fonctionnement :

Source d'énergie : la force verticale exercée par un piéton lors de l'appui au sol (généralement entre 300 et 700 N selon la personne et la marche).
Conversion : cette pression déforme légèrement un module piézoélectrique (céramiques PZT, polymères PVDF ou composites), produisant un courant électrique alternatif.
Conditionnement : l'énergie générée est redressée, stockée dans de petits condensateurs ou batteries tampons, puis redistribuée vers les usages locaux.
Performances énergétiques :
Énergie par pas : de l'ordre de 0,1 à 5 joules selon la technologie et la géométrie du pavé.
Production cumulée : sur des zones à forte fréquentation (gares, écoles, centres commerciaux), la somme de milliers de pas par heure permet d'obtenir une puissance exploitable pour des usages basse consommation.
Rendement : faible à l'échelle unitaire, mais pertinent dans une logique de récupération d'énergie dissipée.
Intégration urbaine :
Applications typiques : alimentation de lampadaires LED basse puissance, capteurs environnementaux (qualité de l'air, comptage de flux), balises lumineuses, micro‑électronique embarquée.
Installation : modules intégrés dans des dalles renforcées, interchangeables, compatibles avec les normes de résistance mécanique des trottoirs.
Maintenance : faible, grâce à des matériaux résistants à l'humidité, aux cycles thermiques et aux charges répétées.`
  },
  solar: {
    title: "Panneaux solaires sur les bâtiments",
    image: imagePanneaux,
    body:
      "À l'horizon 2050, les immeubles urbains sont conçus comme des unités de production énergétique décentralisées, intégrant des technologies photovoltaïques sur l'ensemble de leur enveloppe architecturale."
  },
  bench: {
    title: "Bancs connectés",
    image: imageBench,
    body:
      "Les bancs publics sont équipés de prises USB et de systèmes de recharge sans fil. Alimentés par l'énergie produite localement (solaire ou piézoélectrique) ils offrent aux habitants des espaces de pause utiles et autonomes. Ces mobiliers connectés illustrent une ville où le confort quotidien s'appuie sur des ressources énergétiques renouvelables."
  },
  river: {
    title: "Seine",
    image: imageSeine,
    body:
      "Redevenue un axe majeur de mobilité douce, la Seine offre en 2050 une ambiance sonore apaisée et naturelle. Le bruit des moteurs a disparu, remplacé par le clapotis de l'eau, les voix humaines, les pas et les vélos. Cette transformation contribue à améliorer le confort de vie, à réduire le stress urbain et à reconnecter les habitants à leur environnement naturel."
  },
  boat: {
    title: "Navette fluviale électrique autonome",
    image: imageBoat,
    body:
      "En 2050, la Seine est parcourue par des navettes fluviales autonomes, 100 % électriques et silencieuses. Alimentées par des panneaux solaires intégrés à leur toiture, elles assurent des liaisons continues entre les différents quartiers. Grâce à un système de pilotage intelligent, ces navettes adaptent leur vitesse et leur trajectoire en temps réel pour garantir sécurité, régularité et fluidité des déplacements, tout en réduisant les émissions de carbone et les nuisances sonores."
  },
  passerelle: {
    title: "Passerelle végétalisée",
    image: imagePasserelle,
    body:
      "Une passerelle végétalisée relie les deux rives de la Seine en réservant l'espace aux piétons et aux cyclistes. Des cellules solaires intégrées à sa structure produisent l'énergie nécessaire à son éclairage nocturne. La passerelle devient ainsi un lien urbain autonome, favorisant les mobilités douces tout en participant à la production locale d'énergie renouvelable."
  },
  hydra: {
    title: "Mini centrale hydraulique",
    image: imageHydra,
    body:
      "La Seine est exploitée comme vecteur énergétique grâce à l'intégration de turbines dans une micro-centrale fluviale à faible impact environnemental. Ces turbines sont installées de manière discrète dans le lit du fleuve, en zones à courant régulier, sans barrage ni modification du profil hydraulique."
  },
  geotherm: {
    title: "Géothermie",
    image: imageGeotherm,
    body: `La géothermie repose sur la valorisation de la chaleur stockée naturellement dans les couches superficielles ou profondes du sous‑sol, dont la température reste stable tout au long de l’année. Cette ressource constitue une énergie thermique renouvelable, mobilisable pour le chauffage, le rafraîchissement et, dans certains cas, la production d’eau chaude sanitaire.
Principe de fonctionnement :
- Captage de chaleur : des sondes géothermiques verticales (50 à 200 m) ou des échangeurs horizontaux (1 à 2 m de profondeur) extraient la chaleur du sol via un fluide caloporteur circulant en boucle fermée.
- Pompe à chaleur (PAC) : la chaleur récupérée est transférée à une PAC géothermique qui élève la température à un niveau compatible avec les besoins du bâtiment (35–60 °C selon les émetteurs).
- Rafraîchissement : en été, le système fonctionne en mode réversible. Le bâtiment évacue ses calories vers le sous‑sol, permettant un rafraîchissement passif ou semi‑passif à très faible consommation.
Performances énergétiques :
- Température du sous‑sol : stable entre 10 et 15 °C en moyenne, assurant une disponibilité continue.
- Coefficient de performance (COP) : généralement compris entre 4 et 6, ce qui signifie que pour 1 kWh électrique consommé, 4 à 6 kWh de chaleur sont produits.
- Rendement annuel : très élevé grâce à l’absence de variations saisonnières marquées.
Avantages environnementaux :
- Réduction des émissions de CO2 : la géothermie limite fortement le recours aux énergies fossiles pour le chauffage.
- Production locale : aucune combustion, aucune émission directe, aucune dépendance aux conditions climatiques.
- Durabilité : les installations ont une durée de vie de 25 à 50 ans pour les PAC, et jusqu’à 100 ans pour les sondes géothermiques.`
  },
  piste: {
    title: "Pistes cyclables lumineuses",
    image: imagePiste,
    body:
      "Les pistes cyclables sont équipées d’un rétroéclairage alimenté par l’énergie locale. La lumière s’active au passage des cyclistes, accompagnant leur mouvement et améliorant la visibilité nocturne. Ce dispositif renforce la sécurité tout en limitant la consommation énergétique grâce à un éclairage ciblé et intelligent."
  },
  lamp: {
    title: "Lampadaires solaires intelligents",
    image: imageLamp,
    body:
      "Les lampadaires fonctionnent grâce à l’énergie solaire stockée durant la journée. La nuit, leur intensité lumineuse s’adapte automatiquement à la présence humaine et aux déplacements. Cette gestion intelligente permet de réduire la consommation d’énergie tout en garantissant un éclairage adapté aux usages."
  },
  sols: {
    title: "Sols perméables en coquilles d’huîtres recyclées",
    image: imageSols,
    body:
      "Le sol des parcs est recouvert de pavés perméables fabriqués à partir de coquilles d’huîtres recyclées. Ces matériaux absorbent l’eau de pluie, limitent les risques d’inondation et favorisent l’infiltration naturelle dans le sol. Ils contribuent également à abaisser la température du sol lors des fortes chaleurs, participant à la lutte contre les îlots de chaleur urbains."
  },
  arbres: {
    title: "Arbres à large canopée",
    image: imageArbres,
    body:
      "Des arbres à feuillage large sont implantés dans l’ensemble du quartier afin de créer des zones d’ombre et de fraîcheur. En été, leur présence permet de réduire la température urbaine jusqu’à 4 °C. En plus de réguler le climat local, ces arbres améliorent la qualité de l’air et renforcent la biodiversité en milieu urbain."
  }
};
