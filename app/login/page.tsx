"use client";

import Link from "next/link";
import PasswordResetForm from "../components/admin/PasswordResetForm";
import { login } from "@/auth/actions";
import { useState } from "react";
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
import { useFormStatus } from "react-dom";
import {
  LoginValues,
  LoginValuesSchema,
} from "../components/admin/login/loginValues";
import { navButton } from "../components/admin/classNames";

export default function Login({
  searchParams: { next },
}: {
  searchParams: { next?: string };
}) {
  const { pending } = useFormStatus();
  const [email] = useState("");
  const [password] = useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginValuesSchema),
    defaultValues: { email, password },
    mode: "onChange",
  });

  return (
    <div className="bg-purple_lightest_bg flex min-h-screen flex-col items-center justify-center gap-5 p-5">
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-yellow_secondary px-4 py-2 text-sm font-bold text-foreground no-underline hover:bg-red_mains"
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
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 "
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="">
        <Form {...form}>
          <form
            className="flex w-full flex-1 flex-col justify-center gap-2 text-black_bg"
            onSubmit={form.handleSubmit((data) => {
              login(data, next);
            })}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-bold">Email</FormLabel>
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
                  <FormLabel className="text-md font-bold">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid || pending}
              className={`${navButton} my-5`}
              size="lg"
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
