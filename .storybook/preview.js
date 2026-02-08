import '../css/isaacpcodes.css';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0B0F1A' },
      { name: 'light', value: '#ffffff' },
    ],
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  controls: {
    expanded: true,
  },
};
