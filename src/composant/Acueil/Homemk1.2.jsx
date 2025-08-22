// src/components/Sections/Homemkundeux.jsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${colors.white};
`;

const TopBanner = styled.div`
  height: 120px; /* bandeau fin comme ta capture */
  background-image: url(${(p) => p.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      ${colors.primary}55 0%,
      ${colors.secondary}33 35%,
      transparent 70%
    );
    mix-blend-mode: multiply;
  }
`;

const Content = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 2.8rem 1.2rem 3.6rem;
  text-align: center;

  
`;

const Overline = styled.p`
  color: ${colors.secondary};
  font-weight: 800;
  letter-spacing: 0.14em;
  font-size: 0.95rem;
  margin: 0 0 0.35rem;
  text-transform: uppercase;
`;

const Title = styled(motion.h1)`
  margin: 0 0 0.9rem;
  font-size: clamp(1.6rem, 3.8vw, 2.2rem);
  line-height: 1.15;
  color: ${colors.primary};
  font-weight: 900;
`;

const TitleAccent = styled.span`
  display: block;
  background: linear-gradient(90deg, ${colors.accentGold} 0%, ${colors.secondary} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Lead = styled(motion.p)`
  color: ${colors.black};
  opacity: 0.9;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.7;
  max-width: 760px;
  margin: 0 auto;

   @media (max-width: 480px) {
    text-align: left;
    margin: 1rem 1.5rem;
  }
`;

const Divider = styled.div`
  width: 72px;
  height: 4px;
  margin: 1.1rem auto 0;
  border-radius: 2px;
  background: linear-gradient(90deg, ${colors.accentGold} 0%, ${colors.secondary} 100%);
`;

/* CTA premium */
const Cta = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.6rem;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.02rem;
  color: ${colors.primary};
  background: linear-gradient(135deg, ${colors.accentGold} 65%, ${colors.secondary} 100%);
  box-shadow: 0 10px 28px ${colors.accentGold}33;
  transition: box-shadow .2s, filter .2s;
  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 16px 36px ${colors.accentGold}55;
  }
`;

/**
 * Homemkundeux - prêt à copier/coller
 * Adapté à MK Global Services GN (palette + wording)
 */
const Homemkundeux = ({
  image = imagess.amenagement_exterieux, // remplace par ton URL Cloudinary si besoin
  titleTop = "MK Global Services",
  titleMain = "Créons des moments inoubliables",
  paragraph = `MK Global Services GN conçoit et orchestre des expériences
  mémorables pour vos publics : team buildings immersifs, family days,
  animations lumineuses, inaugurations et grands événements. Notre équipe
  pluridisciplinaire gère la création, la logistique et la sécurité, avec
  des solutions durables et sur‑mesure adaptées à vos objectifs et budgets.`,
  ctaText = "Demander un devis",
  ctaTo = "/contact",
}) => {
  return (
    <Wrapper>
      <TopBanner $image={image} />
      <Content>
        <Overline>LE SITE DE</Overline>

        <Title
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label={`${titleTop} — ${titleMain}`}
        >
          {`${titleTop}`}
          <TitleAccent>{titleMain}</TitleAccent>
        </Title>

        <Lead
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          {paragraph}
        </Lead>

        <Cta
          to={ctaTo}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          aria-label={ctaText}
        >
          {ctaText}
        </Cta>

        <Divider />
      </Content>
    </Wrapper>
  );
};

export default Homemkundeux;
