export interface ItemPreset {
  label: string;
  en: string;
  ar: string;
}

export interface AgePreset {
  id: string;
  label: string;
  en: string;
  ar: string;
}

export interface CurrencyOption {
  code: string;
  country: string;
  arCountry: string;
}

export type PageMode = 'a4_paysage' | 'a5_paysage';

export interface MultiItemRow {
  id: string;
  presetKey?: string;
  engName: string;
  araName: string;
  price: string;
}

export interface A5MultiSignData {
  currency: string;
  items: MultiItemRow[];
  showKiabiLogo: boolean;
  headerTagline?: string;
}

export interface SignData {
  preset: string;
  engTitle: string;
  araTitle: string;
  agePreset: string;
  engDetail: string;
  araDetail: string;
  customAgeText: string;
  engPrefix: string;
  araPrefix: string;
  sizeVal: string;
  sizeEngLabel: string;
  sizeAraLabel: string;
  currency: string;
  priceValue: string;
}
