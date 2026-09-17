import { ItemPreset, AgePreset, CurrencyOption } from '../types';

export interface RetailItemCategory {
  category: string;
  items: { en: string; ar: string; label: string }[];
}

export const KIABI_RETAIL_CATALOG: RetailItemCategory[] = [
  {
    category: 'Tops & Knitwear',
    items: [
      { en: 'sweater', ar: 'سترة', label: 'sweater / سترة' },
      { en: 't-shirt', ar: 'تي شيرت', label: 't-shirt / تي شيرت' },
      { en: 'shirt', ar: 'قميص', label: 'shirt / قميص' },
      { en: 'polo', ar: 'بولو', label: 'polo / بولو' },
      { en: 'hoodie', ar: 'هودي', label: 'hoodie / هودي' },
      { en: 'sweatshirt', ar: 'سويت شيرت', label: 'sweatshirt / سويت شيرت' },
      { en: 'cardigan', ar: 'كارديجان', label: 'cardigan / كارديجان' },
      { en: 'tank top', ar: 'قميص بدون أكمام', label: 'tank top / قميص بدون أكمام' },
    ],
  },
  {
    category: 'Bottoms & Pants',
    items: [
      { en: 'trouser', ar: 'بنطال', label: 'trouser / بنطال' },
      { en: 'pants', ar: 'بنطلون', label: 'pants / بنطلون' },
      { en: 'jeans', ar: 'جينز', label: 'jeans / جينز' },
      { en: 'shorts', ar: 'شورت', label: 'shorts / شورت' },
      { en: 'bermuda', ar: 'برمودا', label: 'bermuda / برمودا' },
      { en: 'leggings', ar: 'ليجنز', label: 'leggings / ليجنز' },
      { en: 'joggers', ar: 'بنطال رياضي', label: 'joggers / بنطال رياضي' },
      { en: 'skirt', ar: 'تنورة', label: 'skirt / تنورة' },
    ],
  },
  {
    category: 'Dresses & Outerwear',
    items: [
      { en: 'dress', ar: 'فستان', label: 'dress / فستان' },
      { en: 'jacket', ar: 'جاكيت', label: 'jacket / جاكيت' },
      { en: 'coat', ar: 'معطف', label: 'coat / معطف' },
      { en: 'parka', ar: 'باركا', label: 'parka / باركا' },
      { en: 'blazer', ar: 'بليزر', label: 'blazer / بليزر' },
      { en: 'vest', ar: 'صديري', label: 'vest / صديري' },
    ],
  },
  {
    category: 'Shoes & Footwear',
    items: [
      { en: 'shoes', ar: 'أحذية', label: 'shoes / أحذية' },
      { en: 'sneakers', ar: 'حذاء رياضي', label: 'sneakers / حذاء رياضي' },
      { en: 'sandals', ar: 'صندل', label: 'sandals / صندل' },
      { en: 'boots', ar: 'بوت', label: 'boots / بوت' },
      { en: 'slippers', ar: 'شبشب', label: 'slippers / شبشب' },
      { en: 'flip-flops', ar: 'شلاكة', label: 'flip-flops / شلاكة' },
    ],
  },
  {
    category: 'Accessories & Basics',
    items: [
      { en: 'accessories', ar: 'إكسسوارات', label: 'accessories / إكسسوارات' },
      { en: 'cap', ar: 'قبعة', label: 'cap / قبعة' },
      { en: 'hat', ar: 'قبعة شمسية', label: 'hat / قبعة شمسية' },
      { en: 'beanie', ar: 'طاقية صوف', label: 'beanie / طاقية صوف' },
      { en: 'belt', ar: 'حزام', label: 'belt / حزام' },
      { en: 'bag', ar: 'حقيبة', label: 'bag / حقيبة' },
      { en: 'backpack', ar: 'حقيبة ظهر', label: 'backpack / حقيبة ظهر' },
      { en: 'socks', ar: 'جوارب', label: 'socks / جوارب' },
      { en: 'scarf', ar: 'وشاح', label: 'scarf / وشاح' },
      { en: 'sunglasses', ar: 'نظارات شمسية', label: 'sunglasses / نظارات شمسية' },
    ],
  },
  {
    category: 'Underwear, Sleepwear & Baby',
    items: [
      { en: 'pyjamas', ar: 'ملابس نوم', label: 'pyjamas / ملابس نوم' },
      { en: 'underwear', ar: 'ملابس داخلية', label: 'underwear / ملابس داخلية' },
      { en: 'bodysuit', ar: 'بودي ثوب', label: 'bodysuit / بودي ثوب' },
      { en: 'baby romper', ar: 'أفارول أطفال', label: 'baby romper / أفارول أطفال' },
      { en: 'bathrobe', ar: 'روب حمام', label: 'bathrobe / روب حمام' },
      { en: 'swimwear', ar: 'ملابس سباحة', label: 'swimwear / ملابس سباحة' },
    ],
  },
];

export const ALL_RETAIL_ITEMS = KIABI_RETAIL_CATALOG.flatMap((cat) => cat.items);

export const DEFAULT_A5_ITEMS = [
  { id: '1', engName: 'sweater', araName: 'سترة', price: '2.2' },
  { id: '2', engName: 'trouser', araName: 'بنطال', price: '7.2' },
  { id: '3', engName: 't-shirt', araName: 'تي شيرت', price: '2.2' },
  { id: '4', engName: 'shoes', araName: 'أحذية', price: '5.5' },
];

export const ITEM_PRESETS: ItemPreset[] = [
  { label: 'Jacket / جاكيت', en: 'Jacket', ar: 'جاكيت' },
  { label: 'T-Shirt / تي شيرت', en: 'T-Shirt', ar: 'تي شيرت' },
  { label: 'Dress / فستان', en: 'Dress', ar: 'فستان' },
  { label: 'Jeans / جينز', en: 'Jeans', ar: 'جينز' },
  { label: 'Trousers / بنطلون', en: 'Trousers', ar: 'بنطلون' },
  { label: 'Pants / بنطلون', en: 'Pants', ar: 'بنطلون' },
  { label: 'Sweatshirt / سويت شيرت', en: 'Sweatshirt', ar: 'سويت شيرت' },
  { label: 'Sweater / كنزة', en: 'Sweater', ar: 'كنزة' },
  { label: 'Shirt / قميص', en: 'Shirt', ar: 'قميص' },
  { label: 'Shorts / شورت', en: 'Shorts', ar: 'شورت' },
  { label: 'Pyjamas / ملابس نوم', en: 'Pyjamas', ar: 'ملابس نوم' },
  { label: 'Leggings / ليجنز', en: 'Leggings', ar: 'ليجنز' },
  { label: 'Bodysuit / بودي ثوب', en: 'Bodysuit', ar: 'بودي ثوب' },
  { label: 'Shoes / أحذية', en: 'Shoes', ar: 'أحذية' },
];

export const AGE_PRESETS: AgePreset[] = [
  { id: '00-03', label: '00-03 months / ٠٠-٠٣ شهر', en: '00-03 months', ar: '٠٠-٠٣ شهر' },
  { id: '0-3', label: '0-3 months / ٠-٣ أشهر', en: '0-3 months', ar: '٠-٣ أشهر' },
  { id: '03-36', label: '03-36 months / ٠٣-٣٦ شهر', en: '03-36 months', ar: '٠٣-٣٦ شهر' },
  { id: '3-12', label: '3-12 years / ٤-١٢ سنة', en: '3-12 years', ar: '٤-١٢ سنة' },
  { id: 'custom', label: 'Custom Text...', en: '', ar: '' },
];

export interface SizeOptionGroup {
  group: string;
  options: { label: string; value: string }[];
}

export const SIZE_PRESET_GROUPS: SizeOptionGroup[] = [
  {
    group: 'Tops, Shirts & T-Shirts',
    options: [
      { label: 'XS - L (Tops / Shirts)', value: 'XS - L' },
      { label: 'XS - XXL (Tops / Shirts)', value: 'XS - XXL' },
      { label: '34 - 42 (Tops / Shirts)', value: '34 - 42' },
      { label: 'S - XL', value: 'S - XL' },
    ],
  },
  {
    group: 'Pants & Trousers',
    options: [
      { label: '38 - 50 (Pants / Trousers)', value: '38 - 50' },
      { label: '32 - 42 (Pants / Trousers)', value: '32 - 42' },
      { label: '30 - 40 (Pants)', value: '30 - 40' },
      { label: '28 - 38 (Pants)', value: '28 - 38' },
    ],
  },
  {
    group: 'Kids & Baby Sizes',
    options: [
      { label: '68 - 98 cm', value: '68 - 98 cm' },
      { label: '104 - 152 cm', value: '104 - 152 cm' },
    ],
  },
];

export interface PrefixPreset {
  label: string;
  en: string;
  ar: string;
}

export const PREFIX_OPTIONS: PrefixPreset[] = [
  { label: 'from / من', en: 'from', ar: 'من' },
  { label: 'Fixed Price / سعر ثابت', en: 'Fixed Price', ar: 'سعر ثابت' },
  { label: 'Special Offer / عرض خاص', en: 'Special Offer', ar: 'عرض خاص' },
  { label: 'None (No Prefix)', en: '', ar: '' },
];

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'KWD', country: 'Kuwait', arCountry: 'الكويت' },
  { code: 'SAR', country: 'Saudi Arabia', arCountry: 'السعودية' },
  { code: 'AED', country: 'UAE', arCountry: 'الإمارات' },
  { code: 'QAR', country: 'Qatar', arCountry: 'قطر' },
  { code: 'BHD', country: 'Bahrain', arCountry: 'البحرين' },
  { code: 'OMR', country: 'Oman', arCountry: 'عمان' },
];
