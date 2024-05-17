import "server-only";
import { BunnyMethodReturn } from "@/types/bunny";

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
  const url = `https://storage.bunnycdn.com/cd-dev-storage/posters/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STORAGE_API_KEY,
    },
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
  poster: Pick<BunnyPoster, "Path" | "StorageZoneName" | "ObjectName">;
}): Promise<
  BunnyMethodReturn<
    Pick<BunnyPoster, "Path" | "StorageZoneName" | "ObjectName">
  >
> {
  if (!process.env.BUNNY_STORAGE_API_KEY) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://storage.bunnycdn.com${poster.Path}${poster.ObjectName}`;

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
