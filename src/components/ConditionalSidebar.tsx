'use client';

import React, { useContext } from 'react';
import { BuilderContext } from '@/lib/BuilderContext';
import Sidebar from './Sidebar';

const ConditionalSidebar = () => {
  const context = useContext(BuilderContext);
  const isPreviewMode = context?.isPreviewMode;

  return isPreviewMode ? null : <Sidebar />;
};

export default ConditionalSidebar;
