// "use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";

type Collection = {
  videoLibraryId: number;
  guid: string;
  name: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds: string;
  previewImageUrls: string;
};

type Video = {
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

export default async function VideosAdmin() {
  const collection = await getCollection();

  const videosIds = collection.previewVideoIds?.split(",") ?? [];

  const videos = await Promise.all(
    videosIds.map((videoId) => getVideo(videoId)),
  );

  return (
    <div className="bg-purple_lightest_bg flex min-h-screen flex-col">
      <h1>{collection.name}</h1>
      <div className="grid grid-cols-3 gap-2">
        {videos.map((video) => (
          <Card key={video.guid}>
            <CardTitle>{video.title}</CardTitle>
            <p>{video.dateUploaded}</p>
            <p>{video.views} views</p>
            <p>{video.length} seconds</p>
            <p>category: {video.category}</p>
            <ul>
              {video.metaTags.map((tag, i) => (
                <li key={i}>
                  {tag.property}: {tag.value}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function getCollection(): Promise<Collection> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/collections/${process.env.BUNNY_STREAM_COLLECTION_ID}?includeThumbnails=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch videos data");
  }

  return res.json();
}

async function getVideo(videoId: string): Promise<Video> {
  if (
    !process.env.BUNNY_STREAM_API_KEY ||
    !process.env.BUNNY_STREAM_LIBRARY_ID ||
    !process.env.BUNNY_STREAM_COLLECTION_ID
  ) {
    throw new Error("Missing Bunny Stream environment variables");
  }

  const url = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos/${videoId}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
    },
  };

  const res = await fetch(url, options);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch videos data");
  }

  return res.json();
}

type VideoProps = Video & {
  onDelete: (videoId: string) => void;
  thumbnailUrl: string;
  captionUrls: string[];
};
