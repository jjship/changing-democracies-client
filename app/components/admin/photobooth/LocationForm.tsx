"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Photobooth from "./Photobooth";
import { Form, FormField, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function PhotoboothPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  const form = useForm<{ location: string }>({
    defaultValues: {
      location: location,
    },
  });

  const onSubmit = (values: { location: string }) => {
    setLocation(values.location.toUpperCase());
    setSubmitted(true);
  };

  return !submitted ? (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-puprple_lightest_bg ">
      <div className="w-1/2 flex-col items-center justify-center gap-5 p-5">
        <p>Set event location</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              onSubmit(form.getValues());
            })}
          >
            <div className="flex w-full items-center justify-center gap-5">
              {" "}
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  ) : (
    <Photobooth location={location} />
  );
}
