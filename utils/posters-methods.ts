import "server-only";
import { BunnyMethodReturn } from "@/types/bunny";
import { Poster } from "../app/components/admin/posters/actions";

export { deleteBunnyPoster, getPostersMetadata };

export type BunnyPoster = {
  Guid: string;
  StorageZoneName: string;
  Path: string;
  ObjectName: string;
  Length: number;
  LastChanged: string;
  ServerId: number;
  ArrayNumber: number;
  IsDirectory: boolean;
  UserId: string;
  ContentType: string;
  DateCreated: string;
  StorageZoneId: number;
  Checksum: string;
  ReplicatedZones: string;
};

export type PosterMetadata = {
  id: string;
  fileName: string;
};

async function getPostersMetadata(): Promise<
  BunnyMethodReturn<PosterMetadata>
> {
  if (
    !process.env.BUNNY_STORAGE_API_KEY ||
    !process.env.BUNNY_STORAGE_PULL_ZONE_ID ||
    !process.env.BUNNY_STORAGE_NAME
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }
  const url = `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/posters/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
    next: { revalidate: 55 },
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to fetch posters data", status: res.status },
    };
  }

  const posters: BunnyPoster[] = (await res.json()) as BunnyPoster[];
  console.log({ getPostersMetadata: posters.length });

  const list = posters.map((poster) => ({
    id: poster.Guid,
    fileName: poster.ObjectName,
  }));
  return { success: true, data: list };
}

async function deleteBunnyPoster({
  poster,
}: {
  poster: Poster;
}): Promise<
  BunnyMethodReturn<
    Pick<BunnyPoster, "Path" | "StorageZoneName" | "ObjectName">
  >
> {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const { fileName } = poster;

  const url = `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/posters/${fileName}`;

  await purgePostersCash({ fileName });

  const options = {
    method: "DELETE",
    headers: {
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to delete poster", status: res.status },
    };
  }

  return { success: true, data: [] };
}

async function purgePostersCash({
  fileName,
}: {
  fileName: string;
}): Promise<BunnyMethodReturn<[]>> {
  if (
    !process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE ||
    !process.env.BUNNY_ADMIN_API_KEY
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://api.bunny.net/purge?url=https%3A%2F%2F${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net%2Fposters%2F${fileName}&async=false`;
  const options = {
    method: "POST",
    headers: {
      AccessKey: process.env.BUNNY_ADMIN_API_KEY,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    return {
      success: false,
      data: [],
      error: { message: "Failed to purge captions cache", status: res.status },
    };
  }

  return { success: true, data: [] };
}
