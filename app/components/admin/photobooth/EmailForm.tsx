"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import sendImage from "../posters/sendImage";
import { useRouter } from "next/navigation";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export type EmailFormProps = {
  imageUrl: string;
  fileName: string;
  location: string;
};

export default function EmailForm({
  imageUrl,
  fileName,
  location,
}: EmailFormProps) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState<string>("");

  const form = useForm<{ address: string }>({
    defaultValues: {
      address: address,
    },
  });

  const sendEmail = useCallback(
    async (email: string) => {
      sendImage({ imageUrl, fileName, email });
      setSubmitted(true);
      router.push(`/admin/photobooth/${location}`);
    },
    [imageUrl, fileName, location, router],
  );

  const onSubmit = (values: { address: string }) => {
    const email = values.address.toLowerCase().trim();
    setAddress(email);
    sendEmail(email);
    setSubmitted(true);
  };

  const handleChange = (input: string) => {
    setAddress(input);
    form.setValue("address", input);
  };

  return !submitted ? (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-puprple_lightest_bg">
      <div className="w-1/2 flex-col items-center justify-center gap-5 p-5">
        <p>Enter e-mail address</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full items-center justify-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Input {...field} value={address} />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Form>
        <Keyboard
          onChange={handleChange}
          inputName="address"
          layoutName="default"
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
