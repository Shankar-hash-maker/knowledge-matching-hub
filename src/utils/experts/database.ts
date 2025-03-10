
import { Expert } from './types';

// Simulated database of experts
let expertsDatabase: Expert[] = [
  {
    id: "1",
    name: "Dr. Marie Laurent",
    title: "Expert en droit des affaires",
    description: "Spécialiste en droit des affaires avec 15 ans d'expérience dans les fusions et acquisitions et le droit des sociétés.",
    location: "Paris, France",
    email: "m.laurent@expert.fr",
    phone: "01 23 45 67 89",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialties: ["Fusions & Acquisitions", "Droit des sociétés", "Contrats commerciaux"],
    expertiseLevel: "Senior Expert",
    availability: "Disponible sous 48h"
  },
  {
    id: "2",
    name: "Jean Dubois",
    title: "Expert comptable judiciaire",
    description: "Expert comptable spécialisé dans les litiges financiers et l'analyse forensique des données comptables.",
    location: "Lyon, France",
    email: "j.dubois@expert.fr",
    phone: "04 78 45 67 89",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    specialties: ["Comptabilité judiciaire", "Analyse financière", "Fraude fiscale"],
    expertiseLevel: "Expert certifié",
    availability: "Disponible"
  },
  {
    id: "3",
    name: "Dr. Sophie Moreau",
    title: "Expert en propriété intellectuelle",
    description: "Docteur en droit spécialisée dans la protection de la propriété intellectuelle et le droit des brevets.",
    location: "Marseille, France",
    email: "s.moreau@expert.fr",
    phone: "04 91 23 45 67",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    specialties: ["Brevets", "Marques", "Droits d'auteur", "Contentieux IP"],
    expertiseLevel: "Expert confirmé",
    availability: "Disponible sous 24h"
  },
  {
    id: "4",
    name: "Alexandre Martin",
    title: "Expert en cybersécurité",
    description: "Expert technique spécialisé dans la forensique numérique et la sécurité des systèmes d'information.",
    location: "Toulouse, France",
    email: "a.martin@expert.fr",
    phone: "05 61 23 45 67",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialties: ["Forensique numérique", "Sécurité informatique", "Données personnelles"],
    expertiseLevel: "Expert technique",
    availability: "Disponible"
  },
  {
    id: "5",
    name: "Isabelle Bernard",
    title: "Expert médical juridique",
    description: "Médecin légiste spécialisée dans l'expertise médicale judiciaire et l'évaluation des préjudices corporels.",
    location: "Lille, France",
    email: "i.bernard@expert.fr",
    phone: "03 20 45 67 89",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    specialties: ["Préjudice corporel", "Responsabilité médicale", "Expertise médico-légale"],
    expertiseLevel: "Expert judiciaire",
    availability: "Disponible sur rendez-vous"
  }
];

// Store original experts for reset
const originalExperts = [...expertsDatabase];

/**
 * Get expert by ID
 */
export const getExpertById = async (id: string): Promise<Expert | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return expertsDatabase.find(expert => expert.id === id);
};

/**
 * Import experts from a PDF file
 */
export const importExpertsFromPDF = async (pdfFile: File): Promise<void> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Processing PDF database:", pdfFile.name);
  
  // Since we can't actually read PDFs in this demo,
  // we'll simulate adding new experts to the database
  const newExperts: Expert[] = [
    {
      id: "6",
      name: "Philippe Durand",
      title: "Expert judiciaire bâtiment",
      description: "Expert en pathologie du bâtiment spécialisé dans les litiges de construction et les sinistres immobiliers.",
      location: "Bordeaux, France",
      email: "p.durand@expert.fr",
      phone: "05 56 12 34 56",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      specialties: ["Pathologie du bâtiment", "Sinistres", "Construction"],
      expertiseLevel: "Expert judiciaire",
      availability: "Disponible sous 72h"
    },
    {
      id: "7",
      name: "Dr. Claire Petit",
      title: "Expert en marchés financiers",
      description: "Docteur en économie spécialisée dans l'analyse des produits financiers complexes et la régulation des marchés.",
      location: "Paris, France",
      email: "c.petit@expert.fr",
      phone: "01 45 67 89 10",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      specialties: ["Produits dérivés", "Régulation financière", "Valorisation"],
      expertiseLevel: "Expert certifié AMF",
      availability: "Disponible"
    },
    {
      id: "8",
      name: "Thomas Legrand",
      title: "Expert en droit du travail",
      description: "Juriste spécialisé dans les contentieux sociaux et l'analyse des relations employeur-employé.",
      location: "Lyon, France",
      email: "t.legrand@expert.fr",
      phone: "04 72 56 78 90",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      specialties: ["Contentieux social", "Harcèlement", "Ruptures conventionnelles"],
      expertiseLevel: "Expert confirmé",
      availability: "Disponible sous 24h"
    }
  ];
  
  // Add new experts to the database
  expertsDatabase = [...originalExperts, ...newExperts];
  
  console.log("Base de données mise à jour. Nombre total d'experts:", expertsDatabase.length);
  
  return Promise.resolve();
};

/**
 * Reset experts database to original state
 */
export const resetExpertsDatabase = () => {
  expertsDatabase = [...originalExperts];
  return Promise.resolve();
};

/**
 * Expose the database for use in search module
 */
export const getExpertsDatabase = () => expertsDatabase;
