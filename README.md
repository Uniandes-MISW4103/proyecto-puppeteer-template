# Proyecto Base: Pruebas End to End con Puppeteer

Puppeteer es una biblioteca que proporciona una API de alto nivel para controlar navegadores basados en Chromium. Es útil para pruebas E2E y tareas de scraping.

Este repositorio cuenta con la configuración base para utilizar Puppeteer junto a Jest para la automatización de pruebas E2E.

## Requisitos Básicos

- Node.js (versión 22 o superior). Recomendamos utilizar la versión `lts/jod`.
- npm para la gestión de dependencias.

## Instalación

Desde la **raíz del repositorio**:

```bash
npm run puppeteer:install
```

O bien, desde el directorio del módulo:

```bash
npm install
```

## Ejecución de Pruebas

Desde la **raíz del repositorio**:

- Para ejecutar las pruebas en modo headless:

  ```bash
  npm run puppeteer:test
  ```

- Para ejecutar las pruebas con interfaz gráfica:

  ```bash
  npm run puppeteer:ui
  ```

O bien, desde el directorio del módulo:

- Para ejecutar las pruebas en modo headless:

  ```bash
  npm test
  ```

- Para ejecutar las pruebas con interfaz gráfica:

  ```bash
  npm run test:ui
  ```

## Configuración

### Configuración de Jest (`jest.config.js`)

El archivo `jest.config.js` incluye la configuración básica para Jest con Puppeteer:

- **Preset**: Se utiliza `jest-puppeteer` como framework base.
- **Archivos de configuración adicionales**: Se incluye `expect-puppeteer` para extender las funcionalidades de las pruebas.
- **Variables globales**: Puedes agregar y modificar las variables globales de acuerdo a las necesidades de tus pruebas. Variables predefinidas:
  - `baseUrl`: URL base para las pruebas: `https://angular-6-registration-login-example.stackblitz.io`.
  - `screenshotPath`: Ruta para guardar capturas de pantalla: `./test-results`.

### Configuración de Puppeteer (`jest-puppeteer.config.js`)

El archivo `jest-puppeteer.config.js` define la configuración para Puppeteer:

- **Modo de lanzamiento**:
  - `headless`: Determinado por la variable de entorno `HEADLESS`. Si no está configurada como `false`, Puppeteer se ejecutará en modo headless.
  - `browser`: Se utiliza el navegador `chrome` por defecto.
- **Contexto del navegador**: Se configura el contexto como `incognito` para cada prueba.

Con estas configuraciones, puedes personalizar y ejecutar pruebas E2E de manera eficiente.
