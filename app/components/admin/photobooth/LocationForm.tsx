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
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

export default function PhotoboothPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  const form = useForm<{ location: string }>();

  const onSubmit = (values: { location: string }) => {
    setLocation(values.location.toUpperCase());
    setSubmitted(true);
  };

  return !submitted ? (
    <div>
      <h1>Photobooth</h1>
      <Form {...form}>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input type="text" name="location" />
          <button type="submit">Submit</button>
        </form>
      </Form>
    </div>
  ) : (
    <Photobooth location={location} />
  );
}
