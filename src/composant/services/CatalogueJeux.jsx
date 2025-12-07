// Intégration locale du catalogue « Location Jeux & Attractions »
// Ce fichier est prêt à être collé dans ton composant Lesservices.jsx
// Je l'intègre PROPREMENT, SANS Cloudinary, en utilisant des assets locaux.

// NOTE : Place tes fichiers PDF ou images dans /public/catalogues/jeux/
// Exemple : /public/catalogues/jeux/catalogue-jeux.pdf
// Ils seront accessibles via :
//   href="/catalogues/jeux/catalogue-jeux.pdf"
// Ce composant ajoute un bloc premium dans la section.

import React from "react";
import styled from "styled-components";
import { Download, BookOpen } from "lucide-react";
import colors from "../../Styles/colors";

/* =================== Styles =================== */
const CatalogueBlock = styled.div`
  margin: 2.5rem auto;
  padding: 2rem;
  border-radius: 18px;
  background: linear-gradient(135deg, ${colors.white}dd, ${colors.lightGrey});
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.primary}15;
  max-width: 960px;
  text-align: center;
`;

const CatTitle = styled.h3`
  font-size: 1.9rem;
  font-weight: 900;
  margin: 0;
  color: ${colors.primary};
`;

const CatDescription = styled.p`
  margin-top: 0.6rem;
  font-size: 1.1rem;
  color: ${colors.black};
  opacity: 0.9;
  line-height: 1.65;
`;

const CatButtons = styled.div`
  margin-top: 1.4rem;
  display: flex;
  justify-content: center;
  gap: 1.1rem;
  flex-wrap: wrap;
`;

const CatBtn = styled.a`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: 0.25s ease;

  &:hover {
    background: ${colors.accentGold};
    transform: translateY(-2px);
  }
`;

/* =================== Bloc catalogue =================== */
export default function CatalogueJeux() {
  return (
    <CatalogueBlock>
      <CatTitle>Catalogue – Location Jeux & Attractions</CatTitle>
      <CatDescription>
        Découvrez notre sélection professionnelle de jeux, attractions, activités
        ludiques et installations événementielles. Cliquez et téléchargez
        directement le catalogue complet.
      </CatDescription>

      <CatButtons>
        <CatBtn
          href="/catalogues/jeux/catalogue-jeux.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} /> Télécharger le PDF
        </CatBtn>

        <CatBtn
          href="/catalogues/jeux/catalogue-jeux.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: colors.secondary }}
        >
          <BookOpen size={18} /> Ouvrir en ligne
        </CatBtn>
      </CatButtons>
    </CatalogueBlock>
  );
}
