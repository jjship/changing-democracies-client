import { hasKioskOrAdminAccess } from "@/utils/admin/access";
import { PhotoboothApp } from "@/components/admin/photobooth/PhotoboothApp";
import { KioskUnlockForm } from "@/components/admin/photobooth/KioskUnlockForm";

export const dynamic = "force-dynamic";

export default async function PhotoboothPage() {
  const allowed = await hasKioskOrAdminAccess();

  return allowed ? <PhotoboothApp /> : <KioskUnlockForm />;
}
