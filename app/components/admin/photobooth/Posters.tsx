import { DbPoster, getPosters } from "../../../../lib/bunnyMethods";
import Image from "next/image";

export default async function Posters({ posters }: { posters: DbPoster[] }) {
  return (
    posters && (
      <div className="flex h-screen items-center justify-center">
        <div className="grid grid-cols-2 gap-5">
          {posters.map((poster) => (
            <div key={poster.Guid}>
              <Image
                src={`https://cd-dev-pull.b-cdn.net/posters/${poster.ObjectName}`}
                alt={poster.ObjectName}
                width={200}
                height={200}
              />
              <p>{poster.ObjectName}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
