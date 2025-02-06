import NarrativesLayout from "@/components/narratives/NarrativesLayout";

export default async function NarrativesPage() {
  const narratives = [
    {
      id: "37f504e0-737d-4363-b4a0-1b021dbc51d8",
      title: "What makes you angry about the world today?",
      description: [
        "How do you respond when reality clashes with your ideals?",
        "Do you care enough to make a difference?",
        "Get some insights from people who experienced a transition from dictatorship to democracy.",
        "See what moved some of our witnesses to acknowledge, think, demonstrate, raise awareness, rebel, propose alternatives, teach, sing.",
        "Do their stories resonate with you?",
        "Watch now and ask yourself what would move you to action.",
      ],
      total_length: 1196,
      fragments: [
        {
          guid: "e5b7fefb-ee1f-430a-9078-8b77ae67a5f5",
          title: "CD_GREECE_Petros Pizanias_Quote 2.mp4",
          length: 68,
          sequence: 1,
          otherPaths: [
            {
              id: "50233bf6-ed3d-47ae-a849-9a6f5cf274f3",
              title:
                "Do you know what your grandparents think of young people? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e5b7fefb-ee1f-430a-9078-8b77ae67a5f5",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e5b7fefb-ee1f-430a-9078-8b77ae67a5f5/thumbnail.jpg",
          person: "Petros Pizanias",
          bio: "Slobodanka Moravčević (47) is Serbian and Belgian. She grew up in the part of former Yugoslavia that later became the Republic of Serbia. Slobodanka stayed in Belgrade during the Yugoslav Wars. As a student she was an active member of OTPOR, a nonviolent protest movement against the Milošević-controlled Serbian authorities. After living in Mexico for some time she met her current Belgian husband in 2014 and migrated to Belgium. Slobodanka currently works as a lecturer of Serbo-Croatian language at the University of Ghent. She is an orthodox Christian.",
          country: "Greece",
        },
        {
          guid: "47335cc5-392c-4584-8344-a4b9e53d6be6",
          title: "CD_CZECH REPUBLIC_Lucia Bartošová_Quote 3.mp4",
          length: 29,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/47335cc5-392c-4584-8344-a4b9e53d6be6",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/47335cc5-392c-4584-8344-a4b9e53d6be6/thumbnail.jpg",
          person: "Lucia Bartošová",
          country: "Czech Republic",
        },
        {
          guid: "afbb1d9b-f6aa-410c-a0b1-dd48175757f5",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 1.mp4",
          length: 98,
          sequence: 3,
          otherPaths: [
            {
              id: "dc265faf-202a-4ea4-8268-f222806b9047",
              title: "Why would we trust them?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/afbb1d9b-f6aa-410c-a0b1-dd48175757f5",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/afbb1d9b-f6aa-410c-a0b1-dd48175757f5/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "473de854-532a-41cc-ba7b-b4e1ea2f11bc",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 2.mp4",
          length: 136,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/473de854-532a-41cc-ba7b-b4e1ea2f11bc",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/473de854-532a-41cc-ba7b-b4e1ea2f11bc/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
        {
          guid: "cb046c2a-0bea-41c3-994c-0a385031405d",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 4.mp4",
          length: 85,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/cb046c2a-0bea-41c3-994c-0a385031405d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/cb046c2a-0bea-41c3-994c-0a385031405d/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "a35f7a99-70ba-4314-8091-be7082e7d747",
          title: "CD_NETHERLANDS_Amir Mohammadi_Quote 4.mp4",
          length: 89,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a35f7a99-70ba-4314-8091-be7082e7d747",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a35f7a99-70ba-4314-8091-be7082e7d747/thumbnail.jpg",
          person: "Amir Mohammadi",
          country: "Netherlands",
        },
        {
          guid: "ec20343c-f881-4410-96ad-1d5d90c82f0c",
          title: "CD_NETHERLANDS_Jeangu Macrooy_Quote 6.mp4",
          length: 79,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/ec20343c-f881-4410-96ad-1d5d90c82f0c",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/ec20343c-f881-4410-96ad-1d5d90c82f0c/thumbnail.jpg",
          person: "Jeangu Macrooy",
          country: "Netherlands",
        },
        {
          guid: "3ce9a987-cff7-4a7a-ad34-ab8f2419f89b",
          title: "CD_CROATIA_Željko Rogina_Quote 4.mp4",
          length: 56,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/3ce9a987-cff7-4a7a-ad34-ab8f2419f89b",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/3ce9a987-cff7-4a7a-ad34-ab8f2419f89b/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "0410364c-28d4-4bee-8fbf-78e9106f7264",
          title: "CD_CROATIA_Željko Rogina_Quote 3.mp4",
          length: 121,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0410364c-28d4-4bee-8fbf-78e9106f7264",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0410364c-28d4-4bee-8fbf-78e9106f7264/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "88648553-c6ea-4b4c-bf96-466330cd6c6d",
          title: "CD_PORTUGAL_Maria Filomena Manuel_Quote 3.mp4",
          length: 85,
          sequence: 10,
          otherPaths: [
            {
              id: "b3f9bfeb-c819-43e5-9e47-1c7b00e27a1a",
              title: "Can we be honest? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/88648553-c6ea-4b4c-bf96-466330cd6c6d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/88648553-c6ea-4b4c-bf96-466330cd6c6d/thumbnail.jpg",
          person: "Maria Filomena Manuel",
          country: "Portugal",
        },
        {
          guid: "e971a7f8-4298-4d93-a744-f0975bf01234",
          title: "CD_BELGIUM_Slobodanka Moravčević_Quote 3.mp4",
          length: 288,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e971a7f8-4298-4d93-a744-f0975bf01234",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e971a7f8-4298-4d93-a744-f0975bf01234/thumbnail.jpg",
          person: "Slobodanka Moravčević",
          country: "Belgium",
        },
        {
          guid: "df67e3e8-6dd2-4b89-ba90-c1bf981dcd0e",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 8.mp4",
          length: 62,
          sequence: 12,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/df67e3e8-6dd2-4b89-ba90-c1bf981dcd0e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/df67e3e8-6dd2-4b89-ba90-c1bf981dcd0e/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
      ],
    },
    {
      id: "46eadb1a-e756-4294-881a-6ded755f68c6",
      title: "Do you dare to challenge your teachers? ",
      description: [
        "What is the main role of teachers according to you?",
        "Were/are you free to speak your mind at school? ",
        "Discover school memories from people who experienced a transition from dictatorship to democracy. Learn how education was used in particular political and societal contexts. ",
        "Do you recognize recurring patterns? ",
        "Watch now and imagine if and how democracy can be learned.",
      ],
      total_length: 711,
      fragments: [
        {
          guid: "8c6f39a4-df13-41b3-8f2e-805d97c80381",
          title: "CD_POLAND_Krzysztof Tur_Quote 2.mp4",
          length: 59,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/8c6f39a4-df13-41b3-8f2e-805d97c80381",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/8c6f39a4-df13-41b3-8f2e-805d97c80381/thumbnail.jpg",
          person: "Krzysztof Tur",
          country: "Poland",
        },
        {
          guid: "a5a2acb2-df87-41af-ac98-e2ed0010db8f",
          title: "CD_POLAND_Krzysztof Tur_Quote 3.mp4",
          length: 49,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a5a2acb2-df87-41af-ac98-e2ed0010db8f",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a5a2acb2-df87-41af-ac98-e2ed0010db8f/thumbnail.jpg",
          person: "Krzysztof Tur",
          country: "Poland",
        },
        {
          guid: "491c2d5f-6052-4679-add4-39fa44891321",
          title: "CD_POLAND_Joanna Miłosz-Piekarska_Quote 4.mp4",
          length: 46,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/491c2d5f-6052-4679-add4-39fa44891321",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/491c2d5f-6052-4679-add4-39fa44891321/thumbnail.jpg",
          person: "Joanna Miłosz-Piekarska",
          country: "Poland",
        },
        {
          guid: "6e5bf059-6817-4070-b258-3e6ec51a8c0f",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 3.mp4",
          length: 55,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/6e5bf059-6817-4070-b258-3e6ec51a8c0f",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/6e5bf059-6817-4070-b258-3e6ec51a8c0f/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
        {
          guid: "ae820c25-aaae-4aff-9636-849d20a2639d",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 4.mp4",
          length: 77,
          sequence: 5,
          otherPaths: [
            {
              id: "9508c63b-f633-4c85-ad9c-f933939ae799",
              title: "How to resist? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/ae820c25-aaae-4aff-9636-849d20a2639d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/ae820c25-aaae-4aff-9636-849d20a2639d/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "28e76925-4a5c-4904-9a3a-989b80dbd1e6",
          title: "CD_LITHUANIA_Rasa Kausakiene_Quote 3.mp4",
          length: 97,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/28e76925-4a5c-4904-9a3a-989b80dbd1e6",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/28e76925-4a5c-4904-9a3a-989b80dbd1e6/thumbnail.jpg",
          person: "Rasa Kausakiene",
          country: "Lithuania",
        },
        {
          guid: "b0bb69d7-cac1-46dc-a0dd-83b97cecec87",
          title: "CD_CZECH REPUBLIC_Lucia Bartošová_Quote 5.mp4",
          length: 49,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b0bb69d7-cac1-46dc-a0dd-83b97cecec87",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b0bb69d7-cac1-46dc-a0dd-83b97cecec87/thumbnail.jpg",
          person: "Lucia Bartošová",
          country: "Czech Republic",
        },
        {
          guid: "166deda1-6b50-45ae-9fe2-1700347c8f2b",
          title: "CD_CZECH REPUBLIC_Lucia Bartošová_Quote 6.mp4",
          length: 65,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/166deda1-6b50-45ae-9fe2-1700347c8f2b",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/166deda1-6b50-45ae-9fe2-1700347c8f2b/thumbnail.jpg",
          person: "Lucia Bartošová",
          country: "Czech Republic",
        },
        {
          guid: "69ded703-7b2e-43a5-9577-e4fc2dac1db7",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 5.mp4",
          length: 32,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/69ded703-7b2e-43a5-9577-e4fc2dac1db7",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/69ded703-7b2e-43a5-9577-e4fc2dac1db7/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "291266b2-8570-4c80-be49-f977b8c55239",
          title: "CD_ROMANIA_Vladut Andreescu_Quote 4.mp4",
          length: 37,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/291266b2-8570-4c80-be49-f977b8c55239",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/291266b2-8570-4c80-be49-f977b8c55239/thumbnail.jpg",
          person: "Vladut Andreescu",
          country: "Romania",
        },
        {
          guid: "f3aaf4fa-b503-43ca-a11d-855b278f5af3",
          title: "CD_NETHERLANDS_Chee-Han Kartosen-Wong_Quote 4.mp4",
          length: 58,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/f3aaf4fa-b503-43ca-a11d-855b278f5af3",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/f3aaf4fa-b503-43ca-a11d-855b278f5af3/thumbnail.jpg",
          person: "Chee-Han Kartosen-Wong",
          country: "Netherlands",
        },
        {
          guid: "0c7ea8db-24b1-4d2b-958c-026374e801f5",
          title: "CD_CROATIA_Milan Ivanovic_Quote 12.mp4",
          length: 87,
          sequence: 12,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0c7ea8db-24b1-4d2b-958c-026374e801f5",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0c7ea8db-24b1-4d2b-958c-026374e801f5/thumbnail.jpg",
          person: "Milan Ivanovic",
          country: "Croatia",
        },
      ],
    },
    {
      id: "e906246d-6257-4366-9020-39027ab71b5e",
      title: "What influences you in life? ",
      description: [
        "Have you ever thought about this question? ",
        "Are you aware of who and what affects your thinking, choices and actions?",
        "Find out what it looked like for people who experienced a transition from dictatorship to democracy. Discover how they talk about the role of their family and friends, school, history, media, books, films, the system, the world outside etc. ",
        "Does this sound familiar? ",
        "Watch now and check if and what you would add to the list. ",
      ],
      total_length: 1559,
      fragments: [
        {
          guid: "23be7b7b-f356-4abd-b71b-602e546eb999",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 6.mp4",
          length: 53,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/23be7b7b-f356-4abd-b71b-602e546eb999",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/23be7b7b-f356-4abd-b71b-602e546eb999/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "1c29fa2a-27c9-4470-b854-e49d54a2405d",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 7.mp4",
          length: 27,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/1c29fa2a-27c9-4470-b854-e49d54a2405d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/1c29fa2a-27c9-4470-b854-e49d54a2405d/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "3174e9aa-590d-4935-a8e6-0bb0d1df03bd",
          title: "CD_GREECE_Petros Pizanias_Quote 5.mp4",
          length: 108,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/3174e9aa-590d-4935-a8e6-0bb0d1df03bd",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/3174e9aa-590d-4935-a8e6-0bb0d1df03bd/thumbnail.jpg",
          person: "Petros Pizanias",
          country: "Greece",
        },
        {
          guid: "f5ff8387-a326-43c1-bedd-cf6ece252c0f",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 8.mp4",
          length: 113,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/f5ff8387-a326-43c1-bedd-cf6ece252c0f",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/f5ff8387-a326-43c1-bedd-cf6ece252c0f/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "a203b337-8691-4a78-b864-649484afa5d8",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 7.mp4",
          length: 118,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a203b337-8691-4a78-b864-649484afa5d8",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a203b337-8691-4a78-b864-649484afa5d8/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "09f2348b-57f3-40b1-af75-24bef29bee46",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 8.mp4",
          length: 52,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/09f2348b-57f3-40b1-af75-24bef29bee46",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/09f2348b-57f3-40b1-af75-24bef29bee46/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "22ad5e09-9e96-4af8-a42f-d7f9e2096b4c",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 10.mp4",
          length: 56,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/22ad5e09-9e96-4af8-a42f-d7f9e2096b4c",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/22ad5e09-9e96-4af8-a42f-d7f9e2096b4c/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "29c2666e-4637-4d0d-85e8-6c6b4f604686",
          title: "CD_ROMANIA_Ivan Florian_Quote 2.mp4",
          length: 78,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/29c2666e-4637-4d0d-85e8-6c6b4f604686",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/29c2666e-4637-4d0d-85e8-6c6b4f604686/thumbnail.jpg",
          person: "Ivan Florian",
          country: "Romania",
        },
        {
          guid: "df38bd23-036c-43c1-91f8-5eeddffc29fb",
          title: "CD_PORTUGAL_Armandina Soares_Quote 3.mp4",
          length: 107,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/df38bd23-036c-43c1-91f8-5eeddffc29fb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/df38bd23-036c-43c1-91f8-5eeddffc29fb/thumbnail.jpg",
          person: "Armandina Soares",
          country: "Portugal",
        },
        {
          guid: "0ad1fb9a-8034-461c-a5d6-477afe16a861",
          title: "CD_LITHUANIA_Vladimir Davydov_Quote 3.mp4",
          length: 233,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0ad1fb9a-8034-461c-a5d6-477afe16a861",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0ad1fb9a-8034-461c-a5d6-477afe16a861/thumbnail.jpg",
          person: "Vladimir Davydov",
          country: "Lithuania",
        },
        {
          guid: "20f7c4b0-c534-4e1b-87d4-e7545a860e25",
          title: "CD_LITHUANIA_Vladimir Davydov_Quote 4.mp4",
          length: 18,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/20f7c4b0-c534-4e1b-87d4-e7545a860e25",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/20f7c4b0-c534-4e1b-87d4-e7545a860e25/thumbnail.jpg",
          person: "Vladimir Davydov",
          country: "Lithuania",
        },
        {
          guid: "d7444420-c1ba-4ba5-b3e6-3055aa3c9e25",
          title: "CD_NETHERLANDS_Amir Mohammadi_Quote 5.mp4",
          length: 34,
          sequence: 12,
          otherPaths: [
            {
              id: "9508c63b-f633-4c85-ad9c-f933939ae799",
              title: "How to resist? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/d7444420-c1ba-4ba5-b3e6-3055aa3c9e25",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/d7444420-c1ba-4ba5-b3e6-3055aa3c9e25/thumbnail.jpg",
          person: "Amir Mohammadi",
          country: "Netherlands",
        },
        {
          guid: "88f8d6dd-f8c5-486c-b8cb-682995ada8b9",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 5.mp4",
          length: 89,
          sequence: 13,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/88f8d6dd-f8c5-486c-b8cb-682995ada8b9",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/88f8d6dd-f8c5-486c-b8cb-682995ada8b9/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
        {
          guid: "8f30764c-d040-4b76-bc1b-ba1ce8afe9aa",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 5.mp4",
          length: 44,
          sequence: 14,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/8f30764c-d040-4b76-bc1b-ba1ce8afe9aa",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/8f30764c-d040-4b76-bc1b-ba1ce8afe9aa/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "28e06b5a-d454-410a-86e4-43b317c4a26e",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 11.mp4",
          length: 150,
          sequence: 15,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/28e06b5a-d454-410a-86e4-43b317c4a26e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/28e06b5a-d454-410a-86e4-43b317c4a26e/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "be0f2e03-5f5b-4b44-86c9-78ffa82c066f",
          title: "CD_POLAND_Joanna Miłosz-Piekarska_Quote 5.mp4",
          length: 129,
          sequence: 16,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/be0f2e03-5f5b-4b44-86c9-78ffa82c066f",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/be0f2e03-5f5b-4b44-86c9-78ffa82c066f/thumbnail.jpg",
          person: "Joanna Miłosz-Piekarska",
          country: "Poland",
        },
        {
          guid: "487229fe-7d4c-4fe3-8c80-90cee9f5b85e",
          title: "CD_NETHERLANDS_Chee-Han Kartosen-Wong_Quote 5.mp4",
          length: 150,
          sequence: 17,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/487229fe-7d4c-4fe3-8c80-90cee9f5b85e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/487229fe-7d4c-4fe3-8c80-90cee9f5b85e/thumbnail.jpg",
          person: "Chee-Han Kartosen-Wong",
          country: "Netherlands",
        },
      ],
    },
    {
      id: "50233bf6-ed3d-47ae-a849-9a6f5cf274f3",
      title: "Do you know what your grandparents think of young people? ",
      description: [
        "Do you feel like your grandparents understand you and vice versa? ",
        "What do you share with your grandparents?",
        "Listen to the messages from a generation that experienced a transition from dictatorship to democracy. Compare their hopes and frustrations about young people’s engagement for the common good. ",
        "Does it trigger you?",
        "Watch now and think about what you can learn from each other. ",
      ],
      total_length: 1312,
      fragments: [
        {
          guid: "92328743-6327-4aa4-97c3-cb1901dfe331",
          title: "CD_SPAIN_Ovidia Sanchez Raquena_Quote 3.mp4",
          length: 78,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/92328743-6327-4aa4-97c3-cb1901dfe331",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/92328743-6327-4aa4-97c3-cb1901dfe331/thumbnail.jpg",
          person: "Ovidia Sanchez Raquena",
          country: "Spain",
        },
        {
          guid: "e5b7fefb-ee1f-430a-9078-8b77ae67a5f5",
          title: "CD_GREECE_Petros Pizanias_Quote 2.mp4",
          length: 68,
          sequence: 2,
          otherPaths: [
            {
              id: "37f504e0-737d-4363-b4a0-1b021dbc51d8",
              title: "What makes you angry about the world today?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e5b7fefb-ee1f-430a-9078-8b77ae67a5f5",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e5b7fefb-ee1f-430a-9078-8b77ae67a5f5/thumbnail.jpg",
          person: "Petros Pizanias",
          country: "Greece",
        },
        {
          guid: "19125b7e-7a69-4957-9c18-dd44a1a3269d",
          title: "CD_BELGIUM_Slobodanka Moravčević_Quote 1.mp4",
          length: 185,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/19125b7e-7a69-4957-9c18-dd44a1a3269d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/19125b7e-7a69-4957-9c18-dd44a1a3269d/thumbnail.jpg",
          person: "Slobodanka Moravčević",
          country: "Belgium",
        },
        {
          guid: "baf8a1bc-13c6-40d4-9e3b-903fd6bfb294",
          title: "CD_POLAND_Witold Liszkowski_QUOTE 1.mp4",
          length: 145,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/baf8a1bc-13c6-40d4-9e3b-903fd6bfb294",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/baf8a1bc-13c6-40d4-9e3b-903fd6bfb294/thumbnail.jpg",
          person: "Witold Liszkowski",
          country: "Poland",
        },
        {
          guid: "5d0699b3-e099-4df4-a88b-bf7ddc659fb8",
          title: "CD_CROATIA_Milan Ivanovic_Quote 2.mp4",
          length: 71,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/5d0699b3-e099-4df4-a88b-bf7ddc659fb8",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/5d0699b3-e099-4df4-a88b-bf7ddc659fb8/thumbnail.jpg",
          person: "Milan Ivanovic",
          country: "Croatia",
        },
        {
          guid: "dbed72c3-7fbe-439d-b9a0-1fd53716ddeb",
          title: "CD_SPAIN_Mariano Royo Arpón_Quote 2.mp4",
          length: 120,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/dbed72c3-7fbe-439d-b9a0-1fd53716ddeb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/dbed72c3-7fbe-439d-b9a0-1fd53716ddeb/thumbnail.jpg",
          person: "Mariano Royo Arpón",
          country: "Spain",
        },
        {
          guid: "7c2ca0d8-972a-484b-88f8-5b1f835b4e08",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 3.mp4",
          length: 56,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/7c2ca0d8-972a-484b-88f8-5b1f835b4e08",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/7c2ca0d8-972a-484b-88f8-5b1f835b4e08/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "f88163eb-ad86-4396-9850-9451ea7e8c64",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 1.mp4",
          length: 38,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/f88163eb-ad86-4396-9850-9451ea7e8c64",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/f88163eb-ad86-4396-9850-9451ea7e8c64/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "79a1d352-a378-4c42-bf0e-6abd3ea10c8d",
          title: "CD_BELGIUM_Norbert Ngila_Quote 7.mp4",
          length: 47,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/79a1d352-a378-4c42-bf0e-6abd3ea10c8d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/79a1d352-a378-4c42-bf0e-6abd3ea10c8d/thumbnail.jpg",
          person: "Norbert Ngila",
          country: "Belgium",
        },
        {
          guid: "0ab57bf5-3618-40cc-959d-067a19dbb3d2",
          title: "CD_LITHUANIA_Rasa Kaušakienė_Quote 2.mp4",
          length: 110,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0ab57bf5-3618-40cc-959d-067a19dbb3d2",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0ab57bf5-3618-40cc-959d-067a19dbb3d2/thumbnail.jpg",
          person: "Rasa Kaušakienė",
          country: "Lithuania",
        },
        {
          guid: "43626964-1605-4bb5-9e8d-b1cdd44c9f2b",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 11.mp4",
          length: 62,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/43626964-1605-4bb5-9e8d-b1cdd44c9f2b",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/43626964-1605-4bb5-9e8d-b1cdd44c9f2b/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "9c26ed5b-cc15-4add-a5de-5172c762a040",
          title: "CD_POLAND_Joanna Piekarska-Miłosz_Quote 2.mp4",
          length: 81,
          sequence: 12,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/9c26ed5b-cc15-4add-a5de-5172c762a040",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/9c26ed5b-cc15-4add-a5de-5172c762a040/thumbnail.jpg",
          person: "Joanna Piekarska-Miłosz",
          country: "Poland",
        },
        {
          guid: "83eb4737-9c17-4377-8fb9-d1d415ae568c",
          title: "CD_CROATIA_Željko Rogina_Quote 6.mp4",
          length: 123,
          sequence: 13,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/83eb4737-9c17-4377-8fb9-d1d415ae568c",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/83eb4737-9c17-4377-8fb9-d1d415ae568c/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "5641f4c9-209b-4783-9289-66fb500444a1",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 13.mp4",
          length: 15,
          sequence: 14,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/5641f4c9-209b-4783-9289-66fb500444a1",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/5641f4c9-209b-4783-9289-66fb500444a1/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "d0293d3c-3257-4bcd-af2e-3960e98809f8",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 23.mp4",
          length: 21,
          sequence: 15,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/d0293d3c-3257-4bcd-af2e-3960e98809f8",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/d0293d3c-3257-4bcd-af2e-3960e98809f8/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "93759f1a-7767-4d8a-9a1b-3d619d18d414",
          title: "CD_PORTUGAL_Maria Filomena Manuel_Quote 4.mp4",
          length: 44,
          sequence: 16,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/93759f1a-7767-4d8a-9a1b-3d619d18d414",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/93759f1a-7767-4d8a-9a1b-3d619d18d414/thumbnail.jpg",
          person: "Maria Filomena Manuel",
          country: "Portugal",
        },
        {
          guid: "b52d2f37-bc9a-4508-8091-da8a1a76f6eb",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 8.mp4",
          length: 48,
          sequence: 17,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b52d2f37-bc9a-4508-8091-da8a1a76f6eb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b52d2f37-bc9a-4508-8091-da8a1a76f6eb/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
      ],
    },
    {
      id: "cc30efa1-2da0-42bc-ba76-e21f845b69aa",
      title: "What do expect from democracy?",
      description: [
        "Do you believe in its ideals?",
        "Does the system work for everyone in the same way?",
        "Revisit the promises that democracy once held through the eyes of people who experienced a systemic change. Look into your own experiences and expectations. ",
        "What does it reveal? ",
        "Watch now and have a conversation:",
        "how can we reshape our democracies?",
      ],
      total_length: 1110,
      fragments: [
        {
          guid: "5c307752-0ece-4e68-b8ec-bc9d962e2c3a",
          title: "CD_CROATIA_Željko Rogina_Quote 7.mp4",
          length: 73,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/5c307752-0ece-4e68-b8ec-bc9d962e2c3a",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/5c307752-0ece-4e68-b8ec-bc9d962e2c3a/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "b0f195e8-3a7d-4487-a035-4b03eb73e428",
          title: "CD_CROATIA_Željko Rogina_Quote 8.mp4",
          length: 60,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b0f195e8-3a7d-4487-a035-4b03eb73e428",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b0f195e8-3a7d-4487-a035-4b03eb73e428/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "e32a0f04-61c3-40a8-ba9d-c04006eb83eb",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 14.mp4",
          length: 48,
          sequence: 3,
          otherPaths: [
            {
              id: "dc265faf-202a-4ea4-8268-f222806b9047",
              title: "Why would we trust them?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e32a0f04-61c3-40a8-ba9d-c04006eb83eb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e32a0f04-61c3-40a8-ba9d-c04006eb83eb/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "c14c61bf-221f-4232-a092-d7ee0707c42a",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 3.mp4",
          length: 63,
          sequence: 4,
          otherPaths: [
            {
              id: "b3f9bfeb-c819-43e5-9e47-1c7b00e27a1a",
              title: "Can we be honest? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/c14c61bf-221f-4232-a092-d7ee0707c42a",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/c14c61bf-221f-4232-a092-d7ee0707c42a/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "93e81d6b-4f81-4994-af70-dbdee3d9d3e1",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 13.mp4",
          length: 135,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/93e81d6b-4f81-4994-af70-dbdee3d9d3e1",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/93e81d6b-4f81-4994-af70-dbdee3d9d3e1/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "5fe95fed-a57c-4076-a314-0dad21b7e3ed",
          title: "CD_NETHERLANDS_Chee-Han Kartosen-Wong_Quote 1.mp4",
          length: 49,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/5fe95fed-a57c-4076-a314-0dad21b7e3ed",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/5fe95fed-a57c-4076-a314-0dad21b7e3ed/thumbnail.jpg",
          person: "Chee-Han Kartosen-Wong",
          country: "Netherlands",
        },
        {
          guid: "e34571ab-850b-4ed3-ac38-78a0dd6699fb",
          title: "CD_ROMANIA_Michaela Roman_Quote 11.mp4",
          length: 148,
          sequence: 7,
          otherPaths: [
            {
              id: "5ac714b4-f372-4115-a691-648e0d9486b6",
              title: "Was it worth it?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e34571ab-850b-4ed3-ac38-78a0dd6699fb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e34571ab-850b-4ed3-ac38-78a0dd6699fb/thumbnail.jpg",
          person: "Michaela Roman",
          country: "Romania",
        },
        {
          guid: "b7776277-9a61-48e6-88b4-c97dd50b8667",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 4.mp4",
          length: 69,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b7776277-9a61-48e6-88b4-c97dd50b8667",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b7776277-9a61-48e6-88b4-c97dd50b8667/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "62d57e55-8262-4230-bd6d-7231b9f5c42d",
          title: "CD_NETHERLANDS_Amir Mohammadi_Quote 3.mp4",
          length: 98,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/62d57e55-8262-4230-bd6d-7231b9f5c42d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/62d57e55-8262-4230-bd6d-7231b9f5c42d/thumbnail.jpg",
          person: "Amir Mohammadi",
          country: "Netherlands",
        },
        {
          guid: "6e2ace16-80e9-4145-9cd9-c529605ab9e7",
          title: "CD_NETHERLANDS_Jeangu Macrooy_Quote 2.mp4",
          length: 128,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/6e2ace16-80e9-4145-9cd9-c529605ab9e7",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/6e2ace16-80e9-4145-9cd9-c529605ab9e7/thumbnail.jpg",
          person: "Jeangu Macrooy",
          country: "Netherlands",
        },
        {
          guid: "dd3bccaa-bb09-4518-bfa6-3c411bbb6571",
          title: "CD_NETHERLANDS_Jeangu Macrooy_Quote 3.mp4",
          length: 38,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/dd3bccaa-bb09-4518-bfa6-3c411bbb6571",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/dd3bccaa-bb09-4518-bfa6-3c411bbb6571/thumbnail.jpg",
          person: "Jeangu Macrooy",
          country: "Netherlands",
        },
        {
          guid: "0dfe1e94-76bd-453e-8349-179f970b6d3e",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 9.mp4",
          length: 201,
          sequence: 12,
          otherPaths: [
            {
              id: "dc265faf-202a-4ea4-8268-f222806b9047",
              title: "Why would we trust them?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0dfe1e94-76bd-453e-8349-179f970b6d3e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0dfe1e94-76bd-453e-8349-179f970b6d3e/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
      ],
    },
    {
      id: "b3f9bfeb-c819-43e5-9e47-1c7b00e27a1a",
      title: "Can we be honest? ",
      description: ["Do you believe in honesty? "],
      total_length: 532,
      fragments: [
        {
          guid: "49bc44f4-979c-4aaa-837e-132f4b97180e",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 11.mp4",
          length: 173,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/49bc44f4-979c-4aaa-837e-132f4b97180e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/49bc44f4-979c-4aaa-837e-132f4b97180e/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "c4b6393c-72c1-4cf2-83ee-da7b1f893b84",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 6.mp4",
          length: 41,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/c4b6393c-72c1-4cf2-83ee-da7b1f893b84",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/c4b6393c-72c1-4cf2-83ee-da7b1f893b84/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "b0e522db-03aa-44f3-b713-3aca47a85deb",
          title: "CD_CZECH REPUBLIC_Jiri Zajic_Quote 7.mp4",
          length: 55,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b0e522db-03aa-44f3-b713-3aca47a85deb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b0e522db-03aa-44f3-b713-3aca47a85deb/thumbnail.jpg",
          person: "Jiri Zajic",
          country: "Czech Republic",
        },
        {
          guid: "6aec1087-dae7-42cb-a40e-982c2f4462ee",
          title: "CD_CROATIA_Željko Rogina_Quote 9.mp4",
          length: 76,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/6aec1087-dae7-42cb-a40e-982c2f4462ee",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/6aec1087-dae7-42cb-a40e-982c2f4462ee/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "c14c61bf-221f-4232-a092-d7ee0707c42a",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 3.mp4",
          length: 63,
          sequence: 5,
          otherPaths: [
            {
              id: "cc30efa1-2da0-42bc-ba76-e21f845b69aa",
              title: "What do expect from democracy?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/c14c61bf-221f-4232-a092-d7ee0707c42a",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/c14c61bf-221f-4232-a092-d7ee0707c42a/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "88648553-c6ea-4b4c-bf96-466330cd6c6d",
          title: "CD_PORTUGAL_Maria Filomena Manuel_Quote 3.mp4",
          length: 85,
          sequence: 6,
          otherPaths: [
            {
              id: "37f504e0-737d-4363-b4a0-1b021dbc51d8",
              title: "What makes you angry about the world today?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/88648553-c6ea-4b4c-bf96-466330cd6c6d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/88648553-c6ea-4b4c-bf96-466330cd6c6d/thumbnail.jpg",
          person: "Maria Filomena Manuel",
          country: "Portugal",
        },
        {
          guid: "36ac013e-7160-424a-a3c8-dd3ba68e1eaf",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 10.mp4",
          length: 39,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/36ac013e-7160-424a-a3c8-dd3ba68e1eaf",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/36ac013e-7160-424a-a3c8-dd3ba68e1eaf/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
      ],
    },
    {
      id: "dc265faf-202a-4ea4-8268-f222806b9047",
      title: "Why would we trust them?",
      description: [""],
      total_length: 696,
      fragments: [
        {
          guid: "afbb1d9b-f6aa-410c-a0b1-dd48175757f5",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 1.mp4",
          length: 98,
          sequence: 1,
          otherPaths: [
            {
              id: "37f504e0-737d-4363-b4a0-1b021dbc51d8",
              title: "What makes you angry about the world today?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/afbb1d9b-f6aa-410c-a0b1-dd48175757f5",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/afbb1d9b-f6aa-410c-a0b1-dd48175757f5/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "0babd4ff-9f83-4699-b2d2-7e239c7098ce",
          title: "CD_BELGIUM_Norbert Ngila_Quote 8.mp4",
          length: 42,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0babd4ff-9f83-4699-b2d2-7e239c7098ce",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0babd4ff-9f83-4699-b2d2-7e239c7098ce/thumbnail.jpg",
          person: "Norbert Ngila",
          country: "Belgium",
        },
        {
          guid: "3c5f6e02-13f8-4c45-9c52-25ce6ccdb239",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 14.mp4",
          length: 33,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/3c5f6e02-13f8-4c45-9c52-25ce6ccdb239",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/3c5f6e02-13f8-4c45-9c52-25ce6ccdb239/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "6d29295c-fc1b-40c4-bfac-5cd96d3f5037",
          title: "CD_LITHUANIA_Vladimir Davydov_Quote 6.mp4",
          length: 48,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/6d29295c-fc1b-40c4-bfac-5cd96d3f5037",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/6d29295c-fc1b-40c4-bfac-5cd96d3f5037/thumbnail.jpg",
          person: "Vladimir Davydov",
          country: "Lithuania",
        },
        {
          guid: "a1c61c3e-4b35-4315-b5b8-19709b67625d",
          title: "CD_CROATIA_Željko Rogina_Quote 13.mp4",
          length: 28,
          sequence: 5,
          otherPaths: [
            {
              id: "9508c63b-f633-4c85-ad9c-f933939ae799",
              title: "How to resist? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a1c61c3e-4b35-4315-b5b8-19709b67625d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a1c61c3e-4b35-4315-b5b8-19709b67625d/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e",
          title: "CD_CZECH REPUBLIC_Jiri Zajic_Quote 10.mp4",
          length: 47,
          sequence: 6,
          otherPaths: [
            {
              id: "9508c63b-f633-4c85-ad9c-f933939ae799",
              title: "How to resist? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e/thumbnail.jpg",
          person: "Jiri Zajic",
          country: "Czech Republic",
        },
        {
          guid: "c7c54b45-170c-46b0-873c-ec9b2520b6f8",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 1.mp4",
          length: 52,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/c7c54b45-170c-46b0-873c-ec9b2520b6f8",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/c7c54b45-170c-46b0-873c-ec9b2520b6f8/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "0dfe1e94-76bd-453e-8349-179f970b6d3e",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 9.mp4",
          length: 201,
          sequence: 8,
          otherPaths: [
            {
              id: "cc30efa1-2da0-42bc-ba76-e21f845b69aa",
              title: "What do expect from democracy?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/0dfe1e94-76bd-453e-8349-179f970b6d3e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/0dfe1e94-76bd-453e-8349-179f970b6d3e/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
        {
          guid: "58afe842-1b9e-4996-a6df-30a3cbc72cf7",
          title: "CD_LITHUANIA_Rasa Kausakiene_Quote 4.mp4",
          length: 48,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/58afe842-1b9e-4996-a6df-30a3cbc72cf7",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/58afe842-1b9e-4996-a6df-30a3cbc72cf7/thumbnail.jpg",
          person: "Rasa Kausakiene",
          country: "Lithuania",
        },
        {
          guid: "e32a0f04-61c3-40a8-ba9d-c04006eb83eb",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 14.mp4",
          length: 48,
          sequence: 10,
          otherPaths: [
            {
              id: "cc30efa1-2da0-42bc-ba76-e21f845b69aa",
              title: "What do expect from democracy?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e32a0f04-61c3-40a8-ba9d-c04006eb83eb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e32a0f04-61c3-40a8-ba9d-c04006eb83eb/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "553e711c-d8af-47ce-a927-7153f5f155a7",
          title: "CD_SPAIN_Mariano Royo Arpón_Quote 6.mp4",
          length: 51,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/553e711c-d8af-47ce-a927-7153f5f155a7",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/553e711c-d8af-47ce-a927-7153f5f155a7/thumbnail.jpg",
          person: "Mariano Royo Arpón",
          country: "Spain",
        },
      ],
    },
    {
      id: "30079915-c9e2-437c-b8a9-c538a3145146",
      title: "Can you feel it?",
      description: [""],
      total_length: 602,
      fragments: [
        {
          guid: "abd2f7cc-c9ac-42d8-94fb-69c8cb1c0de4",
          title: "CD_GREECE_Virginia Despotidi_Quote 8.mp4",
          length: 62,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/abd2f7cc-c9ac-42d8-94fb-69c8cb1c0de4",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/abd2f7cc-c9ac-42d8-94fb-69c8cb1c0de4/thumbnail.jpg",
          person: "Virginia Despotidi",
          country: "Greece",
        },
        {
          guid: "49f58017-c79d-48f7-ba12-48394d8960c4",
          title: "CD_POLAND_Joanna Miłosz-Piekarska_Quote 11.mp4",
          length: 71,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/49f58017-c79d-48f7-ba12-48394d8960c4",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/49f58017-c79d-48f7-ba12-48394d8960c4/thumbnail.jpg",
          person: "Joanna Miłosz-Piekarska",
          country: "Poland",
        },
        {
          guid: "65abf2c5-3c84-437c-86d8-478d11dba4bb",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 7.mp4",
          length: 38,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/65abf2c5-3c84-437c-86d8-478d11dba4bb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/65abf2c5-3c84-437c-86d8-478d11dba4bb/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "b380e234-089c-4b7f-8e94-092b0938a997",
          title: "CD_BELGIUM_Slobodanka Moravčević_Quote 11.mp4",
          length: 96,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b380e234-089c-4b7f-8e94-092b0938a997",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b380e234-089c-4b7f-8e94-092b0938a997/thumbnail.jpg",
          person: "Slobodanka Moravčević",
          country: "Belgium",
        },
        {
          guid: "11a97e4e-3180-4a26-b573-d1096b0d52e4",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 15.mp4",
          length: 52,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/11a97e4e-3180-4a26-b573-d1096b0d52e4",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/11a97e4e-3180-4a26-b573-d1096b0d52e4/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "b28ea895-4312-4f7d-b1d1-aef9961becfc",
          title: "CD_CZECH REPUBLIC_Lucia Bartošová_Quote 9.mp4",
          length: 20,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b28ea895-4312-4f7d-b1d1-aef9961becfc",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b28ea895-4312-4f7d-b1d1-aef9961becfc/thumbnail.jpg",
          person: "Lucia Bartošová",
          country: "Czech Republic",
        },
        {
          guid: "b274084e-670b-48a7-b455-2d39d5a35f84",
          title: "CD_GREECE_Nikos Vatopoulos_Quote 14.mp4",
          length: 90,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b274084e-670b-48a7-b455-2d39d5a35f84",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b274084e-670b-48a7-b455-2d39d5a35f84/thumbnail.jpg",
          person: "Nikos Vatopoulos",
          country: "Greece",
        },
        {
          guid: "2655eb3d-0c1e-4082-a0ed-5a1201632f24",
          title: "CD_POLAND_Joanna Miłosz-Piekarska_Quote 8.mp4",
          length: 52,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/2655eb3d-0c1e-4082-a0ed-5a1201632f24",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/2655eb3d-0c1e-4082-a0ed-5a1201632f24/thumbnail.jpg",
          person: "Joanna Miłosz-Piekarska",
          country: "Poland",
        },
        {
          guid: "ccff8ffc-6565-4d35-bd48-f433dfcb649b",
          title: "CD_BELGIUM_Lisbeth Ruiz Sanchez_Quote 11.mp4",
          length: 96,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/ccff8ffc-6565-4d35-bd48-f433dfcb649b",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/ccff8ffc-6565-4d35-bd48-f433dfcb649b/thumbnail.jpg",
          person: "Lisbeth Ruiz Sanchez",
          country: "Belgium",
        },
        {
          guid: "9ff56851-944b-4952-a443-e5cfc7ae2c18",
          title: "CD_NETHERLANDS_Chee-Han Kartosen-Wong_Quote 6.mp4",
          length: 25,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/9ff56851-944b-4952-a443-e5cfc7ae2c18",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/9ff56851-944b-4952-a443-e5cfc7ae2c18/thumbnail.jpg",
          person: "Chee-Han Kartosen-Wong",
          country: "Netherlands",
        },
      ],
    },
    {
      id: "9508c63b-f633-4c85-ad9c-f933939ae799",
      title: "How to resist? ",
      description: [""],
      total_length: 663,
      fragments: [
        {
          guid: "7e6b971a-a818-4785-890e-5d10c9d05211",
          title: "CD_POLAND_Krzysztof Tur_Quote 12.mp4",
          length: 38,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/7e6b971a-a818-4785-890e-5d10c9d05211",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/7e6b971a-a818-4785-890e-5d10c9d05211/thumbnail.jpg",
          person: "Krzysztof Tur",
          country: "Poland",
        },
        {
          guid: "ae820c25-aaae-4aff-9636-849d20a2639d",
          title: "CD_CZECH REPUBLIC_Michaela Bedrníková_Quote 4.mp4",
          length: 77,
          sequence: 2,
          otherPaths: [
            {
              id: "46eadb1a-e756-4294-881a-6ded755f68c6",
              title: "Do you dare to challenge your teachers? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/ae820c25-aaae-4aff-9636-849d20a2639d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/ae820c25-aaae-4aff-9636-849d20a2639d/thumbnail.jpg",
          person: "Michaela Bedrníková",
          country: "Czech Republic",
        },
        {
          guid: "cac0ec73-421a-4cce-aedf-a0c19984fc9a",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 19.mp4",
          length: 67,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/cac0ec73-421a-4cce-aedf-a0c19984fc9a",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/cac0ec73-421a-4cce-aedf-a0c19984fc9a/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "300f8fc4-4189-4718-a3f9-91efd0fe0c23",
          title: "CD_LITHUANIA_Juozas Malickas_Quote 17.mp4",
          length: 153,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/300f8fc4-4189-4718-a3f9-91efd0fe0c23",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/300f8fc4-4189-4718-a3f9-91efd0fe0c23/thumbnail.jpg",
          person: "Juozas Malickas",
          country: "Lithuania",
        },
        {
          guid: "d7444420-c1ba-4ba5-b3e6-3055aa3c9e25",
          title: "CD_NETHERLANDS_Amir Mohammadi_Quote 5.mp4",
          length: 34,
          sequence: 5,
          otherPaths: [
            {
              id: "e906246d-6257-4366-9020-39027ab71b5e",
              title: "What influences you in life? ",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/d7444420-c1ba-4ba5-b3e6-3055aa3c9e25",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/d7444420-c1ba-4ba5-b3e6-3055aa3c9e25/thumbnail.jpg",
          person: "Amir Mohammadi",
          country: "Netherlands",
        },
        {
          guid: "c518ddcb-663f-4e0f-b947-1bf5859537e8",
          title: "CD_CZECH REPUBLIC_Jiri Zajic_Quote 14.mp4",
          length: 104,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/c518ddcb-663f-4e0f-b947-1bf5859537e8",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/c518ddcb-663f-4e0f-b947-1bf5859537e8/thumbnail.jpg",
          person: "Jiri Zajic",
          country: "Czech Republic",
        },
        {
          guid: "a1c61c3e-4b35-4315-b5b8-19709b67625d",
          title: "CD_CROATIA_Željko Rogina_Quote 13.mp4",
          length: 28,
          sequence: 7,
          otherPaths: [
            {
              id: "dc265faf-202a-4ea4-8268-f222806b9047",
              title: "Why would we trust them?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a1c61c3e-4b35-4315-b5b8-19709b67625d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a1c61c3e-4b35-4315-b5b8-19709b67625d/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "956b7fdc-51b5-4e48-9e43-213edf160388",
          title: "CD_PORTUGAL_Milice Ribeiro Dos Santos_Quote 12.mp4",
          length: 25,
          sequence: 8,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/956b7fdc-51b5-4e48-9e43-213edf160388",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/956b7fdc-51b5-4e48-9e43-213edf160388/thumbnail.jpg",
          person: "Milice Ribeiro Dos Santos",
          country: "Portugal",
        },
        {
          guid: "ed6bb1cb-a0e7-4053-912d-8c9ace47c86d",
          title: "CD_PORTUGAL_Armandina Soares_Quote 9.mp4",
          length: 34,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/ed6bb1cb-a0e7-4053-912d-8c9ace47c86d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/ed6bb1cb-a0e7-4053-912d-8c9ace47c86d/thumbnail.jpg",
          person: "Armandina Soares",
          country: "Portugal",
        },
        {
          guid: "3c58d009-5fb1-43fc-baad-45aad0297ac0",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 20.mp4",
          length: 56,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/3c58d009-5fb1-43fc-baad-45aad0297ac0",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/3c58d009-5fb1-43fc-baad-45aad0297ac0/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e",
          title: "CD_CZECH REPUBLIC_Jiri Zajic_Quote 10.mp4",
          length: 47,
          sequence: 11,
          otherPaths: [
            {
              id: "dc265faf-202a-4ea4-8268-f222806b9047",
              title: "Why would we trust them?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b3ad4a5d-4f2b-4143-8056-a8ddbd4f7c0e/thumbnail.jpg",
          person: "Jiri Zajic",
          country: "Czech Republic",
        },
      ],
    },
    {
      id: "5ac714b4-f372-4115-a691-648e0d9486b6",
      title: "Was it worth it?",
      description: [""],
      total_length: 693,
      fragments: [
        {
          guid: "07681247-08d0-4a1e-acf1-d84ca4f3cf96",
          title: "CD_ROMANIA_Vladut Andreescu_Quote 2.mp4",
          length: 21,
          sequence: 1,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/07681247-08d0-4a1e-acf1-d84ca4f3cf96",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/07681247-08d0-4a1e-acf1-d84ca4f3cf96/thumbnail.jpg",
          person: "Vladut Andreescu",
          country: "Romania",
        },
        {
          guid: "a7b996b7-e066-4016-b8cd-fa398114fa3b",
          title: "CD_ROMANIA_Vladut Andreescu_Quote 1.mp4",
          length: 45,
          sequence: 2,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/a7b996b7-e066-4016-b8cd-fa398114fa3b",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/a7b996b7-e066-4016-b8cd-fa398114fa3b/thumbnail.jpg",
          person: "Vladut Andreescu",
          country: "Romania",
        },
        {
          guid: "b1f26616-b633-41b0-92f0-252f0f9ef591",
          title: "CD_CROATIA_Tünde Šipoš Živić_Quote 3.mp4",
          length: 73,
          sequence: 3,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/b1f26616-b633-41b0-92f0-252f0f9ef591",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/b1f26616-b633-41b0-92f0-252f0f9ef591/thumbnail.jpg",
          person: "Tünde Šipoš Živić",
          country: "Croatia",
        },
        {
          guid: "2aee9a22-a77b-421d-b012-6eb3bcfa97de",
          title: "CD_POLAND_Krzysztof Tur_Quote 11.mp4",
          length: 11,
          sequence: 4,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/2aee9a22-a77b-421d-b012-6eb3bcfa97de",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/2aee9a22-a77b-421d-b012-6eb3bcfa97de/thumbnail.jpg",
          person: "Krzysztof Tur",
          country: "Poland",
        },
        {
          guid: "25b68106-8182-44e4-a0ca-12aff1ba6caa",
          title: "CD_PORTUGAL_Armandina Soares_Quote 5.mp4",
          length: 16,
          sequence: 5,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/25b68106-8182-44e4-a0ca-12aff1ba6caa",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/25b68106-8182-44e4-a0ca-12aff1ba6caa/thumbnail.jpg",
          person: "Armandina Soares",
          country: "Portugal",
        },
        {
          guid: "604c79ab-b842-4887-89e6-53c9838d1f0d",
          title: "CD_CROATIA_Milan Ivanovic_Quote 3.mp4",
          length: 57,
          sequence: 6,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/604c79ab-b842-4887-89e6-53c9838d1f0d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/604c79ab-b842-4887-89e6-53c9838d1f0d/thumbnail.jpg",
          person: "Milan Ivanovic",
          country: "Croatia",
        },
        {
          guid: "7ca43298-8b2a-4564-b23c-904f6a698a4d",
          title: "CD_SPAIN_Andrés Ruiz Grima_Quote 21.mp4",
          length: 23,
          sequence: 7,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/7ca43298-8b2a-4564-b23c-904f6a698a4d",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/7ca43298-8b2a-4564-b23c-904f6a698a4d/thumbnail.jpg",
          person: "Andrés Ruiz Grima",
          country: "Spain",
        },
        {
          guid: "e34571ab-850b-4ed3-ac38-78a0dd6699fb",
          title: "CD_ROMANIA_Michaela Roman_Quote 11.mp4",
          length: 148,
          sequence: 8,
          otherPaths: [
            {
              id: "cc30efa1-2da0-42bc-ba76-e21f845b69aa",
              title: "What do expect from democracy?",
            },
          ],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/e34571ab-850b-4ed3-ac38-78a0dd6699fb",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/e34571ab-850b-4ed3-ac38-78a0dd6699fb/thumbnail.jpg",
          person: "Michaela Roman",
          country: "Romania",
        },
        {
          guid: "7e83f437-c509-4c4b-91fb-3ff43ae2d313",
          title: "CD_CROATIA_Željko Rogina_Quote 10.mp4",
          length: 83,
          sequence: 9,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/7e83f437-c509-4c4b-91fb-3ff43ae2d313",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/7e83f437-c509-4c4b-91fb-3ff43ae2d313/thumbnail.jpg",
          person: "Željko Rogina",
          country: "Croatia",
        },
        {
          guid: "903ce703-3518-41df-8d80-a6a4faa1798e",
          title: "CD_GREECE_Virginia Despotidi_Quote 5.mp4",
          length: 88,
          sequence: 10,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/903ce703-3518-41df-8d80-a6a4faa1798e",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/903ce703-3518-41df-8d80-a6a4faa1798e/thumbnail.jpg",
          person: "Virginia Despotidi",
          country: "Greece",
        },
        {
          guid: "5306b23c-03fa-4b64-bb1f-0b35ea00b885",
          title: "CD_CZECH REPUBLIC_Jiri Zajic_Quote 12.mp4",
          length: 128,
          sequence: 11,
          otherPaths: [],
          playerUrl:
            "https://iframe.mediadelivery.net/embed/239326/5306b23c-03fa-4b64-bb1f-0b35ea00b885",
          thumbnailUrl:
            "https://vz-cac74041-8b3.b-cdn.net/5306b23c-03fa-4b64-bb1f-0b35ea00b885/thumbnail.jpg",
          person: "Jiri Zajic",
          country: "Czech Republic",
        },
      ],
    },
  ];

  if (!narratives || narratives.length === 0) {
    return <div>Error loading narratives: No narratives available</div>;
  }

  return (
    <main>
      <NarrativesLayout narrationPaths={narratives} />
    </main>
  );
}
