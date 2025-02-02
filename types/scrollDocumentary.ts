// types/scrollDocumentary.ts
export interface VideoQuality {
  height: number;
  label: string;
  supportsHLS: boolean;
}

export interface SubtitleTrack {
  languageCode: string;
  label: string;
}

export interface VideoSource {
  videoId: string;
  pullZoneUrl: string;
  availableQualities: VideoQuality[];
  availableSubtitles: SubtitleTrack[];
  hlsPlaylistUrl?: string;
  title?: string;
  duration?: number;
  thumbnail?: string;
}

export interface VideoSourceResponse {
  success: boolean;
  message?: string;
  statusCode: number;
  data?: {
    videoLibraryId: string;
    guid: string;
    title?: string;
    dateUploaded?: string;
    views?: number;
    isPublic: boolean;
    length?: number;
    status?: number;
    thumbnailFileName?: string;
    resolutions?: string[];
    captions?: {
      srclang: string;
      label: string;
    }[];
  };
}
