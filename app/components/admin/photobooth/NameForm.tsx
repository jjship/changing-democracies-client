"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useBoothContext } from "./BoothContext";
import { getTranslation, translations } from "./boothConstats";
import { Animate } from "react-simple-animate";
import { Button } from "../../ui/button";

export default function NameForm() {
  const { userName, setUserName, stage, setStage, currentLang, windowHeight } =
    useBoothContext();

  const form = useForm<{ userName: string }>({
    defaultValues: {
      userName: userName ?? "",
    },
  });
  const nextStage = stage + 1;
  const onSubmit = (values: { userName: string }) => {
    const userNameInput = values.userName;

    setUserName(userNameInput);
    setStage(nextStage);
  };

  const handleChange = (input: string) => {
    setUserName(input);
    form.setValue("userName", input);
  };

  if (stage !== 1) return null;

  const txt = "Next";
  const btnY = windowHeight / 6;
  const width = 200;

  return (
    <div className="flex h-screen w-4/5 flex-col content-center items-center  justify-between ">
      <p className="mt-24 text-[24px]">
        {getTranslation(currentLang, "What is your name?", translations)}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center ">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-darkRed border-0 px-10 py-6 text-3xl text-black"
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
                className={`bg-darkRed hover:bg-pink text-[24px]`}
                style={{ width: `${width}px`, height: `50px` }}
              >
                {txt}
              </Button>
            </Animate>
          </div>
        </form>
      </Form>

      <div className="w-full  pt-10 text-black">
        <Keyboard
          onChange={handleChange}
          inputName="userName"
          layoutName="default"
          theme={"hg-theme-default myTheme1"}
        />
      </div>
    </div>
  );
}
