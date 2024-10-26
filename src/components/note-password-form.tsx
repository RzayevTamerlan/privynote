'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NotePasswordSchema } from '@schemas/NotePasswordSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { cn } from '@utils/cn';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface NotePasswordFormProps {
  loading: boolean;
  onSubmit: (data: z.infer<typeof NotePasswordSchema>) => Promise<void>;
  className?: string;
}

const NotePasswordForm: FC<NotePasswordFormProps> = ({ loading, onSubmit, className }) => {
  const form = useForm<z.infer<typeof NotePasswordSchema>>({
    resolver: zodResolver(NotePasswordSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`${cn('my-5 flex flex-col gap-5 w-full', className)}`}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* This should display password errors */}
            </FormItem>
          )}
        />

        <Button disabled={loading} className="text-lg py-5 px-3 font-semibold" type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export { NotePasswordForm };