"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import sendImage from "../posters/sendImage";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoothContext } from "./BoothContext";

export type EmailFormProps = {
  imageUrl: string;
  fileName: string;
  location: string;
};

type FormAddress = z.infer<typeof formSchema>;

const formSchema = z.object({
  address: z.string().email({ message: "Must be a valid e-mail address" }),
});

export default function EmailForm({
  imageUrl,
  fileName,
  location,
}: EmailFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState<string>("");
  const { setStage } = useBoothContext();

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
      setStage(-2);
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

  const buttonStyles =
    "bg-green_accent hover:bg-yellow_secondary text-black_bg px-10";

  return !submitted ? (
    <div className="flex w-full flex-col items-center justify-center text-white">
      <div className="w-1/2 gap-5 p-5">
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-end gap-5 "
            >
              <div className="flex-grow text-white">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter e-mail address</FormLabel>
                      <FormControl>
                        <Input
                          className=" text-black"
                          {...field}
                          // value={address}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className={`${buttonStyles}`} type="submit">
                Send
              </Button>
            </form>
          </Form>
        </>
        <div className="pt-10 text-black">
          <Keyboard
            onChange={handleChange}
            inputName="address"
            layoutName="default"
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
