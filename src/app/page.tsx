// src/app/page.tsx
import { prisma } from '@/lib/prisma';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormButtons from '@/components/FormButtons';
import { createForm } from './actions/form';
import FormCardActions from '@/components/FormCardActions';



export default async function Home() {
  const forms = await prisma.form.findMany();

  return (
    <div className="container mx-auto p-4 flex">
      <div className="flex-1 flex justify-center items-start p-4">
        <div className="w-full max-w-5xl rounded-2xl bg-gray-50 border border-gray-200 shadow p-8 mt-8">
          <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">My Forms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forms.map((form) => (
                  <div key={form.id} className="relative">
                    <Card>
                      <CardHeader>
                        <CardTitle>{form.name}</CardTitle>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <FormButtons formId={form.id} />
                      </CardFooter>
                    </Card>
                    <FormCardActions formId={form.id} formName={form.name} />
                  </div>
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
      </div>
    </div>
  );
}