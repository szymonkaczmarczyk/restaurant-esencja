import type { Dish } from '../types';

export const menuDishes: Dish[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Tatar z Jelenia z Truflami',
    description: 'Ręcznie siekana polędwica z jelenia, marynowane rydze, oliwa truflowa, konfitowane żółtko, emulsja z czosnku niedźwiedziego.',
    price: 68,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    isChefSpecial: true,
  },
  {
    id: 'starter-2',
    name: 'Przegrzebki w Sosie z Szampana',
    description: 'Smażone przegrzebki św. Jakuba, puree z kalafiora z palonym masłem, kawior z jesiotra, piana z szampana i trawy cytrynowej.',
    price: 74,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'starter-3',
    name: 'Pianka z Koziego Sera',
    description: 'Lekki mus z koziego sera łomnickiego, pieczone buraki chioggia, malinowy balsamico, karmelizowane orzechy włoskie, mikro zioła.',
    price: 49,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  },

  // Mains
  {
    id: 'main-1',
    name: 'Polędwica Wagyu z Grzybami Leśnymi',
    description: 'Najwyższej jakości wołowina Wagyu A5, fondant ziemniaczany z rozmarynem, glazurowane smardze, redukcja z porto i porto.',
    price: 240,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isChefSpecial: true,
  },
  {
    id: 'main-2',
    name: 'Halibut w Otulinie z Porów',
    description: 'Filet z halibuta pieczony na parze, młody por z masłem cytrynowym, puree z pasternaku, sos szafranowy z omułkami.',
    price: 110,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'main-3',
    name: 'Kaczka po Staropolsku w Nowej Odsłonie',
    description: 'Konfitowane udo kacze, kluski śląskie z czarną truflą, pieczona antonówka z żurawiną, sos z czarnego bzu.',
    price: 95,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Złota Esencja Czekoladowa',
    description: 'Płynny fondant z gorzkiej czekolady Valrhona, jadalne 24-karatowe złoto, lody z palonego masła, żel z marakui.',
    price: 45,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    isChefSpecial: true,
  },
  {
    id: 'dessert-2',
    name: 'Sernik z Palonym Sianem',
    description: 'Aksamitny sernik na zimno infuzowany zapachem palonego siana łąkowego, lody świerkowe, sos z leśnych jagód.',
    price: 38,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
  },

  // Drinks
  {
    id: 'drink-1',
    name: 'Dom Pérignon Vintage',
    description: 'Wykwintny szampan o bogatym, mineralnym bukiecie z nutami suszonych owoców i tostów.',
    price: 180,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'drink-2',
    name: 'Cocktail Esencja Gold',
    description: 'Premium Gin infuzowany szafranem, likier z czarnego bzu, sok ze świeżej limonki, płatki jadalnego złota, tonik rzemieślniczy.',
    price: 55,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800',
    isChefSpecial: true,
  },
  {
    id: 'drink-3',
    name: 'Wino Brunello di Montalcino',
    description: 'Głębokie czerwone wino toskańskie o nutach wiśni, skóry i przypraw. Idealne do dań mięsnych.',
    price: 85,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
  }
];
