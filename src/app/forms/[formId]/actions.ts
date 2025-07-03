// src/app/forms/[formId]/actions.ts
'use server';

import { PrismaClient } from '@/generated/prisma';  
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const submitForm = async (formId: string, formData: FormData) => {
  const content: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      content[key] = value;
    }
  }

  await prisma.submission.create({
    data: {
      formId,
      content: content,
    },
  });

  revalidatePath(`/forms/${formId}`);
};
