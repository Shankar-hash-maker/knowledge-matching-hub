import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ExpertCard from '@/components/ExpertCard';
import PdfDatabaseImport from '@/components/PdfDatabaseImport';
import { Expert } from '@/utils/expertMatching';
import { Check, SearchX, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApiKeyInput from '@/components/ApiKeyInput';

const Index = () => {
  const location = useLocation();
  const [experts, setExperts] = useState<Expert[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<{ keyword: string; location: string } | null>(null);
  const [searching, setSearching] = useState(false);
  const [showDatabaseImport, setShowDatabaseImport] = useState(false);

  useEffect(() => {
    if (location.state?.experts && location.state?.searchQuery) {
      setExperts(location.state.experts);
      setSearchQuery(location.state.searchQuery);
      setSearching(false);
      
      // Clear location state to avoid persistence on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="search-container absolute inset-0 -z-10" />
      
      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4 py-12 flex flex-col flex-1">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 text-sm rounded-full font-medium">
              Platform de mise en relation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Trouvez l'expert idéal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Décrivez le type d'expertise dont vous avez besoin et trouvez le spécialiste qui vous correspond.
          </p>
          
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setShowDatabaseImport(!showDatabaseImport)}
            >
              <Database className="h-4 w-4" />
              <span>{showDatabaseImport ? "Masquer l'import" : "Importer une base de données"}</span>
            </Button>
          </div>
        </header>
        
        {showDatabaseImport && (
          <div className="max-w-lg mx-auto mb-8 animate-fade-in">
            <PdfDatabaseImport />
          </div>
        )}
        
        <ApiKeyInput />
        
        <SearchBar />
        
        {searching && (
          <div className="flex-1 flex items-center justify-center flex-col mt-12">
            <div className="loading-dots mb-4">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="text-muted-foreground">Recherche des experts...</p>
          </div>
        )}
        
        {experts && (
          <div className="mt-12 animate-fade-in">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span className="font-medium">
                  {experts.length} expert{experts.length > 1 ? 's' : ''} trouvé{experts.length > 1 ? 's' : ''}
                </span>
                {searchQuery && (
                  <span className="text-muted-foreground">
                    pour <span className="font-medium">"{searchQuery.keyword}"</span>
                    {searchQuery.location && (
                      <> près de <span className="font-medium">"{searchQuery.location}"</span></>
                    )}
                  </span>
                )}
              </div>
            </div>
            
            {experts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((expert, index) => (
                  <ExpertCard key={expert.id} expert={expert} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Aucun expert trouvé</h3>
                <p className="text-muted-foreground max-w-md">
                  Nous n'avons pas trouvé d'experts correspondant à vos critères. Essayez d'élargir votre recherche.
                </p>
              </div>
            )}
          </div>
        )}
        
        {!experts && !searching && (
          <div className="flex-1 flex items-center justify-center mt-8">
            <div className="text-center max-w-lg animate-fade-in">
              <p className="text-muted-foreground">
                Entrez votre recherche ci-dessus pour trouver des experts qualifiés qui correspondent à vos besoins.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <footer className="border-t py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Knowledge Matching Hub. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
