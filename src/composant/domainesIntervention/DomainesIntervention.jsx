// src/components/Sections/DomainesExpertiseGrid.jsx
import React, { useState, memo, useCallback, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaTools,
  FaTheaterMasks,
  FaLightbulb,
  FaGamepad,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { useIntersectionObserver } from "./useIntersectionObserver";
import PremiumServices from "./Domàine2";
import SEO from "../../SEO";
import Navbard from "../Acueil/Barnav2";

/* ================= Helpers SEO (mêmes principes que tes autres pages) ================= */
const getBaseUrl = () => {
  const env = import.meta?.env?.VITE_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://www.mkgservices-gn.com";
};
const toAbsolute = (src) => {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  const base = getBaseUrl();
  return `${base}${src.startsWith("/") ? "" : "/"}${src}`;
};

/* ================= Animations ================= */
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

/* ================= Styles ================= */
const Section = styled.section`
  margin-top: 6em;

  --card-aspect-ratio: 1/1.2;
  --card-radius: 16px;
  --transition-duration: 0.4s;
  --easing: cubic-bezier(0.16, 1, 0.3, 1);

  position: relative;
  background: ${colors.white};
  padding: clamp(2.5rem, 5vw, 4.5rem) 1rem;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 75% 50%,
      rgba(234, 238, 242, 0.8) 0%,
      transparent 50%
    );
    z-index: -1;
    pointer-events: none;
  }
`;
const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  will-change: transform, opacity;
`;
const Title = styled(motion.h2).attrs({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
})`
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  color: ${colors.primary};
  line-height: 1.1;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: opacity var(--transition-duration) var(--easing);
`;
const Lead = styled(motion.p).attrs({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
})`
  margin: 0 auto;
  color: ${colors.darkText};
  opacity: 0.85;
  max-width: 780px;
  line-height: 1.8;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 450;
  transition: opacity var(--transition-duration) var(--easing);
`;
const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  padding: 1rem 0;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;
const Card = styled(motion.button).attrs(({ $reduceMotion }) => ({
  whileHover: $reduceMotion ? {} : { y: -8 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 20 },
}))`
  position: relative;
  border: none;
  padding: 0;
  border-radius: var(--card-radius);
  overflow: hidden;
  cursor: pointer;
  background: ${colors.lightGrey};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  aspect-ratio: var(--card-aspect-ratio);
  will-change: transform;

  &:focus-visible {
    outline: 3px solid ${colors.secondary};
    outline-offset: 3px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--card-radius);
    border: 1px solid rgba(255, 255, 255, 0.15);
    pointer-events: none;
    z-index: 1;
  }
`;
const CardImage = styled(motion.div).attrs({
  initial: { scale: 1 },
  whileHover: { scale: 1.08 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
})`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.$image});
  background-size: cover;
  background-position: center;
  will-change: transform;
  filter: saturate(0.95) contrast(1.05);
  position: relative;
`;
const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
  z-index: 0;
`;
const Tag = styled(motion.div).attrs({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  whileHover: { opacity: 0, y: 10 },
})`
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: ${colors.white};
  font-weight: 700;
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transition: all var(--transition-duration) var(--easing);
  will-change: transform, opacity;
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    color: ${colors.white};
    font-size: 1em;
    flex-shrink: 0;
  }
`;
const Overlay = styled(motion.div).attrs({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
})`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  gap: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 45, 82, 0.95) 100%
  );
  z-index: 1;
  will-change: transform, opacity;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;
const OverlayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${colors.white};
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 800;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
const Bullets = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.8rem;
`;
const Bullet = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${colors.white};
  font-weight: 500;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.5;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  .dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${colors.white};
    color: ${colors.secondary};
    flex-shrink: 0;
    transition: all 0.3s var(--easing);
    cursor: help;
    will-change: transform;

    &:hover {
      transform: scale(1.1);
      background: ${colors.accentGold};
      color: ${colors.white};
    }
  }

  .tip {
    position: absolute;
    left: 32px;
    bottom: 120%;
    white-space: nowrap;
    background: ${colors.white};
    color: ${colors.primary};
    border-radius: 12px;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
    transform-origin: bottom left;
    pointer-events: none;
    z-index: 10;
    font-weight: 600;
  }
`;
const LightboxOverlay = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
})`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
const Lightbox = styled(motion.div).attrs({
  initial: { scale: 0.96, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.96, y: 20, opacity: 0 },
  transition: { type: "spring", stiffness: 360, damping: 28 },
})`
  position: relative;
  width: min(92vw, 1400px);
  max-height: 90vh;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
  background: ${colors.black};
  will-change: transform, opacity;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: ${colors.primary};
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transition: all 0.3s var(--easing);
  z-index: 2;
  will-change: transform;

  &:hover {
    background: ${colors.accentGold};
    transform: rotate(90deg) scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${colors.white};
    outline-offset: 2px;
  }
`;
const FullImg = styled(motion.img).attrs({
  initial: { scale: 1.02 },
  animate: { scale: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
})`
  width: 100%;
  height: min(80vh, 800px);
  object-fit: cover;
  object-position: center;
  will-change: transform;
`;
const LightboxTitle = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  color: ${colors.white};
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.95rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;
const FloatingDecoration = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(46, 204, 113, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
  animation: ${floatAnimation} 8s ease-in-out infinite;
  will-change: transform;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    bottom: 15%;
    right: 8%;
    width: 180px;
    height: 180px;
    animation-delay: 1.5s;
    background: radial-gradient(
      circle,
      rgba(52, 152, 219, 0.1) 0%,
      transparent 70%
    );
  }
`;

/* ================= Données ================= */
const fallback =
  imagess?.plàinàirr || imagess?.pàrkenfàntjoue || "/placeholder.jpg";

const ITEMS = [
  {
    key: "divertissement",
    title: "Divertissement professionnel",
    icon: <FaTheaterMasks />,
    cover: imagess?.Pour_les_Family_day8 || imagess?.evenement || fallback,
    overlayTitle: "Animation sur‑mesure pour entreprises",
    bullets: [
      "Team buildings immersifs",
      "Family days",
      "Tournois sportifs inter‑entreprises",
      "Colonies de vacances",
    ],
  },
  {
    key: "decoration",
    title: "Décoration lumineuse",
    icon: <FaLightbulb />,
    cover: imagess?.coration_lumineuse_imge5 || imagess?.salon3 || fallback,
    overlayTitle: "Décors lumineux éblouissants pour",
    bullets: [
      "Événements publics & privés",
      "Festivités de fin d'année",
      "Espaces photo & animations visuelles",
    ],
  },
  {
    key: "espaces",
    title: "Espaces de loisir",
    icon: <FaGamepad />,
    cover: imagess?.colon7_hobmqm|| imagess?.enfàntkijoue || fallback,
    overlayTitle: "Création d'espaces originaux",
    bullets: [
      "Fêtes foraines",
      "Selfie Showrooms",
      "Aires de jeux & zones ludiques",
    ],
  },
];

/* ================= Composant ================= */
const DomainesExpertiseGrid = memo(function DomainesExpertiseGrid() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hoverIndex, setHoverIndex] = useState({ card: -1, bullet: -1 });
  const prefersReducedMotion = useReducedMotion();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const openLightbox = useCallback((i) => {
    setCurrent(i);
    setOpen(true);
  }, []);
  const handleHover = useCallback((cardIdx, bulletIdx = -1) => {
    setHoverIndex({ card: cardIdx, bullet: bulletIdx });
  }, []);
  const memoizedItems = useMemo(() => ITEMS, []);

  /* ===== SEO props ===== */
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/domaines`; // URL “logique” pour la section domaines
  const ogImage = toAbsolute(memoizedItems[0]?.cover);

  return (
    <>
      <SEO
        title="Domaines d’expertise — MK Global Services GN"
        description="Aménagement d’espaces, divertissement professionnel, décoration lumineuse et création d’espaces de loisir : découvrez les domaines d’expertise de MK Global Services GN."
        image={ogImage}
        url={pageUrl}
        keywords={[
          "aménagement Guinée",
          "divertissement entreprise Conakry",
          "décoration lumineuse",
          "espaces de loisir",
          "MK Global Services",
        ]}
      >
        <link rel="canonical" href={pageUrl} />
      </SEO>
      <div>
        <Navbard />
      </div>
      <Section ref={ref}>
        <FloatingDecoration />
        <FloatingDecoration />

        <Container>
          <Header>
            <Title animate={isVisible ? { y: 0, opacity: 1 } : {}}>
              Nos domaines d&apos;expertise
            </Title>
            <Lead animate={isVisible ? { y: 0, opacity: 1 } : {}}>
              MK Global Services GN conçoit, anime et aménage des espaces
              ludiques & professionnels en Guinée. Survolez une carte ou les
              petites icônes pour découvrir notre savoir‑faire.
            </Lead>
          </Header>

          <Grid>
            {memoizedItems.map((item, i) => (
              <Card
                key={item.key}
                $reduceMotion={prefersReducedMotion}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleHover(-1)}
                onClick={() => openLightbox(i)}
                aria-label={`Voir ${item.title}`}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                initial={{ y: 30, opacity: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <CardImage $image={item.cover} />
                <Dim />

                <Tag>
                  {item.icon}
                  {item.title}
                </Tag>

                <AnimatePresence>
                  {hoverIndex.card === i && (
                    <Overlay>
                      <OverlayTitle>{item.overlayTitle}</OverlayTitle>
                      <Bullets>
                        {item.bullets.map((b, bi) => (
                          <Bullet key={bi}>
                            <div
                              className="dot"
                              onMouseEnter={() => handleHover(i, bi)}
                              onMouseLeave={() => handleHover(i, -1)}
                              aria-label={`Info: ${b}`}
                            >
                              <FaInfoCircle size={12} />
                            </div>
                            {b}
                            <AnimatePresence>
                              {hoverIndex.bullet === bi && (
                                <motion.span
                                  className="tip"
                                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {b}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Bullet>
                        ))}
                      </Bullets>
                    </Overlay>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </Grid>
        </Container>

        <AnimatePresence>
          {open && (
            <LightboxOverlay onClick={() => setOpen(false)}>
              <Lightbox
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="lightbox-title"
              >
                <LightboxTitle id="lightbox-title">
                  {memoizedItems[current].title}
                </LightboxTitle>

                <CloseButton
                  onClick={() => setOpen(false)}
                  aria-label="Fermer la lightbox"
                >
                  <FaTimes />
                </CloseButton>

                <FullImg
                  src={memoizedItems[current].cover}
                  alt={memoizedItems[current].title}
                  loading="eager"
                  decoding="async"
                />
              </Lightbox>
            </LightboxOverlay>
          )}
        </AnimatePresence>

        <PremiumServices />
      </Section>
    </>
  );
});

export default DomainesExpertiseGrid;
