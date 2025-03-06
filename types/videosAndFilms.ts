import { VideoSource } from "./scrollDocumentary";

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
    srclang: string; //TODO JAC base catpions loading on this,probably need to add this to cd_backend
    label: string;
  }[];
  hasMP4Fallback: boolean;
  collectionId: string;
  thumbnailFileName: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
  chapters: any[];
  moments: any[];
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

export type FilmsCollection = {
  films: FilmData[];
  tags: string[];
  countries: string[];
  people: string[];
};

export type FilmData = Pick<VideoDbEntry, "guid" | "title" | "length"> & {
  tags: string[]; // in metaTags
  person: string; // in title
  country: string; // in title
  playerUrl: string;
  thumbnailUrl: string;
  length?: number;
};

export type NarrationFragment = Omit<FilmData, "tags" | "bio" | "country"> &
  VideoSource & {
    country: { code: string; names: { languageCode: string; name: string }[] };
    bios: { languageCode: string; bio: string }[];
    sequence: number;
    otherPaths: Pick<NarrationPath, "id" | "titles">[];
  };

export type NarrationPath = {
  id: string;
  titles: { languageCode: string; title: string }[];
  descriptions: { languageCode: string; description: string[] }[];
  total_length: number; // total length of all fragments in the path
  fragments: NarrationFragment[];
  metadata?: Record<string, any>;
};
