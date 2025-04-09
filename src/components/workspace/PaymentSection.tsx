
import React from 'react';
import PaymentForm from '@/components/PaymentForm';

interface PaymentSectionProps {
  expertName: string;
  onSuccess: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ expertName, onSuccess }) => {
  return (
    <div className="max-w-lg mx-auto py-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6">Finaliser la consultation</h2>
      <PaymentForm 
        amount={120} 
        expertName={expertName} 
        onSuccess={onSuccess} 
      />
    </div>
  );
};

export default PaymentSection;
