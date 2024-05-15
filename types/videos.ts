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

type FilmDbEntry = Pick<
  VideoDbEntry,
  "guid" | "title" | "length" | "captions" | "metaTags"
>;

const { BUNNY_STREAM_PULL_ZONE } = process.env;

export { getThumbnail, parseTags, collectionPreview, getFilmUrl };

const getThumbnail = (filmId: string) =>
  `https://${BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${filmId}/thumbnail.jpg`;

const getFilmUrl = (filmId: string) =>
  `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${filmId}?autoplay=false`;

function parseTags(
  metaTags: {
    property: string;
    value: string;
  }[],
) {
  return (
    metaTags
      .find((tag) => tag.property === "tags")
      ?.value?.split(",")
      .join(" ") || ""
  );
}

export type FilmCollectionPreview = {
  videoLibraryId: number;
  guid: string;
  name: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds: string;
  previewImageUrls: string[];
};

const collectionPreview: FilmCollectionPreview = {
  videoLibraryId: 226154,
  guid: "959010de-bf80-4559-a116-c2a1804f2dc8",
  name: "transcribed",
  videoCount: 5,
  totalSize: 344240609,
  previewVideoIds:
    "a3f7eba6-aa4b-4701-a1af-19d6d53f1e46,7a03907e-d2be-4b5f-9203-bbc5336c7899,87e38755-5b15-47df-9f81-c9efa8657857",
  previewImageUrls: [
    "https://vz-eb5d6b10-75c.b-cdn.net/a3f7eba6-aa4b-4701-a1af-19d6d53f1e46/thumbnail.jpg",
    "https://vz-eb5d6b10-75c.b-cdn.net/87e38755-5b15-47df-9f81-c9efa8657857/thumbnail.jpg",
    "https://vz-eb5d6b10-75c.b-cdn.net/7a03907e-d2be-4b5f-9203-bbc5336c7899/thumbnail.jpg",
  ],
};
