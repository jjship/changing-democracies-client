export type Collection = {
  videoLibraryId: number;
  guid: string;
  name: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds: string;
  previewImageUrls: string;
};

export type VideoDbEntry = {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  rotation: number;
  width: number;
  height: number;
  availableResolutions: string;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: {
    srclang: string;
    label: string;
  }[];
  hasMP4Fallback: boolean;
  collectionId: string;
  thumbnailFileName: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
  chapters: any[]; // You might want to define a type for chapters
  moments: any[]; // You might want to define a type for moments
  metaTags: {
    property: string;
    value: string;
  }[];
  transcodingMessages: any[];
};

export type FormVideo = Pick<VideoDbEntry, "guid" | "title" | "captions"> & {
  length: string;
  tags: string; // in metaTags
  description: string; // in metaTags
};

export type Film = Pick<VideoDbEntry, "guid" | "title" | "length"> & {
  tags: string[]; // in metaTags
  person: string; // in title
  country: string; // in title
};

export type FilmsCollection = {
  films: Film[];
  tags: string[];
  countries: string[];
  people: string[];
};

const { BUNNY_STREAM_PULL_ZONE } = process.env;

export { getThumbnail, parseTags, getFilmUrl };

const getThumbnail = (filmId: string) =>
  `https://${BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${filmId}/thumbnail.jpg`;

const getFilmUrl = (filmId: string) =>
  `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${filmId}?autoplay=false`;

function parseTags(
  metaTags: {
    property: string;
    value: string;
  }[],
): string[] {
  if (!metaTags) return [];
  const tags: string[] | undefined = metaTags
    .find((tag) => tag.property === "tags")
    ?.value?.split(",");
  return tags ?? [];
}
