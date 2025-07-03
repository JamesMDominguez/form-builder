// src/components/Properties.tsx
import React from 'react';

import { FormElement } from '@/lib/types';

interface PropertiesProps {
  selectedElement: FormElement | null;
  onUpdateElement: (elementId: string, newProperties: FormElement['properties']) => void;
  onDeleteElement: (elementId: string) => void;
}

const Properties = ({ selectedElement, onUpdateElement, onDeleteElement }: PropertiesProps) => {
  if (!selectedElement) {
    return (
      <div className="w-1/4 p-4 border-l">
        <h2 className="text-lg font-bold mb-4">Properties</h2>
        <p>Select an element to see its properties.</p>
      </div>
    );
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateElement(selectedElement.id, { ...selectedElement.properties, [name]: value });
  };

  return (
    <div className="w-1/4 p-4 border-l">
      <h2 className="text-lg font-bold mb-4">Properties</h2>
      <div>
        <label className="block mb-2">Label</label>
        <input
          type="text"
          name="label"
          className="w-full p-2 border rounded"
          value={selectedElement.properties.label || ''}
          onChange={handlePropertyChange}
        />
      </div>
      {selectedElement.type === 'Image' && (
        <div className="mt-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="src"
            className="w-full p-2 border rounded"
            value={selectedElement.properties.src || ''}
            onChange={handlePropertyChange}
          />
        </div>
      )}
      {selectedElement.type === 'Image' && (
        <div className="mt-4">
          <label className="block mb-2">Width</label>
          <input
            type="number"
            name="width"
            className="w-full p-2 border rounded"
            value={selectedElement.properties.width as number || ''}
            onChange={handlePropertyChange}
          />
        </div>
      )}
      {selectedElement.type === 'Image' && (
        <div className="mt-4">
          <label className="block mb-2">Height</label>
          <input
            type="number"
            name="height"
            className="w-full p-2 border rounded"
            value={selectedElement.properties.height as number || ''}
            onChange={handlePropertyChange}
          />
        </div>
      )}
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded"
        onClick={() => onDeleteElement(selectedElement.id)}
      >
        Delete Element
      </button>
    </div>
  );
};

export default Properties;