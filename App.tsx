
import React, { useState, useEffect } from 'react';
import { INITIAL_ACTIVITIES } from './constants';
import { ActivityCard } from './components/ActivityCard';
import { DayLog } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [data, setData] = useState<DayLog[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Initialize data from localStorage or constants
  useEffect(() => {
    const savedData = localStorage.getItem('layan_lili_journal');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData(INITIAL_ACTIVITIES);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('layan_lili_journal', JSON.stringify(data));
    }
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const generateAIImage = async (activityId: string) => {
    // 1. Find the activity and set loading state
    const activityToUpdate = data.flatMap(d => d.activities).find(a => a.id === activityId);
    if (!activityToUpdate) return;

    setData(prev => prev.map(day => ({
      ...day,
      activities: day.activities.map(act => 
        act.id === activityId ? { ...act, isGenerating: true } : act
      )
    })));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A whimsical, high-quality children's book illustration of a cute little brown mouse named Lili ${activityToUpdate.title.toLowerCase()}. Style: soft watercolors, pastel colors, cozy and friendly, white background, charming details. The mouse is wearing a tiny pink bow. Description: ${activityToUpdate.description}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
      });

      let base64Image = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64Image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (base64Image) {
        setData(prev => prev.map(day => ({
          ...day,
          activities: day.activities.map(act => 
            act.id === activityId ? { ...act, customImageUrl: base64Image, isGenerating: false } : act
          )
        })));
      }
    } catch (error) {
      console.error("Erreur lors de la génération de l'image:", error);
      alert("Oh non ! Le pinceau magique de Lili est fatigué. Réessaie plus tard !");
      setData(prev => prev.map(day => ({
        ...day,
        activities: day.activities.map(act => 
          act.id === activityId ? { ...act, isGenerating: false } : act
        )
      })));
    }
  };

  const handleReset = () => {
    if (confirm("Veux-tu recommencer le journal à zéro ?")) {
      setData(INITIAL_ACTIVITIES);
      localStorage.removeItem('layan_lili_journal');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf5] pb-20">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5 no-print">
        <div className="absolute top-10 left-10 text-8xl">🐭</div>
        <div className="absolute bottom-10 right-10 text-8xl">🧀</div>
        <div className="absolute top-1/2 right-20 text-8xl rotate-12">🎀</div>
      </div>

      {/* Header Section */}
      <header className="bg-gradient-to-b from-pink-100 to-[#fffcf5] pt-12 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block relative mb-6">
            <span className="text-7xl block animate-bounce mb-2">🐭</span>
            <div className="absolute -right-4 -top-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow-sm text-yellow-900 rotate-12">
              Lili & Layan
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-4 text-pink-600 tracking-tight drop-shadow-sm">
            Mon Super Journal
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-500 max-w-xl mx-auto italic">
            "Les aventures magiques de Lili la petite souris chez moi !"
          </p>
          
          <div className="no-print flex flex-wrap justify-center gap-4 mt-10">
            <button 
              onClick={handlePrint}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-pink-200 transition-all flex items-center gap-3 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimer pour l'école
            </button>
            <button 
              onClick={handleReset}
              className="bg-white hover:bg-gray-50 text-gray-400 border-2 border-gray-100 px-6 py-4 rounded-2xl font-bold transition-all text-sm"
            >
              Recommencer
            </button>
          </div>
        </div>
      </header>

      {/* Main Scrapbook Content */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        {data.map((day, dayIndex) => (
          <section key={dayIndex} className="mb-20">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent to-pink-200 flex-grow"></div>
              <h2 className="text-2xl md:text-4xl text-gray-700 font-bold font-serif italic text-center px-4">
                ✨ {day.date}
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-pink-200 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {day.activities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onGenerateImage={generateAIImage}
                />
              ))}
            </div>
            {dayIndex === 0 && <div className="page-break"></div>}
          </section>
        ))}

        {/* Closing section */}
        <section className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-pink-100 border-4 border-dashed border-pink-200 text-center max-w-4xl mx-auto mt-20 relative">
          <div className="absolute -top-6 -left-6 text-5xl">🖍️</div>
          <div className="absolute -bottom-6 -right-6 text-5xl">🧸</div>
          
          <h2 className="text-4xl text-pink-500 mb-6 italic font-serif">A bientôt Lili !</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
            "C'était trop bien de t'avoir à la maison. On a bien rigolé et maman a dit que tu étais la souris la plus polie du monde !"
          </p>
          <div className="flex justify-center gap-6 text-5xl grayscale-0 hover:grayscale transition-all duration-1000">
            <span className="animate-pulse">✨</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">💝</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">👧</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🐭</span>
            <span className="animate-pulse" style={{animationDelay: '0.5s'}}>✨</span>
          </div>
        </section>
      </main>

      <footer className="mt-20 text-center text-gray-300 font-medium no-print">
        <p className="tracking-widest uppercase text-[10px]">Créé avec magie pour Layan & sa mascotte Lili • 2025</p>
      </footer>
    </div>
  );
};

export default App;
