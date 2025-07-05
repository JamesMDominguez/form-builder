import { Layout } from 'react-grid-layout';

export interface StyleOptions {
  backgroundColor: string;
  textColor: string;
  // Add other options here in the future, like buttonColor, etc.
}

export interface FormElement {
  id: string;
  type: string;
  properties: Record<string, string | number>;
}

export interface FormContent {
  elements: FormElement[];
  layout: Layout[];
}