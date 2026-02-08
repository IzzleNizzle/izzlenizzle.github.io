import {
  renderHeaderNav,
  renderHero,
  renderAbout,
  renderProjects,
  renderSkills,
  renderContact,
} from './templates';

const renderNavDemo = ({ menuOpen = false, withTargets = false } = {}) => `
  ${renderHeaderNav({ menuOpen })}
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
    menuOpen: {
      control: 'boolean',
      description: 'Opens the mobile menu by toggling the #menu-toggle checkbox.',
    },
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
          'The nav bar uses a checkbox toggle for the mobile menu and a small JS helper (js/nav-menu.js) to close the menu when an anchor link is clicked.',
      },
    },
  },
};

const Template = (args) => renderNavDemo(args);

export const Desktop = Template.bind({});
Desktop.args = {
  menuOpen: false,
  withTargets: false,
};
Desktop.parameters = {
  viewport: { defaultViewport: 'desktop' },
  docs: {
    description: {
      story: 'Desktop layout shows the nav links inline with no hamburger icon.',
    },
  },
};

export const MobileClosed = Template.bind({});
MobileClosed.args = {
  menuOpen: false,
  withTargets: false,
};
MobileClosed.parameters = {
  viewport: { defaultViewport: 'mobile1' },
  docs: {
    description: {
      story: 'Mobile layout with the menu closed (hamburger visible, panel off-screen).',
    },
  },
};

export const MobileOpen = Template.bind({});
MobileOpen.args = {
  menuOpen: true,
  withTargets: false,
};
MobileOpen.parameters = {
  viewport: { defaultViewport: 'mobile1' },
  docs: {
    description: {
      story: 'Menu opened state showing the slide-in panel and X icon.',
    },
  },
};

export const MobileOpenWithTargets = Template.bind({});
MobileOpenWithTargets.args = {
  menuOpen: true,
  withTargets: true,
};
MobileOpenWithTargets.parameters = {
  viewport: { defaultViewport: 'mobile1' },
  docs: {
    description: {
      story:
        'Open menu with section targets included so anchor clicks can demonstrate the JS close behavior.',
    },
  },
};
