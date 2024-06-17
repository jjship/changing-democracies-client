"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import Keyboard, { KeyboardLayoutObject } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useBoothContext } from "./BoothContext";
import {
  getTranslation,
  languageAbbreviations,
  translations,
} from "./boothConstats";
import { Animate } from "react-simple-animate";
import { Button } from "../../ui/button";
import BackBtn from "./BackBtn";

import { useCallback, useEffect, useState } from "react";
import keyboardLayouts, { LayoutType } from "./keyboardLayouts";

export default function NameForm() {
  const [layout, setLayout] = useState<KeyboardLayoutObject>(
    keyboardLayouts["EN"],
  );
  const [layoutType, setLayoutType] = useState<LayoutType>("default");
  const { userName, setUserName, stage, setStage, currentLang, windowHeight } =
    useBoothContext();
  const thisStage = 4;

  useEffect(() => {
    setLayout(keyboardLayouts[languageAbbreviations[currentLang]]);
  }, [currentLang]);

  const form = useForm<{ userName: string }>({
    defaultValues: {
      userName: userName ?? "",
    },
  });

  const onSubmit = (values: { userName: string }) => {
    const userNameInput = values.userName;
    values.userName = "";

    setUserName(userNameInput);
    setStage(thisStage + 1);

    setLayoutType("default");
    form.reset({ userName: "" });
  };

  const handleChange = (input: string) => {
    setUserName(input);
    form.setValue("userName", input);
  };

  const handleShift = useCallback(() => {
    setLayoutType((prev) => (prev === "default" ? "shift" : "default"));
  }, [setLayoutType]);

  const handleVirtualKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  if (stage !== thisStage) return null;

  const txt = "Next";
  const btnY = windowHeight / 6;
  const width = 200;

  return (
    <div className="flex h-screen w-2/3 flex-col content-center items-stretch  justify-between ">
      <p className="mt-24 text-center text-4xl">
        {getTranslation(currentLang, "What is your name?", translations)}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center ">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className=" w-full border-0 bg-darkRed px-10 py-6 text-3xl text-black_bg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Animate
              play={true}
              start={{
                opacity: 1,
                transform: `translateY(${btnY + windowHeight}px)`,
              }}
              end={{ opacity: 1, transform: `translateY(${btnY}px)` }}
              duration={0.9}
              easeType="ease-in-out"
            >
              <Button
                type="submit"
                className={`bg-darkRed text-2xl hover:bg-pink`}
                style={{ width: `${width}px`, height: `50px` }}
              >
                {txt}
              </Button>
            </Animate>
          </div>
        </form>
      </Form>

      <div className="w-full  pt-10 text-black_bg">
        <Keyboard
          onChange={handleChange}
          inputName="userName"
          layout={layout}
          layoutName={layoutType}
          theme={"hg-theme-default myTheme1"}
          onKeyPress={handleVirtualKeyPress}
        />
      </div>
      <BackBtn />
    </div>
  );
}
