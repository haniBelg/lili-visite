
import React from 'react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onGenerateImage: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onGenerateImage }) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'sport': return 'text-blue-600 bg-blue-100';
      case 'repas': return 'text-orange-600 bg-orange-100';
      case 'famille': return 'text-pink-600 bg-pink-100';
      case 'jeu': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const displayImage = activity.customImageUrl || activity.imageUrl;

  return (
    <div className="group relative bg-white p-4 shadow-xl rotate-1 hover:rotate-0 transition-all duration-300 border-b-8 border-gray-200 rounded-sm">
      <div className="relative aspect-square overflow-hidden mb-4 bg-gray-50 border-2 border-gray-100">
        {activity.isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-pink-500 font-bold animate-pulse text-xs">Lili dessine...</p>
          </div>
        ) : null}
        
        <img 
          src={displayImage} 
          alt={activity.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${activity.isGenerating ? 'opacity-20' : 'opacity-100'}`}
        />
        
        <button 
          onClick={() => onGenerateImage(activity.id)}
          className="no-print absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 group-hover:visible"
          title="Générer une illustration magique"
        >
          <span className="text-xl">✨</span>
        </button>
      </div>

      <div className="space-y-2">
        <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryStyles(activity.category)}`}>
          {activity.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 leading-tight font-serif italic">
          {activity.title}
        </h3>
        <p className="text-gray-600 text-sm leading-snug font-medium border-l-2 border-pink-200 pl-2">
          {activity.description}
        </p>
      </div>

      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-pink-200/40 rotate-2 backdrop-blur-sm pointer-events-none no-print"></div>
    </div>
  );
};
