"use client";

import { FC } from "react";
import { BoothContextProvider } from "./BoothContext";
import ReactBooth from "./ReactBooth";

export const PhotoboothApp: FC = () => (
  <BoothContextProvider>
    <ReactBooth />
  </BoothContextProvider>
);
