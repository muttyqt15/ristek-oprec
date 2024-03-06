// const auth = ["auth/login", "auth/signup", "auth/logout"];
// const event = ["acara", "acara/:id"];
// const sponsors = ["sponsors", "sponsors/:id"];
// const speakers = ["speakers", "speakers/:id"];
// const mentoring = ["mentoring/group", "mentoring/mentor", "mentoring/mentee"];
// const testing = ["users"];
// const rapat = ["rapat", "rapat/:id"];
// export const endpoints = [
//   auth,
//   event,
//   sponsors,
//   speakers,
//   mentoring,
//   testing,
//   rapat,
// ];

export const endpoints = [
  { title: "Testing", endpoints: ["users"] },
  { title: "Auth", endpoints: ["auth/login", "auth/signup", "auth/logout"] },

  {
    title: "Mentoring",
    endpoints: ["mentoring/group", "mentoring/mentor", "mentoring/mentee"],
  },
  { title: "Rapat", endpoints: ["rapat", "rapat/:id"] },
  { title: "Sponsors", endpoints: ["sponsors", "sponsors/:id"] },
  { title: "Speakers", endpoints: ["speakers", "speakers/:id"] },
  { title: "Events", endpoints: ["acara", "acara/:id"] },
];
