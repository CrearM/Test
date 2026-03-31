// Project: 21 | Author: 9e9db132-363d-4411-9541-8836de8a9da6 | Generated: 2026-03-30T13:54:31.462Z | Build: #1
export interface LearningItem {
  id: string;
  char: string;
  transliteration: string;
  word?: string;
  wordEng?: string;
}

export interface Category {
  id: string;
  title: string;
  englishTitle: string;
  imageLock: number;
  items: LearningItem[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'alphabet',
    title: 'મૂળાક્ષર',
    englishTitle: 'Alphabets',
    imageLock: 1,
    items: [
      { id: 'k', char: 'ક', transliteration: 'Ka', word: 'કમળ', wordEng: 'Lotus' },
      { id: 'kh', char: 'ખ', transliteration: 'Kha', word: 'ખટારો', wordEng: 'Truck' },
      { id: 'g', char: 'ગ', transliteration: 'Ga', word: 'ગાય', wordEng: 'Cow' },
      { id: 'gh', char: 'ઘ', transliteration: 'Gha', word: 'ઘર', wordEng: 'House' },
      { id: 'ch', char: 'ચ', transliteration: 'Cha', word: 'ચકલી', wordEng: 'Sparrow' },
      { id: 'chh', char: 'છ', transliteration: 'Chha', word: 'છત્રી', wordEng: 'Umbrella' },
      { id: 'j', char: 'જ', transliteration: 'Ja', word: 'જલેબી', wordEng: 'Jalebi' },
      { id: 'zh', char: 'ઝ', transliteration: 'Zha', word: 'ઝાડ', wordEng: 'Tree' },
    ]
  },
  {
    id: 'numbers',
    title: 'અંકો',
    englishTitle: 'Numbers',
    imageLock: 2,
    items: [
      { id: 'n1', char: '૧', transliteration: 'Ek', wordEng: 'One' },
      { id: 'n2', char: '૨', transliteration: 'Be', wordEng: 'Two' },
      { id: 'n3', char: '૩', transliteration: 'Tran', wordEng: 'Three' },
      { id: 'n4', char: '૪', transliteration: 'Char', wordEng: 'Four' },
      { id: 'n5', char: '૫', transliteration: 'Panch', wordEng: 'Five' },
      { id: 'n6', char: '૬', transliteration: 'Chha', wordEng: 'Six' },
      { id: 'n7', char: '૭', transliteration: 'Saat', wordEng: 'Seven' },
      { id: 'n8', char: '૮', transliteration: 'Aath', wordEng: 'Eight' },
      { id: 'n9', char: '૯', transliteration: 'Nav', wordEng: 'Nine' },
      { id: 'n10', char: '૧૦', transliteration: 'Das', wordEng: 'Ten' },
    ]
  },
  {
    id: 'colors',
    title: 'રંગો',
    englishTitle: 'Colors',
    imageLock: 3,
    items: [
      { id: 'c1', char: 'લાલ', transliteration: 'Laal', wordEng: 'Red' },
      { id: 'c2', char: 'લીલો', transliteration: 'Leelo', wordEng: 'Green' },
      { id: 'c3', char: 'પીળો', transliteration: 'Peelo', wordEng: 'Yellow' },
      { id: 'c4', char: 'વાદળી', transliteration: 'Vadali', wordEng: 'Blue' },
      { id: 'c5', char: 'કાળો', transliteration: 'Kaalo', wordEng: 'Black' },
      { id: 'c6', char: 'સફેદ', transliteration: 'Safed', wordEng: 'White' },
      { id: 'c7', char: 'ગુલાબી', transliteration: 'Gulaabi', wordEng: 'Pink' },
      { id: 'c8', char: 'નારંગી', transliteration: 'Naarangi', wordEng: 'Orange' },
    ]
  },
  {
    id: 'animals',
    title: 'પ્રાણીઓ',
    englishTitle: 'Animals',
    imageLock: 4,
    items: [
      { id: 'a1', char: 'કૂતરો', transliteration: 'Kutaro', wordEng: 'Dog' },
      { id: 'a2', char: 'બિલાડી', transliteration: 'Biladi', wordEng: 'Cat' },
      { id: 'a3', char: 'ગાય', transliteration: 'Gaay', wordEng: 'Cow' },
      { id: 'a4', char: 'હાથી', transliteration: 'Haathi', wordEng: 'Elephant' },
      { id: 'a5', char: 'સિંહ', transliteration: 'Sinh', wordEng: 'Lion' },
      { id: 'a6', char: 'વાઘ', transliteration: 'Vaagh', wordEng: 'Tiger' },
      { id: 'a7', char: 'ઘોડો', transliteration: 'Ghodo', wordEng: 'Horse' },
      { id: 'a8', char: 'શિયાળ', transliteration: 'Shiyaal', wordEng: 'Fox' },
    ]
  }
];