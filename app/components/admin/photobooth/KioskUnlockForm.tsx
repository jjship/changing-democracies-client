"use client";

import "react-simple-keyboard/build/css/index.css";
import { FC, useActionState, useRef, useState } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";

import { unlockKiosk, type UnlockKioskState } from "./actions";
import { boothBtn } from "./boothConstats";
import keyboardLayouts, { LayoutType } from "./keyboardLayouts";
import { getNextType, LayoutKey } from "./useLayout";

const initialState: UnlockKioskState = { error: null };

const isLayoutKey = (button: string): button is LayoutKey =>
  button === "{shift}" || button === "{lock}" || button === "{alt}";

/**
 * Kiosk unlock screen. Kiosks are touch-only, so the key can be typed on the
 * same on-screen keyboard the booth uses; a physical keyboard works too.
 */
export const KioskUnlockForm: FC = () => {
  const [state, formAction, pending] = useActionState(
    unlockKiosk,
    initialState,
  );
  const [key, setKey] = useState("");
  const [layoutType, setLayoutType] = useState<LayoutType>("default");
  const formRef = useRef<HTMLFormElement | null>(null);
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);

  const handleInputChange = (value: string) => {
    setKey(value);
    keyboardRef.current?.setInput(value);
  };

  const handleVirtualKeyPress = (button: string) => {
    if (isLayoutKey(button)) {
      setLayoutType((prev) => getNextType(button, prev));
      return;
    }
    if (button === "{enter}") {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black_bg px-10 text-white">
      <form
        ref={formRef}
        action={formAction}
        className="flex w-full max-w-xl flex-col gap-4"
      >
        <h1 className="text-3xl">Photobooth kiosk</h1>
        <label htmlFor="kiosk-key" className="text-xl">
          Enter the kiosk key to unlock this device
        </label>
        <div className="flex gap-4">
          <input
            id="kiosk-key"
            name="key"
            type="password"
            autoComplete="off"
            required
            value={key}
            onChange={(event) => handleInputChange(event.target.value)}
            className="flex-grow rounded-md px-4 py-3 text-2xl text-black_bg"
          />
          <button
            type="submit"
            disabled={pending}
            className={`${boothBtn} rounded-md px-6 py-3`}
          >
            {pending ? "…" : "Unlock"}
          </button>
        </div>
        {state.error && <p className="text-xl text-red_mains">{state.error}</p>}
      </form>
      <div className="w-full max-w-4xl bg-turquoise text-black_bg">
        <Keyboard
          keyboardRef={(instance) => {
            keyboardRef.current = instance;
          }}
          onChange={setKey}
          onKeyPress={handleVirtualKeyPress}
          layout={keyboardLayouts["EN"]}
          layoutName={layoutType}
          theme="hg-theme-default myTheme1"
        />
      </div>
    </main>
  );
};
