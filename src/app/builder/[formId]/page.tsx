// src/app/builder/[formId]/page.tsx
import { PrismaClient } from '@/generated/prisma';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { FormContent } from '@/lib/types';
import ClientBuilderWrapper from '@/components/ClientBuilderWrapper';

const prisma = new PrismaClient();

const BuilderPage = async ({ params }: { params: { formId: string } }) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
  });

  if (!form) {
    notFound();
  }

  const { elements, layout } = form.content as any;
  console.log('Fetched form content:', { elements, layout });

  return <ClientBuilderWrapper formId={params.formId} initialElements={elements} initialLayout={layout} />;
};

export default BuilderPage;
