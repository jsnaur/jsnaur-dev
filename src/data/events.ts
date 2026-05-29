/**
 * Events archive — community involvement, workshops, and facilitation.
 * `sortKey` is YYYYMM, used to order most-recent → oldest. Display uses
 * `timeframe` verbatim so months can read naturally ("May 2026", "Summer 2025").
 */

export type EventCategory = "Robotics" | "Cloud" | "Community" | "Design";

export type EventEntry = {
  id: string;
  title: string;
  category: EventCategory;
  timeframe: string;
  sortKey: number; // YYYYMM
  role: string;
  blurb: string;
  highlights: string[];
  images: string[];
};

export const events: EventEntry[] = [
  {
    id: "robocup-vismin",
    title: "Robotics Summer Cup — Visayas × Mindanao",
    category: "Robotics",
    timeframe: "May 2026",
    sortKey: 202605,
    role: "Facilitator — Line Tracing · RoboHockey",
    blurb:
      "Inter-region summer cup pairing Visayas and Mindanao players. Ran line-tracing heats and the RoboHockey arena across the bracket.",
    highlights: ["Line Tracing", "RoboHockey", "Inter-region bracket"],
    images: [
      "/events/robocupVisMin1.jpg",
      "/events/robocupVisMin2.jpg",
      "/events/robocupVisMin3.jpg",
    ],
  },
  {
    id: "aws-workshop",
    title: "AWS Cloud Workshop",
    category: "Cloud",
    timeframe: "February 2026",
    sortKey: 202602,
    role: "Participant — S3 · Lambda · IAM",
    blurb:
      "Hands-on AWS workshop covering storage, serverless compute, and access control — building blocks for production cloud workloads.",
    highlights: ["Amazon S3", "AWS Lambda", "IAM policies"],
    images: [
      "/events/aws1.1.jpg",
      "/events/aws1.2.jpg",
      "/events/aws1.3.jpg",
    ],
  },
  {
    id: "roboquest-2",
    title: "RoboQuest 2025",
    category: "Robotics",
    timeframe: "December 2025",
    sortKey: 202512,
    role: "Facilitator — Sumobot · BoxBot · RoboHockey",
    blurb:
      "Second iteration of the national robotics gauntlet. Hosted delegates from across the Philippines and ran three competitive arenas back-to-back.",
    highlights: ["Sumobot arena", "BoxBot arena", "RoboHockey arena"],
    images: ["/events/roboquest2.1.jpg", "/events/roboquest2.2.jpg"],
  },
  {
    id: "gdg",
    title: "Google Developer Group",
    category: "Community",
    timeframe: "2025",
    sortKey: 202506,
    role: "Member — GDG Community",
    blurb:
      "Local GDG chapter sessions — networking with developers, exposure to Google's developer platform, and community-led talks.",
    highlights: ["Developer community", "Platform talks", "Networking"],
    images: ["/events/GDG1.jpg", "/events/GDG2.jpg", "/events/GDG3.jpg"],
  },
  {
    id: "uxph",
    title: "UXPH",
    category: "Design",
    timeframe: "2025",
    sortKey: 202505,
    role: "Participant — AI Design Systems · UI/UX User Stories",
    blurb:
      "UXPH workshops on applying AI to design-system workflows and structuring product UX through user-story practice.",
    highlights: ["AI for design systems", "UI/UX user stories"],
    images: ["/events/UXPH1.jpg"],
  },
  {
    id: "roboquest-1",
    title: "RoboQuest 2024",
    category: "Robotics",
    timeframe: "December 2024",
    sortKey: 202412,
    role: "Facilitator — Sumobot · BoxBot · RoboHockey",
    blurb:
      "Inaugural national robotics meet. Welcomed delegates from across the Philippines and ran the full three-arena rotation.",
    highlights: ["Sumobot arena", "BoxBot arena", "RoboHockey arena"],
    images: [
      "/events/roboquest1.1.jpg",
      "/events/roboquest1.2.jpg",
      "/events/roboquest1.3.jpg",
    ],
  },
];

export const eventCategories: EventCategory[] = [
  "Robotics",
  "Cloud",
  "Community",
  "Design",
];
