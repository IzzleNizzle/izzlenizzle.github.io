import {
  renderHeaderNav,
  renderHero,
  renderAbout,
  renderProjects,
  renderSkills,
  renderContact,
} from './templates';

const renderNavDemo = ({ withTargets = false } = {}) => `
  ${renderHeaderNav()}
  ${
    withTargets
      ? `
        <main>
          ${renderHero()}
          ${renderAbout()}
          ${renderProjects()}
          ${renderSkills()}
          ${renderContact()}
        </main>
      `
      : ''
  }
`;

export default {
  title: 'Homepage/Navigation',
  argTypes: {
    withTargets: {
      control: 'boolean',
      description: 'Includes section targets to demonstrate anchor scrolling.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The nav bar uses a CSS-only stacking layout on mobile. Nav links wrap below the centered logo on narrow viewports.',
      },
    },
  },
};

const Template = (args) => renderNavDemo(args);

export const Desktop = Template.bind({});
Desktop.args = {
  withTargets: false,
};
Desktop.globals = {
  viewport: { value: 'desktop', isRotated: false },
};
Desktop.parameters = {
  docs: {
    description: {
      story: 'Desktop layout shows the nav links inline, logo left, links right.',
    },
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  withTargets: false,
};
Mobile.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
Mobile.parameters = {
  docs: {
    description: {
      story: 'Mobile layout with nav links stacked below the centered logo.',
    },
  },
};

export const MobileWithTargets = Template.bind({});
MobileWithTargets.args = {
  withTargets: true,
};
MobileWithTargets.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
MobileWithTargets.parameters = {
  docs: {
    description: {
      story:
        'Mobile layout with section targets included so anchor clicks can demonstrate scrolling.',
    },
  },
};
