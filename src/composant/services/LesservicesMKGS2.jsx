// src/components/Sections/Lesservices.jsx
// Composant principal : garde TON style, ajoute :
// - liste de catégories “pro” + barre de recherche
// - 3 lignes max par catégorie + bouton “voir plus / réduire”
// - messages : “Catégorie inexistante” et “catégorie en maintenance”
// - optimisation Cloudinary (f=auto, q=auto) + srcSet (DPR 1x/2x)
// - modal en object-fit: contain (voir l’image en entier)
//
// NB: On ne touche pas à ta palette ni à tes animations existantes.

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  X,
  Info,
  MapPin,
  Building2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Search,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import colors from "../../Styles/colors";
import { VENUES, FILTERS as RAW_FILTERS } from "./venuesSemyg";

/* =================== Animations =================== */
const shimmer = keyframes`
  0% { transform: translateX(-120%) }
  100% { transform: translateX(160%) }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* =================== Base layout =================== */
const Section = styled.section`
  position: relative;
  background: linear-gradient(
    180deg,
    ${colors.lightGrey} 0%,
    ${colors.lightGrey} 46%,
    ${colors.white} 46.01%,
    ${colors.white} 100%
  );

  padding: clamp(3rem, 5vw, 4.5rem) 1rem clamp(4rem, 6vw, 5rem);
  overflow: hidden;
  isolation: isolate;

  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    inset: -42% -8% auto -8%;
    height: 52%;
    background: radial-gradient(
        640px 260px at 18% 28%,
        ${colors.accentGold}22,
        transparent 65%
      ),
      radial-gradient(
        560px 240px at 88% 8%,
        ${colors.accentTurquoise}17,
        transparent 60%
      );
  }

  &::after {
    inset: auto -10% -30% -10%;
    height: 48%;
    background: radial-gradient(
        560px 220px at 12% 72%,
        ${colors.secondary}10,
        transparent 70%
      ),
      radial-gradient(
        520px 220px at 92% 82%,
        ${colors.primary}0d,
        transparent 70%
      );
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.2rem;
  }

  @media (max-width: 900px) {
    padding: 2.5rem 2.2rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* =================== Header =================== */
const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem 1.6rem;
  align-items: end;
  margin-bottom: 2.2rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const BigIndex = styled.div`
  font-size: clamp(2.8rem, 6.4vw, 4.8rem);
  line-height: 0.9;
  font-weight: 900;
  color: ${colors.accentGold};
  text-shadow: 0 6px 18px ${colors.accentGold}33;
`;

const TitleWrap = styled.div`
  text-align: center;
  color: ${colors.primar};
`;

const Overline = styled.p`
  margin: 0 0 0.35rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${colors.primar};
  font-weight: 900;
  font-size: 1.42rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.6rem, 3.6vw, 2.15rem);
  font-weight: 900;
  color: ${colors.primary};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }
`;

const Lead = styled.p`
  margin: 0.55rem 0 0;
  color: ${colors.black};
  opacity: 0.92;
  max-width: 880px;
  line-height: 1.75;
  font-size: clamp(0.98rem, 1.7vw, 1.05rem);
  margin-left: auto;
  margin-right: auto;
`;

/* =================== Filters + Search =================== */
const FiltersWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  margin: 1.2rem 0 1.6rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${colors.primar}12;
  background: ${colors.white};
  border-radius: 999px;
  padding: 0.55rem 0.85rem;
  max-width: 520px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.98rem;
  color: ${colors.primary};
  background: transparent;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
`;

const Chip = styled(motion.button)`
  border: 1px solid ${colors.primar}12;
  background: ${({ $active }) =>
    $active ? `${colors.accentGold}1f` : `${colors.white}`};
  color: ${colors.primary};
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background: ${colors.accentGold}2b;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 480px) {
    font-size: 0.88rem;
    padding: 0.5rem 0.75rem;
  }
`;

const EmptyStrip = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.primary};
  font-weight: 800;
  padding: 0.6rem 0.8rem;
`;

/* =================== Grid / Card =================== */
const Grid = styled.div`
  display: grid;
  gap: 1.05rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
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
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.06);
  aspect-ratio: 4/3;
  transition: all 0.3s ease;

  &:focus-visible {
    outline: 3px solid ${colors.accentTurquoise};
    outline-offset: 2px;
  }

  &:hover {
    box-shadow: 0 24px 46px rgba(0, 0, 0, 0.12);
  }
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* carte = cover pour occuper toute la carte */
  object-position: center;
  transition: transform 0.35s ease;
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 35%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

const Shine = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 25%,
    rgba(255, 255, 255, 0.24) 42%,
    transparent 60%
  );
  transform: translateX(-120%);
  animation: ${shimmer} 1.3s ease both;
  opacity: 0;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  z-index: 2;
  color: white;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardType = styled.span`
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 0.3rem;
  display: block;
`;

const ActionButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  color: ${colors.primary};
  padding: 0.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.accentGold};
    transform: scale(1.1);
  }
`;

/* ===== Show More button ===== */
const ShowMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
`;

const ShowMoreBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${colors.primar}22;
  background: ${colors.white};
  color: ${colors.primary};
  font-weight: 800;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.accentGold}22;
  }
`;

/* =================== Lightbox =================== */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: ${colors.overlayAlpha};
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: min(96vw, 1100px);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
  background: ${colors.black};
`;

const ModalControls = styled.div`
  position: absolute;
  top: 80px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const ControlButton = styled.button`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: ${colors.primary};
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.accentGold};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ModalImg = styled(motion.img)`
  width: 100%;
  height: min(76vh, 720px);
  object-fit: contain; /* modal = contain pour voir TOUTE l’image */
  object-position: center;
  cursor: ${({ $zoom }) => ($zoom > 1 ? "grab" : "zoom-in")};
`;

const ModalFooter = styled.div`
  background: ${colors.white};
  padding: 0.85rem 1.2rem;
  color: ${colors.primary};
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const ModalTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ZoomHint = styled.div`
  color: ${colors.accentTurquoise};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 2;
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.accentGold};
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* =================== Info Panel =================== */
const InfoPanel = styled(motion.div)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1210;
  width: min(92vw, 420px);
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  border: 1px solid ${colors.primary}10;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 480px) {
    right: 12px;
    bottom: 12px;
    border-radius: 12px;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  background: ${colors.accentGold}18;
  font-weight: 900;
  color: ${colors.primary};
`;

const InfoBody = styled.div`
  padding: 1rem 1rem 1.1rem;
  color: ${colors.black};
  line-height: 1.65;
  font-size: 0.98rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const InfoFooter = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  color: ${colors.white};
  background: linear-gradient(
    135deg,
    ${colors.accentGold} 55%,
    ${colors.secondary} 100%
  );
  box-shadow: 0 12px 26px ${colors.accentGold}44;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px ${colors.accentGold}66;
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  margin-left: auto;
  font-weight: 800;
  background: transparent;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGrey};
  }
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:first-child {
    background: ${colors.primary};
    color: white;
  }

  &:last-child {
    background: #25d366;
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

/* =================== Helpers =================== */
// Ajoute f=auto & q=auto:good pour Cloudinary et génère un srcSet pour dpr 1/2
const cld = (url, width = 1200) => {
  if (!url) return url;
  const join = url.includes("?") ? "&" : "?";
  const optimized = `${url}${join}f=auto&q=auto:good`;
  return {
    src: optimized,
    srcSet: `${optimized}&dpr=1 ${width}w, ${optimized}&dpr=2 ${width * 2}w`,
  };
};

// Observe le nombre de colonnes pour limiter à 3 lignes (UX souhaitée)
const useColumns = (ref) => {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const min = w <= 900 ? 240 : 280; // cohérent avec le CSS minmax
        const c = Math.max(1, Math.floor(w / (min + 16))); // 16 ~ gap
        setCols(c);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return cols;
};

/* =================== Data =================== */
const whatsappNumber = "+224625494848";

/* =================== Component =================== */
const Lesservices = () => {
  const [filter, setFilter] = useState(
    "Décoration Lumineuses Exterieures & interieures"
  );
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [infoIdx, setInfoIdx] = useState(null);
  const [expanded, setExpanded] = useState(false); // “voir plus / réduire”

  const gridRef = useRef(null);
  const columns = useColumns(gridRef);
  const maxRows = 3;

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setInfoIdx(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Recherche dans la liste des catégories (pas dans les cartes)
  const FILTERS = useMemo(() => {
    if (!search.trim()) return RAW_FILTERS;
    const q = search.toLowerCase();
    const list = RAW_FILTERS.filter((f) => f.toLowerCase().includes(q));
    return list;
  }, [search]);

  const hasFilterMatch = FILTERS.length > 0;

  // Jeux de données par catégorie
  const categoryData = useMemo(
    () => VENUES.filter((v) => v.type === filter),
    [filter]
  );

  // “Maintenance” si la catégorie existe mais aucune image
  const isMaintenance = hasFilterMatch && categoryData.length === 0;

  // Limiteur à 3 lignes (calculé selon colonnes observées)
  const visibleCount = expanded
    ? categoryData.length
    : Math.min(categoryData.length, columns * maxRows);
  const data = categoryData.slice(0, visibleCount);

  const openModal = (index) => {
    setCurrent(index);
    setZoom(1);
    setOpen(true);
  };

  const navigateImage = (direction) => {
    setCurrent((prev) => {
      if (direction === "prev") {
        return prev === 0 ? data.length - 1 : prev - 1;
      } else {
        return prev === data.length - 1 ? 0 : prev + 1;
      }
    });
    setZoom(1);
  };

  const toggleZoom = useCallback(() => setZoom((z) => (z === 1 ? 1.5 : 1)), []);

  // Reset “voir plus” quand on change de catégorie ou la recherche
  useEffect(() => {
    setExpanded(false);
  }, [filter, search]);

  return (
    <Section>
      <Container>
        {/* Header */}
        <Header
          as={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BigIndex>§</BigIndex>
          <TitleWrap>
            <Overline>Nos services événementiels</Overline>
            <Title>Des prestations sur mesure pour chaque événement</Title>
            <Lead>
            Décoration complet d'espaces, en passant par l'organisation de
              colonies de vacances et de Family Days, nous proposons une gamme
              complète de services pour faire de votre événement un succès.
              Notre équipe expérimentée assure un accompagnement personnalisé et
              une exécution impeccable.
            </Lead>

            {/* Recherche + Catégories */}
            <FiltersWrap>
              <SearchBar>
                <Search size={18} color={colors.primary} />
                <SearchInput
                  type="text"
                  placeholder="Rechercher une catégorie…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </SearchBar>

              <Filters>
                {!hasFilterMatch && (
                  <EmptyStrip>Catégorie inexistante.</EmptyStrip>
                )}
                {hasFilterMatch &&
                  FILTERS.map((f) => (
                    <Chip
                      key={f}
                      $active={filter === f}
                      onClick={() => setFilter(f)}
                      whileTap={{ scale: 0.97 }}
                    >
                      {f}
                    </Chip>
                  ))}
              </Filters>
            </FiltersWrap>
          </TitleWrap>
        </Header>

        {/* Etats : maintenance / data */}
        {isMaintenance ? (
          <EmptyStrip>⚠️ Cette catégorie est en maintenance.</EmptyStrip>
        ) : (
          <>
            {/* Grid */}
            <Grid ref={gridRef}>
              {data.map((v, i) => {
                const img = cld(v.img, 1000);
                return (
                  <Card
                    key={`${v.label}-${i}`}
                    onClick={() => openModal(i)}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    aria-label={`Voir ${v.label} en grand`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setInfoIdx(i);
                    }}
                  >
                    <Img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes="(max-width:540px) 100vw, (max-width:900px) 50vw, 33vw"
                      alt={v.label}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.35 }}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                    />
                    <Shade />
                    <Shine />
                    <CardContent>
                      <CardTitle>
                        <Building2 size={16} />
                        {v.label}
                      </CardTitle>
                      <CardType>{v.type}</CardType>
                    </CardContent>
                    <ActionButton aria-label="Voir en détail">
                      <ZoomIn size={18} />
                    </ActionButton>
                  </Card>
                );
              })}
            </Grid>

            {/* Voir plus / Réduire (si besoin) */}
            {categoryData.length > columns * maxRows && (
              <ShowMoreWrap>
                <ShowMoreBtn onClick={() => setExpanded((s) => !s)}>
                  {expanded ? (
                    <>
                      <ChevronsUp size={18} />
                      Réduire l’affichage
                    </>
                  ) : (
                    <>
                      <ChevronsDown size={18} />
                      Voir la suite ({categoryData.length - columns * maxRows})
                    </>
                  )}
                </ShowMoreBtn>
              </ShowMoreWrap>
            )}
          </>
        )}
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
              <ModalControls>
                <ControlButton
                  onClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
                  aria-label={zoom === 1 ? "Zoomer" : "Dézoomer"}
                >
                  {zoom === 1 ? (
                    <Maximize2 size={20} />
                  ) : (
                    <Minimize2 size={20} />
                  )}
                </ControlButton>
                <ControlButton
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                >
                  <X size={20} />
                </ControlButton>
              </ModalControls>

              <NavigationButtons>
                <NavButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={24} />
                </NavButton>
                <NavButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  aria-label="Image suivante"
                >
                  <ChevronRight size={24} />
                </NavButton>
              </NavigationButtons>

              {data[current] && (
                <ModalImg
                  key={current}
                  src={cld(data[current].img, 1600).src}
                  srcSet={cld(data[current].img, 1600).srcSet}
                  sizes="100vw"
                  alt={data[current].label}
                  animate={{ scale: zoom }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  onDoubleClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
                  drag={zoom > 1}
                  dragConstraints={{
                    left: -220,
                    right: 220,
                    top: -220,
                    bottom: 220,
                  }}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                  $zoom={zoom}
                />
              )}

              <ModalFooter>
                <ModalTitle>
                  <MapPin size={16} />
                  {data[current]?.label}
                </ModalTitle>
                <ZoomHint>
                  {zoom === 1 ? (
                    <>
                      <Maximize2 size={16} />
                      Double-clic pour zoomer
                    </>
                  ) : (
                    <>
                      <Minimize2 size={16} />
                      Double-clic pour dézoomer
                    </>
                  )}
                </ZoomHint>
              </ModalFooter>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>

      {/* Info Panel (clic droit) */}
      <AnimatePresence>
        {infoIdx !== null && data[infoIdx] && (
          <InfoPanel
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <InfoHeader>
              <Info size={18} />
              Détails — {data[infoIdx].label}
            </InfoHeader>
            <InfoBody>
              <p>{data[infoIdx].description}</p>
              <p>
                Idéal pour : inaugurations, team building, showrooms, soirées
                VIP.
              </p>
              <p>
                Gestion technique complète (sécurité, logistique,
                autorisations).
              </p>
              <p>
                Options durables disponibles (décors réutilisables, éclairage
                LED).
              </p>

              <ContactButtons>
                <ContactButton href={`tel:${whatsappNumber}`}>
                  Appeler
                </ContactButton>
                <ContactButton
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                >
                  WhatsApp
                </ContactButton>
              </ContactButtons>
            </InfoBody>
            <InfoFooter>
              <CTAButton
                href="/contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Demander un devis
              </CTAButton>
              <SecondaryButton onClick={() => setInfoIdx(null)}>
                Fermer
              </SecondaryButton>
            </InfoFooter>
          </InfoPanel>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Lesservices;
