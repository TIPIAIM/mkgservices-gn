// src/components/Sections/ComplementaryServices.jsx
// “Services complémentaires” – texte à GAUCHE (carte premium) + grande image à DROITE
// Style inspiré de ta 2e image, contenu de la 1re image, palette MKGS.

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Search, Megaphone, Handshake } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ============ Layout global ============ */
const Section = styled.section`
  position: relative;
  background: ${colors.white};
  padding: 4rem 1rem;
  overflow: hidden;

  @media (max-width: 900px) {
    padding: 3rem 1rem 2.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 1.8rem 2.2rem;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

/* ============ Carte de gauche (texte) ============ */
const Card = styled(motion.article)`
  position: relative;
  z-index: 2;
  background: ${colors.white};
  border-radius: 10px;
  padding: clamp(1.25rem, 2vw, 2rem);
  box-shadow: 0 20px 48px rgba(0,0,0,.12);
  border: 1px solid ${colors.primary}10;

  /* petit filet en haut pour rappeler ta maquette */
  &::before{
    content:"";
    position:absolute; left: 0; top: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, ${colors.accentTurquoise}, ${colors.accentGold});
    border-top-left-radius: 10px; border-top-right-radius: 10px;
  }
`;

const Title = styled.h2`
  margin: .4rem 0 1.2rem;
  font-size: clamp(1.3rem, 3.6vw, 2rem);
  font-weight: 900;
  color: ${colors.primary};
  text-transform: uppercase;
  letter-spacing: .02em;
`;

const Service = styled(motion.div)`
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: start;
  gap: .9rem;
  padding: 1rem 0;
  border-bottom: 1px dashed ${colors.primary}1f;

  &:last-child { border-bottom: 0; }
`;

const IconCol = styled.div`
  display: grid; place-items: center;
  position: relative;

  /* colonne décorative façon “chevron”/ruban */
  &::before{
    content:"";
    position:absolute; left: -10px; right: -10px; top: -8px; bottom: -8px;
    border-left: 2px solid ${colors.accentGold};
    border-right: 2px solid ${colors.accentGold};
    border-radius: 8px;
    opacity: .35;
  }
`;

const Badge = styled(motion.div)`
  width: 40px; height: 40px; border-radius: 10px;
  display: grid; place-items: center;
  background: ${colors.secondary || colors.primary};
  color: ${colors.white};
  box-shadow: 0 10px 24px rgba(0,0,0,.15);
`;

const Heading = styled.h3`
  margin: 0 0 .35rem;
  font-size: clamp(1.02rem, 2.2vw, 1.2rem);
  font-weight: 900;
  color: ${colors.primary};
`;

const Text = styled.p`
  margin: 0;
  color: ${colors.black};
  line-height: 1.7;
  font-size: .98rem;
`;

const Mark = styled.strong`
  font-weight: 900;
  color: ${colors.primary};
  background: linear-gradient(transparent 60%, ${colors.accentGold}55 0);
  border-radius: 2px;
`;

/* ============ Image de droite ============ */
const ImageWrap = styled(motion.figure)`
  position: relative;
  margin: 0;
  border-radius: 6px;
  overflow: hidden;
  min-height: 320px;
  aspect-ratio: 16 / 9;
  height: clamp(330px, 42vw, 560px);
  box-shadow: 0 28px 60px rgba(0,0,0,.18);

  @media (max-width: 980px) { order: -1;
  padding : 0.5rem;
  } /* sur mobile: image passe au-dessus */
  @media (max-width: 480px) { 
  
  padding : 0.5rem;
  } /* sur mobile: image passe au-dessus */

  &::after{
    content:"";
    position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(26,127,138,.18) 0%, rgba(242,201,76,.12) 100%);
    pointer-events:none;
  }

  img{
    width: 70%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
  }

  @media (max-width: 480px) { 
   img{
    width: 62%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
  }
  } 

`;

const Caption = styled.figcaption`
  position: absolute; left: 4px; bottom: 40px;
  background: rgba(255,255,255,.52);
  color: ${colors.primary};
  font-weight: 800;
  padding: .55rem .9rem;
  border-radius: px;
  box-shadow: 0 10px 24px rgba(0,0,0,.02);


`;

/* ============ Variants motion ============ */
const cardV = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition: { duration: .6, ease: "easeOut" } }
};
const imgV = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: .6, ease: "easeOut" } }
};
const badgeV = {
  hover: { scale: 1.06, rotate: [0, -6, 6, 0] },
  tap:   { scale: 0.96 }
};

/* ============ Composant ============ */
const ComplementaryServices = () => {
  return (
    <Section>
      <Container>
        {/* Carte texte à gauche */}
        <Card
          as={motion.article}
          variants={cardV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Title>Complémentaires</Title>

          {/* Sourcing */}
          <Service
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45, delay: .05 }}
          >
            <IconCol>
              <Badge whileHover="hover" whileTap="tap" variants={badgeV} aria-hidden>
                <Search size={18} />
              </Badge>
            </IconCol>
            <div>
              <Heading>Sourcing & objets personnalisés</Heading>
              <Text>
                Nous proposons aux entreprises un service de <Mark>sourcing</Mark> pour l’achat de cadeaux,
                objets publicitaires et équipements personnalisés favorisant leur <Mark>visibilité sur le terrain</Mark>.
              </Text>
            </div>
          </Service>

          {/* Street Marketing */}
          <Service
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45, delay: .15 }}
          >
            <IconCol>
              <Badge whileHover="hover" whileTap="tap" variants={badgeV} aria-hidden>
                <Megaphone size={18} />
              </Badge>
            </IconCol>
            <div>
              <Heading>Street Marketing & activation commerciale</Heading>
              <Text>
                Nous menons des <Mark>campagnes terrain ciblées</Mark>, avec déploiement de
                <Mark> promoteurs commerciaux</Mark> pour booster la visibilité et les ventes
                des produits et services de nos clients.
              </Text>
            </div>
          </Service>

          {/* Courtage */}
          <Service
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45, delay: .25 }}
          >
            <IconCol>
              <Badge whileHover="hover" whileTap="tap" variants={badgeV} aria-hidden>
                <Handshake size={18} />
              </Badge>
            </IconCol>
            <div>
              <Heading>Courtage & négoce</Heading>
              <Text>
                Nous accompagnons les <Mark>investisseurs étrangers</Mark> dans leurs projets
                d’implantation en Guinée à travers des services de <Mark>courtage</Mark>,
                <Mark> conseil</Mark> et <Mark>négociation</Mark>.
              </Text>
            </div>
          </Service>
        </Card>

        {/* Grande image à droite */}
        <ImageWrap
          variants={imgV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
        >
          <img
            src={
              imagess?.Pour_les_Family_day1 ||
              imagess?.businesskey4 ||
              imagess?.salon3 ||
              "/placeholder.jpg"
            }
            alt="Salle événementielle MK Global Services GN"
            loading="lazy"
            decoding="async"
          />
          <Caption>Références — espaces & événements</Caption>
        </ImageWrap>
      </Container>
    </Section>
  );
};

export default ComplementaryServices;
