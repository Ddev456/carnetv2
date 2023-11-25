"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { plantActionEditDetails } from "../plant.action";
import { PLANT_STATE, PlantDetailSchema } from "./plant.schema";

// let startWeek = 0;
// let endWeek = 52;
// let weeks = Array(endWeek - startWeek + 1)
//   .fill(startWeek++, startWeek, endWeek)
//   .map(() => startWeek++);

export type PlantDetailFormProps = {
  defaultValue: PlantDetailSchema & {
    id: string;
  };
};

export const PlantDetail = ({ defaultValue }: PlantDetailFormProps) => {
  const form = useZodForm({
    schema: PlantDetailSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = await plantActionEditDetails({
          plantId: defaultValue.id,
          data: values,
        });

        if (data) {
          toast.success(data.message);
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="Tomate .." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Input placeholder="Légume-Fruit .." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PLANT_STATE.map((state) => (
                  <SelectItem value={state} className="capitalize ">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Miniature / Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Enregistrer</Button>
    </Form>
  );
};
