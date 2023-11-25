"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { categoryActionCreate, categoryActionEdit } from "./category.action";
import { CATEGORY_STATE, CategoryFormSchema } from "./category.schema";

export type CategoryFormProps = {
  defaultValue?: CategoryFormSchema & {
    id: string;
  };
};

export const CategoryForm = ({ defaultValue }: CategoryFormProps) => {
  const form = useZodForm({
    schema: CategoryFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = defaultValue?.id
          ? await categoryActionEdit({
              categoryId: defaultValue.id,
              data: values,
            })
          : await categoryActionCreate(values);

        if (data) {
          toast.success(data.message);
          router.push(`/admin/categories/${data.category.id}`);
          router.refresh();
          return;
        }

        toast.error("Some error occurred", {
          description: serverError,
        });
        return;
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use{" "}
              <Link href="https://imgur.com">Imgur</Link> to host your image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Légume-Racine" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="## Some title" {...field} />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CATEGORY_STATE.map((state) => (
                  <SelectItem value={state} className="capitalize">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};
