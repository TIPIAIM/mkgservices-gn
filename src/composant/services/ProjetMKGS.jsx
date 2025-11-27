import React, { useRef, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import colors from "../../Styles/colors";
import Barnaventete from "../Acueil/Barnav2";
import { imagess } from "../../assets/imagess";

const SEO = lazy(() => import("../../SEO"));

const Accueilpourservice = lazy(() => import("./Accueilpourservice1"));
const Lesservices = lazy(() => import("./LesservicesMKGS2"));
const Approche = lazy(() => import("./ApprocheMKGS"));
const Temoignage = lazy(() => import("./TemoigngeMKGS3"));

const Loader = styled.div`
  color: ${colors.white};
  font-size: 1.18rem;
  padding: 2.5rem;
  text-align: center;
  width: 100%;
  letter-spacing: 0.01em;
`;

const ProjectContainer = styled(motion.div)`
  background: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 0;
  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 3rem 0;
  }
  @media (max-width: 600px) {
    gap: 2.2rem;
    padding: 2rem 0;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.19, when: "beforeChildren" }
  }
};
const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const sections = [//
  { key: "Accueil", Comp: Accueilpourservice, delay: 0 },
  { key: "Lesservices", Comp: Lesservices, delay: 0.04 },


   { key: "Approche", Comp: Approche, delay: 0.32 },
   { key: "Temoignage", Comp: Temoignage, delay: 0.48 }
];

function Projet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  // SEO DATA
   const seoTitle =
  "Projets & Réalisations | Aménagement, Événementiel, Partenariats & Impact - MK Globale Services GN";
  const seoDescription =
  "Découvrez les projets phares de MK Globale Services GN : aménagements d’espaces, événements corporate, décorations lumineuses et créations de loisirs sur mesure. Nous concevons, produisons et opérons des expériences durables alliant innovation, sécurité et impact positif en Guinée et en Afrique de l’Ouest.";

   const seoImage = imagess.imàgelogostextetrànspàrente || imagess.imàgelogosimpletrànspàrente;
  const seoKeywords = [
    "MK Globale Services GN",
    "Globale Services","Globale Services","MK",
    "aménagement Guinée",
    "événementiel Conakry",
    "décoration lumineuse",
    "espaces de loisirs",
    "street marketing",
    "activation commerciale",
    "partenariat public privé",
    "impact social Guinée",
    "expériences immersives",
    "family days",
    "team building",
    "animation professionnelle",
    "projets événementiels",
    "innovation durable",
    "infrastructure événementielle",
    "sécurité et conformité",
    "gestion logistique",
    "solutions clé en main",
    "valeur ajoutée Guinée",
    "MKGS",
    "MK Global Services",
    "aménagement événementiel",
    "éclairage artistique",
    "événement d’entreprise",
    "Guinée",
    "Afrique de l’Ouest",
    "production événementielle",
    "design d’expérience",
    "gestion opérationnelle",
  ];
  const seoUrl = "https://www.mkgservices-gn.com/projets";

  return (
    <ProjectContainer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* === SEO POUR LE REFERENCEMENT === */}
      <Suspense fallback={null}>
        <SEO
          title={seoTitle}
          description={seoDescription}
          image={seoImage}
          keywords={seoKeywords}
          url={seoUrl}
        />
      </Suspense>
      <Barnaventete />
      <InnerContainer>
        <Suspense fallback={<Loader>TIPTAMCode</Loader>}>
          {sections.map(({ key, Comp, delay }) => (
            <motion.div
              key={key}
              variants={childVariants}
              transition={{ duration: 0.9, delay, ease: "easeOut" }}
            >
              <Comp />
            </motion.div>
          ))}
        </Suspense>
      </InnerContainer>
    </ProjectContainer>
  );
}

export default React.memo(Projet);
