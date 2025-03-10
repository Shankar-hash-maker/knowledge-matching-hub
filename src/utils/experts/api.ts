
// API key management for OpenAI
let openaiApiKey: string | null = null;

export const setOpenAIApiKey = (key: string) => {
  openaiApiKey = key;
};

export const getOpenAIApiKey = () => openaiApiKey;

/**
 * Analyzes a search query using OpenAI API to extract relevant keywords
 */
export async function analyzeSearchQuery(query: string): Promise<string> {
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not set');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
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
