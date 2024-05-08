// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { saveAs } from "file-saver";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEffect, useState } from "react";
// import { Textarea } from "../../ui/textarea";
// import { getSubtitles, saveCaptions } from "../actions";
// // import { FormVideo } from "./VideoFormFields";
// import { Input } from "../../ui/input";
// // import { FormMetadata } from "./MetadataForm";
// import { FormVideo } from "@/types/videos";

// type FormSubtitles = z.infer<typeof formSubtitlesSchema>;

// const formSubtitlesSchema = z.object({
//   caption: z.object({
//     srclang: z.string(),
//     label: z.string(),
//   }),
//   subtitles: z.string(),
// });

// export default function SubtitlesForm({
//   defaultValues,
// }: {
//   defaultValues: FormVideo;
// }) {
//   const [selectedLanguage, setSelectedLanguage] = useState<
//     FormVideo["captions"][0]
//   >({ srclang: "", label: "" });

//   const [subtitles, setSubtitles] = useState<string>("");
//   const [selectedLabel, setSelectedLabel] = useState<string>("");
//   const [submited, setSubmited] = useState<boolean>(false);

//   const { guid: videoId, captions } = defaultValues;

//   // const filteredCaptions = captions.filter((caption) => {
//   //   const language = caption.srclang.split("-")[0];
//   //   if (
//   //     caption.srclang.split("-").length > 1 &&
//   //     captions.find((c) => c.srclang === language)
//   //   ) {
//   //     return false;
//   //   }
//   //   return true;
//   // });

//   // const filteredCaptions = captions;
//   // .filter((caption) => caption.srclang.split("-").length === 2)
//   // .filter(
//   //   (caption) =>
//   //     !captions.find((c) => c.srclang === caption.srclang.split("-")[0]),
//   // );

//   // console.log({ filteredCaptions });

//   useEffect(() => {
//     async function fetchSubtitles() {
//       const { srclang } = selectedLanguage;

//       if (srclang) {
//         const { data, error } = await getSubtitles({
//           videoId,
//           srclang,
//         });

//         if (data) {
//           setSubtitles(data);
//         } else {
//           throw error;
//         }
//       }
//     }
//     fetchSubtitles();
//   }, [selectedLanguage]);

//   const form = useForm<FormSubtitles>({
//     resolver: zodResolver(formSubtitlesSchema),
//     values: {
//       subtitles,
//       caption: selectedLanguage,
//     },
//   });

//   async function onSubmit(data: FormSubtitles) {
//     let {
//       subtitles,
//       caption: { srclang },
//     } = data;
//     if (srclang.split("-").length > 1) {
//       srclang = srclang.split("-")[0];
//     }
//     const { error } = await saveCaptions({
//       videoId,
//       captions: subtitles,
//       srclang,
//       label: selectedLabel,
//     });
//     if (error) {
//       console.error(error);
//       throw error;
//     }
//     setSubmited(true);
//   }

//   return !submited ? (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex-grow space-y-6"
//       >
//         <FormField
//           control={form.control}
//           name="caption"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Edit subtitles</FormLabel>
//               <Select
//                 onValueChange={(value) => {
//                   const selectedCaption = captions.find(
//                     (caption) => caption.srclang === value,
//                   );
//                   field.onChange(value);
//                   if (selectedCaption) {
//                     setSelectedLanguage(selectedCaption);
//                     setSelectedLabel(selectedCaption.label);
//                   }
//                 }}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select subtitles to edit" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {captions.map((caption) => (
//                     <SelectItem key={caption.srclang} value={caption.srclang}>
//                       {caption.srclang}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="caption.label"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Label</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   value={selectedLabel}
//                   onChange={(e) => setSelectedLabel(e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="subtitles"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Subtitles</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           type="submit"
//           className="mt-5 w-full hover:bg-green_accent hover:text-black_bg"
//         >
//           {selectedLanguage.srclang
//             ? "Submit subtitles"
//             : "Choose subtitles to edit"}
//         </Button>
//         {/* {selectedLanguage.srclang && (
//           <Button
//             onClick={() => {
//               const downloadLink = `https://${process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${videoId}/captions/${selectedLanguage.srclang}.vtt`;
//               const date = new Date().toLocaleDateString();
//               const filename = `${selectedLanguage.srclang}-${date}.vtt`;
//               saveAs(downloadLink, filename);
//             }}
//           >
//             Download Captions
//           </Button>
//         )} */}
//       </form>
//     </Form>
//   ) : (
//     <Button
//       onClick={() => {
//         setSubmited(false);
//         form.reset();
//       }}
//     >
//       Edit another subtitles
//     </Button>
//   );
// }
