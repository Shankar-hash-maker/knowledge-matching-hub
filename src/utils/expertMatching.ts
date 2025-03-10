export interface Expert {
  id: string;
  name: string;
  title: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  specialties: string[];
  expertiseLevel: string;
  availability: string;
}

// Simulated database of experts
const expertsDatabase: Expert[] = [
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

/**
 * Simulates a deep learning search to find relevant experts
 * In a real implementation, this would use vector embeddings or a similar technique
 */
export const findExperts = async (keyword: string, location: string = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple keyword matching simulation (would be replaced by actual ML)
  const keywordLower = keyword.toLowerCase();
  
  // Filter experts based on keyword and location
  const matchedExperts = expertsDatabase.filter(expert => {
    // Check for keyword matches in various fields
    const keywordMatch = 
      expert.title.toLowerCase().includes(keywordLower) ||
      expert.description.toLowerCase().includes(keywordLower) ||
      expert.specialties.some(s => s.toLowerCase().includes(keywordLower));
    
    // If no location filter, return keyword matches
    if (!location) return keywordMatch;
    
    // If location filter provided, check for match
    const locationMatch = expert.location.toLowerCase().includes(location.toLowerCase());
    
    return keywordMatch && locationMatch;
  });
  
  // If we have fewer than 5 experts, just return what we have
  if (matchedExperts.length <= 5) return matchedExperts;
  
  // Otherwise, return the top 5
  return matchedExperts.slice(0, 5);
};

export const getExpertById = async (id: string): Promise<Expert | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return expertsDatabase.find(expert => expert.id === id);
};
