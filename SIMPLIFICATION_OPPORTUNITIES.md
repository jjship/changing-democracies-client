# Narratives Page Simplification Opportunities

## 1. Remove Debug Borders (Quick Win)
**Files:** `NarrativesFilmPlayer.tsx`, `NarrativesVIew.tsx`, `NarrativesLayout.tsx`
- Remove all `border-4 border-{color}` classes
- These were added for debugging and should be removed

## 2. Extract Video Initialization Logic
**File:** `NarrativesFilmPlayer.tsx` (lines 108-232)
**Opportunity:** Create a custom hook `useVideoPlayer` that handles:
- HLS initialization and cleanup
- MP4 fallback logic
- Video loading states
- Error handling
- Play/pause event listeners

**Benefits:**
- Reduces `NarrativesFilmPlayer` from ~400 lines to ~200 lines
- Reusable across other video players
- Easier to test in isolation
- Clearer separation of concerns

## 3. Extract Subtitle Display Logic
**File:** `NarrativesFilmPlayer.tsx` (lines 280-303)
**Opportunity:** Create a component `VideoSubtitles` that:
- Handles subtitle time tracking
- Displays subtitle text
- Handles loading/error states

**Benefits:**
- Cleaner component structure
- Reusable subtitle display
- Easier to style independently

## 4. Simplify Container Structure
**File:** `NarrativesFilmPlayer.tsx` (lines 307-401)
**Current:** Multiple nested divs with redundant styling
**Opportunity:** 
- Remove outer container div (lines 307-322) - redundant with video wrapper
- Consolidate inline styles into className
- Remove duplicate `maxWidth: "100%"` declarations

## 5. Extract URL Parameter Handling
**File:** `NarrativesVIew.tsx` (lines 77-88)
**Opportunity:** Create a utility function or hook `useNarrativeNavigation`:
```typescript
const { navigateToOverview, navigateToNarrative } = useNarrativeNavigation();
```

## 6. Simplify Width Syncing
**File:** `NarrativesVIew.tsx` (lines 32-63)
**Opportunity:** 
- Use CSS Grid or Flexbox to naturally sync widths
- Or extract to a custom hook `useSyncWidths`
- Consider if this is even necessary - could use CSS `width: fit-content`

## 7. Consolidate Play/Pause State Management
**File:** `NarrativesFilmPlayer.tsx` (lines 53-57, 234-250)
**Current:** Multiple useEffects managing `isPaused` state
**Opportunity:** 
- Single source of truth for play/pause
- Derive `isPaused` from `isPlaying` and `showSidePanel` instead of separate state
- Simplify the logic: `isPaused = !isPlaying || showSidePanel`

## 8. Extract Language Code Logic
**File:** `NarrativesFilmPlayer.tsx` (lines 33-44, 62-65)
**Opportunity:** Create utility function:
```typescript
const getLanguageCode = (fragment, selectedLanguage) => {
  return fragment.availableLanguageCodes?.[selectedLanguage] ?? "en";
};
```

## 9. Simplify Video Container Styling
**Files:** Multiple files
**Current:** Redundant `maxWidth: "100%"`, `width: "100%"` in both className and inline styles
**Opportunity:** 
- Use only Tailwind classes: `w-full max-w-full`
- Remove inline style duplicates
- Create a shared constant for video container classes

## 10. Extract Video Controls Component
**File:** `NarrativesFilmPlayer.tsx` (lines 363-376)
**Opportunity:** Create `VideoPlayPauseButton` component
- Handles play/pause logic
- Reusable across video players

## 11. Simplify Context Usage
**File:** `NarrativesVIew.tsx` (lines 13-23)
**Opportunity:** Create a custom hook that returns only needed values:
```typescript
const {
  currentPath,
  isPlaying,
  currentIndex,
  handlers, // object with all handlers
} = useNarrativeView();
```

## 12. Remove Redundant Wrapper Divs
**File:** `NarrativesFilmPlayer.tsx`
**Current:** 
```tsx
<div ref={containerRef} style={...} className="...">
  <div className="group/video ...">
    {/* content */}
  </div>
</div>
```
**Opportunity:** Merge into single div if possible, or justify why both are needed

## 13. Extract Video Error/Loading States
**File:** `NarrativesFilmPlayer.tsx` (lines 378-400)
**Opportunity:** Create `VideoOverlay` component that handles:
- Loading state
- Error state
- Subtitles
- All overlay content

## 14. Simplify Language Sync Logic
**File:** `NarrativesLayout.tsx` (lines 52-74)
**Opportunity:** 
- Extract to custom hook `useLanguageSync`
- Reduce complexity in main component

## 15. Consolidate Conditional Rendering
**File:** `NarrativesVIew.tsx` (lines 135-169)
**Opportunity:** Extract to separate component:
```typescript
<VideoControls 
  isPlaying={isPlaying}
  currentIndex={currentIndex}
  onStart={handleStart}
  onContinue={handleContinue}
/>
```

## Priority Recommendations

### High Priority (Quick Wins):
1. Remove debug borders
2. Simplify container structure
3. Remove redundant styling
4. Extract video controls component

### Medium Priority (Significant Simplification):
5. Extract video initialization hook
6. Extract subtitle display component
7. Consolidate play/pause state
8. Extract URL parameter handling

### Low Priority (Nice to Have):
9. Simplify width syncing
10. Extract language sync hook
11. Create custom hooks for context usage

## Estimated Impact

- **Lines of code reduction:** ~150-200 lines
- **Component complexity:** Reduce from ~400 lines to ~200 lines in `NarrativesFilmPlayer`
- **Maintainability:** Significantly improved with extracted hooks and components
- **Reusability:** Video player logic can be reused in other parts of the app

