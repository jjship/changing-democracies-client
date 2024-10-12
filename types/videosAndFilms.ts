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

export type FilmData = Pick<VideoDbEntry, "guid" | "title" | "length"> & {
  tags: string[]; // in metaTags
  person: string; // in title
  country: string; // in title
};

export type FilmsCollection = {
  films: FilmData[];
  tags: string[];
  countries: string[];
  people: string[];
};
