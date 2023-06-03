export type FortniteResponse = {
  status: number;
  data: Datum[];
}

export type Datum = {
  id: string;
  name: string;
  description: string;
  type: Rarity;
  rarity: Rarity;
  series: Series | null;
  set: Set | null;
  introduction: Introduction | null;
  images: Images;
  variants: Variant[] | null;
  searchTags: string[] | null;
  gameplayTags: string[] | null;
  metaTags: string[] | null;
  showcaseVideo: null | string;
  dynamicPakID: null | string;
  itemPreviewHeroPath?: string;
  displayAssetPath: null | string;
  definitionPath: null | string;
  path: string;
  added: Date;
  shopHistory: Date[] | null;
  unlockRequirements?: string;
  builtInEmoteIDS?: string[];
}

export type Images = {
  smallIcon: string;
  icon: string;
  featured: null | string;
  other: Other | null;
}

export type Other = {
  background?: string;
  coverart?: string;
  decal?: string;
}

export type Introduction = {
  chapter: string;
  season: string;
  text: Text;
  backendValue: number;
}

export type Text = "Introduced in Chapter 4, Season 2." | "Introduced in Chapter 4, Season 1." | "Introduced in Chapter 3, Season 3." | "Introduced in Chapter 3, Season 4.";

export type Rarity = {
  value: PurpleValue;
  displayValue: DisplayValueEnum;
  backendValue: RarityBackendValue;
}

export type RarityBackendValue = "EFortRarity::Epic" | "EFortRarity::Rare" | "EFortRarity::Uncommon" | "EFortRarity::Legendary" | "EFortRarity::Common" | "AthenaBackpack" | "AthenaCharacter" | "AthenaSkyDiveContrail" | "AthenaDance" | "AthenaEmoji" | "AthenaGlider" | "AthenaLoadingScreen" | "AthenaMusicPack" | "AthenaPickaxe" | "AthenaSpray" | "AthenaItemWrap";

export type DisplayValueEnum = "Epic" | "Rare" | "Star Wars Series" | "Uncommon" | "MARVEL SERIES" | "Gaming Legends Series" | "Legendary" | "Icon Series" | "Common" | "Back Bling" | "Outfit" | "Character" | "Contrail" | "Emote" | "Emoticon" | "Glider" | "Loading Screen" | "Music" | "Harvesting Tool" | "Spray" | "Wrap";

export type PurpleValue = "epic" | "rare" | "starwars" | "uncommon" | "marvel" | "gaminglegends" | "legendary" | "icon" | "common" | "backpack" | "outfit" | "contrail" | "emote" | "emoji" | "glider" | "loadingscreen" | "music" | "pickaxe" | "spray" | "wrap";

export type Series = {
  value: DisplayValueEnum;
  image: null | string;
  colors: Color[];
  backendValue: SeriesBackendValue;
}

export type SeriesBackendValue = "ColumbusSeries" | "MarvelSeries" | "PlatformSeries" | "CreatorCollabSeries";

export type Color = "ffd800ff" | "2555b2ff" | "0a1833ff" | "040a14ff" | "050500ff" | "ed1c24ff" | "d60203ff" | "b30102ff" | "610709ff" | "280102ff" | "8078ffff" | "5328d6ff" | "3e1398ff" | "28085fff" | "0d0027ff" | "5cf2f3ff" | "2bc9caff" | "004c71ff" | "025253ff" | "000f2bff";

export type Set = {
  value: string;
  text: string;
  backendValue: string;
}

export type Variant = {
  channel: Channel;
  type: string;
  options: Option[];
}

export type Channel = "Material" | "Progressive" | "Parts" | "Emissive" | "Particle" | "Mesh" | "Slot" | "JerseyColor" | "Pattern";

export type Option = {
  tag: string;
  name: string;
  image: string;
  unlockRequirements?: string;
}
