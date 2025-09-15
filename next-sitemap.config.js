/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://mayangroups.ir",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/"],
  changefreq: "weekly",
  priority: 1.0,

  transform: async (config, path) => {
    const customSettings = {
      "/": { changefreq: "daily", priority: 1.0 },
    };

    const setting = customSettings[path] || {
      changefreq: config.changefreq,
      priority: config.priority,
    };

    return {
      loc: path,
      changefreq: setting.changefreq,
      priority: setting.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
