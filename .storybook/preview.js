import '../css/isaacpcodes.css';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

export const parameters = {
  layout: 'fullscreen',
  backgrounds: {
    options: {
      dark: { name: 'dark', value: '#0B0F1A' },
      light: { name: 'light', value: '#ffffff' }
    }
  },
  viewport: {
    options: MINIMAL_VIEWPORTS,
  },
  controls: {
    expanded: true,
  },
};

export const initialGlobals = {
  backgrounds: {
    value: 'dark'
  }
};
