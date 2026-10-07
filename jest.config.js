/** @type {import('jest').Config} */
module.exports = {
  /** Indica al framework preestablecido que se utiliza como base para la configuración de Jest. */
  preset: "jest-puppeteer",
  setupFilesAfterEnv: ["expect-puppeteer"],
  /**
   * Tiempo máximo por prueba y por hook (ms). El valor por defecto de Jest (5 s) está pensado para
   * pruebas unitarias; las pruebas E2E abren páginas reales (el demo tarda en iniciar en StackBlitz).
   */
  testTimeout: 60000,

  /** Variables globales para utilizar en los conjuntos de pruebas. */
  globals: {
    baseUrl: "https://angular-6-registration-login-example.stackblitz.io",
    screenshotPath: "./test-results",
  },
};
