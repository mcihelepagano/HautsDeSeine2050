import imageBoat from "../assets/images/boat.png";
import imagePanneaux from "../assets/images/Panneaux.png";
import imagePasserelle from "../assets/images/Passerelle.png";
import imagePiezo from "../assets/images/Piezo.png";
import imageSeine from "../assets/images/seine.png";

export const MAP_DESCRIPTIONS = {
  piezo: {
    title: "Paves piezoelectriques",
    image: imagePiezo,
    body: `Pour se representer le phenomene, on utilise souvent une relation simplifiee entre la force appliquee et la charge generee :
Q≈d_33 F
Q = charge electrique produite (Coulombs)
F = force appliquee (Newtons)
d_33 = coefficient piezoelectrique (C/N), qui quantifie "combien de charge on obtient par unite de force"
Ensuite, l'element piezo se comporte aussi comme un condensateur : la tension depend de la charge et de la capacite electrique CC de l'assemblage :
V=Q/C
et l'energie stockee dans un condensateur est :
E=1/2 CV^2
Ces deux relations servent souvent a estimer les ordres de grandeur cote electronique (tension et energie recuperables).
2) L'electronique embarquee (indispensable en pratique) :
La piezoelectricite genere typiquement un signal alternatif (ou tres variable). Pour l'utiliser, un pave integre generalement :
Un redresseur (pont de diodes ou redressement synchrone) pour obtenir du courant continu,
Un circuit de gestion d'energie (DC-DC, regulation),
Un stockage (supercondensateur ou batterie),
Puis une charge : LED, capteur, passerelle IoT, compteur de passage, etc. (architecture classique des systemes de recuperation piezo).
3) Pourquoi "un pas = peu d'energie" :

Le pas fournit une energie mecanique limitee, qu'on peut approximer par :
W≈F∆x
avec ∆x une micro-course (deformation) typiquement de l'ordre du millimetre dans des dispositifs de sol. Une partie seulement est convertie en electricite (pertes mecaniques + rendement electrique).
Dans la litterature, l'energie recuperee par pas depend enormement du design et du contexte : certains travaux rapportent des valeurs de l'ordre du millijoule, d'autres montent plus haut dans des conditions particulieres (materiau, architecture, excitation, etc.).

En resume, les paves piezoelectriques fonctionnent un peu comme des capteurs d'energie sous nos pieds. A chaque pas, une petite pression est exercee sur le sol. Cette pression est habituellement perdue, mais ici elle est recuperee grace a des materiaux speciaux qui transforment le mouvement en electricite. Chaque pas produit une quantite d'energie tres faible, mais additionnee sur des milliers de passages, cette energie peut devenir utile pour alimenter de petits equipements urbains, comme des lampes, des capteurs ou des compteurs. L'objectif n'est pas de produire beaucoup d'electricite, mais de donner une seconde vie a une energie du quotidien, locale, propre et deja disponible.`
  },
  solar: {
    title: "Panneaux solaires sur les batiments",
    image: imagePanneaux,
    body:
      "Les toits et facades produisent une partie de l'energie locale. Les surfaces sont concues pour capter la lumiere tout au long de la journee, meme en hiver. L'energie est stockee pour l'eclairage et les usages publics."
  },
  bench: {
    title: "Connected bench",
    image: null,
    body:
      "Les bancs connectes permettent de recharger un telephone ou un appareil leger. Ils sont relies a des batteries locales et a des sources d'energie douce du quartier. Leur eclairage adapte l'intensite selon l'affluence."
  },
  river: {
    title: "Seine",
    image: imageSeine,
    body:
      "La Seine retrouve un role de mobilite douce et d'espace de detente. Les berges sont amenagees pour la marche, le velo et les transports fluviaux. Le paysage sonore devient plus naturel, avec l'eau et les activites humaines."
  },
  boat: {
    title: "Navette fluviale electrique autonome",
    image: imageBoat,
    body:
      "Des navettes autonomes 100 % electriques relient les quartiers le long du fleuve. Silencieuses, elles fonctionnent avec une gestion intelligente des trajets et des arrets. Elles offrent une alternative propre et reguliere aux axes routiers."
  },
  passerelle: {
    title: "Passerelle verte",
    image: imagePasserelle,
    body:
      "Une passerelle verte reservee aux pietons et cyclistes relie les deux rives. Elle est equipee de cellules solaires qui alimentent l'eclairage nocturne. L'ouvrage devient a la fois un lien urbain et un support de production d'energie."
  }
};
