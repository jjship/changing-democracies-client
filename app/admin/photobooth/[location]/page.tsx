"use client";

import LocationForm from "../../../components/admin/photobooth/LocationForm";
import Photobooth from "../../../components/admin/photobooth/Photobooth";

export default function PhotoboothPage({
  params: { location },
}: {
  params: { location?: string };
}) {
  return (
    <>{location ? <Photobooth location={location} /> : <LocationForm />}</>
  );
}
