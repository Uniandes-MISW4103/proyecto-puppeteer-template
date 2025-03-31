/** @type {import('jest').Config} */
module.exports = {
  /** Indica al framework preestablecido que se utiliza como base para la configuración de Jest. */
  preset: "jest-puppeteer",
  setupFilesAfterEnv: ["expect-puppeteer"],

  /** Variables globales para utilizar en los conjuntos de pruebas. */
  globals: {
    baseUrl: "https://angular-6-registration-login-example.stackblitz.io",
    screenshotPath: "./test-results",
  },
};
