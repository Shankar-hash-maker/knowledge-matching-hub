
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard, Calendar, LockKeyhole } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  amount: number;
  expertName: string;
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, expertName, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { toast } = useToast();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };
  
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setExpiry(formattedValue);
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setCvc(value.substring(0, 3));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Paiement réussi",
        description: `Vous avez payé ${amount.toFixed(2)}€ à ${expertName}`,
      });
      setLoading(false);
      setIsPaid(true);
      
      // Notify parent of success
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };
  
  if (isPaid) {
    return (
      <Card className="w-full max-w-md mx-auto animate-fade-in">
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Paiement confirmé</h3>
          <p className="text-muted-foreground mb-4">
            Votre paiement de {amount.toFixed(2)}€ a été traité avec succès.
          </p>
          <p className="text-sm">
            Vous pouvez continuer votre collaboration avec {expertName}.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Finaliser votre paiement</CardTitle>
        <CardDescription>Payer pour continuer votre collaboration avec {expertName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom sur la carte</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <div className="relative">
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={handleCvcChange}
                    maxLength={3}
                    required
                  />
                  <LockKeyhole className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Montant</span>
            <span className="font-medium">{amount.toFixed(2)}€</span>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !cardNumber || !expiry || !cvc || !name}
          >
            {loading ? (
              <span className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              `Payer ${amount.toFixed(2)}€`
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground flex items-center gap-1">
          <LockKeyhole size={12} />
          Paiement sécurisé. Vos données sont chiffrées.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
