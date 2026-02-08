/** @type { import('@storybook/html').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html',
    options: {},
  },
  staticDirs: ['../assets', '../css', '../js'],
};

export default config;
