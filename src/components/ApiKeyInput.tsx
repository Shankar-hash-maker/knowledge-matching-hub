
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setOpenAIApiKey } from '@/utils/experts';
import { useToast } from '@/hooks/use-toast';

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setOpenAIApiKey(apiKey.trim());
      toast({
        title: "Clé API enregistrée",
        description: "L'analyse IA est maintenant activée pour la recherche.",
        variant: "default"
      });
      setApiKey('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-lg mx-auto mb-6">
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Entrez votre clé API OpenAI pour activer l'analyse IA"
        className="flex-1"
      />
      <Button type="submit" disabled={!apiKey.trim()}>
        Enregistrer
      </Button>
    </form>
  );
};

export default ApiKeyInput;
