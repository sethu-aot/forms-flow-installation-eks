/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'windows',
    'linux',
    {
      type: 'category',
      label: 'Kubernetes',
      items: ['intro','eks'], 
      collapsed: true, 
    },
  ],
};

export default sidebars;