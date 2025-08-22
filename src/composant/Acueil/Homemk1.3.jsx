// src/components/Sections/VenueGridSection.jsx
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react"; // facultatif, tu peux enlever si pas installé
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* =============== Layout & Styles =============== */
const Section = styled.section`
  position: relative;
  background: ${colors.white};
  padding: 0.1rem 1rem 1rem;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.5rem;
  align-items: end;
  margin-bottom: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 0.4rem;
  }
`;

const BigIndex = styled.div`
  font-size: clamp(2.6rem, 6vw, 4.5rem);
  line-height: 0.9;
  font-weight: 900;
  color: ${colors.accentGold};
  opacity: 0.9;

     @media (max-width: 480px) {
    text-align: center;
  }
`;

const TitleBlock = styled.div`

`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  font-weight: 900;
  color: ${colors.primary};
   @media (max-width: 480px) {
    text-align: center;
      font-weight: 1000;
  }

`;

const Lead = styled(motion.p)`
  color: ${colors.black};
  opacity: 0.9;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.7;
  max-width: 1060px;
  margin: 0 auto;

   @media (max-width: 480px) {
    text-align: left;
    margin: 1rem 1.5rem;
   }
`;

/* Grid */
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.1rem 1rem 4rem;

  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.button)`
  position: relative;
  display: block;
  border: none;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: ${colors.lightGrey};
  box-shadow: 0 18px 36px rgba(0,0,0,0.06);
  transform: translateZ(0); /* pour un meilleur rendu GPU */

  &:focus-visible {
    outline: 3px solid ${colors.accentTurquoise};
    outline-offset: 2px;
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 190px;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.02) contrast(1.02);
  transform-origin: center;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 5%, rgba(0,0,0,0.05) 100%);
`;

const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.22) 40%, transparent 55%);
  transform: translateX(-120%);
`;

const Tag = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: .55rem .85rem;
  border-radius: 9px;
  background: rgba(255,255,255,0.4);
  color: ${colors.primary};
  font-weight: 800;
  font-size: 0.94rem;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
`;

const ZoomBadge = styled.div`
  position: absolute; top: 10px; right: 10px; z-index: 2;
  background: rgba(255,255,255,0.2);
  color: ${colors.primary};
  padding: .4rem .6rem;
  border-radius: 4px;
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .82rem; font-weight: 800;
  box-shadow: 0 8px 22px rgba(0,0,0,0.12);
`;

/* Lightbox */
const Overlay = styled(motion.div)`
  position: fixed; inset: 0; z-index: 1200;
  background: ${colors.darkOverlay};
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: min(94vw, 1200px);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0,0,0,0.4);
  background: ${colors.black};
`;

const Close = styled.button`
  position: absolute; top: 10px; right: 10px;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border: none; border-radius: 50%;
  background: rgba(255,255,255,0.8);
  color: ${colors.primary}; cursor: pointer;
  box-shadow: 0 12px 28px rgba(0,0,0,0.18);
  &:hover { background: ${colors.accentGold}; color: ${colors.primary}; }
`;

const ModalImg = styled(motion.img)`
  width: 100%; height: min(80vh, 760px);
  object-fit: cover; object-position: center;
  cursor: grab;
`;

const ModalCaption = styled.div`
  background: ${colors.white};
  padding: 1rem 1.2rem;
  color: ${colors.primary};
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem;
  font-weight: 700;
`;

/* =============== Données (adapte les images) =============== */
const fallback = (imagess && (imagess.plàinàirr || imagess.pàrkenfàntjoue)) || "/placeholder.jpg";

const venues = [
  { label: "Grands événements", img: imagess?.Pour_les_Family_day4 || fallback },
  { label: "amenagement_externe", img: imagess?.amenagement_exterieux3 || fallback },
  { label: "équipe pluridisciplinaire", img: imagess?.colon7_hobmqm || fallback },
  { label: "Bords de mer / fleuve", img: imagess?.amenagement_exterieux || fallback },
  { label: "Family days", img: imagess?.Pour_les_Family_day5 || fallback },
  { label: "Animations lumineuses", img: imagess?.coration_lumineuse_imge5 || fallback },
 ];

/* =============== Composant principal =============== */
const VenueGridSection = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);

  // gérer ESC pour fermer
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (index) => {
    setCurrent(index);
    setZoom(1);
    setOpen(true);
  };

  const toggleZoom = useCallback(() => setZoom((z) => (z === 1 ? 1.5 : 1)), []);

  return (
    <Section>
      <Container>
        <Header>
          <BigIndex>?</BigIndex>
          <TitleBlock>
            <Title>Le Lieu</Title>
            <Lead>
              Nous ne proposons pas seulement l’organisation : **MK Global Services GN**
              sélectionne et valorise les lieux qui correspondent à vos objectifs, en
              privilégiant des espaces sûrs, adaptés, et quand c’est possible,
              des solutions écoresponsables. De Conakry au littoral, notre réseau
              nous permet de trouver l’endroit idéal.
            </Lead>
          </TitleBlock>
        </Header>

        <Grid>
          {venues.map((v, i) => (
            <Card
              key={v.label}
              onClick={() => openModal(i)}
              whileHover={{ y: -4, boxShadow: "0 24px 46px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              aria-label={`Voir ${v.label} en grand`}
            >
              <CardImage
                src={v.img}
                alt={v.label}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.35 }}
              />
              <CardOverlay />
              <Shimmer as={motion.div} whileHover={{ x: "160%" }} transition={{ duration: 0.9 }} />
              <Tag>{v.label}</Tag>
              <ZoomBadge><ZoomIn size={16} /> Voir</ZoomBadge>
            </Card>
          ))}
        </Grid>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <Modal
              initial={{ scale: 0.96, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 18, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <Close onClick={() => setOpen(false)} aria-label="Fermer">
                <X size={22} />
              </Close>

              <ModalImg
                key={current}
                src={venues[current].img}
                alt={venues[current].label}
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                onDoubleClick={toggleZoom}
                drag={zoom > 1}
                dragConstraints={{ left: -220, right: 220, top: -220, bottom: 220 }}
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
                style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
              />

              <ModalCaption>
                <span>{venues[current].label}</span>
                <span style={{ fontWeight: 600, color: colors.accentTurquoise }}>
                  Double‑clic pour {zoom === 1 ? "zoomer" : "dézoomer"}
                </span>
              </ModalCaption>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default VenueGridSection;

//Homemkuntrois;
