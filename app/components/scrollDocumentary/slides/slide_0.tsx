import { FC } from "react";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide0Content: FC = () => {
  return (
    <>
      <div
        className={`group absolute left-0 top-1/2 flex -translate-y-1/2 items-center`}
      >
        {/* Arrow Rectangle */}
        <div className="h-36 w-[40rem] bg-purple_mains" />

        {/* Arrow Triangle - Changes color on hover */}
        <div
          className="z-20 h-0 w-0
        border-b-[7rem] border-l-[11rem] 
        border-t-[7rem] border-b-transparent 
        border-l-yellow_secondary border-t-transparent
        transition-colors
        duration-200 group-hover:border-l-teal-300"
        />
      </div>

      <div className="absolute bottom-10 left-60 z-10 flex items-center justify-center bg-black/30 mix-blend-screen">
        <div className="min-w-[60vw] text-left">
          <h1
            className={`${archivo.className} text-8xl  text-yellow_secondary`}
          >
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
