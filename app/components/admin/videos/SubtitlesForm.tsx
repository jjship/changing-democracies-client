"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Textarea } from "../../ui/textarea";
import { getSubtitles, saveCaptions } from "../actions";
// import { FormVideo } from "./VideoFormFields";
import { Input } from "../../ui/input";
// import { FormMetadata } from "./MetadataForm";
import { FormVideo } from "@/types/videos";

type FormSubtitles = z.infer<typeof formSubtitlesSchema>;

const formSubtitlesSchema = z.object({
  caption: z.object({
    srclang: z.string(),
    label: z.string(),
  }),
  subtitles: z.string(),
});

export default function SubtitlesForm({
  defaultValues,
}: {
  defaultValues: FormVideo;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    FormVideo["captions"][0]
  >({ srclang: "", label: "" });

  const [subtitles, setSubtitles] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [submited, setSubmited] = useState<boolean>(false);

  const { guid: videoId, captions } = defaultValues;

  useEffect(() => {
    async function fetchSubtitles() {
      if (selectedLanguage.srclang) {
        const { srclang } = selectedLanguage;
        const subs = await getSubtitles({
          videoId,
          srclang,
        });

        setSubtitles(subs);
      }
    }
    fetchSubtitles();
  }, [selectedLanguage]);

  const form = useForm<FormSubtitles>({
    resolver: zodResolver(formSubtitlesSchema),
    values: {
      subtitles,
      caption: selectedLanguage,
    },
  });

  async function onSubmit(data: FormSubtitles) {
    let {
      subtitles,
      caption: { srclang },
    } = data;
    if (srclang.split("-").length > 1) {
      srclang = srclang.split("-")[0];
    }
    const { error } = await saveCaptions({
      videoId,
      captions: subtitles,
      srclang,
      label: selectedLabel,
    });
    if (error) {
      console.error(error);
      throw error;
    }
    setSubmited(true);
  }

  return !submited ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-grow space-y-6"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit subtitles</FormLabel>
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
                    <SelectValue placeholder="Select subtitles to edit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {captions.map((caption) => (
                    <SelectItem key={caption.srclang} value={caption.srclang}>
                      {caption.srclang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption.label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
        <Button type="submit">
          {selectedLanguage.srclang
            ? "Submit subtitles"
            : "Choose subtitles to edit"}
        </Button>
      </form>
    </Form>
  ) : (
    <Button
      onClick={() => {
        setSubmited(false);
        form.reset();
      }}
    >
      Edit another subtitles
    </Button>
  );
}
