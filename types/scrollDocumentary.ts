export interface VideoQuality {
  height: number;
  label: string;
  supportsHLS: boolean;
}

export interface VideoSource {
  videoId: string;
  pullZoneUrl: string;
  availableQualities: VideoQuality[];
  availableLanguageCodes: Record<string, string>;
  hlsPlaylistUrl?: string;
  title?: string;
  duration?: number;
  thumbnail?: string;
}
