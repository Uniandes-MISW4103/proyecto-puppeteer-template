/** Configuración de la aplicación bajo pruebas, leída del .env del repositorio (ver abp.cjs). */
const abp = require("./abp.cjs");

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

  /**
   * Variables globales para utilizar en los conjuntos de pruebas: `baseUrl` es la URL de la aplicación
   * bajo pruebas y `abp`, sus variables del .env (por ejemplo, `abp.ABP_ADMIN_EMAIL`).
   */
  globals: {
    baseUrl: abp.ABP_URL,
    abp,
    screenshotPath: "./test-results",
  },
};
