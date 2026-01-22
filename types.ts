
export interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  customImageUrl?: string;
  category: 'sport' | 'repas' | 'famille' | 'jeu';
  isGenerating?: boolean;
}

export interface DayLog {
  date: string;
  activities: Activity[];
}
