import { Archivo_Narrow } from "next/font/google";
import { FC } from "react";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export const Slide16Content: FC = () => {
  return (
    <div className="relative right-1/4 top-5 flex h-[80vh] w-[24rem] flex-col items-center justify-center">
      <div style={{ fontSize: "1vw" }} className=" text-purple_lightest_bg ">
        <h2
          style={{ fontSize: "2vw", marginBottom: "1vw" }}
          className=" font-bold text-yellow_secondary "
        >
          Credits
        </h2>
        <p style={{ marginBottom: "1vw" }}>
          <span className="font-bold text-darkRed">Changing Democracies</span>{" "}
          aims to explore how Europe&ldquo;s living history about recent
          transitions to democracy might help us to explore and grasp what
          processes are needed today for democracy to fulfil its promises for
          everyone.
        </p>
        <p style={{ marginBottom: "1vw" }}>
          The project is the result of a collaboration between 12 partners from
          10 European countries and is coordinated by the Evens Foundation and
          EuroClio with funding from the European Commission.
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          SCRIPT
        </h3>
        <p style={{ marginBottom: "1vw" }}>
          David Sypniewski 
          <br />
          Marjolein Delvou and Hanna Zielińska (Evens Foundation) <br />
          Tijl Akkermans (Autres Directions)
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          VISUALS
        </h3>
        <p style={{ marginBottom: "1vw" }}>
          David Sypniewski 
          <br />
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          DEVELOPMENT
        </h3>
        <p style={{ marginBottom: "1vw" }}>Jacek Skrzypek</p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          MUSIC
        </h3>
        <p style={{ marginBottom: "1vw" }}>
          Kai Engel, <span className="italic">The Moments Of Our Mornings</span>
        </p>
      </div>
    </div>
  );
};
