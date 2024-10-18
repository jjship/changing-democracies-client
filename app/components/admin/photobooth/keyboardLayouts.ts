import { KeyboardLayoutObject } from "react-simple-keyboard";

import { Language, LanguageAbbreviations } from "./boothConstats";

export type LayoutType = "default" | "shift-default" | "alt" | "shift-alt";

type CustomLayoutObject = {
  [K in LayoutType]: KeyboardLayoutObject[K];
};

const keyboardLayouts: Record<
  LanguageAbbreviations[Language],
  CustomLayoutObject
> = {
  EN: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w é r t y ú i ó p [ ] \\",
      "{lock} á s d f g h j k l ; ' {enter}",
      "{shift} z x ç v b ñ m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W É R T Y Ú I Ó P { } |",
      '{lock} Á S D F G H J K L : " {enter}',
      "{shift} Z X Ç V B Ñ M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  PL: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w ę r t y u i ó p [ ] \\",
      "{lock} ą ś d f g h j k ł ; ' {enter}",
      "{shift} ż ź ć v b ń m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W Ę R T Y U I Ó P { } |",
      '{lock} Ą Ś D F G H J K Ł : " {enter}',
      "{shift} Ż Ź Ć V B Ń M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  GR: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} ; ς ε ρ τ υ θ ι ο π [ ] \\",
      "{lock} α σ δ φ γ η ξ κ λ ΄ ' {enter}",
      "{shift} < ζ χ ψ ω β ν μ , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} : ΅ Ε Ρ Τ Υ Θ Ι Ο Π { } |",
      '{lock} Α Σ Δ Φ Γ Η Ξ Κ Λ ¨ " {enter}',
      "{shift} > Ζ Χ Ψ Ω Β Ν Μ < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} ; ς έ ρ τ ύ θ ί ό π [ ] \\",
      "{lock} ά σ δ φ γ ή ξ κ λ ΄ ' {enter}",
      "{shift} ζ χ ψ ώ β ν μ , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} : ΅ Έ Ρ Τ Ύ Θ Ί Ό Π { } |",
      '{lock} Ά Σ Δ Φ Γ Ή Ξ Κ Λ Ϊ Ϋ " {enter}',
      "{shift} > Ζ Χ Ψ Ώ Β Ν Μ < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  NL: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w ë r t y ü i ö p [ ] \\",
      "{lock} ä s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W Ë R T Y Ü I Ö P { } |",
      '{lock} Ä S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  FR: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} a z e r t y u i o p [ ] \\",
      "{lock} q s d f g h j k l m ; ' {enter}",
      "{shift} w x c v b n , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} A Z E R T Y U I O P { } |",
      '{lock} Q S D F G H J K L M : " {enter}',
      "{shift} W X C V B N < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} à z é r t y ù i ô p [ ] \\",
      "{lock} q s d f g h j k l m ; ' {enter}",
      "{shift} w x ç v b n , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} À Z É R T Y Ù I Ô P { } |",
      '{lock} Q S D F G H J K L M : " {enter}',
      "{shift} W X Ç V B N < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  CZ: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w ě r t y u i ó p [ ] \\",
      "{lock} á š ď f g h j k l ; ' {enter}",
      "{shift} ž č č v b ň m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W Ě R T Y U I Ó P { } |",
      '{lock} Á Š Ď F G H J K L : " {enter}',
      "{shift} Ž Č Č V B Ň M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  HR: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a š đ f g h j k l ; ' {enter}",
      "{shift} ž č č v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A Š Đ F G H J K L : " {enter}',
      "{shift} Ž Č Č V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  LT: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w ę r t y u į o p [ ] \\",
      "{lock} ą š d f g h j k l ; ' {enter}",
      "{shift} ž č č v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W Ę R T Y U Į O P { } |",
      '{lock} Ą Š D F G H J K L : " {enter}',
      "{shift} Ž Č Č V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  ES: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w é r t y ú i ó p [ ] \\",
      "{lock} á s d f g h j k l ; ' {enter}",
      "{shift} z x c v b ñ m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W É R T Y Ú I Ó P { } |",
      '{lock} Á S D F G H J K L : " {enter}',
      "{shift} Z X C V B Ñ M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  PT: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y ú i ó p [ ] \\",
      "{lock} ã s d f g h j k l ; ' {enter}",
      "{shift} z x ç v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y Ú I Ó P { } |",
      '{lock} Ã S D F G H J K L : " {enter}',
      "{shift} Z X Ç V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
  RO: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-default": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} ă ș d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} @ {space} {alt}",
    ],
    "shift-alt": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} Â Ș D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} @ {space} {alt}",
    ],
  },
};

export default keyboardLayouts;
