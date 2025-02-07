"client component";
import { FC } from "react";
import Title from "./Title";

const EducationalResources: FC = () => {
  return (
    <>
      <Title text="Educational Resources" theme="light" />
      <div className="w-5/12 py-10">
        <h2 className="mb-4 text-xl font-bold">
          Learning from the Past, reflecting on Today
        </h2>
        <p className="mb-4 italic">
          Can the experiences of those who lived through a transition from a
          non-democratic to a democratic society inspire young people to think
          critically about democracy today?
        </p>
        <p className="mb-3">
          To help young people engage with the testimonies collected within the
          Changing Democracies project, we co-created an Educational Resource
          Pack filled with adaptable learning activities for both formal and
          non-formal education. Whether you are a history teacher, museum
          educator, youth worker, or work in another educational setting, you
          can pick, adapt, and tailor these activities to fit your needs.
        </p>
        <p className="mb-3">
          Each activity is built around first-hand testimonies, weaving together
          voices from across borders into non-linear narratives that explore
          five key questions:
        </p>
        <ul className="mb-3 list-inside list-disc">
          <li>What makes you angry about the world today?</li>
          <li>Do you dare to challenge your teachers?</li>
          <li>What influences you in life?</li>
          <li>Do you know what your grandparents think of young people?</li>
          <li>What do you expect from democracy?</li>
        </ul>
        <p className="mb-4">
          These questions invite deep discussion, reflection, and connection—
          helping young people relate history to their own lives and societies.
        </p>
        <a
          href={`https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/edu/Educational_Resource_Pack_Eng.pdf`}
          className="inline-block rounded bg-darkRed px-4 py-2 text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the English version
        </a>
      </div>
    </>
  );
};

export default EducationalResources;
