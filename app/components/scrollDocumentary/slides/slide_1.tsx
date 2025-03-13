import { FC } from "react";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide1Content: FC = () => {
  return (
    <div className="absolute left-4 top-10 z-10 flex items-center justify-center bg-black/30 mix-blend-screen">
      <div className="min-w-[60vw] text-left">
        <h1 className={`${archivo.className} text-8xl  text-green_accent`}>
          <span className={`block ${archivo.className}`}>Is democracy</span>
          <span className={`mt-4 block ${archivo.className}`}>worth</span>
          <span className={`mt-4 block ${archivo.className}`}>
            the trouble?
          </span>
        </h1>
      </div>
    </div>
  );
};
