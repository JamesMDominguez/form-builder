"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";


export async function GetFormStats() {
  

  const stats = await prisma.form.aggregate({
    where: {
      userId: "12345",
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: "12345",
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form.id;
}

export async function GetForms() {
  

  return await prisma.form.findMany({
    where: {
      userId: "12345",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  

  return await prisma.form.findUnique({
    where: {
      userId: "12345",
      id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  

  return await prisma.form.update({
    where: {
      userId: "12345",
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: "12345",
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

import { Resend } from "resend";

// ... other imports

export async function SubmitForm(formUrl: string, content: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });

  const { name, id } = result;

  const submissionContent = JSON.parse(content);
  let submissionData = "";
  for (const key in submissionContent) {
    submissionData += `${key}: ${submissionContent[key]}\n`;
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "your-email@example.com", // TODO: replace with your email
    subject: `New submission for form: ${name}`,
    html: `<p>New submission for form: ${name}</p><p>Submission ID: ${id}</p><pre>${submissionData}</pre>`,
  });

  return result;
}

export async function GetFormWithSubmissions(id: number) {
  

  return await prisma.form.findUnique({
    where: {
      userId: "12345",
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
