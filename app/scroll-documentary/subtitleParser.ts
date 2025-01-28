function parseTimeString(timeString: string): number {
  const [timestamp, milliseconds] = timeString.trim().split(".");
  const [hours, minutes, seconds] = timestamp.split(":").map(Number);
  return (
    hours * 3600 + minutes * 60 + seconds + (Number(milliseconds) || 0) / 1000
  );
}

function parseSubtitles(
  vttContent: string,
): Array<{ start: number; end: number; text: string }> {
  const lines = vttContent.trim().split("\n");
  const subtitles: Array<{ start: number; end: number; text: string }> = [];
  let currentSubtitle: { start: number; end: number; text: string } | null =
    null;

  // Verify WebVTT header
  if (!lines[0].includes("WEBVTT")) {
    console.error("Invalid WebVTT file");
    return [];
  }

  let i = 1;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.includes("-->")) {
      const [startTime, endTime] = line.split("-->").map(parseTimeString);

      currentSubtitle = {
        start: startTime,
        end: endTime,
        text: "",
      };
    } else if (line !== "" && currentSubtitle) {
      // Handle WebVTT formatting tags
      const cleanedLine = line.replace(/<[^>]*>/g, "");
      currentSubtitle.text += (currentSubtitle.text ? " " : "") + cleanedLine;
    } else if (line === "" && currentSubtitle) {
      subtitles.push(currentSubtitle);
      currentSubtitle = null;
    }

    i++;
  }

  if (currentSubtitle) {
    subtitles.push(currentSubtitle);
  }

  return subtitles;
}
