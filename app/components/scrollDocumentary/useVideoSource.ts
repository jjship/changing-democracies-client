// // hooks/useVideoSource.ts
// import { useState, useEffect } from "react";
// import { VideoSource } from "@/types/scrollDocumentary";
// import { fetchVideoSource, VideoSourceError } from "./videoSource";

// export function useVideoSource(
//   videoId: string,
//   pullZoneUrl: string,
//   apiKey: string,
// ) {
//   const [videoSource, setVideoSource] = useState<VideoSource | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     async function loadVideoSource() {
//       try {
//         setLoading(true);
//         setError(null);
//         const source = await fetchVideoSource(videoId, pullZoneUrl, apiKey);

//         if (mounted) {
//           setVideoSource(source);
//         }
//       } catch (err) {
//         if (mounted) {
//           setError(
//             err instanceof Error
//               ? err
//               : new Error("Failed to load video source"),
//           );
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     }

//     loadVideoSource();

//     return () => {
//       mounted = false;
//     };
//   }, [videoId, pullZoneUrl, apiKey]);

//   return { videoSource, error, loading };
// }
