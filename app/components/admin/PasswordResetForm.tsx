"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/supabase/clients/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { baseUrl } from "@/lib/constants";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PasswordResetForm() {
  const [email] = useState("");
  const [submited, setSubmited] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email },
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${baseUrl}/auth/callback?next=/password-reset`,
    });

    if (error) {
      console.error(error);
    }
    setSubmited(true);
  }

  if (!isOpen) {
    return (
      <Button
        className="text-md w-full bg-yellow_secondary  text-black_bg hover:bg-green_accent"
        onClick={() => setIsOpen(true)}
      >
        Reset Password
      </Button>
    );
  }

  return !submited ? (
    <div className=" flex w-full flex-1 flex-col justify-center gap-2 sm:max-w-md">
      <Form {...form}>
        <form
          className="text-md flex w-full flex-1 flex-col justify-center gap-2 text-black_bg"
          onSubmit={form.handleSubmit(onSubmit)}
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
          <Button
            className="text-md justify-self-center bg-yellow_secondary py-2 text-black_bg hover:bg-green_accent"
            type="submit"
          >
            Send password reset email
          </Button>
        </form>
      </Form>
    </div>
  ) : (
    <>
      <p className="text-center">
        We have sent you an email with a link to reset your password.
      </p>
      <p className="text-center">check your SPAM folder</p>
    </>
  );
}
