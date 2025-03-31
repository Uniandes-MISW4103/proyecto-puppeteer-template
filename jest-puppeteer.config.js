/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  launch: {
    headless: process.env.HEADLESS !== "false",
    browser: "chrome",
  },
  browserContext: "incognito",
};
