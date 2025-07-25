// src/components/FormRenderer.tsx
'use client';

import React from 'react';
import { submitForm } from '@/app/forms/[formId]/actions';

import { FormContent, FormElement, StyleOptions } from '@/lib/types';
import Image from 'next/image';

interface FormRendererProps extends FormContent {
  formId: string;
  styleOptions?: StyleOptions;
}

const FormRenderer = ({ formId, elements, layout, styleOptions }: FormRendererProps) => {
  const handleSubmit = async (formData: FormData) => {
    await submitForm(formId, formData);
    alert('Form submitted!');
  };

  return (
    <form action={handleSubmit} style={styleOptions}>
      <div className="grid grid-cols-12 gap-4">
        {elements.map((element: FormElement) => {
          const itemLayout = layout.find((l) => l.i === element.id);
          if (!itemLayout) {
            return null;
          }
          const isTextArea = element.type === 'TextField' && itemLayout && itemLayout.h > 1;
          return (
            <div
              key={element.id}
              style={{
                gridColumnStart: itemLayout.x + 1,
                gridColumnEnd: itemLayout.x + itemLayout.w + 1,
                gridRowStart: itemLayout.y + 1,
                gridRowEnd: itemLayout.y + itemLayout.h + 1,
              }}
            >
              <label className="block mb-2" style={{ color: styleOptions?.textColor }}>{element.properties.label}</label>
              {element.type === 'Title' && (
                <h2 className="text-2xl font-bold" style={{ color: styleOptions?.textColor }}>{element.properties.label}</h2>
              )}
              {isTextArea ? (
                <textarea
                  name={element.id}
                  className="w-full h-full p-2 border rounded"
                  style={{ color: styleOptions?.textColor }}
                />
              ) : element.type === 'TextField' && (
                <input
                  type="text"
                  name={element.id}
                  className="w-full p-2 border rounded"
                  style={{ color: styleOptions?.textColor }}
                />
              )}
              {element.type === 'Dropdown' && (
                <select name={element.id} className="w-full p-2 border rounded" style={{ color: styleOptions?.textColor }}>
                  {Array.isArray(element.properties.options) && element.properties.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {element.type === 'Checkbox' && (
                <input type="checkbox" name={element.id} />
              )}
              {element.type === 'Image' && (
                <Image
                  src={element.properties.src as string}
                  alt={
                    typeof element.properties.alt === 'string' && element.properties.alt.trim() !== ''
                      ? element.properties.alt
                      : 'Form image'
                  }
                  width={(element.properties.width as number) || 200}
                  height={(element.properties.height as number) || 150}
                />
              )}
            </div>
          );
        })}
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormRenderer;
