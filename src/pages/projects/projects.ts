
export interface Project {
  role: string;
  appStore?: string;
  playStore?: string;
  stack: string;
  details: string[];
}


export const projects: Project[] = [
  {
    role: "Flutter Developer (PT Clean Medic Indus)",
    stack: "Flutter, Firebase, Google Maps API",
    playStore: 'https://play.google.com/store/apps/details?id=com.wwwaste.producer&hl=id',
    details: [
      "Migrated the company’s mobile application from a monolithic to a monorepo architecture using Melos.",
      "Integrated Google Maps for location-based services, enabling dynamic location tracking and real-time visualization.",
      "Optimized state management with GetX, reducing rebuild times and enhancing scalability."
    ]
  },
  {
    role: "Full Stack Developer (Net Geometry Sdn Bhd)",
    stack: "Go (Golang), PostgreSQL, Flutter Web, REST APIs, Docker",
    details: [
      "Designed and implemented RESTful APIs using Golang and PostgreSQL to manage and query complex data workflows.",
      "Developed a secure spreadsheet upload system with data validation, and asynchronous processing.",
      "Built a custom PDF viewer and interactive form components in Flutter."
    ]
  },
  {
    role: "Flutter Developer (PT Momentum Bertumbuh Indonesia)",
    stack: "Flutter, Google Maps, REST APIs",
    playStore: "https://play.google.com/store/apps/details?id=com.rsm.randu_sales_mobile",
    details: [
      "Developed and launched the Randu Marketing Team App from the ground up using Flutter.",
      "Integrated Google Maps for sales route tracking and regional management features.",
      "Collaborated with UI/UX designers and backend engineers to refine user journeys and maintain consistent brand identity."
    ]
  },
  {
    role: "Flutter Developer (PT Aplikasi Pekerja Indonesia)",
    stack: "Flutter, Google ML Kit, Firebase, Google Maps",
    playStore: 'https://play.google.com/store/apps/details?id=com.jobseeker.life',
    appStore: "https://apps.apple.com/us/app/jobseeker-life/id6466165581",
    details: [
      "Built face recognition and authentication systems using TensorFlow Lite and Google ML Kit for real-time attendance tracking.",
      "Implemented Firebase Analytics to monitor user activity, performance, and app engagement trends.",
      "Designed reusable Flutter UI components to standardize app modules and improve developer efficiency."
    ]
  }
];