// src/app/builder/[formId]/page.tsx
import { PrismaClient } from '@/generated/prisma';
import { notFound } from 'next/navigation';

import { BuilderProvider } from '@/lib/BuilderContext';
import ClientBuilderWrapper from '@/components/ClientBuilderWrapper';
import { FormContent, FormElement } from '@/lib/types';
import { Layout } from 'react-grid-layout';

const prisma = new PrismaClient();

interface BuilderPageProps {
  params: {
    formId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BuilderPage = async ({ params }: BuilderPageProps) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
  });

  if (!form) {
    notFound();
  }

  const { elements, layout } = form.content as unknown as FormContent;
  console.log('Fetched form content:', { elements, layout });

  return (
    <BuilderProvider>
        <ClientBuilderWrapper formId={params.formId} initialElements={elements as FormElement[]} initialLayout={layout as Layout[]} />
    </BuilderProvider>
  );
};

export default BuilderPage;
