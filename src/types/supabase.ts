
export type Profile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  updated_at: string;
  is_expert: boolean;
};

export type Expert = {
  id: string;
  title: string | null;
  description: string | null;
  location: string | null;
  phone: string | null;
  avatar: string | null;
  specialties: string[] | null;
  expertise_level: string | null;
  availability: string | null;
  created_at: string;
  updated_at: string;
};
