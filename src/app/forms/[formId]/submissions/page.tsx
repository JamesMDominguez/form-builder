// src/app/forms/[formId]/submissions/page.tsx
import { PrismaClient } from '@/generated/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/sonner';
import { updateSubmissionStatus } from './actions';

const prisma = new PrismaClient();

interface SubmissionsPageProps {
  params: {
    formId: string;
  };
}

const SubmissionsPage = async ({ params }: SubmissionsPageProps) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
    include: { submissions: true },
  });

  if (!form) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Submissions for {form.name}</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {form.submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Badge variant={submission.status === 'PENDING' ? 'secondary' : submission.status === 'APPROVED' ? 'default' : 'destructive'}>
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell>{submission.createdAt.toLocaleString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submission Details</DialogTitle>
                      </DialogHeader>
                      <pre>{JSON.stringify(submission.content, null, 2)}</pre>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <form action={updateSubmissionStatus}>
                    <input type="hidden" name="submissionId" value={submission.id} />
                    <Button name="status" value="APPROVED" className="mr-2">Approve</Button>
                    <Button name="status" value="REJECTED" variant="destructive">Reject</Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toaster />
      </div>
    </div>
  );
};

export default SubmissionsPage;
