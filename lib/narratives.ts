import { NarrationPath } from "../types/videosAndFilms";
import { cdApiRequest } from "./cdApi";

export const narrativesApi = {
  async getNarratives(): Promise<NarrationPath[]> {
    try {
      return await cdApiRequest<NarrationPath[]>({
        endpoint: "/client-narratives",
        options: {
          method: "POST",
          body: JSON.stringify({
            languageCode: "en",
          }),
          next: { revalidate: 15 * 60 }, // 15 minutes
        },
      });
    } catch (error) {
      console.error("Error fetching narratives:", error);
      throw error;
    }
  },
};
