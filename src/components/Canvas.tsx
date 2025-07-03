// src/components/Canvas.tsx
'use client';

import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';

import { FormElement } from '@/lib/types';

interface CanvasProps {
  elements: FormElement[];
  layout: Layout[];
  onLayoutChange: (layout: Layout[]) => void;
  onDrop: (layout: Layout[], item: Layout, e: DragEvent) => void;
  onSelectElement: (element: FormElement) => void;
}

const Canvas = ({ elements, layout, onLayoutChange, onDrop, onSelectElement }: CanvasProps) => {
  return (
    <div className="w-1/2 p-4 border border-dashed border-gray-400">
      <GridLayout
        style={{ minHeight: '500px' }}
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
        {elements.map((element) => (
          <div
            key={element.id}
            onClick={() => onSelectElement(element)}
            className="border border-dashed border-gray-300 p-2"
          >
            {/* Render the actual form element based on its type */}
            {
              element.type === 'Image' ? (
                <img src={element.properties.src as string || undefined} alt="Form Image" className="w-full h-full object-contain" />
              ) : (
                <div>{element.type}</div>
              )
            }
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Canvas;