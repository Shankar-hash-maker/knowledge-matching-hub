
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

let perplexityApiKey: string | null = null;

export const setPerplexityApiKey = (key: string) => {
  perplexityApiKey = key;
};

async function analyzeSearchQuery(query: string): Promise<string> {
  if (!perplexityApiKey) {
    throw new Error('Perplexity API key not set');
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${perplexityApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: "Vous êtes un assistant spécialisé dans l'analyse des besoins en expertise juridique. Analysez la requête et extrayez les mots-clés pertinents liés aux domaines d'expertise, sans ajouter de contexte supplémentaire. Répondez uniquement avec les mots-clés essentiels, séparés par des virgules."
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.2,
      max_tokens: 100
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

export const findExperts = async (keyword: string, location: string = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Analyze the search query using AI
    const analyzedKeywords = await analyzeSearchQuery(keyword);
    console.log('Analyzed keywords:', analyzedKeywords);
    
    // Convert analyzed keywords to array and clean
    const keywordArray = analyzedKeywords
      .split(',')
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0);
    
    // Filter experts based on keyword and location
    const matchedExperts = expertsDatabase.filter(expert => {
      // Check each analyzed keyword against expert fields
      const keywordMatch = keywordArray.some(keyword =>
        expert.title.toLowerCase().includes(keyword) ||
        expert.description.toLowerCase().includes(keyword) ||
        expert.specialties.some(s => s.toLowerCase().includes(keyword))
      );
      
      // If no location filter, return keyword matches
      if (!location) return keywordMatch;
      
      // If location filter provided, check for match
      const locationMatch = expert.location.toLowerCase().includes(location.toLowerCase());
      
      return keywordMatch && locationMatch;
    });
    
    // Sort experts by relevance (number of matching keywords)
    const scoredExperts = matchedExperts.map(expert => {
      const score = keywordArray.reduce((acc, keyword) => {
        return acc + (
          (expert.title.toLowerCase().includes(keyword) ? 3 : 0) +
          (expert.description.toLowerCase().includes(keyword) ? 2 : 0) +
          (expert.specialties.some(s => s.toLowerCase().includes(keyword)) ? 3 : 0)
        );
      }, 0);
      return { expert, score };
    });
    
    // Sort by score and return top 5
    return scoredExperts
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ expert }) => expert);
  } catch (error) {
    console.error('Error analyzing search query:', error);
    // Fallback to basic search if AI analysis fails
    return findExpertsBasic(keyword, location);
  }
};

// Basic search function as fallback
const findExpertsBasic = (keyword: string, location: string = '') => {
  const keywordLower = keyword.toLowerCase();
  
  const matchedExperts = expertsDatabase.filter(expert => {
    const keywordMatch = 
      expert.title.toLowerCase().includes(keywordLower) ||
      expert.description.toLowerCase().includes(keywordLower) ||
      expert.specialties.some(s => s.toLowerCase().includes(keywordLower));
    
    if (!location) return keywordMatch;
    
    const locationMatch = expert.location.toLowerCase().includes(location.toLowerCase());
    
    return keywordMatch && locationMatch;
  });
  
  return matchedExperts.slice(0, 5);
};

export const getExpertById = async (id: string): Promise<Expert | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return expertsDatabase.find(expert => expert.id === id);
};

/**
 * Import experts from a PDF file
 * In a real implementation, this would use a PDF parser library
 * and potentially AI to extract structured information
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
