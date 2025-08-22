import React, { useState, lazy, Suspense, memo } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Briefcase,
  Layers,
  Phone,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import Homemk from "./Homemk";

// -- Palette, navIcons et lazy-load comme dans ta base --
const navIcons = {
  "/": Home,
  "/presentation": Users,
  "/domaines": Layers,
  "/projets": Briefcase,
  "/contact": Phone,
};

// ---- ANIMATIONS ----
const glowLogo = keyframes`
  0%, 100% { filter: drop-shadow(0 0 0px ${colors.white}); }
  50% { filter: drop-shadow(0 4px 0px ${colors.secondary}cc); }
`;

const NavbarContainer = styled.nav`
  width: 100%;
  background: linear-gradient(
    90deg,
    ${colors.primar} 60%,
    ${colors.primary} 100%
  );
  color: ${colors.white};
  box-shadow: 0 2px 24px ${colors.primary}19;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  transition: box-shadow 0.3s;
`;

const NavContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0.6rem 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoBlock = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  img {
    height: 54px;
    margin-right: 6px;
    animation: ${glowLogo} 5.7s infinite;
    transition: filter 0.3s;
  }
  span {
    font-weight: 900;
    font-size: 1.5rem;
    color: ${colors.accentGold};
    letter-spacing: 2px;
    text-shadow: 0 2px 12px ${colors.primary}55;
    font-family: "Montserrat", Arial, sans-serif;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.3rem;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinkItem = styled.li``;

const StyledLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.07rem;
  font-weight: 600;
  text-decoration: none;
  padding: 9px 0;
  border-bottom: 0px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.23rem;
  position: relative;
  letter-spacing: 0.05em;
  transition: color 0.15s, border 0.18s, background 0.23s;
  border-radius: 2px;
  background: ${({ $active }) => ($active ? colors.accentGold + "18" : "none")};
  &:hover {
    color: ${colors.white};
    border-bottom: 2px solid ${colors.secondary};
    background: ${colors.accentGold + "13"};
  }
  &::after {
    content: "";
    display: ${({ $active }) => ($active ? "block" : "none")};
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2.5px;
    background: linear-gradient(
      90deg,
      ${colors.accentGold} 0%,
      ${colors.secondary} 100%
    );
    border-radius: 3px;
    transition: all 0.17s;
  }
`;

// --- Hamburger & Sidebar ---
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  font-size: 2rem;
  @media (max-width: 900px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? 0 : "-100%")};
  width: 260px;
  height: 100vh;
  background: linear-gradient(
    135deg,
    ${colors.primary} 30%,
    ${colors.accentTurquoise} 100%
  );
  box-shadow: -2px 0 16px ${colors.primary}22;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.1rem 1.5rem;
  transition: right 0.32s cubic-bezier(0.4, 2, 0.55, 0.67);
  z-index: 200;
  gap: 2.2rem;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${colors.white};
  font-size: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const SidebarLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.19rem;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 2px solid transparent;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  &:hover {
    color: ${colors.white};
    border-bottom: 2px solid ${colors.secondary};
    background: ${colors.accentGold}13;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.78);
  z-index: 150;
`;


// --------- Navbar Component ---------
const Navbard= memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/domaines", label: "Domaines d’intervention" },
    { to: "/presentation", label: "Apropos" },
    { to: "/projets", label: "Références" },
    { to: "/contact", label: "Contact" },
  ];

  // Animation shake (pour icon sur hover)
  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -5, 5, -2, 2, 0],
      transition: { duration: 0.32, ease: "easeInOut" },
    },
  };

  return (
    <>
      <NavbarContainer>
        <NavContent>
          <LogoBlock to="/">
            <img src="/logomkàvectextefondbleux.png" alt="MKGS Logo" />
          </LogoBlock>

          <NavLinks>
            {links.map((link) => {
              const Icon = navIcons[link.to] || Home;
              const isHovered = hoveredLink === link.to;
              const isActive = location.pathname === link.to;
              return (
                <NavLinkItem key={link.to}>
                  <StyledLink
                    to={link.to}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
                    $active={isActive}
                  >
                    <motion.span
                      style={{ display: "flex", alignItems: "center" }}
                      {...(isHovered ? shakeAnimation : { initial: { x: 0 } })}
                    >
                      <Icon size={19} />
                    </motion.span>
                    {link.label}
                  </StyledLink>
                </NavLinkItem>
              );
            })}
            {/* Slogan corporate pro (desktop only) 
            <MiniSlogan>
              <Award size={18} style={{ color: colors.accentGold, marginRight: 2 }} />
              +12 ans d’expertise | Espaces de vie, loisirs, innovation
            </MiniSlogan>*/}
          </NavLinks>

          <MenuButton
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </MenuButton>
        </NavContent>
      </NavbarContainer>

      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen}>
        <CloseButton
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={28} />
        </CloseButton>
        {links.map((link) => {
          const Icon = navIcons[link.to] || Home;
          return (
            <SidebarLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              style={{
                color: location.pathname === link.to ? colors.white : undefined,
              }}
            >
              <Icon size={20} style={{ marginRight: 6 }} />
              {link.label}
            </SidebarLink>
          );
        })}
      </Sidebar>

      <Suspense fallback={null}>
   
      </Suspense>
    </>
  );
});


export default Navbard;
