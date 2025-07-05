// src/components/Builder.tsx
'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Canvas from './Canvas';
import Properties from './Properties';
import ThemePanel from './ThemePanel';
import { Layout } from 'react-grid-layout';

import { saveForm } from '@/app/actions/form';
import FormRenderer from './FormRenderer';

import { FormElement, StyleOptions } from '@/lib/types';
import { BuilderContext } from '@/lib/BuilderContext';

import { Switch } from './ui/switch';
import { Label } from './ui/label';
import Toolbox from './Toolbox';

const Builder = ({ formId, initialElements = [], initialLayout = [], styleOptions, updateStyleOption }: { formId: string; initialElements?: FormElement[]; initialLayout?: Layout[]; styleOptions: StyleOptions; updateStyleOption: (key: keyof StyleOptions, value: string) => void; }) => {
  const [elements, setElements] = useState<FormElement[]>(initialElements);
  const [layout, setLayout] = useState<Layout[]>(initialLayout);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error('BuilderContext not found');
  }

  const { isPreviewMode, togglePreviewMode } = context;

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
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
    await saveForm(formId, content, styleOptions);
    alert('Form published!');
  };

  return (
    <div className="flex flex-col h-screen">
      {isPreviewMode ? (
        <div className="w-full h-full">
          <FormRenderer formId={formId} elements={elements} layout={layout} styleOptions={styleOptions} />
          <button
            className="absolute top-4 right-4 bg-gray-500 text-white p-2 rounded"
            onClick={togglePreviewMode}
          >
            Exit Preview
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between p-4 border-b">
            <Link href="/">
              <button className="bg-gray-500 text-white p-2 rounded">
                Back to Home
              </button>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={() => setIsThemePanelOpen(!isThemePanelOpen)}
              >
                Theme
              </button>
              <div className="flex items-center space-x-2">
                <Switch id="preview-mode" checked={isPreviewMode} onCheckedChange={togglePreviewMode} />
                <Label htmlFor="preview-mode">Preview</Label>
              </div>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
          </div>
          <div className="flex flex-grow">
            <Toolbox />
              <Canvas
                elements={elements}
                layout={layout}
                onLayoutChange={handleLayoutChange}
                onDrop={handleDrop}
                onSelectElement={handleSelectElement}
                styleOptions={styleOptions}
              />
            {isThemePanelOpen ? (
              <ThemePanel
                styleOptions={styleOptions}
                onUpdateStyleOption={updateStyleOption}
              />
            ) : (
              <Properties
                selectedElement={selectedElement}
                onUpdateElement={handleUpdateElement}
                onDeleteElement={handleDeleteElement}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};


export default Builder;