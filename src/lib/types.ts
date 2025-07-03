// src/lib/types.ts
import { Layout } from 'react-grid-layout';

export interface FormElement {
  id: string;
  type: 'Title' | 'TextField' | 'Dropdown' | 'Checkbox' | 'Image';
  properties: { [key: string]: string | number | string[] };
}

export interface FormContent {
  elements: FormElement[];
  layout: Layout[];
}
