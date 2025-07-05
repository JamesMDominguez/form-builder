'use client';

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { FormElement } from '@/lib/types';
import { Layout } from 'react-grid-layout';
import { BuilderContext } from '@/lib/BuilderContext';

const Builder = dynamic(() => import('./Builder'), { ssr: false });

interface ClientBuilderWrapperProps {
  formId: string;
  initialElements: FormElement[];
  initialLayout: Layout[];
}

const ClientBuilderWrapper = ({ formId, initialElements, initialLayout }: ClientBuilderWrapperProps) => {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error('BuilderContext not found');
  }

  const { styleOptions, updateStyleOption } = context;

  return (
    <Builder
      formId={formId}
      initialElements={initialElements}
      initialLayout={initialLayout}
      styleOptions={styleOptions}
      updateStyleOption={updateStyleOption}
    />
  );
};

export default ClientBuilderWrapper;
