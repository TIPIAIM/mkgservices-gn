// src/components/Hero/Homemk.jsx
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  memo,
  useRef,
} from "react";
import styled, { keyframes } from "styled-components";
import {
  LazyMotion,
  domAnimation,
  motion,
  AnimatePresence,
} from "framer-motion";
import colors from "../../Styles/colors";
import {
  FaChevronRight,
  FaMagic,
  FaLightbulb,
  FaUsers,
  FaStar,
  FaHandsHelping,
  FaSeedling,
  FaHeart,
  FaTimes,
  FaChartLine,
} from "react-icons/fa";
import { imagess } from "../../assets/imagess";
import SEO from "../../SEO";

/* ======================= Lazy sections (code-splitting) ======================= */
const CreationSection = lazy(() => import("./Homemk2"));
const Homemkundeux = lazy(() => import("./Homemk1.2"));
const Homemkuntrois = lazy(() => import("./Homemk1.3"));
const Homemkunkàtre = lazy(() => import("./Homemk1.4"));
const Homemkuncink = lazy(() => import("./Homemk1.5"));

/* ======================= Helpers SEO ======================= */
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

/* ======================= Animations & Glow ======================= */
const pulseRipple = keyframes`
  0%   { box-shadow: 0 0 0 0 ${colors.primary}55, 0 0 16px 6px ${colors.primar}44; }
  60%  { box-shadow: 0 0 0 20px ${colors.primar}11, 0 0 24px 12px ${colors.primar}55; }
  100% { box-shadow: 0 0 0 0 ${colors.accentGold}00, 0 0 8px 4px ${colors.primary}33; }
`;

/* ======================= Styled Components ======================= */
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(
    120deg,
    ${colors.primary} 40%,
    ${colors.secondary} 100%
  );
`;

const BackgroundSlider = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  display: flex;
`;

const BackgroundSlide = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${(p) => p.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${colors.primary}88 40%,
      ${colors.primary}10 100%
    );
    mix-blend-mode: multiply;
  }
`;

const AnimatedOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
      circle at 55% 25%,
      ${colors.secondar}22 10%,
      transparent 25%
    ),
    radial-gradient(
      circle at 25% 75%,
      ${colors.secondar}39 50%,
      transparent 25%
    );
  background-size: 200% 200%;
  animation: gradientMove 20s ease infinite alternate;

  @keyframes gradientMove {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;

  span {
    position: absolute;
    border-radius: 50%;
    filter: blur(2.5px);
    background: ${colors.primary};
    animation: floatParticle linear infinite;
  }

  /* positions */
  span:nth-child(1) {
    width: 14px;
    height: 14px;
    top: 18%;
    left: 8%;
    animation-duration: 19s;
  }
  span:nth-child(2) {
    width: 10px;
    height: 10px;
    top: 78%;
    left: 30%;
    animation-duration: 22s;
  }
  span:nth-child(3) {
    width: 7px;
    height: 7px;
    top: 39%;
    left: 82%;
    animation-duration: 13s;
  }
  span:nth-child(4) {
    width: 12px;
    height: 12px;
    top: 62%;
    left: 78%;
    animation-duration: 26s;
  }
  span:nth-child(5) {
    width: 9px;
    height: 9px;
    top: 28%;
    left: 56%;
    animation-duration: 27s;
  }

  @keyframes floatParticle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(90px);
      opacity: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
  max-width: 54rem;
  margin: 0 auto;
  width: 100%;
`;

const MainHeading = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 3.7rem);
  font-weight: 900;
  line-height: 1.1;
  color: ${colors.white};
  text-shadow: 0 2px 14px ${colors.primary}55;
  margin-bottom: 1.1rem;
  margin-top: 6rem;
`;

const GradientText = styled.span`
  background: linear-gradient(
    90deg,
    ${colors.secondar} 50%,
    ${colors.secondary} 50%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const MessageText = styled(motion.p)`
  font-size: clamp(1.03rem, 2vw, 1.31rem);
  color: rgba(255, 255, 255, 0.96);
  font-weight: 500;
  max-width: 41rem;
  margin: 0 auto;
  line-height: 1.7;
`;

const WhyInvestButton = styled(motion.button)`
  background: linear-gradient(
    135deg,
    ${colors.white} 10%,
    ${colors.secondary} 100%
  );
  color: ${colors.primary};
  border: none;
  padding: 1.19rem 2.99rem;
  font-size: 1.18rem;
  font-weight: 800;
  border-radius: 1px;
  cursor: pointer;
  margin-top: 2.3rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  align-self: center;
  box-shadow: 0 1px 3px ${colors.accentGold};
  transition: 0.2s;
  animation: ${pulseRipple} 2.8s infinite;

  &:hover {
    transform: translateY(-6px) scale(1.045);
    background: linear-gradient(
      135deg,
      ${colors.secondary} 50%,
      ${colors.secondar} 50%
    );
    color: ${colors.white};
    box-shadow: 0 1px 3px ${colors.accentGold}77;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${colors.darkOverlay};
  backdrop-filter: blur(8px);
  display: flex;
  
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: ${colors.white};
  border-radius: 5px;
margin-top:5rem;
  max-width: 980px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
  border: 1.5px solid ${colors.primar}44;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 1.3rem;
  background: ${colors.primary}22;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(2px);

  &:hover {
    background: ${colors.secondary};
    color: ${colors.white};
    transform: rotate(90deg) scale(1.11);
  }
`;

const ModalContent = styled.div`
  padding: 4.5rem 3.5rem 3.5rem;
  @media (max-width: 768px) {
    padding: 3.2rem 1.7rem 2.2rem;
  }
`;

const ModalTitle = styled.h2`
  color: ${colors.secondary};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 800;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -17px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    border-radius: 3px;
    background: linear-gradient(
      90deg,
      ${colors.accentGold} 0%,
      ${colors.secondary} 100%
    );
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: 2.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitCard = styled(motion.div)`
  background: ${({ $isLeft }) =>
    $isLeft ? "rgba(0,45,82,0.07)" : "rgba(242,201,76,0.09)"};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: 1.5px solid
    ${({ $isLeft }) =>
      $isLeft ? colors.secondary + "22" : colors.accentGold + "22"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-8px) scale(1.017);
    box-shadow: 0 15px 36px ${colors.secondary}14;
  }
  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 1.1rem;
  }
`;

const BenefitHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.8rem;
`;
const BenefitIcon = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 17px;
  background: ${({ $isLeft }) =>
    $isLeft ? colors.secondary + "16" : colors.accentGold + "16"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isLeft }) => ($isLeft ? colors.secondary : colors.primary)};
  font-size: 2rem;
  flex-shrink: 0;
`;
const BenefitTitle = styled.h3`
  color: ${({ $isLeft }) => ($isLeft ? colors.secondary : colors.primar)};
  font-size: 1.28rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
`;
const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BenefitListItem = styled(motion.li)`
  padding: 1rem 0;
  color: ${colors.darkText};
  position: relative;
  padding-left: 2rem;
  line-height: 1.6;
  font-size: 1.09rem;
  border-bottom: 1px solid ${colors.primar}09;
  display: flex;
  align-items: center;
  min-height: 58px;

  &:last-child {
    border-bottom: none;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.6rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $isLeft }) =>
      $isLeft ? colors.secondar : colors.primar};
  }
  @media (max-width: 768px) {
    min-height: auto;
    padding: 0.8rem 0;
    font-size: 0.98rem;
  }
`;

/* ======================= Hook: prefers-reduced-motion ======================= */
const useReducedMotionPref = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
};

/* ======================= Composant ======================= */
const HomemkComponent = () => {
  const reducedMotion = useReducedMotionPref();

  const backgroundImages = useMemo(
    () => [
      imagess.coration_lumineuse_imge5,
      imagess.Pour_les_Family_day8,
      imagess.Pour_les_Family_day1,
      imagess.pàrkenfàntjoue,
      imagess.colon7_hobmqm,
      imagess.plàinàirr,
      imagess.oloni6,
      imagess.petitefille,
      imagess.coration_lumineuse_imge5,
      imagess.colon8,
      imagess.enfàntkijoue,
      imagess.coloni3,
      imagess.mereee,
      imagess.Pour_les_Family_day5,
      imagess.femmecourr,
    ],
    []
  );

  const messages = useMemo(
    () => [
      "Créez des espaces de vie et de loisirs uniques, partout en Guinée.",
      "Team building, family days, événements pros : des souvenirs inoubliables pour vos équipes.",
      "Parcs d’attractions, showrooms, animations lumineuses, tout est possible !",
      "Un accompagnement sur mesure pour chaque projet, petite ou grande ambition.",
      "Des solutions clés en main : créativité, logistique, sécurité et innovation.",
      "Engagement éco-responsable : matériaux durables, gestion responsable des ressources.",
      "Faites confiance à l’expertise MKGS pour transformer vos idées en expériences mémorables.",
    ],
    []
  );

  const investBenefits = useMemo(
    () => ({
      avantages: [
        { text: "Innovation & Créativité", icon: <FaLightbulb /> },
        { text: "Expertise technique certifiée", icon: <FaStar /> },
        { text: "Engagement éco-responsable", icon: <FaSeedling /> },
        { text: "Équipe passionnée & pluridisciplinaire", icon: <FaUsers /> },
        { text: "Accompagnement sur mesure", icon: <FaHandsHelping /> },
        { text: "Confiance & Réputation", icon: <FaHeart /> },
      ],
      significations: [
        "Conception sur-mesure : 3D, design, validation client avant exécution.",
        "Matériaux haut de gamme, sélectionnés pour leur robustesse & durabilité.",
        "Utilisation de bois PEFC, peintures sans COV, solutions biosourcées.",
        "Organisation événementielle de A à Z : animation, sécurité, logistique.",
        "Solutions pour entreprises, collectivités et institutions.",
        "Pilotage rigoureux par un chef de projet expérimenté (+12 ans d'expérience).",
      ],
    }),
    []
  );

  const [currentMessage, setCurrentMessage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [ctaIcon, setCtaIcon] = useState(<FaChevronRight />);

  // Timers stables
  const msgTimer = useRef(null);
  const bgTimer = useRef(null);

  useEffect(() => {
    const msgDelay = reducedMotion ? 6000 : 3400;
    msgTimer.current = setInterval(
      () => setCurrentMessage((p) => (p + 1) % messages.length),
      msgDelay
    );
    return () => clearInterval(msgTimer.current);
  }, [messages.length, reducedMotion]);

  useEffect(() => {
    const bgDelay = reducedMotion ? 8000 : 5400;
    bgTimer.current = setInterval(
      () => setCurrentBg((p) => (p + 1) % backgroundImages.length),
      bgDelay
    );
    return () => clearInterval(bgTimer.current);
  }, [backgroundImages.length, reducedMotion]);

  useEffect(() => {
    if (isHovering) {
      const idx = Math.floor(Math.random() * investBenefits.avantages.length);
      setCtaIcon(investBenefits.avantages[idx].icon);
    } else {
      setCtaIcon(<FaChevronRight />);
    }
  }, [isHovering, investBenefits.avantages]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  /* ======================= SEO props ======================= */
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/`;
  const ogImage = toAbsolute(backgroundImages?.[0]);

  return (
    <>
      <SEO
        title="MK Global Services GN — Événementiel, aménagement & loisirs en Guinée"
        description="MK Global Services GN conçoit et réalise des événements, espaces ludiques et aménagements sur mesure en Guinée : créativité, sécurité, logistique et engagement éco‑responsable."
        image={ogImage}
        url={pageUrl}
        keywords={[
          "MK Global Services",
          "événementiel Guinée",
          "aménagement d’espaces",
          "team building Conakry",
          "street marketing",
          "loisirs",
          "Guinée",
        ]}
      >
        <link rel="canonical" href={pageUrl} />
      </SEO>

      {/* Framer allégé */}
      <LazyMotion features={domAnimation}>
        <HeroSection>
          <BackgroundSlider>
            {backgroundImages.map((image, index) => (
              <BackgroundSlide
                key={index}
                $image={image}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentBg ? 0.92 : 0,
                  transition: { duration: reducedMotion ? 0.4 : 1.35 },
                }}
              />
            ))}
          </BackgroundSlider>

          {!reducedMotion && (
            <>
              <AnimatedOverlay />
              <FloatingParticles>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </FloatingParticles>
            </>
          )}

          <ContentWrapper>
            <MainHeading
              initial={{ opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Réinventons&nbsp;le loisir,
              <GradientText>
                {" "}
                l’événementiel et l’aménagement en Guinée
              </GradientText>
            </MainHeading>

            <MessageText
              key={currentMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {messages[currentMessage]}
            </MessageText>

            <WhyInvestButton
              onClick={openModal}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              whileHover={{ y: -6, scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
            >
              Pourquoi Nous ?
              <motion.span
                animate={{ x: isHovering ? 8 : 0, rotate: isHovering ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                style={{ display: "inline-flex" }}
              >
                {ctaIcon}
              </motion.span>
            </WhyInvestButton>
          </ContentWrapper>

          <AnimatePresence>
            {isModalOpen && (
              <ModalOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeModal}
              >
                <ModalContainer
                  initial={{ scale: 0.97, y: 24, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.97, y: 24, opacity: 0 }}
                  transition={{
                    type: "spring",
                    damping: 22,
                    stiffness: 320,
                    delay: 0.07,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CloseButton onClick={closeModal}>
                    <FaTimes />
                  </CloseButton>

                  <ModalContent>
                    <ModalTitle>
                      Pourquoi choisir{" "}
                      <GradientText>MK Global Services GN</GradientText> ?
                    </ModalTitle>

                    <BenefitsGrid>
                      <BenefitCard
                        $isLeft
                        initial={{ x: -27, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        <BenefitHeader>
                          <BenefitIcon $isLeft>
                            <FaMagic />
                          </BenefitIcon>
                          <BenefitTitle $isLeft>Nos Valeurs</BenefitTitle>
                        </BenefitHeader>
                        <BenefitList>
                          {investBenefits.avantages.map((item, idx) => (
                            <BenefitListItem
                              key={idx}
                              $isLeft
                              initial={{ x: -12, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                delay: 0.21 + idx * 0.09,
                                type: "spring",
                                stiffness: 135,
                                damping: 13,
                              }}
                            >
                              <span
                                style={{ marginRight: 14, fontSize: "1.27rem" }}
                              >
                                {item.icon}
                              </span>
                              <strong>{item.text}</strong>
                            </BenefitListItem>
                          ))}
                        </BenefitList>
                      </BenefitCard>

                      <BenefitCard
                        initial={{ x: 27, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        <BenefitHeader>
                          <BenefitIcon>
                            <FaChartLine />
                          </BenefitIcon>
                          <BenefitTitle>Notre Différence</BenefitTitle>
                        </BenefitHeader>
                        <BenefitList>
                          {investBenefits.significations.map((item, idx) => (
                            <BenefitListItem
                              key={idx}
                              initial={{ x: 12, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                delay: 0.23 + idx * 0.09,
                                type: "spring",
                                stiffness: 135,
                                damping: 13,
                              }}
                            >
                              {item}
                            </BenefitListItem>
                          ))}
                        </BenefitList>
                      </BenefitCard>
                    </BenefitsGrid>
                  </ModalContent>
                </ModalContainer>
              </ModalOverlay>
            )}
          </AnimatePresence>
        </HeroSection>
      </LazyMotion>

      {/* Sections en lazy */}
      <Suspense fallback={null}>
        <CreationSection />
        <Homemkundeux />
        <Homemkuntrois />
        <Homemkunkàtre />
        <Homemkuncink />
      </Suspense>
    </>
  );
};

/* ======================= memo pour éviter les re-renders ======================= */
const Homemk = memo(HomemkComponent);
export default Homemk;
