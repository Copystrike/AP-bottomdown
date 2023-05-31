export type FortniteItem = {
  lastUpdate: number;
  lanuage: string;
  data: MetaData[];
};

export type MetaData = {
  itemId: string;
  lastUpdate: number;
  item: Item;
};

export type Item = {
  name: string;
  description: string;
  type: Type;
  rarity: Rarity;
  series: Series | null;
  cost: number;
  upcoming: boolean;
  images: Images;
  backpack: any;
  obtained: string;
  obtained_type: ObtainedType;
  ratings: Ratings;
  costmeticId: string;
  obtainedValue: Obtained;
  obtainedFromBattlepass: Obtained;
};

export type Images = {
  icon: null | string;
  featured: null | string;
  background: null | string;
  information: null | string;
};

export enum Obtained {
  None = "none",
}

export enum ObtainedType {
  Vbucks = "vbucks",
}

export enum Rarity {
  Common = "common",
  Epic = "epic",
  Legendary = "legendary",
  Rare = "rare",
  Uncommon = "uncommon",
}

export type Ratings = {
  avgStars: number;
  totalPoints: number;
  numberVotes: number;
};

export enum Series {
  Icon = "icon",
  Marvel = "marvel",
}

export enum Type {
  Backpack = "backpack",
  Banner = "banner",
  Bundle = "bundle",
  Emoji = "emoji",
  Emote = "emote",
  Glider = "glider",
  Loadingscreen = "loadingscreen",
  Outfit = "outfit",
  Pickaxe = "pickaxe",
  Spray = "spray",
  Wrap = "wrap",
}