/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import translations from "../translations";

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
  scopedT: (scope: string) => (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(() => {
    try {
      // Check if running in the browser before accessing localStorage
      if (typeof window !== "undefined") {
        return localStorage.getItem("language") ?? "en";
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return "en"; // Default to 'en' if not in the browser or an error occurs
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && language) {
        // Save language preference to localStorage
        localStorage.setItem("language", language);
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [language]);

  const changeLanguage = (lang: string): void => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    // Split nested keys e.g., 'header.home'
    const keys = key.split(".");

    let translation: any = translations[language];
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key; // Fallback to key if translation not found
      }
    }

    return translation;
  };

  const scopedT =
    (scope: string) =>
    (key: string): string => {
      return t(`${scope}.${key}`);
    };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, scopedT }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export a helper to create reusable scoped translation functions
export const createScopedT = (scope: string) => {
  const { t } = useLanguage();
  return (key: string): string => t(`${scope}.${key}`);
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
