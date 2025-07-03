// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createForm } from './actions/form';



export default async function Home() {
  const forms = await prisma.form.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">My Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forms.map((form) => (
              <Card key={form.id}>
                <CardHeader>
                  <CardTitle>{form.name}</CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Link href={`/builder/${form.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Link href={`/forms/${form.id}/submissions`}>
                    <Button variant="outline">Submissions</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Create New Form</h2>
          <Card>
            <CardContent>
              <form action={createForm}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <Input type="text" id="name" name="name" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block mb-2">
                    Description
                  </label>
                  <Input type="text" id="description" name="description" />
                </div>
                <Button type="submit">Create</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}