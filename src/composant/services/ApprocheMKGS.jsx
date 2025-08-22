import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import colors from "../../Styles/colors";
import { 
  Briefcase,
  Users,
  Award,
  Handshake,
  ChevronDown, 
  ChevronUp
} from "lucide-react";

// Import des logos clients (à adapter selon votre structure de fichiers)
import enabelLogo from "../../assets/logos/enabel.png";
import gpcLogo from "../../assets/logos/gpc.png";
import orangeLogo from "../../assets/logos/orange.png";
import sobraguiLogo from "../../assets/logos/càuris.png";
import shelfistek from "../../assets/logos/shelfistek.png";

import essor from "../../assets/logos/essor.png";
import màgicpàrk from "../../assets/logos/màgicpàrk.png";
import officetourime from "../../assets/logos/officetourime.png";
import àlione from "../../assets/logos/àlione.png";
import pàlàbresconsulting from "../../assets/logos/pàlàbresconsulting.PNG";


const ClientsTrust = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-15% 0px" });

  const servicesItems = useMemo(() => [
    {
      icon: <Briefcase size={20} />,
      title: "Pilotage rigoureux",
      content: "Gestion méticuleuse à chaque étape de vos projets pour garantir leur succès."
    },
    {
      icon: <Users size={20} />,
      title: "Équipe pluridisciplinaire",
      content: "Des experts passionnés dans divers domaines pour répondre à tous vos besoins."
    },
    {
      icon: <Award size={20} />,
      title: "Approche sur-mesure",
      content: "Solutions innovantes alliant performance et efficacité pour des résultats exceptionnels."
    }
  ], []);

  const clients = useMemo(() => [
    { 
      name: "Enabel", 
      logo: enabelLogo,
      alt: "Logo Enabel"
    },
    { 
      name: "GPC", 
      logo: gpcLogo,
      alt: "Logo GPC"
    },
    { 
      name: "Orange", 
      logo: orangeLogo,
      alt: "Logo Orange"
    },
    { 
      name: "Cauris", 
      logo: sobraguiLogo,
      alt: "Logo càuris"
    },
    { 
      name: "Shelfi stek", 
      logo: shelfistek,
      alt: "Logo Gavalan"
    },
 

    { 
      name: "Essor", 
      logo: essor,
      alt: "Logo SOBRAGUI"
    },
    { 
      name: "Essor", 
      logo: màgicpàrk,
      alt: "Logo SOBRAGUI"
    },
    { 
      name: "Office tourime", 
      logo: officetourime,
      alt: "Logo SOBRAGUI"
    },
    { 
      name: "Palabres consulting", 
      logo: pàlàbresconsulting,
      alt: "Logo SOBRAGUI"
    },
    { 
      name: " All in one", 
      logo: àlione,
      alt: "Logo SOBRAGUI"
    },

  ], []);

  return (
    <TrustContainer 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <ContentWrapper>
        <Header
          variants={headerVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Title>
            Ils nous font confiance
            <motion.span
              className="barre-animation"
              initial={{ width: 0 }}
              animate={{ width: 86 }}
              transition={{ duration: 0.85, delay: 0.1, type: "spring" }}
            />
          </Title>
          <ToggleButton 
            aria-label={isExpanded ? "Réduire" : "Développer"}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </ToggleButton>
        </Header>

        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <IntroText>
              Nous avons eu l'honneur de collaborer avec plusieurs institutions et entreprises pour :
              <ul>
                <li>Des projets d'aménagement</li>
                <li>La mise en scène d'événements</li>
                <li>Des animations de grande envergure</li>
              </ul>
            </IntroText>

            <ServicesGrid>
              {servicesItems.map((item, index) => (
                <ServiceItem
                  key={`service-item-${index}`}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <TireeAnim
                    as={motion.div}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.55 + index * 0.1, delay: 0.25 + index * 0.1, ease: "easeOut" }}
                  />
                  <ItemHeader>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemHeader>
                  <ItemContent>{item.content}</ItemContent>
                </ServiceItem>
              ))}
            </ServicesGrid>

            <ClientsSection variants={indicatorsVariants}>
              <ClientsTitle>
                <Handshake size={20} />
                Quelques-uns de nos clients
              </ClientsTitle>
              <ClientsGrid>
                {clients.map((client, index) => (
                  <ClientLogo
                    key={`client-${index}`}
                    variants={indicatorVariants}
                    custom={index}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                    }}
                  >
                    <ClientLogoImage 
                      src={client.logo} 
                      alt={client.alt}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <ClientName>{client.name}</ClientName>
                  </ClientLogo>
                ))}
              </ClientsGrid>
            </ClientsSection>

            <CTA>
              <CTAText>Faites confiance à notre savoir-faire</CTAText>
             
            </CTA>

            <Socials>
              <SocialDot color={colors.primary}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.black}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.accentGold}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
            </Socials>
          </motion.div>
        )}
      </ContentWrapper>
    </TrustContainer>
  );
};

// ================= VARIANTS =================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.8 }
  }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" }
  }
};

const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 50,
    x: i % 2 === 0 ? -30 : 30
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  })
};

const indicatorsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.6 }
  }
};

const indicatorVariants = {
  hidden: (i) => ({
    opacity: 0,
    scale: 0.8,
    y: 20
  }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  })
};

// ================= STYLES =================
const TrustContainer = styled(motion.section)`
  --bg-color: ${colors.primary};
  --gold: ${colors.accentGold};
  --primary: ${colors.primar};
  --text-color: ${colors.white};
  --gold-light:  ${colors.primary};

  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  cursor: pointer;
  will-change: transform;
`;

const Title = styled.h2`
  font-size: clamp(2.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: ${colors.white};
  margin: 0;
  position: relative;
  padding-bottom: 1.1rem;
  line-height: 1.2;

  .barre-animation {
    display: block;
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 5px;
    background: linear-gradient(90deg, ${colors.accentGold} 20%, transparent 100%);
    border-radius: 2px;
    z-index: 2;
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1.1rem 1rem;
  }
`;

const ToggleButton = styled(motion.button)`
  background: ${colors.white}60;
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform;
  
  &:hover {
    background: rgba(200, 170, 110, 0.2);
  }
`;

const IntroText = styled.div`
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 500;
  
  line-height: 1.7;
  margin-bottom: 2.5rem;
  padding: 0 1rem;

  ul {
    margin-top: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
    max-width: 80%;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  will-change: transform;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const TireeAnim = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 20px;
  background: linear-gradient(
    120deg,
    ${colors.primary} 50%,
    ${colors.light} 50%
  );
  border-radius: 1px;
  z-index: 2;
`;

const ServiceItem = styled(motion.div)`
  position: relative;
  background: ${colors.lightGrey};
  border-radius: 200px 0px 0px 0px;
  padding: 1.8rem 1.2rem 1.8rem 2.2rem;
  min-height: 175px;
  border-left: none;
  transition: all 0.3s ease;
  height: 100%;
  will-change: transform;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const ItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${colors.primar};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.2rem;
  flex-shrink: 0;

  svg {
    color: ${colors.accentGold};
;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary);
  margin: 0;
  font-weight: 800;
`;

const ItemContent = styled.p`
  color: var(--primary);
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.7;
  margin: 0;
`;

const ClientsSection = styled(motion.div)`
  border-radius: 8px;
  padding: 2rem 0;
  text-align: center;
  will-change: transform;
  
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const ClientsTitle = styled.h4`
  font-size: 1.4rem;
  color: var(--text-color);
  font-weight: 800;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
  will-change: transform;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const ClientLogo = styled(motion.div)`
  background: ${colors.primary};
  padding: 1.5rem 1rem;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  will-change: transform;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid ${colors.primary}20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    background: ${colors.lightGrey};
    
    img {
      transform: scale(1.1);
    }
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.accentGold});
  }
`;

const ClientLogoImage = styled.img`
  max-width: 80%;
  max-height: 50px;
  margin-bottom: 1rem;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const ClientName = styled.span`
  display: none;
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.primary};

  ${ClientLogo}:hover & {
    display: block;
  }
`;

const CTA = styled.div`
  text-align: center;
  margin: 3rem 0;
`;

const CTAText = styled.p`
  font-size: 1.3rem;
  color: ${colors.primary};
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, ${colors.primary}, ${colors.accentGold});
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
`;

const Socials = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const SocialDot = styled.span`
  color: ${({ color }) => color || colors.primary};
  font-size: 18px;
  display: inline-block;
`;

export default React.memo(ClientsTrust);