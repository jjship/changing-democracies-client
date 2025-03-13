import { FC } from "react";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide0Content: FC = () => {
  return (
    <>
      <div className={`ml-2 flex items-center`}>
        {/* Arrow Rectangle */}
        <div className="h-12 w-64 bg-slate-500/70" />

        {/* Arrow Triangle - Changes color on hover */}
        <div
          className="h-0 w-0 
        border-b-[8rem] border-l-[10rem] 
        border-t-[8rem] border-b-transparent 
        border-l-amber-400 border-t-transparent
        transition-colors
        duration-200 group-hover:border-l-teal-300"
        />
      </div>

      <div className="absolute bottom-10 left-10 z-10 flex items-center justify-center bg-black/30 mix-blend-screen">
        <div className="min-w-[60vw] text-left">
          <h1 className={`${archivo.className} text-8xl  text-green_accent`}>
            <span className={`block ${archivo.className}`}>Scroll</span>
            <span className={`mt-4 block ${archivo.className}`}>
              documentary
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};
