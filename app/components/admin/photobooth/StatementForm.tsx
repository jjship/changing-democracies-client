"use client";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Control,
} from "react-hook-form";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import Keyboard, { KeyboardReact } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useBoothContext } from "./BoothContext";
import { getTranslation, translations } from "./boothConstats";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type StatementFormValues = {
  statements: { id: string; text: string }[];
};

export default function StatementForm() {
  const {
    statement,
    setStatement,
    stage,
    setStage,
    currentLang,
    windowHeight,
  } = useBoothContext();

  const [focusedIdx, setFocusedIdx] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const keyboardRef = useRef<any | null>(null);

  const form = useForm<StatementFormValues>({
    defaultValues: {
      statements: statement?.map((text, index) => ({
        id: `id-${index}`,
        text,
      })) ?? [{ id: "id-0", text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control as Control<StatementFormValues>,
    name: "statements",
  });

  const nextStage = 3;

  const onSubmit: SubmitHandler<StatementFormValues> = (values) => {
    setStatement(values.statements.map((statement) => statement.text));
    setStage(nextStage);
  };

  const handleKeyPress = (
    event: KeyboardEvent<HTMLInputElement> | { key: string },
    index: number,
  ) => {
    const isPhysicalEvent = "preventDefault" in event;
    const key = event.key;
    const isEnter = (key: string) => key === "Enter" || key === "{enter}";
    const isBskp = (key: string) => key === "Backspace" || key === "{bksp}";
    console.log({ key, isBskp: isBskp(key) });

    if (isEnter(key)) {
      if (isPhysicalEvent) event.preventDefault();
      append({ id: `id-${fields.length}`, text: "" });
      // inputRefs.current[fields.length + 1]?.focus();
      if (keyboardRef.current) {
        setTimeout(() => {
          keyboardRef.current?.setInput("");
        }, 0);
      }
    }
    if (isBskp(key) && !form.getValues(`statements.${index}.text`)) {
      if (isPhysicalEvent) event.preventDefault();
      if (fields.length > 1) {
        remove(index);
        const indexToFocus = index === 0 ? 0 : index - 1;
        inputRefs.current[indexToFocus]?.focus();
      }
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    const event = { key };
    handleKeyPress(event, focusedIdx);
  };

  const handleChange = (input: string, index: number) => {
    const currentValues = form.getValues("statements");
    if (currentValues) {
      const updatedValues = [...currentValues];
      updatedValues[index] = { ...updatedValues[index], text: input };
      form.setValue("statements", updatedValues);
      setStatement(updatedValues.map((statement) => statement.text));
    }
  };

  const handleVirtualChange = (input: string) => {
    handleChange(input, focusedIdx);
  };

  if (stage !== 2) return null;

  const txt = "Next";
  const btnY = windowHeight / 6; //TODO fix animation

  return (
    <div className="flex h-screen w-4/5 flex-col content-center items-stretch justify-between">
      <p className="mt-24 text-center text-[24px]">
        {getTranslation(currentLang, "Write your statement", translations)}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`statements.${index}.text`}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        ref={(el) => {
                          inputRefs.current[index] = el;
                          ref(el);
                        }}
                        className="w-full border-0 bg-darkRed px-10 py-6 text-3xl text-black"
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        value={value}
                        name={name}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              className="bg-darkRed text-[24px] hover:bg-pink"
              style={{ width: `200px`, height: `50px` }}
            >
              {txt}
            </Button>
          </div>
        </form>
      </Form>

      <div className="w-full pt-10 text-black">
        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          onChange={handleVirtualChange}
          onKeyPress={handleVirtualKeyPress}
          inputName="statement"
          layoutName="default"
          theme="hg-theme-default myTheme1"
        />
      </div>
    </div>
  );
}
