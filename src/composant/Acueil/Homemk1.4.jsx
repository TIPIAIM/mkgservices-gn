// src/components/Sections/IdeasToLife.jsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaBullseye, FaStar, FaLeaf, FaCheckCircle } from "react-icons/fa";
import colors from "../../Styles/colors";

/* =============== Styles Premium =============== */
const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 6rem 1rem;

  background: 
    linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary || colors.primary} 100%),
    radial-gradient(ellipse at 20% 20%, ${colors.accentTurquoise}20 0%, transparent 40%),
    radial-gradient(ellipse at 80% 30%, ${colors.accentGold}15 0%, transparent 40%);
    color: ${colors.white};
  border-top: 1px solid ${colors.white}10;
  border-bottom: 1px solid ${colors.white}10;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  margin: 0 auto 3rem;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${colors.white};
  text-align: center;
  max-width: 800px;
  position: relative;
  padding-bottom: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${colors.accentTurquoise}, ${colors.accentGold});
    border-radius: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.8rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-areas:
    "left right"
    "full full";

  @media (max-width: 768px) {
    grid-template-areas:
      "left"
      "right"
      "full";
  }
`;

const Card = styled(motion.article)`
  position: relative;
  background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  border: 1px solid ${colors.white}15;
  border-radius: 6px;
  padding: 2rem 1.8rem;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 10px 30px rgba(0,0,0,0.2),
    0 2px 6px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  /* Effet de bordure premium */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    //border-radius: px;
    padding: 1px;
    background: linear-gradient(135deg, 
      rgba(255,255,255,0.4) 0%, 
      rgba(255,255,255,0) 40%,
      rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.3) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Barre décorative */
  &::after {
    content: "";
    position: absolute;
    top: 50px;
    left: 1.8rem;
    right: 1.8rem;
    height: 2px;
    background: linear-gradient(90deg, 
      ${colors.accentTurquoise}80, 
      ${colors.accentGold}80);
    border-radius: 2px;
  }
`;

const CardLeft = styled(Card)` grid-area: left; `;
const CardRight = styled(Card)` grid-area: right; `;
const CardFull = styled(Card)` grid-area: full; `;

const IconBadge = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${colors.primary};
  background: ${colors.white};
  box-shadow: 
    0 8px 24px rgba(0,0,0,0.3),
    0 0 0 8px rgba(255,255,255,0.1);
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  svg { 
    font-size: 1.4rem;
    color: ${colors.primary};
  }

  ${Card}:hover & {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 
      0 12px 32px rgba(0,0,0,0.4),
      0 0 0 8px rgba(255,255,255,0.15);
  }
`;

const CardTitle = styled.h3`
  margin: 3.5rem 0 1.2rem;
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  font-weight: 700;
  color: ${colors.white};
  text-align: center;
  letter-spacing: 0.02em;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${colors.white}dd;
  text-align: center;
  font-weight: 300;

  strong {
    color: ${colors.accentGold};
    font-weight: 600;
    position: relative;
    
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
      opacity: 0.6;
    }
  }
`;

const List = styled.ul`
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.8rem;
`;

const Item = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${colors.white}ee;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s ease;

  svg {
    flex: 0 0 auto;
    margin-top: 0.3rem;
    color: ${colors.accentTurquoise};
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  &:hover {
    background: rgba(255,255,255,0.1);
    transform: translateX(4px);
  }
`;

/* =============== Component =============== */
const IdeasToLife = () => {
  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Donnons vie à vos idées d'aménagement
        </Title>

        <Grid>
          {/* Carte 1 */}
          <CardLeft
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <IconBadge aria-hidden>
              <FaBullseye />
            </IconBadge>
            <CardTitle>Vision & Réalisation</CardTitle>
            <CardText>
              Nous transformons vos concepts en <strong>maquettes 3D photoréalistes</strong> et plans techniques précis pour une validation en amont.
            </CardText>
          </CardLeft>

          {/* Carte 2 */}
          <CardRight
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <IconBadge aria-hidden>
              <FaStar />
            </IconBadge>
            <CardTitle>Excellence Matérielle</CardTitle>
            <CardText>
              Sélection rigoureuse de <strong>matériaux premium</strong> pour une durabilité et une finition d'exception.
            </CardText>
          </CardRight>

          {/* Carte 3 */}
          <CardFull
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
          >
            <IconBadge aria-hidden>
              <FaLeaf />
            </IconBadge>
            <CardTitle>Engagement Écoresponsable</CardTitle>
            <CardText as="div">
              <List>
                <Item
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCheckCircle />
                  Matériaux certifiés et recyclés
                </Item>
                <Item
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCheckCircle />
                  Procédés à faible impact environnemental
                </Item>
                <Item
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCheckCircle />
                  Optimisation des ressources et gestion des déchets
                </Item>
              </List>
            </CardText>
          </CardFull>
        </Grid>
      </Container>
    </Section>
  );
};

export default IdeasToLife;