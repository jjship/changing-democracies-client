"use client";
import * as z from "zod";

import { FormVideo } from "@/types/videos";
import { useEffect, useState } from "react";
import { getSubtitles, saveCaptions, saveVideo } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateVideoModel } from "@/lib/bunnyMethods";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    videoId: z.string(),
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(50, { message: "Title must be at most 50 characters long" })
      .optional(),
    description: z.string().optional(),
    tags: z.string().optional(),
    caption: z.object({
      srclang: z.string(),
      label: z.string(),
    }),
    subtitles: z.string(),
  })
  .refine(
    (data) => {
      const { tags } = data;
      if (!tags) return true;
      const tagsArray = tags.split(",");
      return (
        tagsArray.every((tag) => tag.length <= 20) &&
        tagsArray.every((tag) => tag.trim().split(" ").length === 1)
      );
    },
    {
      message: "Tags must be comma separated and have no spaces in them.",
      path: ["tags"],
    },
  );

export default function VideoForm({ formVideo }: { formVideo: FormVideo }) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    FormVideo["captions"][0]
  >({ srclang: "", label: "" });
  const [subtitles, setSubtitles] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [exitText, setExitText] = useState("Go back to videos list");
  const [error, setError] = useState<string>("");

  const { guid: videoId, captions } = formVideo;

  useEffect(() => {
    async function fetchSubtitles() {
      if (selectedLanguage.srclang) {
        const { data, error } = await getSubtitles({
          videoId,
          srclang: selectedLanguage.srclang,
        });

        if (data) {
          setSubtitles(data);
        } else {
          throw error;
        }
      }
    }
    fetchSubtitles();
  }, [selectedLanguage]);

  async function onSubmit(values: FormSchema) {
    const metadata = parseVideoMetadata({ formMetadata: values });

    const { error: metadataError } = await saveVideo(metadata);

    let {
      subtitles,
      caption: { srclang },
    } = values;

    if (srclang && srclang.split("-").length > 1) {
      srclang = srclang.split("-")[0];
    }

    const { error: captionsError } = await saveCaptions({
      videoId,
      captions: subtitles,
      srclang,
      label: selectedLabel,
    });

    if (metadataError || captionsError) {
      setError(
        `${metadataError ?? ""}${captionsError ? " " + captionsError : ""}`,
      );
      throw metadataError || captionsError;
    } else {
      setError("");
    }

    if (!metadataError && !captionsError) window.location.reload();
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formVideo,
    values: {
      videoId,
      subtitles,
      caption: selectedLanguage,
    },
    mode: "onChange",
  });

  const { isSubmitted, isDirty, isSubmitting, isSubmitSuccessful } =
    form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-5 p-5">
          <div className="flex w-full gap-10">
            <div className="flex-grow space-y-5 ">
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select subtitles to edit</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selectedCaption = captions.find(
                          (caption) => caption.srclang === value,
                        );
                        field.onChange(value);
                        if (selectedCaption) {
                          setSelectedLanguage(selectedCaption);
                          setSelectedLabel(selectedCaption.label);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {captions.map((caption) => (
                          <SelectItem
                            key={caption.srclang}
                            value={caption.srclang}
                          >
                            {caption.srclang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!subtitles && (
                <>
                  <FormField
                    control={form.control}
                    name="caption.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitles Label</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={selectedLabel}
                            onChange={(e) => setSelectedLabel(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subtitles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitles</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex-grow space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comma separated list of tags</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {!!error && (
            <div className="bg-destructive">
              <p>Something went wrong. Please try again.</p>
              <p>{`Error message: "${error}"`}</p>
            </div>
          )}
          {isSubmitting && !error ? (
            <Button
              className={`w-1/3 min-w-min bg-yellow_secondary text-black_bg`}
              disabled
            >
              Saving....
            </Button>
          ) : (
            <Button
              className={`w-1/3 min-w-min hover:bg-green_accent hover:text-black_bg`}
              type="submit"
              disabled={!isDirty}
            >
              {isDirty ? "Save changes" : "No changes to save"}
            </Button>
          )}

          <Button
            className={`w-1/4 min-w-min ${
              isDirty
                ? "hover:bg-red_mains hover:text-black_bg"
                : "hover:bg-yellow_secondary hover:text-black_bg"
            }`}
            onClick={() => window.location.replace("/admin?videos=true")}
            onMouseEnter={() => {
              if (isDirty) setExitText("Any unsaved changes will be lost!");
            }}
            onMouseLeave={() => setExitText("Go back to videos list")}
          >
            {exitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function parseVideoMetadata({
  formMetadata,
}: {
  formMetadata: FormSchema;
}): UpdateVideoModel {
  const getMetaTags = (formMetadata: FormSchema) => {
    const metaTags: UpdateVideoModel["metaTags"] = [];

    if (formMetadata.description) {
      metaTags.push({
        property: "description",
        value: formMetadata.description,
      });
    }

    if (formMetadata.tags) {
      metaTags.push({
        property: "tags",
        value: formMetadata.tags.toUpperCase(),
      });
    }

    return metaTags;
  };

  return {
    guid: formMetadata.videoId,
    title: formMetadata.title,
    metaTags: getMetaTags(formMetadata),
  };
}
