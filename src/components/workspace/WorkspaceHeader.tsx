
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, CreditCard } from 'lucide-react';

interface WorkspaceHeaderProps {
  isPaid: boolean;
  onShowPayment: () => void;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ isPaid, onShowPayment }) => {
  const navigate = useNavigate();
  
  return (
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
              onClick={onShowPayment}
            >
              <CreditCard size={14} />
              <span>Payer la consultation</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
