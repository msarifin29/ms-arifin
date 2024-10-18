import { getRepositoryDetails } from "../../utils";

export interface Project {
  name: string;
  demoLink: string;
  tags?: string[],
  techStack?: string[],
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
  [key: string]: any;
}

export const projects: Project[] = [

  {
    name: 'Randu Marketing Team',
    description: 'Payroll and HR Management Information System',
    demoLink: 'https://play.google.com/store/apps/details?id=com.rsm.randu_sales_mobile',
    tags: ['HRIS', 'Saas'],
    techStack: ['Flutter']
  },
  {
    name: 'Jobseeker.life',
    description: 'Payroll and HR Management Information System',
    demoLink: 'https://play.google.com/store/apps/details?id=com.jobseeker.life',
    tags: ['HRIS', 'Saas'],
    techStack: ['Flutter', 'Firebase']
  },
  {
    name: 'Jobseeker.app',
    description: 'Simplifying social media for job inspiration through TikTok',
    demoLink: 'https://play.google.com/store/apps/details?id=com.jobseeker.app',
    tags: ['Bussiness'],
    techStack: ['Flutter', 'Firebase']
  },
  {
    name: 'Movie Nominations',
    description: 'Movie nomination using IMDb API to display favorite films',
    demoLink: 'https://github.com/msarifin29/fugi_movie_app_team5',
    tags: ['Hobby'],
    techStack: ['Flutter']
  }
]
