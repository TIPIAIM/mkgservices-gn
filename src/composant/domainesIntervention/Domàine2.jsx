// src/components/Sections/PremiumServices.jsx
import styled from "styled-components";
import { FaBoxOpen, FaBullhorn, FaHandshake, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { imagess } from "../../assets/imagess";
import colors from "../../Styles/colors";

/* ===== WhatsApp utils ===== */
const WHATSAPP_NUMBER = "224622856693"; // format international sans +
const waMsg = (topic) =>
  `Bonjour, je viens du site MK Global Services GN. ${topic} Merci !`;
const waHref = (topic) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg(topic))}`;

const PremiumServices = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <ServicesContainer ref={ref}>
      <Header
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          NOS SERVICES COMPLÉMENTAIRES
        </motion.h1>

        <HeaderDecoration
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <Subtitle
          initial={{ y: 10, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Des solutions sur‑mesure pour amplifier votre présence marché
        </Subtitle>
      </Header>

      <ServicesGrid>
        {/* Service 1 */}
        <ServiceCard
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.secondary}>
            <FaBoxOpen size={24} />
          </ServiceIcon>

          <h2>Sourcing & Objets Personnalisés</h2>

          <ServiceHighlight $color={colors.secondary}>
            <p>
              Solution clé en main pour vos besoins en cadeaux d'affaires et merchandising
            </p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Approvisionnement sur mesure auprès de fournisseurs certifiés",
              "Personnalisation avancée (logo, couleurs corporate)",
              "Gestion logistique intégrée",
              "Création de kits premium pour événements",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je souhaite un devis pour le service Sourcing & Objets personnalisés.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour demander un devis"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Demander un devis
          </CtaLink>
        </ServiceCard>

        {/* Service 2 - Featured */}
        <ServiceCard
          $featured
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.accentGold}>
            <FaBullhorn size={24} />
          </ServiceIcon>

          <h2>Street Marketing & Activation Commerciale</h2>

          <ServiceHighlight $color={colors.accentGold}>
            <p>Stratégies terrain percutantes pour un impact immédiat</p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Équipes de promoteurs dynamiques et formés",
              "Conception d'animations sur‑mesure",
              "Couverture géographique stratégique",
              "Reporting digital avec KPI en temps réel",
              "Packages multi‑canal (physique + digital)",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je veux voir vos réalisations en Street Marketing & Activation commerciale.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour voir nos réalisations"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Voir nos réalisations
          </CtaLink>
        </ServiceCard>

        {/* Service 3 */}
        <ServiceCard
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.accentTurquoise}>
            <FaHandshake size={24} />
          </ServiceIcon>

          <h2>Courtage & Négoce International</h2>

          <ServiceHighlight $color={colors.accentTurquoise}>
            <p>Votre passerelle pour investir en Guinée en toute sérénité</p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Accompagnement juridique et administratif",
              "Réseau de partenaires locaux fiables",
              "Négociation sur mesure avec les autorités",
              "Études de marché sectorielles",
              "Solutions de financement adaptées",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je souhaite planifier un conseil pour le Courtage & Négoce international.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour planifier un conseil"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Planifier un conseil
          </CtaLink>
        </ServiceCard>
      </ServicesGrid>

      <Footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Signature>
          <span>Conçu avec passion par</span>
          <Logo
            src={imagess?.amenagement_exterieux0}
            alt="MKGS"
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.6 }}
          />
        </Signature>        
        <ContactPromo>
          <FaPhoneAlt size={14} />
          <span>Un projet ? Contactez nos experts </span>
          {/* Lien WhatsApp direct + affichage numéro */}
          <a
            href={waHref("Je souhaite échanger avec un expert MKGS.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire à MKGS sur WhatsApp"
          >
            <FaWhatsapp style={{ marginRight: 6 }} />
            +224 622 856 693
          </a>
        </ContactPromo>
      </Footer>
    </ServicesContainer>
  );
};

/* ===================== Styled Components ===================== */
const ServicesContainer = styled(motion.div)`
  --primary-color: ${colors.primary};
  --secondary-color: ${colors.secondary};
  --accent-color: ${colors.accentTurquoise};
  --featured-color: ${colors.accentGold};
  --text-color: ${colors.black};
  --light-bg: ${colors.lightGrey};
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);

  font-family: "Montserrat", sans-serif;
  max-width: 1280px;
  margin: 2rem auto;
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%);
  box-shadow: var(--card-shadow);
  border-radius: 1px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, ${colors.secondary}0d 0%, transparent 70%);
    z-index: -1;
  }

  @media (max-width: 900px) {
    padding: 3rem 1.25rem;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    border-radius: 10px;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: clamp(1.6rem, 3.4vw, 2.4rem);
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 480px) {
    margin-bottom: 2.2rem;
    h1 {
      font-size: 1.15rem;
      letter-spacing: 1px;
    }
  }
`;

const HeaderDecoration = styled(motion.div)`
  width: 120px;
  height: 4px;
  background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
  margin: 0 auto 2rem;
  border-radius: 4px;
  transform-origin: left center;

  @media (max-width: 480px) {
    width: 90px;
    height: 3px;
    margin-bottom: 1.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: ${colors.darkText};
  font-size: clamp(0.98rem, 1.8vw, 1.15rem);
  max-width: 850px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 400;

  @media (max-width: 480px) {
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.2rem;
  margin-bottom: 3.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const ServiceCard = styled(motion.div)`
  border-radius: 2px;
  padding: 2.2rem;
  background: ${colors.white};
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  border-top: 4px solid ${(p) => (p.$featured ? "var(--featured-color)" : "transparent")};
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: var(--hover-shadow);
    &::after {
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.45rem;
    color: var(--primary-color);
    margin-bottom: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    padding: 1.4rem;
    border-radius: 10px;
    h2 {
      font-size: 1.15rem;
      margin-bottom: 0.9rem;
    }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: ${(p) => `${p.$color}10`};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${(p) => p.$color};
  font-size: 1.75rem;
  transition: transform 0.3s ease;

  ${ServiceCard}:hover & {
    transform: rotate(10deg) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    margin-bottom: 1rem;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ServiceHighlight = styled.div`
  background: var(--light-bg);
  padding: 1.05rem 1.15rem;
  border-left: 4px solid var(--secondary-color);
  margin-bottom: 1.5rem;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: ${(p) => `${p.$color}08`};
    border-left-color: ${(p) => p.$color};
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-style: italic;
    font-size: 0.98rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 1rem;
    p {
      font-size: 0.95rem;
    }
  }
`;

const BenefitsList = styled.ul`
  margin: 1.6rem 0 0.2rem;
  padding-left: 0;
  display: grid;
  gap: 0.7rem;

  li {
    color: var(--text-color);
    position: relative;
    list-style-type: none;
    padding-left: 1.6rem;
    line-height: 1.6;
    font-size: 0.98rem;

    &::before {
      content: "✓";
      color: var(--accent-color);
      position: absolute;
      left: 0;
      font-weight: 800;
      font-size: 1.05rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.55rem;
    li {
      font-size: 0.95rem;
      padding-left: 1.4rem;
    }
  }
`;

/* motion.a pour lien WhatsApp */
const CtaLink = styled(motion.a)`
  background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
  color: ${colors.white};
  border: none;
  padding: 0.95rem 1.4rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1.4rem;
  text-transform: uppercase;
  font-size: 0.92rem;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, var(--accent-color), var(--secondary-color));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    border-radius: 8px;
    font-size: 0.88rem;
    padding: 0.85rem 1.1rem;
  }
`;

const Footer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.2rem;
  }
  @media (max-width: 480px) {
    padding-top: 1.5rem;
  }
`;
const Signature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: ${colors.darkText};
  font-size: 0.95rem;
`;
const Logo = styled(motion.img)`
  height: 26px;
  @media (max-width: 480px) {
    height: 22px;
  }
`;
const ContactPromo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${colors.darkText};

  a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.25s ease;
    display: inline-flex;
    align-items: center;
  }
  a:hover {
    color: var(--accent-color);
  }
  svg {
    color: var(--accent-color);
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default PremiumServices;
