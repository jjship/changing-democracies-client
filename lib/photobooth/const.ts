import p5 from "p5";

export type P = InstanceType<typeof p5>;

export const black = "#191818";
export const violet = "#8083ae";
export const pink = "#e7d8dd";
export const turquoise = "#6bdbd6";
export const darkRed = "#b85252";
export const grey = "#808881";
export const darkGrey = "#54534d";
export const yellowBrown = "#cf9855";

export const INACTIVITY_THRESHOLD = 180000; // 3 minutes in milliseconds

export const languages: Language[] = [
  "english",
  "polish",
  "greek",
  "flemish",
  "dutch",
  "french",
  "czech",
  "croatian",
  "lithuanian",
  "spanish",
  "portuguese",
  "romanian",
];

export type Language = keyof typeof languageAbbreviations;

export type LanguageAbbreviations = typeof languageAbbreviations;

export const languageAbbreviations = {
  english: "ENG",
  polish: "PL",
  greek: "GR",
  flemish: "FL",
  dutch: "NL",
  french: "FR",
  czech: "CZ",
  croatian: "HR",
  lithuanian: "LT",
  spanish: "ES",
  portuguese: "PT",
  romanian: "RO",
} as const;

export type Translations = typeof translations;

export function getTranslation(
  language: Language,
  text: string,
  translations: Translations,
) {
  return translations[language][text];
}

export const translations: Record<Language, Record<string, string>> = {
  english: {
    "Make your own poster": "Make your own poster",
    "Express your feelings about Democracy":
      "Express your feelings about Democracy",
    "What is your name?": "What is your name?",
    "Write your statement": "Write your statement",
    Next: "Next",
    Finish: "Finish",
    "Repeat picture": "Repeat picture",
    "Take a picture": "Take a picture",
    Start: "Start",
  },
  polish: {
    "Make your own poster": "Stwórz własny plakat",
    "Express your feelings about Democracy": "Wyraź swoje uczucia o demokracji",
    "What is your name?": "Jak masz na imię?",
    "Write your statement": "Napisz swoje oświadczenie",
    Next: "Dalej",
    Finish: "Zakończ",
    "Repeat picture": "Powtórz zdjęcie",
    "Take a picture": "Zrób zdjęcie",
    Start: "Start",
  },
  greek: {
    "Make your own poster": "Φτιάξε τη δική σου αφίσα",
    "Express your feelings about Democracy":
      "Εκφράστε τα συναισθήματά σας για τη Δημοκρατία",
    "What is your name?": "Πώς σε λένε;",
    "Write your statement": "Γράψτε τη δήλωσή σας",
    Next: "Επόμενο",
    Finish: "Τελείωσε",
    "Repeat picture": "Επανάληψη φωτογραφίας",
    "Take a picture": "Βγάλτε μια φωτογραφία",
    Start: "Έναρξη",
  },
  flemish: {
    "Make your own poster": "Maak je eigen poster",
    "Express your feelings about Democracy":
      "Druk je gevoelens over democratie uit",
    "What is your name?": "Hoe heet je?",
    "Write your statement": "Schrijf je verklaring",
    Next: "Volgende",
    Finish: "Voltooien",
    "Repeat picture": "Herhaal afbeelding",
    "Take a picture": "Maak een foto",
    Start: "Start",
  },
  dutch: {
    "Make your own poster": "Maak je eigen poster",
    "Express your feelings about Democracy":
      "Voeg jouw inzicht over democratie toe",
    "What is your name?": "Hoe heet je?",
    "Write your statement": "Schrijf je verklaring",
    Next: "Volgende",
    Finish: "Afronden",
    "Repeat picture": "Foto herhalen",
    "Take a picture": "Maak een foto",
    Start: "Starten",
  },
  french: {
    "Make your own poster": "Créez votre propre affiche",
    "Express your feelings about Democracy":
      "Exprimez vos sentiments sur la démocratie",
    "What is your name?": "Quel est votre nom?",
    "Write your statement": "Rédigez votre déclaration",
    Next: "Suivant",
    Finish: "Terminer",
    "Repeat picture": "Répéter la photo",
    "Take a picture": "Prenez une photo",
    Start: "Commencer",
  },
  czech: {
    "Make your own poster": "Vytvořte si vlastní plakát",
    "Express your feelings about Democracy":
      "Vyjádřete své pocity vůči demokracii",
    "What is your name?": "Jaké je vaše jméno?",
    "Write your statement": "Napište své prohlášení",
    Next: "Další",
    Finish: "Dokončit",
    "Repeat picture": "Opakovat obrázek",
    "Take a picture": "Vyfotit",
    Start: "Začít",
  },
  croatian: {
    "Make your own poster": "Napravite vlastiti poster",
    "Express your feelings about Democracy":
      "Izrazite svoje osjećaje o demokraciji",
    "What is your name?": "Kako se zoveš?",
    "Write your statement": "Napišite svoju izjavu",
    Next: "Sljedeći",
    Finish: "Završi",
    "Repeat picture": "Ponovi sliku",
    "Take a picture": "Uslikaj",
    Start: "Počni",
  },
  lithuanian: {
    "Make your own poster": "Sukurkite savo plakatą",
    "Express your feelings about Democracy":
      "Išreikškite savo jausmus apie demokratiją",
    "What is your name?": "Koks tavo vardas?",
    "Write your statement": "Parašykite savo pareiškimą",
    Next: "Toliau",
    Finish: "Baigti",
    "Repeat picture": "Pakartoti nuotrauką",
    "Take a picture": "Padarykite nuotrauką",
    Start: "Pradėti",
  },
  spanish: {
    "Make your own poster": "Haz tu propio póster",
    "Express your feelings about Democracy":
      "Expresa tus sentimientos sobre la democracia",
    "What is your name?": "¿Cómo te llamas?",
    "Write your statement": "Escribe tu declaración",
    Next: "Siguiente",
    Finish: "Finalizar",
    "Repeat picture": "Repetir foto",
    "Take a picture": "Tomar una foto",
    Start: "Iniciar",
  },
  portuguese: {
    "Make your own poster": "Faça seu próprio cartaz",
    "Express your feelings about Democracy":
      "Expresse seus sentimentos sobre a democracia",
    "What is your name?": "Qual é o seu nome?",
    "Write your statement": "Escreva sua declaração",
    Next: "Próximo",
    Finish: "Concluir",
    "Repeat picture": "Repetir foto",
    "Take a picture": "Tirar uma foto",
    Start: "Iniciar",
  },
  romanian: {
    "Make your own poster": "Fă-ți propriul poster",
    "Express your feelings about Democracy":
      "Exprimă-ți sentimentele despre democrație",
    "What is your name?": "Cum te numești?",
    "Write your statement": "Scrie-ți declarația",
    Next: "Următorul",
    Finish: "Finalizează",
    "Repeat picture": "Repetă poza",
    "Take a picture": "Fă o poză",
    Start: "Începe",
  },
} as const;

export const layouts: Layouts = {
  other: [
    "1 2 3 4 5 6 7 8 9 0 bksp",
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "shift z x c v b n m",
    "alt space enter language",
  ],
  greek: [
    "1 2 3 4 5 6 7 8 9 0 bksp",
    "ς ε ρ τ υ θ ι ο π",
    "α σ δ φ γ η ξ κ λ",
    "shift ζ χ ψ ω β ν μ",
    "alt space enter language",
  ],
  french: [
    "1 2 3 4 5 6 7 8 9 0 bksp",
    "a z e r t y u i o p",
    "q s d f g h j k l m",
    "shift w x c v b n",
    "alt space enter language",
  ],
};

export type Layouts = Record<"greek" | "french" | "other", string[]>;

export type AltLayouts = Record<Language, Record<string, string>>;

export const altLayouts: AltLayouts = {
  english: {
    a: "á",
    e: "é",
    i: "í",
    o: "ó",
    u: "ú",
    n: "ñ",
    c: "ç",
  },
  polish: {
    a: "ą",
    c: "ć",
    e: "ę",
    l: "ł",
    n: "ń",
    o: "ó",
    s: "ś",
    z: "ż",
    x: "ź",
  },
  greek: {
    α: "ά",
    ε: "έ",
    η: "ή",
    ι: "ί",
    ο: "ό",
    υ: "ύ",
    ω: "ώ",
  },
  flemish: {
    a: "ä",
    e: "ë",
    i: "ï",
    o: "ö",
    u: "ü",
  },
  dutch: {
    a: "ä",
    e: "ë",
    i: "ï",
    o: "ö",
    u: "ü",
  },
  french: {
    a: "à",
    e: "é",
    u: "ù",
    i: "î",
    o: "ô",
    c: "ç",
  },
  czech: {
    a: "á",
    c: "č",
    d: "ď",
    e: "ě",
    n: "ň",
    o: "ó",
    r: "ř",
    s: "š",
    t: "ť",
    u: "ů",
    z: "ž",
  },
  croatian: {
    c: "č",
    d: "đ",
    s: "š",
    z: "ž",
  },
  lithuanian: {
    a: "ą",
    c: "č",
    e: "ę",
    i: "į",
    s: "š",
    u: "ų",
    z: "ž",
  },
  spanish: {
    a: "á",
    e: "é",
    i: "í",
    o: "ó",
    u: "ú",
    n: "ñ",
  },
  portuguese: {
    a: "ã",
    c: "ç",
    e: "é",
    i: "í",
    o: "ó",
    u: "ú",
  },
  romanian: {
    a: "ă",
    A: "Â",
    i: "î",
    s: "ș",
    t: "ț",
    u: "u̯",
  },
} as const;
