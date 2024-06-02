"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Photobooth from "./Photobooth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRouter } from "next/navigation";

export default function LocationForm() {
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const form = useForm<{ location: string }>({
    defaultValues: {
      location: location,
    },
  });

  const onSubmit = (values: { location: string }) => {
    const locationInput = values.location.toUpperCase();
    setLocation(locationInput);
    router.push(
      locationInput ? `/admin/posters/${locationInput}` : `/admin/photobooth`,
    );
  };

  const handleChange = (input: string) => {
    setLocation(input);
    form.setValue("location", input);
  };

  const buttonStyles =
    "bg-green_accent hover:bg-yellow_secondary text-black_bg px-10";

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-white">
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Location</FormLabel>
                      <FormControl>
                        <Input className="text-black" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className={buttonStyles} type="submit">
                Submit
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
  );
}
