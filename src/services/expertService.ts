
import { supabase } from '@/integrations/supabase/client';
import { Expert } from '@/types/supabase';
import { Expert as ExpertUI } from '@/utils/experts';

export const fetchExpertById = async (expertId: string): Promise<ExpertUI | null> => {
  try {
    const { data, error } = await supabase
      .from('experts')
      .select(`
        id,
        title,
        description,
        location,
        phone,
        avatar,
        specialties,
        expertise_level,
        availability,
        profiles (
          first_name,
          last_name,
          email
        )
      `)
      .eq('id', expertId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    // Map the data to match the Expert interface
    const expert: ExpertUI = {
      id: data.id,
      name: `${data.profiles.first_name} ${data.profiles.last_name}`,
      title: data.title || '',
      description: data.description || '',
      location: data.location || '',
      email: data.profiles.email || '',
      phone: data.phone || '',
      avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + data.id,
      specialties: data.specialties || [],
      expertiseLevel: data.expertise_level || '',
      availability: data.availability || '',
    };

    return expert;
  } catch (error) {
    console.error('Error fetching expert:', error);
    return null;
  }
};

export const searchExperts = async (keyword?: string, location?: string): Promise<ExpertUI[]> => {
  try {
    let query = supabase
      .from('experts')
      .select(`
        id,
        title,
        description,
        location,
        phone,
        avatar,
        specialties,
        expertise_level,
        availability,
        profiles (
          first_name,
          last_name,
          email
        )
      `);
    
    // If keyword is provided, search in relevant fields
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      query = query.or(`title.ilike.%${keywordLower}%,description.ilike.%${keywordLower}%,specialties.cs.{${keywordLower}}`);
    }
    
    // If location is provided, search in location field
    if (location) {
      const locationLower = location.toLowerCase();
      query = query.ilike('location', `%${locationLower}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Map the data to match the Expert interface
    const experts: ExpertUI[] = data.map(expert => ({
      id: expert.id,
      name: `${expert.profiles.first_name} ${expert.profiles.last_name}`,
      title: expert.title || '',
      description: expert.description || '',
      location: expert.location || '',
      email: expert.profiles.email || '',
      phone: expert.phone || '',
      avatar: expert.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + expert.id,
      specialties: expert.specialties || [],
      expertiseLevel: expert.expertise_level || '',
      availability: expert.availability || '',
    }));
    
    return experts;
  } catch (error) {
    console.error('Error searching experts:', error);
    return [];
  }
};
