
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ExpertRegistration = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [availability, setAvailability] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [loading, setLoading] = useState(false);

  // If user is not logged in, redirect to auth page
  if (!user && !isLoading) {
    return <Navigate to="/auth" />;
  }

  // If user is already an expert, redirect to profile
  useEffect(() => {
    const checkIfExpert = async () => {
      if (profile?.is_expert) {
        navigate('/profile');
      }
    };

    checkIfExpert();
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location || !phone || !expertiseLevel || !availability || !specialties) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // First update the profile to mark as expert
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_expert: true })
        .eq('id', user?.id);
      
      if (profileError) {
        throw profileError;
      }
      
      // Then create the expert record
      const { error: expertError } = await supabase
        .from('experts')
        .insert({
          id: user?.id,
          title,
          description,
          location,
          phone,
          expertise_level: expertiseLevel,
          availability,
          specialties: specialties.split(',').map(s => s.trim()),
        });
      
      if (expertError) {
        throw expertError;
      }
      
      toast({
        title: "Inscription réussie",
        description: "Vous êtes maintenant inscrit en tant qu'expert.",
      });
      
      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error registering as expert:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription en tant qu'expert.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
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
      <div className="container max-w-2xl mx-auto px-4 py-12 flex flex-col flex-1">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Devenez un expert</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Inscription en tant qu'expert</CardTitle>
            <CardDescription>
              Complétez ce formulaire pour vous enregistrer en tant qu'expert sur la plateforme.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre professionnel</Label>
                <Input 
                  id="title"
                  placeholder="Ex: Développeur Web Senior"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Décrivez votre expertise et votre parcours..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input 
                    id="location"
                    placeholder="Ville, Pays"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialties">Spécialités (séparées par des virgules)</Label>
                <Input 
                  id="specialties"
                  placeholder="Ex: JavaScript, React, UI/UX Design"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expertiseLevel">Niveau d'expertise</Label>
                  <Input 
                    id="expertiseLevel"
                    placeholder="Ex: Senior, 10+ ans d'expérience"
                    value={expertiseLevel}
                    onChange={(e) => setExpertiseLevel(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Input 
                    id="availability"
                    placeholder="Ex: Temps partiel, Soirs et week-ends"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  "S'inscrire en tant qu'expert"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ExpertRegistration;
