"use client";

import Designer from "@/components/Designer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  Active,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { DesignerProvider } from "@/context/DesignerContext";
import {
  ElementsType,
  FormElements,
} from "@/components/FormElements";
import { SidebarBtnElementDragOverlay } from "@/components/SidebarBtnElement";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { UpdateFormContent } from "@/actions/form";
import useDesigner from "@/hooks/useDesigner";
import PublishFormBtn from "@/components/PublishFormBtn";

function BuilderPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const { formId } = params;

  return (
    <DesignerProvider>
      <BuilderPageContent formId={formId} />
    </DesignerProvider>
  );
}

function BuilderPageContent({ formId }: { formId: string }) {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(Number(formId), jsonElements);
      toast.success("Your form has been saved");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <DndContext
      onDragStart={(event: DragStartEvent) => {
        setDraggedItem(event.active);
      }}
      onDragEnd={(event: DragEndEvent) => {
        setDraggedItem(null);
      }}
    >
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            Form Name
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                // preview
              }}
            >
              Preview
            </Button>
            <Button
              onClick={async () => {
                setIsSaving(true);
                await updateFormContent();
                setIsSaving(false);
              }}
              disabled={isSaving}
            >
              {isSaving ? <ImSpinner2 className="animate-spin" /> : "Save"}
            </Button>
            <PublishFormBtn id={Number(formId)} />
          </div>
        </div>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlay>
        {!draggedItem && null}
        {draggedItem &&
          (() => {
            const isDesignerBtnElement =
              draggedItem.data?.current?.isDesignerBtnElement;
            if (isDesignerBtnElement) {
              const type = draggedItem.data?.current?.type as ElementsType;
              return (
                <SidebarBtnElementDragOverlay
                  formElement={FormElements[type]}
                />
              );
            }
            return <div>Drag Overlay</div>;
          })()}
      </DragOverlay>
    </DndContext>
  );
}

export default BuilderPage;
