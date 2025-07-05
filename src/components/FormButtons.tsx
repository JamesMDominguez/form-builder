'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FormButtonsProps {
  formId: string;
}

const FormButtons = ({ formId }: FormButtonsProps) => {
  return (
    <>
      <Link href={`/builder/${formId}`}>
        <Button>Edit</Button>
      </Link>
      <Link href={`/forms/${formId}/submissions`}>
        <Button variant="outline">Submissions</Button>
      </Link>
    </>
  );
};

export default FormButtons;
