"use client";

import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/ui/select";
import BackBtn from "./BackBtn";

import { useBoothContext } from "./BoothContext";

const LocationForm: FC = () => {
  const [isSet, setIsSet] = useState(false);
  const thisStage = 1;
  const { location, setLocation, prevLocations, stage, setStage } =
    useBoothContext();

  const form = useForm<{ location: string; prevLocations: string[] }>({
    defaultValues: {
      location: location,
      prevLocations: prevLocations,
    },
  });

  useEffect(() => {
    form.reset({ location: location, prevLocations: prevLocations });
    if (!!location) setIsSet(true);
  }, [location, prevLocations, stage, form]);

  useEffect(() => {
    if (stage === thisStage && isSet) setStage(stage + 1);
  }, [stage, setStage, isSet]);

  const onSubmit = (values: { location: string }) => {
    const locationInput = values.location
      .normalize("NFD") // Normalize to decomposed form (NFD)
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .toUpperCase();
    setStage(thisStage + 1);
  };

  const handleChange = (input: string) => {
    form.setValue("location", input);
  };

  if (stage !== thisStage) return null;

  return (
    <div className="flex h-screen w-2/3 flex-col content-center items-stretch  justify-between ">
      <p className="mt-24 text-center text-4xl">Enter Location</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center ">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(e) => onSubmit({ location: e })}
                    defaultValue={field.value}
                  >
                    <FormControl className="mb-40">
                      <SelectTrigger
                        className={`rounded bg-darkRed px-10 py-2 text-white hover:bg-pink`}
                      >
                        <SelectValue placeholder="Select Previous Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {prevLocations.map(
                        (loc, i) =>
                          loc && (
                            <SelectItem key={`${i}-key`} value={loc}>
                              {loc}
                            </SelectItem>
                          ),
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Or Add New</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible::border-0 w-full border-0 bg-darkRed px-10 py-6 text-3xl text-black_bg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className={`mt-10 bg-darkRed text-2xl hover:bg-pink`}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full  pt-10 text-black_bg">
        <Keyboard
          onChange={handleChange}
          inputName="location"
          layoutName="default"
          theme={"hg-theme-default myTheme1"}
        />
      </div>
      <BackBtn />
    </div>
  );
};

export default LocationForm;
