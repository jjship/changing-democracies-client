"use client";

import { BoothContextProvider } from "@/components/admin/photobooth/BoothContext";
import ReactBooth from "@/components/admin/photobooth/ReactBooth";

export default function PhotoboothPage() {
  return (
    <>
      <BoothContextProvider>
        <ReactBooth />;
      </BoothContextProvider>
    </>
  );
}
