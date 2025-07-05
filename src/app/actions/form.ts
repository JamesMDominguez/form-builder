// src/app/actions/form.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FormContent, StyleOptions } from '@/lib/types';



export const saveForm = async (formId: string, content: FormContent, styleOptions: StyleOptions) => {
  await prisma.form.update({
    where: { id: formId },
    data: { content: content, styleOptions: styleOptions },
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
      userId: 'user_placeholder_id', // Replace with actual user ID
      content: {
        elements: [],
        layout: [],
      },
    },
  });

  revalidatePath('/');
};

export const updateForm = async (
  formId: string,
  name: string,
  description: string,
) => {
  await prisma.form.update({
    where: { id: formId },
    data: { name, description },
  });
  revalidatePath('/');
  revalidatePath(`/builder/${formId}`);
};

export const deleteForm = async (formId: string) => {
  await prisma.form.delete({
    where: { id: formId },
  });
  revalidatePath('/');
};