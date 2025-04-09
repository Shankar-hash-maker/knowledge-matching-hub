
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Expert } from '@/utils/experts';
import { fetchExpertById } from '@/services/expertService';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import ExpertProfile from '@/components/workspace/ExpertProfile';
import WorkspaceContent from '@/components/workspace/WorkspaceContent';
import PaymentSection from '@/components/workspace/PaymentSection';
import { useAuth } from '@/hooks/useAuth';

const Workspace = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  
  // If user is not logged in, redirect to auth page
  if (!user && !authLoading) {
    return <Navigate to="/auth" />;
  }
  
  useEffect(() => {
    const fetchExpert = async () => {
      if (!expertId) {
        navigate('/');
        return;
      }
      
      try {
        const expertData = await fetchExpertById(expertId);
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
    
    if (user) {
      fetchExpert();
    }
  }, [expertId, navigate, user]);
  
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setShowPayment(false);
  };
  
  if (loading || authLoading) {
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
