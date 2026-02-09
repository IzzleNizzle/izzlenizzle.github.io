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
Desktop.globals = {
  viewport: { value: 'desktop', isRotated: false },
};
Desktop.parameters = {
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
MobileClosed.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
MobileClosed.parameters = {
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
MobileOpen.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
MobileOpen.parameters = {
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
MobileOpenWithTargets.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
MobileOpenWithTargets.parameters = {
  docs: {
    description: {
      story:
        'Open menu with section targets included so anchor clicks can demonstrate the JS close behavior.',
    },
  },
};
