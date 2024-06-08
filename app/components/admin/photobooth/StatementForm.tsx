"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useBoothContext } from "./BoothContext";
import { getTranslation, translations } from "./boothConstats";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";

export default function StatementForm() {
  const {
    statement,
    setStatement,
    stage,
    setStage,
    currentLang,
    windowHeight,
  } = useBoothContext();

  const form = useForm<{ statement: string }>({
    defaultValues: {
      statement: statement ?? "",
    },
  });
  const nextStage = 3;
  const onSubmit = (values: { statement: string }) => {
    const userNameInput = values.statement;
    setStatement(userNameInput);
    setStage(nextStage);
    console.log({ nextStage });
  };

  const handleChange = (input: string) => {
    setStatement(input);
    form.setValue("statement", input);
  };

  if (stage !== 2) return null;

  const txt = "Next";
  const btnY = windowHeight / 6;
  const width = 200;

  return (
    <div className="items-strech flex h-screen w-4/5 flex-col content-center  justify-between ">
      <p className="mt-24 text-center text-[24px]">
        {getTranslation(currentLang, "Write your statement", translations)}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center ">
            <FormField
              control={form.control}
              name="statement"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      className="bg-darkRed w-full border-0 px-10 py-6 text-3xl text-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`bg-darkRed hover:bg-pink text-[24px]`}
              style={{ width: `${width}px`, height: `50px` }}
            >
              {txt}
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full  pt-10 text-black">
        <Keyboard
          onChange={handleChange}
          inputName="statement"
          layoutName="default"
          theme={"hg-theme-default myTheme1"}
        />
      </div>
    </div>
  );
}
