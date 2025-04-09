
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          Knowledge Matching Hub
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {profile?.is_expert && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/workspace')}
                >
                  Mon espace de travail
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => navigate('/profile')}
              >
                <User size={16} />
                <span>Mon Profil</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => navigate('/auth', { state: { tab: 'signup' }})}
              >
                <UserPlus size={16} />
                <span>S'inscrire</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-1"
                onClick={() => navigate('/auth')}
              >
                <LogIn size={16} />
                <span>Connexion</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
