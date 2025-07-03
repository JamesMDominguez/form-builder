// src/app/forms/[formId]/page.tsx
import { PrismaClient } from '@/generated/prisma';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

import FormRenderer from '@/components/FormRenderer';

import { FormContent } from '@/lib/types';

const FormPage = async ({ params }: any) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
  });

  if (!form) {
    notFound();
  }

  const { elements, layout } = form.content as unknown as FormContent;

  return (
    <div className="container mx-auto p-4">
      <FormRenderer formId={params.formId} elements={elements} layout={layout} />
    </div>
  );
};

export default FormPage;
