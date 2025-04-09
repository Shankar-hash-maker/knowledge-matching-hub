
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Expert, getExpertById } from '@/utils/experts';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import ExpertProfile from '@/components/workspace/ExpertProfile';
import WorkspaceContent from '@/components/workspace/WorkspaceContent';
import PaymentSection from '@/components/workspace/PaymentSection';

const Workspace = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
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
      <WorkspaceHeader 
        isPaid={isPaid}
        onShowPayment={() => setShowPayment(true)} 
      />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6">
        {showPayment ? (
          <PaymentSection 
            expertName={expert.name}
            onSuccess={handlePaymentSuccess}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <ExpertProfile expert={expert} />
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <WorkspaceContent expert={expert} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Workspace;
