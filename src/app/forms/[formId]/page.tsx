// src/app/forms/[formId]/page.tsx
import { PrismaClient } from '@/generated/prisma';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

import FormRenderer from '@/components/FormRenderer';

import { FormElement, StyleOptions } from '@/lib/types';
import { Layout } from 'react-grid-layout';

interface FormPageProps {
  params: {
    formId: string;
  };
}

const FormPage = async ({ params }: FormPageProps) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
  });

  if (!form) {
    notFound();
  }

  // Ensure elements, layout, and styleOptions are extracted from content
  const { elements = [], layout = [], styleOptions = {} } = ((form.content || {}) as unknown) as { elements: FormElement[]; layout: Layout[]; styleOptions?: StyleOptions };

  return (
    <div className="container mx-auto p-4" style={styleOptions}>
      <div className="p-4">
        <FormRenderer formId={params.formId} elements={elements} layout={layout} />
      </div>
    </div>
  );
};

export default FormPage;
