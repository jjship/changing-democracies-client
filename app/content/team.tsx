import { TeamEntry } from "../components/Team";

export { teamList, teamParagraphSm };

const teamList: TeamEntry[] = [
  {
    organisation: "Association for History Education in Greece",
    link: "https://www.aheg.gr/",
    teamMembers: ["Vassiliki Sakka"],
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
    teamMembers: ["Weronika Czyżewska-Poncyljusz"],
    country: "Poland",
  },
  {
    organisation: "EuroClio \u2013 European Association of History Educators",
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
    organisation: "In Medias Res",
    link: "https://theimr.eu/",
    teamMembers: ["Stefano Di Pietro"],
    country: "The Netherlands",
  },
  {
    organisation: "Faculty of Arts, Charles University",
    link: "https://www.ff.cuni.cz/home/",
    teamMembers: ["Bohumil Melichar", "Václav Sixta"],
    country: "Czechia",
  },
  {
    organisation:
      "Institute of Research in Arts, Design and Society, University of Porto",
    link: "https://i2ads.up.pt/en/intitute/",
    teamMembers: ["Samuel Guimarães", "Catarina (Cat) Martins"],
    country: "Portugal",
  },
  {
    organisation: "Mediawise Society",
    link: "https://mediawise.ro/",
    teamMembers: ["Nicoleta Fotiade", "Nicoleta Neacsu"],
    country: "Romania",
  },
  {
    organisation: "Museum of Slavonia",
    link: "https://www.mso.hr/",
    teamMembers: ["Denis Detling", "Jesenka Ricl"],
    country: "Croatia",
  },
  {
    organisation: "Open Lithuania Foundation",
    link: "https://olf.lt/en/",
    teamMembers: ["Sandra Adomavičiūtė", "Sandra Gaučiūtė"],
    country: "Lithuania",
  },
  {
    organisation:
      "School for a Culture of Peace, Autonomous University of Barcelona",
    link: "https://escolapau.uab.cat/en/publications",
    teamMembers: ["Cécile Barbeito Thonon", "Marina Caireta Sampere"],
    country: "Spain",
  },
];

const teamParagraphSm = (
  <>
    <b>Changing Democracies</b> involves {teamList.length ?? 13} partners
    <br /> from 10 European countries:
  </>
);
