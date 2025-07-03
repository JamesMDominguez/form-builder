'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FormElement } from '@/lib/types';
import { Layout } from 'react-grid-layout';

const Builder = dynamic(() => import('./Builder'), { ssr: false });

interface ClientBuilderWrapperProps {
  formId: string;
  initialElements: FormElement[];
  initialLayout: Layout[];
}

const ClientBuilderWrapper = ({ formId, initialElements, initialLayout }: ClientBuilderWrapperProps) => {
  return (
    <Builder
      formId={formId}
      initialElements={initialElements}
      initialLayout={initialLayout}
    />
  );
};

export default ClientBuilderWrapper;
