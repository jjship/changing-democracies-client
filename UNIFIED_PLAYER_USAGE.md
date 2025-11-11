# Unified Video Player - Usage Guide

## Overview

The `UnifiedVideoPlayer` component has been created to reuse the narratives video player (with Box, subtitles, and progress bar) in the free-browsing page with minimal effort.

## Component Location

`app/components/shared/UnifiedVideoPlayer.tsx`

## Features Included

✅ Person/Country info box (top-left corner)  
✅ Subtitles display  
✅ Progress bar (clickable, with time display)  
✅ Play/Pause button (hover to show)  
✅ Loading/Error states  
✅ Proper overlay positioning (respects video bounds with object-contain)  
✅ HLS and MP4 fallback support  
✅ Adaptive quality selection  

## How to Use in Free-Browsing Page

### Option 1: Replace FilmPlayer (Recommended)

Replace the existing `FilmPlayer` component in `app/components/films/FilmPlayer.tsx`:

```tsx
import { UnifiedVideoPlayer } from "@/components/shared/UnifiedVideoPlayer";
import { useFilmsContext } from "./FilmsContext";
import { useParams } from "next/navigation";

export const FilmPlayer: FC = () => {
  const {
    nowPlaying,
    fragments,
    setShowSidePanel,
    showSidePanel,
    setNowPlaying,
  } = useFilmsContext();
  
  const params = useParams();
  const languageCode =
    typeof params.lang === "string"
      ? params.lang.toLowerCase().substring(0, 2)
      : "en";

  const currentFragment = fragments?.find(
    (fragment) => fragment.id === nowPlaying,
  );

  if (!nowPlaying || !currentFragment) return null;

  return (
    <div
      id="player-container"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black_bg"
    >
      <FilmBioSidePanel />
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center justify-center px-4">
        <div
          className="group/video relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "90vh" }}
        >
          <UnifiedVideoPlayer
            videoSource={currentFragment}
            personName={currentFragment.person?.name}
            countryName={currentFragment.person?.country?.name}
            languageCode={languageCode}
            isPlaying={!showSidePanel}
            showSidePanel={showSidePanel}
            onShowSidePanel={() => setShowSidePanel(true)}
            onClose={() => {
              setNowPlaying(null);
              setShowSidePanel(false);
            }}
            showCloseButton={true}
          />
        </div>
      </div>
    </div>
  );
};
```

### Option 2: Use in Narratives (Already Compatible)

The `NarrativesFilmPlayer` can be refactored to use `UnifiedVideoPlayer`:

```tsx
// In NarrativesFilmPlayer.tsx
import { UnifiedVideoPlayer } from "@/components/shared/UnifiedVideoPlayer";

const NarrativesFilmPlayer: FC = () => {
  // ... existing context and state ...
  
  return (
    <UnifiedVideoPlayer
      videoSource={nowPlaying}
      personName={nowPlaying.person}
      countryName={currentCountryName}
      languageCode={langCode}
      isPlaying={isPlaying}
      showSidePanel={showSidePanel}
      onShowSidePanel={() => setShowSidePanel(true)}
      onVideoEnd={onEnded}
    />
  );
};
```

## Data Structure Compatibility

The component automatically handles two data structures:

1. **ClientFragment** (Free-Browsing):
   - Has `playerUrl`, `person`, `id`
   - Automatically adapted to UnifiedVideoSource

2. **NarrationFragment/VideoSource** (Narratives):
   - Has `videoId`, `hlsPlaylistUrl`, `pullZoneUrl`, `availableQualities`
   - Used directly

## Benefits

1. **Code Reuse**: Single component for both pages
2. **Consistent UX**: Same player experience across the app
3. **Maintainability**: Fix bugs/add features in one place
4. **Feature Parity**: Free-browsing gets progress bar and improved overlays
5. **Easy Migration**: Minimal changes needed to existing code

## Migration Effort

**Estimated time: 15-30 minutes**

1. Import `UnifiedVideoPlayer` in `FilmPlayer.tsx`
2. Replace video initialization logic with component
3. Pass props from context
4. Test video playback
5. Remove old `FilmPlayer` code (optional cleanup)

## Notes

- The component uses the same hooks (`useVideoPlayer`, `useVideoBounds`) created for narratives
- All overlays (Box, subtitles, progress bar) are properly positioned relative to video bounds
- Keyboard controls (arrow keys, spacebar) can be added to the unified component if needed
- The adapter function handles URL extraction from `playerUrl` automatically

