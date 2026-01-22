
import { DayLog } from './types';

export const INITIAL_ACTIVITIES: DayLog[] = [
  {
    date: "Mardi 21 Janvier 2025",
    activities: [
      {
        id: "1",
        date: "21/01/2025",
        title: "Un p'tit déj de championnes ! 🥐",
        description: "On commence la journée avec un bon gâteau et un jus dans mon verre de la Reine des Neiges. Lili a adoré les miettes !",
        imageUrl: "images/01-petit-dej.jpg",
        category: 'repas'
      },
      {
        id: "2",
        date: "21/01/2025",
        title: "Dancing Queen ! 💃",
        description: "Lili a appris de nouveaux pas avec ma prof. Elle est super souple pour une souris !",
        imageUrl: "images/02-dance.jpg",
        category: 'sport'
      },
      {
        id: "3",
        date: "21/01/2025",
        title: "Kiai ! Karaté Kid 🥋",
        description: "Le coach Abdel a donné des conseils à Lili pour se défendre. Attention, elle devient redoutable !",
        imageUrl: "images/03-karate.jpg",
        category: 'sport'
      }
    ]
  },
  {
    date: "Mercredi 22 Janvier 2025",
    activities: [
      {
        id: "4",
        date: "22/01/2025",
        title: "Coucou Ayla ! 👶",
        description: "Visite chez le docteur pour voir ma petite sœur Ayla qui est encore dans le ventre de maman. Lili a surveillé l'écran !",
        imageUrl: "04-visite-petite-soeur.jpg",
        category: 'famille'
      },
      {
        id: "5",
        date: "22/01/2025",
        title: "Pyjama Party & Poupées 🧸",
        description: "On a joué avec toutes mes poupées et mes doudous dans ma chambre. C'est la fête !",
        imageUrl: "images/05-jouer-avec-les-poupee.jpg",
        category: 'jeu'
      },
      {
        id: "6",
        date: "22/01/2025",
        title: "Dodo dans la cabane 😴",
        description: "Après toutes ces aventures, on file sous la couette dans mon lit cabane. Bonne nuit les souris ! 👍",
        imageUrl: "images/06-temps-de-dormir.jpg",
        category: 'jeu'
      }
    ]
  }
];
