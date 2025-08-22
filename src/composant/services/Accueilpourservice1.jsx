import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../../Styles/colors";
import {
  FaTimes,
  FaChevronRight,
  FaHandshake,
  FaChartLine,
  
  FaUsers,
  FaHeart,
  FaLightbulb,
  FaSeedling,
  FaStar,
  FaHandsHelping
} from "react-icons/fa";
import { imagess } from "../../assets/imagess";
import { useNavigate } from "react-router-dom";


/* ==================== STYLED COMPONENTS (identiques) ==================== */

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${colors.secondar} 30%,
      ${colors.white} 100%
    );
    mix-blend-mode: multiply;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
`;



const MainHeading = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${colors.white};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;



const GradientText = styled.span`
  background: linear-gradient(90deg, #f5d742 0%, ${colors.secondar} 10%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const MessageText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
`;

const WhyInvestButton = styled(motion.button)`
  background: linear-gradient(135deg, ${colors.secondar} 50%, ${colors.primar} 50%);
  color: ${colors.white};
  border: none;
  padding: 1.1rem 2.75rem;
  font-size: 1.15rem;
  font-weight: 800;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: center;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${colors.accentTurquoise} 50%, ${colors.secondar} 50%);
    z-index: -1;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
      transform: scale(1.1);
    }

    svg {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  border-radius: 2px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: ${colors.accentGold};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accentTurquoise};
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(2px);

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: rotate(90deg) scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 4.5rem 3.5rem 3.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 3.5rem 2rem 2.5rem;
  }
`;

const ModalTitle = styled.h2`
  color: ${colors.accentTurquoise};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 3.5rem;
  text-align: center;
  position: relative;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, ${colors.accentGold} 0%, #f5b342 100%);
    border-radius: 3px;
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
    $isLeft ? "rgba(26, 127, 138, 0.05)" : "rgba(245, 179, 66, 0.05)"};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: 1px solid
    ${({ $isLeft }) =>
      $isLeft ? "rgba(26, 127, 138, 0.15)" : "rgba(245, 179, 66, 0.15)"};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ $isLeft }) =>
      $isLeft ? colors.accentTurquoise : colors.accentGold};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
    background: ${({ $isLeft }) =>
      $isLeft ? "rgba(26, 127, 138, 0.08)" : "rgba(245, 179, 66, 0.08)"};
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 1.5rem;
  }
`;

const BenefitHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${({ $isLeft }) =>
    $isLeft ? "rgba(26, 127, 138, 0.1)" : "rgba(245, 179, 66, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isLeft }) =>
    $isLeft ? colors.accentTurquoise : colors.accentGold};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BenefitTitle = styled.h3`
  color: ${({ $isLeft }) =>
    $isLeft ? colors.accentTurquoise : colors.accentGold};
  font-size: 1.4rem;
  font-weight: 700;
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
  font-size: 1.05rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  min-height: 60px;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.5rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $isLeft }) =>
      $isLeft ? colors.accentTurquoise : colors.accentGold};
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 0.8rem 0;
    font-size: 1rem;
  }
`;

/* =============== STYLED COMPONENTS HERO (identiques) =============== */

const HeroSection = styled.section`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: auto;
  }
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
  background-image: url(${(props) => props.$image});
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
      ${colors.accentTurquoise}CC 100%,
      ${colors.accentTurquoise} 100%
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
      ${colors.accentGold}22 10%,
      transparent 25%
    ),
    radial-gradient(
      circle at 25% 75%,
    ${colors.accentTurquoise}99 50%,
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
    background: ${colors.accentGold};
    border-radius: 50%;
    filter: blur(1px);
    animation: floatParticle linear infinite;

    &:nth-child(1) {
      width: 10px;
      height: 10px;
      top: 20%;
      left: 10%;
      animation-duration: 15s;
    }
    &:nth-child(2) {
      width: 10px;
      height: 10px;
      top: 80%;
      left: 25%;
      animation-duration: 20s;
    }
    &:nth-child(3) {
      width: 5px;
      height: 5px;
      top: 40%;
      left: 90%;
      animation-duration: 12s;
    }
    &:nth-child(4) {
      width: 5px;
      height: 5px;
      top: 60%;
      left: 70%;
      animation-duration: 18s;
    }
    &:nth-child(5) {
      width: 5px;
      height: 5px;
      top: 30%;
      left: 50%;
      animation-duration: 25s;
    }
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
      transform: translateY(-100vh) translateX(100px);
      opacity: 0;
    }
  }
`;

/* ==================== COMPOSANT (textes adaptés MKGS) ==================== */

const Accueilpourservice = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();

  // Visuels MKGS (événementiel / aménagement / loisirs)
  const backgroundImages = [
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
  ];

  // Messages MKGS
  const messages = [
    "Créez des espaces de vie et de loisirs uniques, partout en Guinée.",
    "Team building, family days, événements pros : des souvenirs inoubliables pour vos équipes.",
    "Parcs d’attractions, showrooms, animations lumineuses — tout est possible !",
    "Un accompagnement sur‑mesure pour chaque projet, petite ou grande ambition.",
    "Solutions clés en main : créativité, logistique, sécurité et innovation.",
    "Engagement éco‑responsable : matériaux durables, gestion raisonnée des ressources.",
    "Faites confiance à l’expertise MK Global Services GN pour transformer vos idées en expériences mémorables."
  ];

  // Bénéfices MKGS
  const investBenefits = {
    avantages: [
      { text: "Innovation & Créativité", icon: <FaLightbulb /> },
      { text: "Expertise technique certifiée", icon: <FaStar /> },
      { text: "Engagement éco‑responsable", icon: <FaSeedling /> },
      { text: "Équipe passionnée & pluridisciplinaire", icon: <FaUsers /> },
      { text: "Accompagnement sur mesure", icon: <FaHandsHelping /> },
      { text: "Confiance & Réputation", icon: <FaHeart /> }
    ],
    significations: [
      "Conception sur‑mesure : 3D, design, maquettes et validation client.",
      "Matériaux haut de gamme sélectionnés pour leur robustesse et durabilité.",
      "Utilisation de bois certifiés, peintures sans COV et solutions biosourcées.",
      "Organisation de A à Z : animation, sécurité, logistique et coordination.",
      "Solutions pour entreprises, institutions et collectivités.",
      "Pilotage rigoureux par un chef de projet expérimenté."
    ]
  };

  // Animation des messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(messageInterval);
  }, [messages.length]);

  // Animation des backgrounds
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, [backgroundImages.length]);

  return (
    <HeroSection>
      <BackgroundSlider>
        {backgroundImages.map((image, index) => (
          <BackgroundSlide
            key={index}
            $image={image}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentBg ? 0.9 : 0,
              transition: { duration: 1.5 }
            }}
          />
        ))}
      </BackgroundSlider>

      <AnimatedOverlay />
      <FloatingParticles>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </FloatingParticles>

      <ContentWrapper>
        <MainHeading
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Réinventons le loisir,&nbsp;
          <GradientText>l’événementiel et l’aménagement en Guinée</GradientText>
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
  onClick={() => navigate("/presentation")}
  onHoverStart={() => setIsHovering(true)}
  onHoverEnd={() => setIsHovering(false)}
  whileHover={{
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  }}
  whileTap={{ scale: 0.97 }}
  animate={{
    scale: isHovering ? 1.03 : 1,
    boxShadow: isHovering
      ? "0 15px 35px rgba(245, 179, 66, 0.4)"
      : "0 8px 25px rgba(0,0,0,0.2)",
  }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 15,
    duration: 0.3,
  }}
>
  Pourquoi nous ?
  <motion.span
    animate={{
      x: isHovering ? 8 : 0,
    }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 15,
    }}
  >
    <FaChevronRight />
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
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContainer
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
                delay: 0.1
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </CloseButton>

              <ModalContent>
                <ModalTitle>
                  Pourquoi collaborer avec <strong>MK Global Services GN</strong> ?
                </ModalTitle>

                <BenefitsGrid>
                  <BenefitCard
                    $isLeft={true}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <BenefitHeader>
                      <BenefitIcon $isLeft={true}>
                        <FaHandshake />
                      </BenefitIcon>
                      <BenefitTitle $isLeft={true}>Nos avantages</BenefitTitle>
                    </BenefitHeader>
                    <BenefitList>
                      {investBenefits.avantages.map((item, index) => (
                        <BenefitListItem
                          key={index}
                          $isLeft={true}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            type: "spring",
                            stiffness: 150,
                            damping: 12
                          }}
                        >
                          <div>
                            <strong>{item.text}</strong>
                          </div>
                        </BenefitListItem>
                      ))}
                    </BenefitList>
                  </BenefitCard>

                  <BenefitCard
                    $isLeft={false}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.25,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <BenefitHeader>
                      <BenefitIcon $isLeft={false}>
                        <FaChartLine />
                      </BenefitIcon>
                      <BenefitTitle $isLeft={false}>
                        Ce que vous gagnez
                      </BenefitTitle>
                    </BenefitHeader>
                    <BenefitList>
                      {investBenefits.significations.map((item, index) => (
                        <BenefitListItem
                          key={index}
                          $isLeft={false}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.35 + index * 0.1,
                            type: "spring",
                            stiffness: 150,
                            damping: 12
                          }}
                        >
                          <div>{item}</div>
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
  );
};

export default Accueilpourservice;
