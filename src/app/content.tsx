import { EventEntry } from "../components/Events";
import { TeamEntry } from "../components/Team";

export {
  projectFirstParagraphBg,
  projectSecondParagraphBg,
  projectParagraphSm,
  teamList,
  futureEvents,
  pastEvents,
  allEvents,
  teamParagraphSm,
};

const projectFirstParagraphBg = (
  <p>
    What would life be like without democracy?
    <br />
    Has democracy lived up to its promises? What does a healthy democracy need
    to function effectively? What is the role of citizens?
  </p>
);

const projectSecondParagraphBg = (
  <p>
    <b>Changing Democracies</b> aims to collect untold stories from across
    Europe about recent transitions to democracy and explore how they can lead
    to critical reflection and dialogue about democracy today.
  </p>
);

const projectParagraphSm = (
  <p>
    What would life be like without democracy? Has democracy lived up to its
    promises? What does a healthy democracy need to function effectively? What
    is the role of citizens
    <br />
    <br />
    <b>Changing Democracies</b> aims to collect untold stories from across
    Europe about recent transitions to democracy and explore how they can lead
    to critical reflection and dialogue about democracy today.
  </p>
);

const teamParagraphSm = (
  <>
    <b>Changing Democracies</b> involves 13 partners from 10 European countries
    and is made possible thanks to the funding of the European Commission.
  </>
);

const teamList: TeamEntry[] = [
  {
    organisation: "Association for History Education in Greece",
    link: "https://www.aheg.gr/",
    teamMembers: ["Marjolein Delvou", "Hanna Zielińska"],
    country: "Greece",
  },
  {
    organisation: "Autres Directions",
    link: "https://www.autresdirections.nl/",
    teamMembers: ["Tijl Akkermans", "Catrien Spijkerman"],
    country: "The Netherlands",
  },
  {
    organisation: "Borderland Foundation",
    link: "https://www.pogranicze.sejny.pl/",
    teamMembers: ["Weronika Czyżewska-Poncyliusz"],
    country: "Poland",
  },
  {
    organisation:
      "Escola de Cultura de Pau, Autonomous University of Barcelona",
    link: "https://escolapau.uab.cat/en/publications",
    teamMembers: ["Cecile Barbeito-Thonon", "Marina Caireta-Sampere"],
    country: "Spain",
  },
  {
    organisation: "EuroClio - European Association of History Educators",
    link: "https://www.euroclio.eu/",
    teamMembers: ["Eugenie Khatschatrian", "Steven Stegers"],
    country: "The Netherlands",
  },
  {
    organisation: "Evens Foundation",
    link: "https://evensfoundation.be/",
    teamMembers: ["Caroline Coosemans", "Marjolein Delvou", "Hanna Zielińska"],
    country: "Belgium/Poland",
  },
  {
    organisation: "Flemish Peace Institute",
    link: "https://vlaamsvredesinstituut.eu/en/",
    teamMembers: ["Maarten Van Alstein"],
    country: "Belgium",
  },
  {
    organisation: "In Media Res",
    link: "",
    teamMembers: ["Stefano Di Pietro"],
    country: "The Netherlands",
  },
  {
    organisation: "Institute for the Study of Totalitarian Regimes",
    link: "https://www.ustrcr.cz/en",
    teamMembers: ["Bohumil Melichar", "Václav Sixta"],
    country: "Czechia",
  },
  {
    organisation:
      "Institute of Research in Art, Design and Society, University of Porto",
    link: "https://i2ads.up.pt/en/intitute/",
    teamMembers: ["Samuel Guimaraes", "Catarina Silva Martins"],
    country: "Portugal",
  },
  {
    organisation: "Open Lithuania Foundation",
    link: "https://olf.lt/en/",
    teamMembers: ["Sandra Adomavičiūtė", "Sandra Gaučiūtė"],
    country: "Lithuania",
  },
  {
    organisation: "Mediawise Society",
    link: "https://mediawise.ro/",
    teamMembers: ["Nicoleta Fotiade", "Nicoleta Neacsu"],
    country: "Romania",
  },
  {
    organisation: "National History Museum of Slavonia",
    link: "https://www.mso.hr/",
    teamMembers: ["Denis Detling", "Jesenka Ricl", "Vasiliki Sakka"],
    country: "Croatia",
  },
];

const allEvents: EventEntry[] = [
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: false,
    date: "10.12.23",
    title: "Come and find out",
    kind: "Meeting | online",
    location: "Slavonia, Croatia",
    link: "",
  },
  {
    isPast: true,
    date: "20 - 22.04.23",
    title: "Are we lost?",
    kind: "Workshop | online",
    location: "Sejny, Poland",
    link: "",
    participants: 50,
    wp3: "WP3",
  },
  {
    isPast: true,
    date: "20 - 22.04.23",
    title: "Are we lost?",
    kind: "Workshop | online",
    location: "Sejny, Poland",
    link: "",
    participants: 50,
    wp3: "WP3",
  },
  {
    isPast: true,
    date: "20 - 22.04.23",
    title: "Are we lost?",
    kind: "Workshop | online",
    location: "Sejny, Poland",
    link: "",
    participants: 50,
    wp3: "WP3",
  },
];

const futureEvents = allEvents.filter((event) => !event.isPast);

const pastEvents = allEvents.filter((event) => event.isPast);
