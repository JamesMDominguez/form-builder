// src/app/forms/[formId]/submissions/actions.ts
'use server';

import { PrismaClient, ApprovalStatus } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

import { sendSubmissionApprovedEmail, sendSubmissionRejectedEmail } from '@/lib/email';

export const updateSubmissionStatus = async (formData: FormData) => {
  const submissionId = formData.get('submissionId') as string;
  const status = formData.get('status') as ApprovalStatus;

  const submission = await prisma.submission.update({
    where: { id: submissionId },
    data: { status },
  });

  const content = submission.content as { [key: string]: string };
  if (content.email) {
    if (status === 'APPROVED') {
      await sendSubmissionApprovedEmail(content.email);
    } else if (status === 'REJECTED') {
      await sendSubmissionRejectedEmail(content.email);
    }
  }

  revalidatePath(`/forms/${submission.formId}/submissions`);
};
