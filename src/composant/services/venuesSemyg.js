// src/data/venuesSemyg.js
// Regroupe les données (VENUES + FILTERS) pour garder le composant principal propre.

import { imagess } from "../../assets/imagess";

// Fallback en cas de ressource indisponible
const fallback =
  (imagess && (imagess.plàinàirr || imagess.amenagement_exterieux0)) ||
  "/placeholder.jpg";

// ===== Catégories visibles dans l’UI =====
// Garde l’ordre ; “Tous” est géré dans le composant.
export const FILTERS = [
  "Décoration Lumineuses Exterieures & interieures",
  "amenagement d'espace Touristique",
  "Amenagement d'espace de loisir & air de jeu",
  "Amenagement d'espaces Photos",
  "Location jeux et Attractions",
  "colonies de vacances",
  "Family day",
  "Team Building",
  "Street Marketing & Animation commerciale",
  "Approvisionnement et logistique",
  "Location Tente, Chapiteau, Gazon et Estrades pour Évènements",
];

// ===== Cartes (images + libellés + descriptions) =====
export const VENUES = [
  // Décoration lumineuse (même type pour le filtre)
  {
    label: "Décoration — Ambiance 01",
    img: imagess?.coration_lumineuse_imge6 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Installations lumineuses créatives pour transformer vos espaces en environnements festifs (LED, guirlandes, structures).",
  },
  {
    label: "Décoration — Ambiance 02",
    img: imagess?.coration_lumineuse_imge1 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Ambiances chaleureuses avec éclairages design et mise en scène sur mesure selon vos thèmes.",
  },
  {
    label: "Décoration — Ambiance 03",
    img: imagess?.coration_lumineuse_imge4 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Design complet d’événement : scénographie, centres de table, effets lumineux coordonnés.",
  },
  {
    label: "Décoration — Ambiance 04",
    img: imagess?.coration_lumineuse_imge5 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Chemins lumineux, murs d’ambiance, variateurs et effets dynamiques contrôlés.",
  },
  {
    label: "Décoration — Ambiance 05",
    img: imagess?.coration_lumineuse_imge7 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Projecteurs, spots d’accentuation et textures pour zones photos et stands.",
  },
  {
    label: "Décoration — Ambiance 06",
    img: imagess?.coration_lumineuse_imge8 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Ambiances thématiques : traditionnel, moderne ou sur-mesure selon votre charte.",
  },
  {
    label: "Décoration — Ambiance 07",
    img: imagess?.coration_lumineuse_imge9 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Éclairage professionnel pour valoriser produits, scènes et parcours visiteurs.",
  },
  {
    label: "Décoration — Ambiance 08",
    img: imagess?.coration_lumineuse_imge2 || fallback,
    type: "Décoration Lumineuses Exterieures & interieures",
    description:
      "Installations lumineuses festives : couleurs, dynamiques et mise en musique.",
  },

  // Aménagement d'espace Touristique
  {
    label: "Aménagement — Esplanade 01",
    img: imagess?.amenagement_exterieux7 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Conception et réalisation d’espaces extérieurs : flux, confort d’usage et sécurité.",
  },
  {
    label: "Aménagement — Esplanade 02",
    img: imagess?.amenagement_exterieux15 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Mobilier durable, revêtements, signalétique et plan d’implantation optimisé.",
  },
  {
    label: "Aménagement — Lounge",
    img: imagess?.amenagement_exterieux9 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Espaces lounge & terrasses événementielles confortables et esthétiques.",
  },
  {
    label: "Aménagement — Terrasse",
    img: imagess?.amenagement_exterieux10 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Terrasses, zones détente, mise en lumière extérieure et logistique d’accès.",
  },
  {
    label: "Aménagement — Mobilier extérieur",
    img: imagess?.amenagement_exterieux1 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Location/installation de mobilier design adapté à l’usage et aux conditions.",
  },
  {
    label: "Aménagement — Zones thématiques",
    img: imagess?.amenagement_exterieux2 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Zonage : accueil, photo, restauration, jeux, circulation visiteurs/PMR.",
  },
  {
    label: "Aménagement — Ensemble 01",
    img: imagess?.amenagement_exterieux3 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Conception globale (UX du lieu) : lisibilité, sécurité, maintenance.",
  },
  {
    label: "Aménagement — Ensemble 02",
    img: imagess?.amenagement_exterieux13 || fallback,
    type: "amenagement d'espace Touristique",
    description: "Phasage, contrôle qualité et coordination métiers.",
  },
  {
    label: "Aménagement — Ensemble 03",
    img: imagess?.amenagement_exterieux14 || fallback,
    type: "amenagement d'espace Touristique",
    description:
      "Optimisation des coûts d’exploitation et durabilité des matériaux.",
  },

  // Loisirs & aires de jeux
  {
    label: "Aire de jeux — Module 01",
    img: imagess?.amenagement_exterieux13 || fallback,
    type: "Amenagement d'espace de loisir & air de jeu",
    description:
      "Conception sécurisée d’aires de jeux : choix des modules et revêtements.",
  },
  {
    label: "Aire de jeux — Module 02",
    img: imagess?.amenagement_exter1 || fallback,
    type: "Amenagement d'espace de loisir & air de jeu",
    description:
      "Zones d’activités ludiques et sportives avec gestion des flux enfants.",
  },

  // Colonies de vacances
  {
    label: "Colonie — Activités",
    img: imagess?.colon7_hobmqm || fallback,
    type: "colonies de vacances",
    description:
      "Activités éducatives & récréatives avec encadrement professionnel certifié.",
  },
  {
    label: "Colonie — Hébergement",
    img: imagess?.colon8 || fallback,
    type: "colonies de vacances",
    description:
      "Séjours nature, hébergement qualité, restauration équilibrée.",
  },
  {
    label: "Colonie — Apprentissage",
    img: imagess?.coloni3 || fallback,
    type: "colonies de vacances",
    description:
      "Apprendre par le jeu : créativité, autonomie, socialisation.",
  },
  {
    label: "Colonie — Team",
    img: imagess?.colon6 || fallback,
    type: "colonies de vacances",
    description:
      "Jeux coopératifs et défis pour renforcer l’esprit d’équipe.",
  },
  {
    label: "Colonie — Nature",
    img: imagess?.colon9 || fallback,
    type: "colonies de vacances",
    description:
      "Découverte & sensibilisation à l’environnement, activités outdoor.",
  },
  {
    label: "Colonie — Arts",
    img: imagess?.colon10 || fallback,
    type: "colonies de vacances",
    description:
      "Ateliers créatifs (peinture, photo, scène) pour s’exprimer autrement.",
  },
  {
    label: "Colonie — Sport",
    img: imagess?.colon11 || fallback,
    type: "colonies de vacances",
    description:
      "Programme sportif varié, fair-play et inclusion de tous les âges.",
  },
  {
    label: "Colonie — Veillées",
    img: imagess?.colon12 || fallback,
    type: "colonies de vacances",
    description:
      "Soirées thématiques, feux de camp, souvenirs mémorables.",
  },

  // Family Day
  {
    label: "Family Day — Activités groupe",
    img: imagess?.Pour_les_Family_day1 || fallback,
    type: "Family day",
    description:
      "Journée entreprise : activités inter-générations, cohésion et culture d’entreprise.",
  },
  {
    label: "Family Day — Animations",
    img: imagess?.Pour_les_Family_day4 || fallback,
    type: "Family day",
    description:
      "Ateliers créatifs, jeux collaboratifs et animations divertissantes.",
  },
  {
    label: "Family Day — Détente",
    img: imagess?.Pour_les_Family_day5 || fallback,
    type: "Family day",
    description:
      "Espaces lounge, coins calmes, zones repas conviviales.",
  },
  {
    label: "Family Day — Sport",
    img: imagess?.Pour_les_Family_day6 || fallback,
    type: "Family day",
    description:
      "Tournois & défis encadrés pour tous les niveaux, sécurité d’abord.",
  },
  {
    label: "Family Day — Cérémonie",
    img: imagess?.Pour_les_Family_day8 || fallback,
    type: "Family day",
    description:
      "Remise de prix, remerciements, scénographie et régie technique.",
  },
  {
    label: "Family Day — Buffet",
    img: imagess?.Pour_les_Family_day9 || fallback,
    type: "Family day",
    description:
      "Restauration équilibrée et variée, gestion des régimes spéciaux.",
  },
  {
    label: "Family Day — Espace enfants",
    img: imagess?.Pour_les_Family_day11 || fallback,
    type: "Family day",
    description:
      "Animations adaptées, jeux sécurisés, encadrement dédié.",
  },
  {
    label: "Family Day — Ludiques",
    img: imagess?.Pour_les_Family_day12 || fallback,
    type: "Family day",
    description:
      "Jeux géants, structures gonflables, photobooth souvenirs.",
  },
  {
    label: "Family Day — Photobooth",
    img: imagess?.Pour_les_Family_day13 || fallback,
    type: "Family day",
    description:
      "Accessoires & fonds thématiques, photos à partager en équipe.",
  },

  // Aménagement d'espaces Photos
  {
    label: "Espace Photo — 01",
    img: imagess?.àmenàgementdespàce || fallback,
    type: "Amenagement d'espaces Photos",
    description:
      "Corners photo immersifs et personnalisés (branding, accessoires).",
  },
  {
    label: "Espace Photo — 02",
    img: imagess?.amenagement_exterieux0 || fallback,
    type: "Amenagement d'espaces Photos",
    description:
      "Fond thématique + éclairage d’accentuation pour portraits nets.",
  },
  { label: "Espace Photo — 03", img: imagess?.AmenagementespacesPhotos1 || fallback, type: "Amenagement d'espaces Photos", description: "Photobooth, fonds variés et gestion des flux visiteurs." },
  { label: "Espace Photo — 04", img: imagess?.AmenagementespacesPhotos2 || fallback, type: "Amenagement d'espaces Photos", description: "Décor modulable pour formats portrait/paysage." },
  { label: "Espace Photo — 05", img: imagess?.AmenagementespacesPhotos3 || fallback, type: "Amenagement d'espaces Photos", description: "Set design pour prises de vues produits & personnes." },
  { label: "Espace Photo — 06", img: imagess?.AmenagementespacesPhotos4 || fallback, type: "Amenagement d'espaces Photos", description: "Fonds créatifs, matières et textures originales." },
  { label: "Espace Photo — 07", img: imagess?.AmenagementespacesPhotos5 || fallback, type: "Amenagement d'espaces Photos", description: "Lumière continue ou flash selon le rendu souhaité." },
  { label: "Espace Photo — 08", img: imagess?.AmenagementespacesPhotos6 || fallback, type: "Amenagement d'espaces Photos", description: "Accès PMR et repères au sol pour files d’attente." },
  { label: "Espace Photo — 09", img: imagess?.AmenagementespacesPhotos7 || fallback, type: "Amenagement d'espaces Photos", description: "Habillage brandé : kakemonos, arches, totems." },
  { label: "Espace Photo — 10", img: imagess?.AmenagementespacesPhotos8 || fallback, type: "Amenagement d'espaces Photos", description: "Parcours visiteur intégré aux autres activités." },
  { label: "Espace Photo — 11", img: imagess?.AmenagementespacesPhotos9 || fallback, type: "Amenagement d'espaces Photos", description: "Gestion électricité & sécurité, câblages discrets." },
  { label: "Espace Photo — 12", img: imagess?.AmenagementespacesPhotos10 || fallback, type: "Amenagement d'espaces Photos", description: "Poste opérateur, flux photo, stockage rapide." },
  { label: "Espace Photo — 13", img: imagess?.AmenagementespacesPhotos11 || fallback, type: "Amenagement d'espaces Photos", description: "Diffusion live possible (écran scène/stand)." },
  { label: "Espace Photo — 14", img: imagess?.AmenagementespacesPhotos12 || fallback, type: "Amenagement d'espaces Photos", description: "Backdrop premium, matières textiles & papier." },
  { label: "Espace Photo — 15", img: imagess?.AmenagementespacesPhotos13 || fallback, type: "Amenagement d'espaces Photos", description: "Espace compact pour lieux contraints." },
  { label: "Espace Photo — 16", img: imagess?.AmenagementespacesPhotos14 || fallback, type: "Amenagement d'espaces Photos", description: "Pose d’accessoires & rangement optimisé." },
  { label: "Espace Photo — 17", img: imagess?.AmenagementespacesPhotos15 || fallback, type: "Amenagement d'espaces Photos", description: "Photocall officiel & tapis rouge." },
  { label: "Espace Photo — 18", img: imagess?.AmenagementespacesPhotos16 || fallback, type: "Amenagement d'espaces Photos", description: "Éclairage coloré pour ambiance artistique." },
  { label: "Espace Photo — 19", img: imagess?.AmenagementespacesPhotos17 || fallback, type: "Amenagement d'espaces Photos", description: "Circulation et balisage pour shootings fluides." },
  { label: "Espace Photo — 20", img: imagess?.AmenagementespacesPhotos18 || fallback, type: "Amenagement d'espaces Photos", description: "Photo souvenir instantanée & partage digital." },

  // Location jeux & attractions
  { label: "Attraction — 01", img: imagess?.LocationjeuxAttractions1 || fallback, type: "Location jeux et Attractions", description: "Location d’attractions et modules ludiques sécurisés." },
  { label: "Attraction — 02", img: imagess?.LocationjeuxAttractions2 || fallback, type: "Location jeux et Attractions", description: "Jeux pour tous âges, animateurs formés et brief sécurité." },
  { label: "Attraction — 03", img: imagess?.LocationjeuxAttractions3 || fallback, type: "Location jeux et Attractions", description: "Montage/démontage compris, assurance & contrôle." },
  { label: "Attraction — 04", img: imagess?.LocationjeuxAttractions4 || fallback, type: "Location jeux et Attractions", description: "Catalogue élargi : sportifs, gonflables, adresse." },

  // === Catégories “vides” (pour maintenance) : rien à afficher ===
  // "Team Building", "Street Marketing & Animation commerciale",
  // "Approvisionnement et logistique",
  // "Location Tente, Chapiteau, Gazon et Estrades pour Évènements"
];
