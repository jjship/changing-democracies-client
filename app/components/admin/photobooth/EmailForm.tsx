"use client";

import "react-simple-keyboard/build/css/index.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Keyboard from "react-simple-keyboard";

import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import sendImage from "../posters/sendImage";

import { useBoothContext } from "./BoothContext";

export type EmailFormProps = {
  imageUrl: string;
  fileName: string;
  location: string;
  isSending: boolean;
};

type FormAddress = z.infer<typeof formSchema>;

const formSchema = z.object({
  address: z.string().email({ message: "Must be a valid e-mail address" }),
});

const EmailForm: FC<EmailFormProps> = ({
  imageUrl,
  fileName,
  location,
  isSending,
}: EmailFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState<string>("");
  const { setStage } = useBoothContext();
  const thisStage = 7;

  const form = useForm<FormAddress>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: address,
    },
    mode: "onSubmit",
  });

  const sendEmail = useCallback(
    async (email: string) => {
      sendImage({ imageUrl, fileName, email });
      setSubmitted(true);
      setStage(0);
    },
    [imageUrl, fileName, location],
  );

  const onSubmit = (values: FormAddress) => {
    const email = values.address.toLowerCase().trim();
    setAddress(email);
    sendEmail(email);
    setSubmitted(true);
  };

  const handleChange = (input: string) => {
    setAddress(input);
    form.setValue("address", input);
  };

  return isSending && !submitted ? (
    <div className="flex min-h-min w-3/4 flex-col content-center items-stretch justify-between bg-black_bg">
      <p className="mb-5 mt-10 text-center text-4xl text-red_mains">
        Enter email address
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-row content-stretch justify-between ">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mr-2.5 flex-grow">
                  <FormControl>
                    <Input className="min-w-full text-black" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="bg-darkRed text-2xl hover:bg-pink" type="submit">
              Send
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full bg-black_bg  pt-10 text-black_bg">
        <Keyboard
          onChange={handleChange}
          inputName="address"
          layoutName="default"
          theme={"hg-theme-default myTheme1"}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default EmailForm;
