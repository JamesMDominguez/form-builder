// src/app/actions/form.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FormContent } from '@/lib/types';



export const saveForm = async (formId: string, content: FormContent) => {
  await prisma.form.update({
    where: { id: formId },
    data: { content: content },
  });
  revalidatePath(`/forms/${formId}`);
};

export const createForm = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  await prisma.form.create({
    data: {
      name,
      description,
      content: {
        elements: [],
        layout: [],
      },
    },
  });

  revalidatePath('/');
};