"use client";

import { useState } from "react";
import LocationForm from "../../../components/admin/photobooth/LocationForm";
import Photobooth from "../../../components/admin/photobooth/Photobooth";

export default async function PhotoboothPage({
  params: { location },
}: {
  params: { location?: string };
}) {
  const [showBooth, setShowBoot] = useState(false);

  return (
    <>{location ? <Photobooth location={location} /> : <LocationForm />}</>
  );
}
