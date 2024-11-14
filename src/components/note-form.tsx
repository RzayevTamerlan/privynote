'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTextAreaPlaceholder } from '@hooks/useTextAreaPlaceholder';
import { NoteFormSchema } from '@schemas/NoteFormSchema';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Switch } from '@ui/switch';
import { Textarea } from '@ui/textarea';
import { cn } from '@utils/cn';
import type { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface NewNoteFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  loading: boolean;
  onSubmit: (data: z.infer<typeof NoteFormSchema>) => Promise<void>;
  className?: string;
}

const NoteForm: FC<NewNoteFormProps> = ({ loading, onSubmit, className, ...props }) => {
  const form = useForm<z.infer<typeof NoteFormSchema>>({
    resolver: zodResolver(NoteFormSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      content: '',
      isPrivate: false,
      password: '',
      isEditable: false,
      editPassword: '',
    },
  });
  const { textAreaPlaceholder } = useTextAreaPlaceholder();

  return (
    <Form
      {...props}
      {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`${cn('my-14 flex flex-col gap-7', className)}`}>
        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Your content</FormLabel>
              <FormControl>
                <Textarea
                  className="text-lg min-h-[200px]"
                  placeholder={textAreaPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* This should now display content errors */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormLabel className="text-xl">Is your note private?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage /> {/* This should display validation messages for isPrivate */}
            </FormItem>
          )}
        />


        {/* Password Field (conditionally required) */}
        {form.watch('isPrivate') && (
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
        )}

        {/*Field for setting the password for editing*/}
        <FormField
          control={form.control}
          name="isEditable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormLabel className="text-xl">Is your note editable?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage /> {/* This should display validation messages for isEditable */}
            </FormItem>
          )}
        />

        {/*Field for setting the password for editing*/}
        {form?.watch('isEditable') && (
          <FormField
            control={form.control}
            name="editPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password for editing</FormLabel>
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
        )}

        <Button disabled={loading} className="text-xl py-5 px-3 font-semibold" type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export { NoteForm };
