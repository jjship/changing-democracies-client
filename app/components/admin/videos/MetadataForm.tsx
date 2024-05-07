"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UpdateVideoModel } from "@/lib/bunnyMethods";
import { saveVideo } from "../actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { FormVideo } from "@/types/videos";

export type FormMetadata = z.infer<typeof formMetadataSchema>;

export default function MetadataForm({
  defaultValues,
}: {
  defaultValues: FormVideo;
}) {
  const [submited, setSubmited] = useState<boolean>(false);

  const form = useForm<FormMetadata>({
    resolver: zodResolver(formMetadataSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(values: FormMetadata) {
    const videoData = parseVideoMetadata({ formMetadata: values });

    const { error } = await saveVideo(videoData);

    if (error) {
      console.error(error);
      throw error;
    }

    form.reset();

    setSubmited(true);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          onSubmit(form.getValues());
        })}
        className="flex-grow space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video title</FormLabel>
              <FormControl>
                <Input disabled={submited} {...field} />
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
                <Input disabled={submited} {...field} />
              </FormControl>
              <FormDescription>Max 100 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input disabled={submited} {...field} />
              </FormControl>
              <FormDescription>Comma separated list of tags</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-5 w-full hover:bg-green_accent hover:text-black_bg"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

function parseVideoMetadata({
  formMetadata,
}: {
  formMetadata: FormMetadata;
}): UpdateVideoModel {
  const getMetaTags = (formMetadata: FormMetadata) => {
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
    guid: formMetadata.guid,
    title: formMetadata.title,
    metaTags: getMetaTags(formMetadata),
  };
}

const formMetadataSchema = z.object({
  guid: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(50, { message: "Title must be at most 50 characters long" })
    .optional(),
  description: z
    .string()
    .max(100, { message: "Video type must be at most 100 characters long" })
    .optional(),
  tags: z.string().optional(),
  // captionsList: z.array(z.string()).optional(),
});
