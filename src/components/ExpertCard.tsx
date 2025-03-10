
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, MessageSquare, Calendar, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Expert } from '@/utils/expertMatching';

interface ExpertCardProps {
  expert: Expert;
  index: number;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, index }) => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    navigate(`/workspace/${expert.id}`);
  };

  return (
    <Card className={`w-full overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 animate-scale-in`} 
      style={{ animationDelay: `${index * 0.1}s` }}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs font-normal px-2 py-0">
                {expert.expertiseLevel}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal px-2 py-0">
                {expert.availability}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{expert.name}</h3>
            <p className="text-sm text-muted-foreground">{expert.title}</p>
          </div>
          <div className="rounded-full overflow-hidden border w-14 h-14">
            <img 
              src={expert.avatar} 
              alt={expert.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <p className="line-clamp-2 text-muted-foreground">{expert.description}</p>
          
          <div className="grid gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={14} />
              <span>{expert.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={14} />
              <span>{expert.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={14} />
              <span>{expert.email}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 pt-1">
            {expert.specialties.map((specialty, i) => (
              <Badge key={i} variant="outline" className="bg-primary/5 text-xs font-normal">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => {
              // Schedule call logic
            }}
          >
            <Calendar size={14} />
            <span>Rendez-vous</span>
          </Button>
          <Button 
            variant="default"
            size="sm"
            className="flex-1 gap-1"
            onClick={handleContactClick}
          >
            <MessageSquare size={14} />
            <span>Contacter</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpertCard;
