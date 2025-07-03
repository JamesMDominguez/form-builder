// src/components/Builder.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Toolbox from './Toolbox';
import Canvas from './Canvas';
import Properties from './Properties';
import { Layout } from 'react-grid-layout';

import { saveForm } from '@/app/actions/form';
import { FormElement } from '@/lib/types';
import FormRenderer from './FormRenderer';

const Builder = ({ formId, initialElements = [], initialLayout = [] }: { formId: string; initialElements?: FormElement[]; initialLayout?: Layout[]; }) => {
  const [elements, setElements] = useState<FormElement[]>(initialElements);
  const [layout, setLayout] = useState<Layout[]>(initialLayout);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDrop = (newLayout: Layout[], item: Layout, e: DragEvent) => {
    const type = e.dataTransfer?.getData('text/plain') as FormElement['type'];
    const newElement: FormElement = {
      id: Date.now().toString(),
      type,
      properties: { 
        label: `${type} Label`,
        ...(type === 'Image' && { width: 200, height: 150, src: '' }),
      },
    };
    setElements([...elements, newElement]);
    setLayout([...layout, { ...item, i: newElement.id }]);
  };

  const handleSelectElement = (element: FormElement) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (elementId: string, newProperties: FormElement['properties']) => {
    const newElements = elements.map(el => el.id === elementId ? { ...el, properties: newProperties } : el);
    setElements(newElements);
    setSelectedElement(newElements.find(el => el.id === elementId) || null);
  };

  const handleDeleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    setLayout(layout.filter(l => l.i !== elementId));
    setSelectedElement(null);
  };

  const handlePublish = async () => {
    const content = {
      elements,
      layout,
    };
    await saveForm(formId, content);
    alert('Form published!');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-4 border-b">
        <Link href="/">
          <button className="bg-gray-500 text-white p-2 rounded">
            Back to Home
          </button>
        </Link>
        <div className="flex">
          <button
            className="bg-gray-500 text-white p-2 rounded mr-2"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      <div className="flex flex-grow">
        {isPreviewMode ? (
          <div className="w-full p-4">
            <FormRenderer formId={formId} elements={elements} layout={layout} />
          </div>
        ) : (
          <>
            <Toolbox />
            <Canvas
              elements={elements}
              layout={layout}
              onLayoutChange={handleLayoutChange}
              onDrop={handleDrop}
              onSelectElement={handleSelectElement}
            />
            <Properties
              selectedElement={selectedElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Builder;