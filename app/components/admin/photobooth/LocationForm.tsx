"use client";

import { useEffect, useState } from "react";
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
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRouter } from "next/navigation";
import { useBoothContext } from "./BoothContext";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
} from "../../ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { editButton, navButton } from "../classNames";
import BackBtn from "./BackBtn";

export default function LocationForm() {
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
  }, [location, prevLocations, stage]);

  useEffect(() => {
    if (stage === thisStage && isSet) setStage(stage + 1);
  }, [stage, setStage, isSet]);

  const onSubmit = (values: { location: string }) => {
    const locationInput = values.location
      .normalize("NFD") // Normalize to decomposed form (NFD)
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .toUpperCase(); // Convert to uppercase;
    setLocation(locationInput);
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
                    <FormControl>
                      <SelectTrigger className={navButton}>
                        <SelectValue placeholder="Select Previous Location" />
                      </SelectTrigger>
                    </FormControl>
                    {/* <SelectGroup> */}
                    <SelectContent>
                      {prevLocations.map(
                        (loc, i) =>
                          loc && (
                            <SelectItem
                              // className="w-full border-0 bg-darkRed px-10 py-6 text-3xl text-black_bg"
                              key={`${i}-key`}
                              value={loc}
                            >
                              {loc}
                            </SelectItem>
                          ),
                      )}
                    </SelectContent>
                    {/* </SelectGroup> */}
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
}
