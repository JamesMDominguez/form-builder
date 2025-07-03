// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendSubmissionApprovedEmail = async (to: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Your submission has been approved!',
    text: 'Congratulations! Your form submission has been approved.',
  });
};

export const sendSubmissionRejectedEmail = async (to: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Your submission has been rejected',
    text: 'We regret to inform you that your form submission has been rejected.',
  });
};
