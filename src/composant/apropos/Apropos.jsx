// src/components/APropos.jsx
import React, { lazy, Suspense, memo } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// SEO (Lazy + memo)
const SEOMemo = memo((props) => {
  const { title, description, image, keywords, url, children } = props;
  return (
    <SEO
      title={title}
      description={description}
      image={image}
      keywords={keywords}
      url={url}
    >
      {children}
    </SEO>
  );
});
const SEO = lazy(() => import("../../SEO"));
const Barnaventete = lazy(() => import("../Acueil/Barnav2"));

// ---- ANIMATION FOND TEAM ----
const AnimatedBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    -90deg,
    ${colors.primar} 50%,
    ${colors.secondar} 08%
  );
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.48;
    background: url("data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 60V0H60' stroke='%232A4B7C' stroke-width='0.7' stroke-dasharray='7 5'/></svg>")
      repeat;
    animation: gridmove 10s linear infinite;
  }
  @keyframes gridmove {
    40% {
      background-position: 0 0;
    }
    50% {
      background-position: 120px 60px;
    }
  }
`;

// ---- STYLES ----
const AboutContainer = styled.section`
  padding: 2rem 1rem;
  margin-top: 70px;
  position: relative;
  overflow: hidden;
  @media (min-width: 480px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
  @media (min-width: 1200px) {
    padding: 6rem 2rem;
  }
`;
const ContentGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  align-items: center;
  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
  }
`;
const VisualSection = styled(motion.div)`
  position: relative;
  background: ${colors.secondary};
  border-radius: 0.1rem;
  overflow: hidden;
  min-height: 280px;
  width: 100%;
  aspect-ratio: 1;
  @media (min-width: 480px) {
    aspect-ratio: 16/9;
  }
  @media (min-width: 768px) {
    min-height: 380px;
    aspect-ratio: 1;
  }
  @media (min-width: 992px) {
    aspect-ratio: unset;
    min-height: 480px;
  }
`;
const MainVisual = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: grayscale(20%) contrast(98%);
  transition: transform 2.8s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center center;
  loading: "lazy";
  @media (hover: hover) {
    ${VisualSection}:hover & {
      transform: scale(1.02);
      filter: grayscale(0%) contrast(110%);
    }
  }
`;
const TextContent = styled.div`
  padding: 1rem;
  position: relative;
  @media (min-width: 488px) {
    padding: 2rem;
  }
`;
const SectionTitle = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 750;
  color: ${colors.secondar};
  margin-bottom: 1.5rem;
  line-height: 1.3;
  @media (min-width: 480px) {
    font-size: 2.4rem;
  }
  @media (min-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }
`;
const Highlight = styled.span`
  color: #011d23;
  font-weight: 700;
  position: relative;
  margin-left: 0.2rem;
  display: inline-block;
  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    // background: ${colors.primar};
    transition: width 0.4s ease;
  }
  &:hover::before {
    width: 100%;
  }
`;
const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #011d23;
  margin-bottom: 2rem;
  opacity: 0.9;
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;
const StatCard = styled(motion.div)`
  padding: 1rem;
  background: ${colors.primary};
  border-radius: 0.1rem;
  // border: 1px solid rgba(169, 111, 51, 0.1);
  transition: all 0.03s ease;
  &:hover {
    background: ${colors.primar};
    //  color: ${colors.white};
    transform: translateY(-5px);
  }
`;

const TeamGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 0 1rem;
  max-width: 1080px;

  margin: 0 auto; /* ✅ centre le grid */
  justify-content: center; /* ✅ aligne le contenu */

  @media (min-width: 480px) {
    gap: 1.5rem;
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    gap: 2rem;
    padding: 0 2rem;
  }
  @media (min-width: 992px) {
    gap: 2.5rem;
    padding: 0 3rem;
  }

  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  color: ${colors.accentGold};
  font-weight: 700;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;

  gap: 0.8rem;
`;
const StatLabel = styled.div`
  color: ${colors.white};
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.9;
  &:hover {
    // color: ${colors.accentTurquoise};
  }
`;

const TeamMember = styled(motion.div)`
  background: #f4f5f1;
  border-radius: 0.1rem;
  margin-bottom: 2rem;

  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  &:hover {
    transform: translateY(-10px);
  }
`;
const TeamSection = styled.div`
  margin-top: 4rem;

  padding: 3rem 0;
  background: none;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) {
    margin-top: 2rem;
    padding: 2rem 0;
  }
`;
const TeamTitle = styled(SectionTitle)`
  color: ${colors.secondar};
  text-align: center;
  margin-bottom: 4rem;
  margin-top: 2rem;
  margin-left: 1rem;
  &::after {
    background: #b96f33;
  }
  background: linear-gradient(
    -150deg,
    ${colors.secondar} 94%,
    ${colors.primar} 10%
  );
`;
const MemberPhoto = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: top;
  border-bottom: 5px solid #b96f33;
  loading: "lazy";
`;
const MemberInfo = styled.div`
  padding: 1.8rem;
  text-align: left;
  // background: ${colors.overlayAlpha};
  border-radius: 0 2rem;
`;
const MemberName = styled.h3`
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
  font-weight: 800;
  text-align: center;
  font-size: 1.5rem;
`;
const MemberRole = styled.p`
  color: ${colors.primary};
  font-weight: 600;
  font-size: 1rem;
`;

// --- Le composant principal ---
const APropos = () => {
  // SEO infos
  const seoImg = imagess.Pour_les_Family_day4;
  const seoTitle = "Qui sommes-nous ? | Mk global Services GN";
  const seoDescription =
    "Cauris Investment est une holding spécialisée dans l’investissement immobilier en Guinée : acquisition, développement, gestion d’actifs, et structuration de partenariats. Découvrez notre équipe et nos valeurs.";
  const seoKeywords = [
    "Cauris Investment",
    "Khoris",

    "gestion locative",
    "investissement immobilier",
    "foncier",
    "équipe Cauris",
  ];
  const seoUrl = "https://www.mkgservices-gn.com/presentation";

  return (
    <>
      {/* SEO avec Suspense */}
      <Suspense fallback={null}>
        <SEOMemo
          title={seoTitle}
          description={seoDescription}
          image={seoImg}
          keywords={seoKeywords}
          url={seoUrl}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Barnaventete />
      </Suspense>
      <AboutContainer>
        <ContentGrid>
          <VisualSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MainVisual
              src={seoImg}
              alt="Présentation de Cauris Investment"
              loading="lazy"
            />
          </VisualSection>
          <TextContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              . Qui <Highlight> sommes-nous ?</Highlight>
            </SectionTitle>
            <Description
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>MK Global Services GN</strong> accompagne les acteurs
              publics et privés dans la{" "}
              <Highlight>conception, l’aménagement</Highlight> et l’
              <Highlight>animation</Highlight> d’espaces de vie et de loisirs en
              Guinée. Nous réunissons création, production et exploitation pour
              livrer des expériences mémorables : parcs temporaires, family
              days, activations de marque,{" "}
              <Highlight>décorations lumineuses</Highlight> et zones ludiques
              clés en main.
              <br />
              <Highlight> Notre approche allie </Highlight>{" "}
              <Highlight>sécurité, accessibilité, écoresponsabilité</Highlight>{" "}
              et performance opérationnelle. De l’étude à l’exploitation, nous
              orchestrons les expertises (technique, logistique, artistique)
              pour garantir un résultat durable et mesurable.
            </Description>
            <StatsGrid>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatValue>Notre vision</StatValue>
                <StatLabel>
                  Transformer durablement les espaces en expériences positives
                  pour les familles, les collaborateurs et les publics, partout
                  en Guinée.{" "}
                </StatLabel>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatValue>Notre mission</StatValue>
                <StatLabel>
                  Concevoir, produire et opérer des projets d’animation et
                  d’aménagement <strong>sécurisés</strong>,{" "}
                  <strong>inclusifs</strong> et <strong>responsables</strong>,
                  avec un haut niveau d’exigence créative et opérationnelle.
                </StatLabel>
              </StatCard>
            </StatsGrid>
          </TextContent>
        </ContentGrid>
      </AboutContainer>
      {/* --- true Équipe avec fond animé --- */}
      <TeamSection>
        <AnimatedBg />
        <TeamTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <Highlight style={{ color: colors.lightGrey }}>
            {" "}
            Rencontrez l'
          </Highlight>
          <Highlight style={{ color: "#b96f" }}>Équipe</Highlight>
        </TeamTitle>
        <TeamGrid>
          {[
            {
              name: "Une Équipe Passionnée ",
              role: "Nous réunissons des talents passionnés et créatifsns les domaines du divertissement, de l’animation, de la décoration et de l’aménagement. Cette synergie unique nous permet de concevoir des projets résolument originaux et sur-mesure, où chaque détail contribue à une expérience inoubliable. (en bas de une equipe passionée)",
              photo: imagess.teàmmkgs || "/img/soum4-6.avif",
            },

            {
              name: " Moussadjan Kaba",
              role: "Un chef de projet marketing spécialisé dans les projets d’innovation fort de plus de 12 ans d’expériences au sein d’une multina-tionale en Guinée, MK Global Services GN réunit des talents passionnés et créatifs es domaines du divertissement, de l’animation, de la décoration et de l’aménagement.                 ",
              photo: imagess.moussakaba2,
            },
          ].map((member, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0.5, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <MemberPhoto
                src={member.photo}
                sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
                alt={`Portrait de ${member.name}`}
                loading="lazy"
              />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamSection>
    </>
  );
};

export default memo(APropos);
