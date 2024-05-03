"use client";

import Link from "next/link";
import PasswordResetForm from "../components/admin/PasswordResetForm";
import { login } from "./actions";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters long" })
    .max(100, { message: "Must be less than 100 characters long" }),
});

export type LoginValues = z.infer<typeof formSchema>;

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();
  const [email] = useState("");
  const [password] = useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email, password },
    mode: "onChange",
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-puprple_lightest_bg p-5">
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-yellow_secondary px-4 py-2 text-sm text-foreground no-underline hover:bg-red_mains"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div>
        <Form {...form}>
          <form
            className="flex w-full flex-1 flex-col justify-center gap-2 text-black_bg"
            action={formAction}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p aria-live="polite">{state?.message}</p>
            <Button
              type="submit"
              disabled={!form.formState.isValid || pending}
              className="text-md mb-6 rounded bg-yellow_secondary px-4 py-2 text-black_bg hover:bg-green_accent"
            >
              Log In
            </Button>
          </form>
        </Form>
        <PasswordResetForm />
      </div>
    </div>
  );
}
