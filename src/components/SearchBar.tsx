import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { findExperts } from '@/utils/experts';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Simulate API call with delay
      const experts = await findExperts(keyword, location);
      
      // Navigate to results with the data
      navigate('/', { state: { experts, searchQuery: { keyword, location } } });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full max-w-3xl mx-auto animate-slide-up"
    >
      <div className="glassmorphism rounded-2xl p-1 shadow-lg flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Décrivez l'expert que vous recherchez..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 h-12 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
        </div>
        
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Localisation..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
        </div>
        
        <Button 
          type="submit" 
          className="h-12 px-6 text-base transition-all duration-300 hover:scale-[1.03] shadow-sm"
          disabled={isSearching || !keyword.trim()}
        >
          {isSearching ? (
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            "Rechercher"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
