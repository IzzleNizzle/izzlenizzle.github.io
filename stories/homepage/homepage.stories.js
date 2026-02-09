import {
  renderFullPage,
  renderHero,
  renderAbout,
  renderProjects,
  renderSkills,
  renderContact,
  renderFooter,
} from './templates';

export default {
  title: 'Homepage/Sections',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Each story isolates a section of the homepage so the layout and content can be reviewed in Storybook.',
      },
    },
  },
};

export const FullPage = () => renderFullPage();
FullPage.parameters = {
  docs: {
    description: {
      story: 'The full homepage layout, assembled from the individual section templates.',
    },
  },
};

export const Hero = () => renderHero();
Hero.parameters = {
  docs: {
    description: {
      story: 'Hero wordmark, subtitle, and primary CTA buttons.',
    },
  },
};

export const About = () => renderAbout();
About.parameters = {
  docs: {
    description: {
      story: 'About section with the introductory narrative.',
    },
  },
};

export const Projects = () => renderProjects();
Projects.parameters = {
  docs: {
    description: {
      story: 'Projects grid with cards, tags, and outbound links.',
    },
  },
};

export const Skills = () => renderSkills();
Skills.parameters = {
  docs: {
    description: {
      story: 'Skills and tooling grouped into four categories.',
    },
  },
};

export const Contact = () => renderContact();
Contact.parameters = {
  docs: {
    description: {
      story: 'Contact CTA with email and supporting links.',
    },
  },
};

export const Footer = () => renderFooter();
Footer.parameters = {
  docs: {
    description: {
      story: 'Footer links and WakaTime badge.',
    },
  },
};
