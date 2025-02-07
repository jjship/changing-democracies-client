import { Archivo_Narrow } from "next/font/google";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export default function Slide15Content() {
  return (
    <div className="relative right-1/4 flex h-full w-[24rem] flex-col items-center justify-center">
      <div className="text-sm text-purple_lightest_bg ">
        <h2 className="mb-4 text-2xl font-bold text-yellow_secondary ">
          Credits
        </h2>
        <p className="mb-2">
          <span className="font-bold text-darkRed">Changing Democracies</span>{" "}
          aims to explore how Europe’s living history about recent transitions
          to democracy might help us to explore and grasp what processes are
          needed today for democracy to fulfil its promises for everyone.
        </p>
        <p className="mb-8">
          The project is the result of a collaboration between 12 partners from
          10 European countries and is coordinated by the Evens Foundation and
          EuroClio with funding from the European Commission.
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          SCRIPT
        </h3>
        <p className="mb-2">
          David Sypniewski 
          <br />
          Marjolein Delvou and Hanna Zielińska (Evens Foundation) <br />
          Tijl Akkermans (Autres Directions)
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          VISUALS
        </h3>
        <p className="mb-2">
          David Sypniewski 
          <br />
        </p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          DEVELOPMENT
        </h3>
        <p className="mb-2">Jacek Skrzypek</p>
        <h3 className={`${archivoNarrow.className} text-green_accent`}>
          MUSIC
        </h3>
        <p className="mb-2">Kai Engel, The Moments Of Our Mornings</p>
      </div>
    </div>
  );
}
