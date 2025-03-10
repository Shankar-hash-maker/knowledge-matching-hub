import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import MessageSpace from '@/components/MessageSpace';
import PaymentForm from '@/components/PaymentForm';
import FileUpload from '@/components/FileUpload';
import { Expert, getExpertById } from '@/utils/experts';
import { MessageSquare, FileText, CreditCard, ChevronLeft, Video, Calendar } from 'lucide-react';

const Workspace = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  
  useEffect(() => {
    const fetchExpert = async () => {
      if (!expertId) {
        navigate('/');
        return;
      }
      
      try {
        const expertData = await getExpertById(expertId);
        if (expertData) {
          setExpert(expertData);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching expert:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExpert();
  }, [expertId, navigate]);
  
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    // In a real app, we would upload these files to a server
  };
  
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setShowPayment(false);
  };
  
  if (loading) {
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
  
  if (!expert) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={16} />
            <span>Retour</span>
          </Button>
          
          <div className="flex items-center gap-3">
            {isPaid ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Collaboration active
              </Badge>
            ) : (
              <Button 
                size="sm" 
                variant="default" 
                className="gap-1"
                onClick={() => setShowPayment(true)}
              >
                <CreditCard size={14} />
                <span>Payer la consultation</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6">
        {showPayment ? (
          <div className="max-w-lg mx-auto py-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-center mb-6">Finaliser la consultation</h2>
            <PaymentForm 
              amount={120} 
              expertName={expert.name} 
              onSuccess={handlePaymentSuccess} 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{expert.name}</h2>
                    <p className="text-sm text-muted-foreground">{expert.title}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">À propos</h3>
                    <p className="text-sm text-muted-foreground">{expert.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Spécialités</h3>
                    <div className="flex flex-wrap gap-1">
                      {expert.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2 justify-start">
                      <Calendar size={14} />
                      <span>Planifier un rendez-vous</span>
                    </Button>
                    
                    <Button variant="outline" className="w-full gap-2 justify-start">
                      <Video size={14} />
                      <span>Démarrer une visioconférence</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="messages" className="gap-1">
                    <MessageSquare size={16} />
                    <span>Messages</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="gap-1">
                    <FileText size={16} />
                    <span>Documents</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="messages" className="mt-0">
                  <Card className="h-[600px] overflow-hidden">
                    <MessageSpace expert={expert} />
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-0">
                  <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Documents partagés</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Partagez des documents confidentiels avec {expert.name}. Tous les fichiers sont chiffrés et sécurisés.
                    </p>
                    
                    <FileUpload onFilesSelected={handleFilesSelected} />
                    
                    <div className="mt-8">
                      <h4 className="text-sm font-medium mb-3">Documents récents</h4>
                      <div className="text-sm text-muted-foreground text-center py-8">
                        Aucun document partagé pour le moment.
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Workspace;
