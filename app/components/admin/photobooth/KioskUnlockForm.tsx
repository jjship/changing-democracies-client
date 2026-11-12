"use client";

import { FC, useActionState } from "react";
import { unlockKiosk, type UnlockKioskState } from "./actions";
import { boothBtn } from "./boothConstats";

const initialState: UnlockKioskState = { error: null };

export const KioskUnlockForm: FC = () => {
  const [state, formAction, pending] = useActionState(
    unlockKiosk,
    initialState,
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black_bg text-white">
      <form action={formAction} className="flex w-80 flex-col gap-4">
        <h1 className="text-2xl">Photobooth kiosk</h1>
        <label htmlFor="kiosk-key">Enter the kiosk key to unlock this device</label>
        <input
          id="kiosk-key"
          name="key"
          type="password"
          autoComplete="off"
          required
          className="rounded-md px-4 py-2 text-black_bg"
        />
        <button type="submit" disabled={pending} className={boothBtn}>
          {pending ? "Checking…" : "Unlock"}
        </button>
        {state.error && <p className="text-red_mains">{state.error}</p>}
      </form>
    </main>
  );
};
