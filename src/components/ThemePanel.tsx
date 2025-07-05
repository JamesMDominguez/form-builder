// src/components/ThemePanel.tsx
'use client';

import React from 'react';
import { StyleOptions } from '@/lib/types';

interface ThemePanelProps {
  styleOptions: StyleOptions;
  onUpdateStyleOption: (key: keyof StyleOptions, value: string) => void;
}

const ThemePanel = ({ styleOptions, onUpdateStyleOption }: ThemePanelProps) => {
  return (
    <div className="w-1/4 bg-white p-4 border-l">
      <h3 className="text-lg font-bold mb-4">Theme Options</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          type="color"
          value={styleOptions.backgroundColor}
          onChange={(e) => onUpdateStyleOption('backgroundColor', e.target.value)}
          className="w-full h-10 border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Text Color</label>
        <input
          type="color"
          value={styleOptions.textColor}
          onChange={(e) => onUpdateStyleOption('textColor', e.target.value)}
          className="w-full h-10 border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default ThemePanel;
