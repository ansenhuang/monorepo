module.exports = {
  stories: [
    '../website/src/**/*.stories.mdx',
    '../website/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/**/src/**/*.stories.mdx',
    '../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
