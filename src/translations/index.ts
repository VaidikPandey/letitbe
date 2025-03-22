import en from "./en";
import hi from "./hi";

export interface TranslationType {
  [key: string]: any;
}

const translations: Record<string, TranslationType> = {
  en,
  hi,
};

export default translations;
