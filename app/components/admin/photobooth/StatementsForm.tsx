"use client";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Control,
} from "react-hook-form";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import Keyboard, {
  KeyboardLayoutObject,
  KeyboardReactInterface,
} from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useBoothContext } from "./BoothContext";
import {
  getTranslation,
  languageAbbreviations,
  translations,
} from "./boothConstats";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import BackBtn from "./BackBtn";
import keyboardLayouts, { LayoutType } from "./keyboardLayouts";

type StatementsFormValues = {
  inputStatements: { id: string; text: string }[];
};

export default function StatementsForm() {
  const {
    statements,
    setStatements,
    stage,
    setStage,
    currentLang,
    windowHeight,
  } = useBoothContext();

  const [layout, setLayout] = useState<KeyboardLayoutObject>(
    keyboardLayouts["EN"],
  );
  const [layoutType, setLayoutType] = useState<LayoutType>("default");
  const [focusedIdx, setFocusedIdx] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);
  const nextStage = 3;

  useEffect(() => {
    setLayout(keyboardLayouts[languageAbbreviations[currentLang]]);
  }, [currentLang]);

  const form = useForm<StatementsFormValues>({
    defaultValues: {
      inputStatements: statements?.map((text, index) => ({
        id: `id-${index}`,
        text,
      })) ?? [{ id: "id-0", text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control as Control<StatementsFormValues>,
    name: "inputStatements",
  });

  const onSubmit: SubmitHandler<StatementsFormValues> = (values) => {
    setStatements(values.inputStatements.map((statement) => statement.text));
    setStage(nextStage);

    form.reset({ inputStatements: [{ id: "id-0", text: "" }] });
  };

  const handleKeyPress = (
    event: KeyboardEvent<HTMLInputElement> | { key: string },
    index: number,
  ) => {
    const isPhysicalEvent = "preventDefault" in event;
    const key = event.key;
    const isEnter = (key: string) => key === "Enter" || key === "{enter}";
    const isBskp = (key: string) => key === "Backspace" || key === "{bksp}";
    const isShift = (key: string) =>
      key === "{shift}" || key === "{lock}" || key === "Shift";

    if (isEnter(key)) {
      if (isPhysicalEvent) event.preventDefault();
      append(
        { id: `id-${fields.length}`, text: "" },
        { shouldFocus: true, focusIndex: fields.length + 1 },
      );
      setFocusedIdx((prev) => prev + 1);

      setTimeout(() => {
        keyboardRef.current?.setInput("");
      }, 0);
      return;
    }
    if (isBskp(key) && !form.getValues(`inputStatements.${index}.text`)) {
      if (isPhysicalEvent) event.preventDefault();
      if (fields.length > 1) {
        remove(index);
        const indexToFocus = index === 0 ? 0 : index - 1;
        setFocusedIdx(indexToFocus);

        setTimeout(() => {
          keyboardRef.current?.setInput(fields[indexToFocus].text);
          inputRefs.current[indexToFocus]?.focus();
        }, 0);
      }
      return;
    }
    if (isShift(key)) {
      if (isPhysicalEvent) event.preventDefault();
      setLayoutType((prev) => (prev === "default" ? "shift" : "default"));
      return;
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    const event = { key };
    handleKeyPress(event, focusedIdx);
  };

  const handleChange = (input: string, index: number) => {
    const currentValues = form.getValues("inputStatements");
    if (currentValues) {
      const updatedValues = [...currentValues];
      updatedValues[index] = {
        ...updatedValues[index],
        text: input,
      };
      form.setValue("inputStatements", updatedValues);
      setStatements(updatedValues.map((statements) => statements.text));
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
        {getTranslation(currentLang, "Write your statements", translations)}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`inputStatements.${index}.text`}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...form.register}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                          ref(el);
                        }}
                        className="mb-5 w-full bg-darkRed px-10 py-6 text-3xl text-black"
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
          inputName="statements"
          layout={layout}
          layoutName={layoutType}
          theme="hg-theme-default myTheme1"
        />
      </div>

      <BackBtn />
    </div>
  );
}
