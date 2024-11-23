"use client";

import React, { useEffect, useState } from "react";
import { NarrationFragment } from "@/types/videosAndFilms";
import NarrationList from "@/app/narrations/NarrationList";
import { CountDown } from "@/components/CountDown";

type NarrationPath = {
  id: string;
  title: string;
  description?: string;
  total_length: number;
  fragments: NarrationFragment[];
  metadata?: Record<string, any>;
};

interface NarrationsViewLinkedListProps {
  narrationPath: NarrationPath;
}

export default function NarrationsViewLinkedList({
  narrationPath,
}: NarrationsViewLinkedListProps) {
  const [narrationList, setNarrationList] = useState<NarrationList | null>(
    null,
  );

  console.log(narrationPath);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const list = new NarrationList(narrationPath.fragments);
    setNarrationList(list);
  }, [narrationPath]);
  useEffect(() => {
    if (narrationList && !isVideoEnded) {
      const currentFragment = narrationList.getCurrentFragment();
      if (currentFragment) {
        setNowPlaying(currentFragment.guid);
      }
    }
  }, [narrationList, isVideoEnded]);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowControls(true);
    if (narrationList?.hasNext()) {
      setIsCounting(true);
    }
  };

  const handleCountdownFinish = () => {
    if (narrationList) {
      const nextFragment = narrationList.getNextFragment();
      if (nextFragment) {
        setNowPlaying(nextFragment.guid);
        setIsVideoEnded(false);
        setShowControls(false);
        setIsCounting(false);
      }
    }
  };

  const handlePreviousClick = () => {
    if (narrationList && narrationList.hasPrevious()) {
      const previousFragment = narrationList.getPreviousFragment();
      if (previousFragment) {
        setNowPlaying(previousFragment.guid);
        setIsVideoEnded(false);
        setShowControls(false);
        setIsCounting(false);
      }
    }
  };

  const handleNextClick = () => {
    if (narrationList && narrationList.hasNext()) {
      const nextFragment = narrationList.getNextFragment();
      if (nextFragment) {
        setNowPlaying(nextFragment.guid);
        setIsVideoEnded(false);
        setShowControls(false);
        setIsCounting(false);
      }
    }
  };

  const handleRestart = () => {
    if (narrationList) {
      narrationList.reset();
      const firstFragment = narrationList.getCurrentFragment();
      if (firstFragment) {
        setNowPlaying(firstFragment.guid);
        setIsVideoEnded(false);
        setShowControls(false);
        setIsCounting(false);
      }
    }
  };

  const getProgress = () => {
    if (narrationList) {
      const currentIndex = narrationList.getCurrentIndex();
      const totalSize = narrationList.getSize();
      return `${currentIndex + 1} / ${totalSize}`;
    }
    return "0 / 0";
  };
  console.log(narrationList);
  return (
    <div className="narration-view">
      {/*isPlayerVisible &&*/}
      {nowPlaying && narrationList && (
        <div className="video-container">
          {/* Add your video player component here */}
          <video
            onEnded={handleVideoEnd}
            src={narrationList.current?.data.playerUrl}
            controls={showControls}
            autoPlay
          />
        </div>
      )}
      <div className="controls">
        {narrationList && narrationList.hasPrevious() && (
          <button
            className="control-button previous"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}

        {isVideoEnded && narrationList?.hasNext() && (
          <button className="control-button next" onClick={handleNextClick}>
            Next
          </button>
        )}

        <button className="control-button restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
      <div className="progress-indicator">{getProgress()}</div>
      {isCounting && (
        <div className="countdown">
          <CountDown onFinish={handleCountdownFinish} />
        </div>
      )}
    </div>
  );
}
