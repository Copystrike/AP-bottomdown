interface Cosmetic {
  id: string;
  name: string;
  type: string;
  rarity: string;
  series: {
    id: string;
    name: string;
  };
  description: string;
  images: {
    icon: string;
    featured: string;
    background: string;
    full_background: string;
  };
  set: {
    id: string;
    name: string;
  };
}
interface ResponseFortnite {
  data : Cosmetic[]
}

export {
  Cosmetic, ResponseFortnite
}