export type FortniteResponse = {
  status: number;
  data:   Data;
}

export type Data = {
  build:         string;
  previousBuild: string;
  hash:          string;
  date:          Date;
  lastAddition:  Date;
  items:         Item[];
}

export type Item = {
  id:                   string;
  name:                 string;
  description:          string;
  type:                 Rarity;
  rarity:               Rarity;
  series:               Series | null;
  set:                  Set | null;
  introduction:         Introduction;
  images:               Images;
  variants:             Variant[] | null;
  searchTags:           null;
  gameplayTags:         string[];
  metaTags:             string[] | null;
  showcaseVideo:        null | string;
  dynamicPakID:         null | string;
  displayAssetPath:     null;
  definitionPath:       null | string;
  path:                 string;
  added:                Date;
  shopHistory:          Date[] | null;
  itemPreviewHeroPath?: string;
}

export type Images = {
  smallIcon: string;
  icon:      string;
  featured:  null | string;
  other:     Other | null;
}

export type Other = {
  background?: string;
  coverart?:   string;
  decal?:      string;
}

export type Introduction = {
  chapter:      string;
  season:       string;
  text:         Text;
  backendValue: number;
}

export type Text = "Introduced in Chapter 4, Season 2." | "Introduced in Chapter 3, Season 4.";

export type Rarity = {
  value:        string;
  displayValue: string;
  backendValue: string;
}

export type Series = {
  value:        Value;
  image:        null | string;
  colors:       string[];
  backendValue: BackendValue;
}

export type BackendValue = "MarvelSeries" | "CreatorCollabSeries";

export type Value = "MARVEL SERIES" | "Icon Series";

export type Set = {
  value:        string;
  text:         string;
  backendValue: string;
}

export type Variant = {
  channel: string;
  type:    string;
  options: Option[];
}

export type Option = {
  tag:   string;
  name:  string;
  image: string;
}
