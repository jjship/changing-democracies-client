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
  transcodingMessages: any[]; // You might want to define a type for transcoding messages
};

export type ParsedVideo = Pick<VideoDbEntry, "guid" | "title" | "length"> & {
  captions: string[];
  tags: string[]; // in metaTags
  description: string; // in metaTags
  thumbnailUrl: string; // in thumbnailFileName
};
