
import { Expert } from './types';
import { analyzeSearchQuery } from './api';
import { getExpertsDatabase } from './database';

/**
 * Find experts based on keyword and optional location
 */
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
    
    // Get the current database of experts
    const expertsDatabase = getExpertsDatabase();
    
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

/**
 * Basic search function as fallback
 */
const findExpertsBasic = (keyword: string, location: string = '') => {
  const keywordLower = keyword.toLowerCase();
  const expertsDatabase = getExpertsDatabase();
  
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
