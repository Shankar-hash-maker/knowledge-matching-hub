
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Video } from 'lucide-react';
import { Expert } from '@/utils/experts';

interface ExpertProfileProps {
  expert: Expert;
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expert }) => {
  return (
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
  );
};

export default ExpertProfile;
