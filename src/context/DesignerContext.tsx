"use client";

import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "@/components/FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  moveElement: (id: string, toIndex: number) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  const moveElement = (id: string, toIndex: number) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      const [removed] = newElements.splice(index, 1);
      newElements.splice(toIndex, 0, removed);
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        moveElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
