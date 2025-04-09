
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Expert } from '@/types/supabase';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [expertData, setExpertData] = useState<Expert | null>(null);
  const [loadingExpertData, setLoadingExpertData] = useState(false);

  // If user is not logged in, redirect to auth page
  if (!user && !isLoading) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    const fetchExpertData = async () => {
      if (!profile?.is_expert) return;
      
      setLoadingExpertData(true);
      
      try {
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('id', user?.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setExpertData(data as Expert);
        }
      } catch (error) {
        console.error('Error fetching expert data:', error);
      } finally {
        setLoadingExpertData(false);
      }
    };

    if (profile?.is_expert) {
      fetchExpertData();
    }
  }, [profile, user]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || loadingExpertData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-4xl mx-auto px-4 py-12 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
          <div className="space-x-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
            <Button 
              variant="destructive"
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Vos informations de base.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Nom</p>
                  <p className="text-muted-foreground">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-muted-foreground">{profile?.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Status</p>
                <p className="text-muted-foreground">
                  {profile?.is_expert ? "Expert" : "Utilisateur"}
                </p>
              </div>
              
              {!profile?.is_expert && (
                <div className="pt-2">
                  <Button onClick={() => navigate('/expert-registration')}>
                    Devenir un expert
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {profile?.is_expert && expertData && (
            <Card>
              <CardHeader>
                <CardTitle>Profil d'expert</CardTitle>
                <CardDescription>
                  Vos informations d'expert.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Titre professionnel</p>
                  <p className="text-muted-foreground">{expertData.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Description</p>
                  <p className="text-muted-foreground">{expertData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Localisation</p>
                    <p className="text-muted-foreground">{expertData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Téléphone</p>
                    <p className="text-muted-foreground">{expertData.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Spécialités</p>
                  <div className="flex flex-wrap gap-2">
                    {expertData.specialties?.map((specialty, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Niveau d'expertise</p>
                    <p className="text-muted-foreground">{expertData.expertise_level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Disponibilité</p>
                    <p className="text-muted-foreground">{expertData.availability}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Button onClick={() => navigate('/expert-edit')}>
                    Modifier mon profil d'expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
