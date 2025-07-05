'use client';

import { createContext, useState } from 'react';
import { StyleOptions } from './types';

type BuilderContextType = {
  styleOptions: StyleOptions;
  updateStyleOption: (key: keyof StyleOptions, value: string) => void;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export const BuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const updateStyleOption = (key: keyof StyleOptions, value: string) => {
    setStyleOptions((prev) => ({ ...prev, [key]: value }));
  };

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  return (
    <BuilderContext.Provider value={{ styleOptions, updateStyleOption, isPreviewMode, togglePreviewMode }}>
      {children}
    </BuilderContext.Provider>
  );
};
