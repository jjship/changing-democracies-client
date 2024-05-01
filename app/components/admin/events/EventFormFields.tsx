"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "../../../../lib/utils";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database, EventDbEntry } from "../../../../types/database";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export type FormEvent = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    id: z.number(),
    startDate: z.coerce.date(),
    endDate: z.date(),
    title: z.coerce
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(21, { message: "Title must be at most 21 characters long" })
      .optional(),
    type: z
      .string()
      .max(18, { message: "Event type must be at most 18 characters long" })
      .optional(),
    location: z
      .string()
      .max(18, { message: "Location must be at most 18 characters long" })
      .optional(),
    participants: z.coerce
      .number()
      .int({ message: "Please enter a number" })
      .nonnegative({ message: "Please enter a number" }),
    category: z
      .string()
      .max(18, { message: "Category must be at most 18 characters long" })
      .optional(),
    link: z
      .string()
      .url({ message: "Link must be a valid URL" })
      .or(z.literal("")),
    created_at: z.date(),
    created_by: z.string().nullable(),
    modified_at: z.date().nullable(),
    modified_by: z.string().nullable(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be prior to end date",
    path: ["startDate"],
  });

function parseFormEvent({
  formEvent,
  user,
}: {
  formEvent: FormEvent;
  user: User;
}): EventDbEntry {
  return {
    id: formEvent.id,
    start_date: format(formEvent.startDate, "yyyy/MM/dd"),
    end_date: format(formEvent.endDate, "yyyy/MM/dd"),
    title: formEvent.title ?? null,
    type: formEvent.type ?? null,
    location: formEvent.location ?? null,
    participants: formEvent.participants ?? 0,
    category: formEvent.category ?? null,
    link: formEvent.link ?? null,
    created_at: formEvent.created_at.toISOString() ?? new Date().toISOString(),
    created_by: formEvent.created_by ?? user.id,
    modified_at: new Date().toISOString(),
    modified_by: user.id,
  };
}

export default function EventFormFields({
  defaultValues,
}: {
  defaultValues: FormEvent;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [submited, setSubmited] = useState<boolean | null>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, [supabase]);

  const form = useForm<FormEvent>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(values: FormEvent) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSubmited(true);
      return;
    }

    const event: EventDbEntry = parseFormEvent({ formEvent: values, user });

    const { error } = await supabase.from("events").upsert(event);

    if (error) {
      console.log(error);
    }

    setSubmited(true);
  }
  //TODO move logged in up
  return !submited ? (
    <>
      <div className="flex items-center justify-end gap-4 p-5">
        {user && `logged in as ${user.email}`}
        <form action="/auth/sign-out" method="post">
          <button className="bg-red mb-2 rounded bg-red_mains px-4 py-2 text-white">
            Log Out
          </button>
        </form>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              onSubmit(form.getValues());
            })}
          >
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd-MM-yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("2023-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>&nbsp;</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd-MM-yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("2023-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Enter Start Date if entering a single day event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Max 3 lines of max 7 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Max 15 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Max 15 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participants</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Number of participants</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Max 15 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Link to the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-5 w-full hover:bg-green_accent hover:text-black_bg"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  ) : (
    redirect("/admin")
  );
}
