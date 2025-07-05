// src/components/Canvas.tsx
'use client';

import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import Image from 'next/image';

import { FormElement, StyleOptions } from '@/lib/types';

interface CanvasProps {
  elements: FormElement[];
  layout: Layout[];
  onLayoutChange: (layout: Layout[]) => void;
  onDrop: (layout: Layout[], item: Layout, e: DragEvent) => void;
  onSelectElement: (element: FormElement) => void;
  styleOptions: StyleOptions;
}

const Canvas = ({ elements, layout, onLayoutChange, onDrop, onSelectElement, styleOptions }: CanvasProps) => {
  return (
    <div className="w-full p-4 border border-dashed border-gray-400">
      <GridLayout
        style={{ minHeight: '500px', ...styleOptions }}
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        isDroppable={true}
        onDrop={onDrop}
        droppingItem={{ i: '__dropping-elem__', w: 2, h: 2 }}
        // You can customize the placeholder style here
        // dropPlaceHolder={(item) => <div style={{ border: '2px dashed blue' }}></div>}
      >
        {elements.map((element) => {
          const itemLayout = layout.find((l) => l.i === element.id);
          const isTextArea = element.type === 'TextField' && itemLayout && itemLayout.h > 1;

          return (
            <div
              key={element.id}
              onClick={() => onSelectElement(element)}
              className="border border-dashed border-gray-300 p-2 flex flex-col h-full"
            >
              <label className="block mb-2" style={{ color: styleOptions.textColor }}>{element.properties.label}</label>
              {/* Render the actual form element based on its type */}
              <div className="flex-grow">
                {
                  element.type === 'Title' ? (
                    <h2 className="text-2xl font-bold" style={{ color: styleOptions.textColor }}>{element.properties.label}</h2>
                  ) : isTextArea ? (
                    <textarea
                      name={element.id}
                      className="w-full h-full p-2 border rounded"
                      placeholder="Text Area"
                      style={{ color: styleOptions.textColor }}
                    />
                  ) : element.type === 'TextField' ? (
                    <input
                      type="text"
                      name={element.id}
                      className="w-full p-2 border rounded"
                      placeholder="Text Field"
                      style={{ color: styleOptions.textColor }}
                    />
                  ) : element.type === 'Dropdown' ? (
                    <select name={element.id} className="w-full p-2 border rounded" style={{ color: styleOptions.textColor }}>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  ) : element.type === 'Checkbox' ? (
                    <input type="checkbox" name={element.id} />
                  ) : element.type === 'Image' ? (
                    <Image src={element.properties.src as string || 'https://via.placeholder.com/150'} alt="Form Image" className="w-full h-full object-contain" width={200} height={150} />
                  ) : (
                    <div>{element.type}</div>
                  )
                }
              </div>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default Canvas;