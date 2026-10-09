# Proyecto Base: Pruebas End to End con Puppeteer

[Puppeteer](https://pptr.dev) es una librería de Node.js que controla Chrome (o Firefox) a través
del protocolo de automatización del navegador. En este módulo se usa junto a
[Jest](https://jestjs.io) mediante [jest-puppeteer](https://github.com/argos-ci/jest-puppeteer),
que abre el navegador antes de las pruebas y expone las variables globales `browser` y `page`.

Este módulo contiene esa configuración base y un ejemplo que pueden usar como punto de partida para
las pruebas E2E del proyecto.

## Requisitos

- Node.js 24 (`lts/krypton`). El módulo incluye un `.nvmrc`, por lo que pueden usar `nvm use`.
- npm (incluido con Node.js).
- Navegador: al instalar, Puppeteer descarga automáticamente la versión de Chrome for Testing que
  le corresponde (en `~/.cache/puppeteer`).

## Instalación

Desde la **raíz del repositorio** del proyecto:

```bash
npm run puppeteer:install
```

`puppeteer:prepare` existe por consistencia con los demás módulos, pero no hace nada: el navegador se
descarga durante la instalación.

> [!IMPORTANT]
> Instalen siempre desde la raíz. `puppeteer:install` deja las dependencias del módulo en su propia
> carpeta `node_modules`, aisladas de los demás módulos. Un `npm install` dentro de la carpeta del
> módulo instala en la raíz del repositorio y modifica el `package-lock.json` raíz sin ese aislamiento.

## Ejecución

| Acción | Desde la raíz | Desde `e2e/misw-4103-puppeteer` |
|---|---|---|
| Ejecutar las pruebas (headless) | `npm run puppeteer:test` | `npm test` |
| Ejecutar viendo el navegador | `npm run puppeteer:ui` | `npm run test:ui` |

Para pasar opciones a Jest ejecuten desde la carpeta del módulo, por ejemplo
`npx jest __tests__/tutorial.spec.js`.

## Estructura

```plaintext
misw-4103-puppeteer/
├── .nvmrc
├── package.json
├── abp.cjs                     # lee la configuración de la aplicación bajo pruebas (.env)
├── babel.config.js             # permite usar import/export en las pruebas
├── jest.config.js              # preset jest-puppeteer y variables globales
├── jest-puppeteer.config.js    # cómo se lanza el navegador
└── __tests__/
    └── tutorial.spec.js        # ejemplo incluido
```

Las capturas de pantalla quedan en `test-results/` (en el `.gitignore`).

## Configuración

La URL y el administrador de la aplicación bajo pruebas (ABP) están en el archivo `.env` de la raíz
del repositorio, el mismo que usa `npm run abp:up` para desplegar Ghost. No los copien en el módulo:
`abp.cjs` lee ese archivo. `jest.config.js` lo expone a las pruebas como variables globales: `baseUrl` es `ABP_URL` y
`abp` contiene todas las variables:

```javascript
await page.goto(`${baseUrl}/ghost/`);
await page.type("#identification", abp.ABP_ADMIN_EMAIL);
await page.type("#password", abp.ABP_ADMIN_PASSWORD);
```

Las variables disponibles son `ABP_URL`, `ABP_RC_URL` (la versión de Ghost para regresión visual),
`ABP_ADMIN_NAME`, `ABP_ADMIN_EMAIL` y `ABP_ADMIN_PASSWORD`. Una variable de entorno con el mismo
nombre tiene prioridad sobre el `.env`. Fuera de un repositorio del proyecto (sin `.env`) se usan los
valores por defecto de `abp.cjs`.

- **`jest.config.js`**: usa el preset `jest-puppeteer`, registra las aserciones de
  `expect-puppeteer` (`toMatchElement`, `toMatchTextContent`, …) y define las variables globales
  `baseUrl`, `abp` y `screenshotPath` (`./test-results`). `testTimeout` es de 60 s por prueba y por
  _hook_: el valor por defecto de Jest (5 s) es corto para pruebas E2E.
- **`jest-puppeteer.config.js`**: lanza Chrome en modo headless salvo que `HEADLESS=false` (lo que
  hace `test:ui`) y crea un contexto de navegación aislado (incógnito) por archivo de pruebas.

## Ejemplo incluido

`__tests__/tutorial.spec.js` prueba el demo
[angular-6-registration-login-example](https://angular-6-registration-login-example.stackblitz.io)
alojado en StackBlitz, no la ABP: muestra cómo usar las credenciales del `.env` sin resolver las
pruebas del proyecto. Antes de cada prueba abre la página de registro del demo (con su URL completa)
y hace clic en el botón con el que StackBlitz inicia el proyecto. Las pruebas verifican:

1. La navegación entre registro e inicio de sesión (`/login` ↔ `/register`), esperando a que el
   _router_ de la aplicación cambie la URL antes de verificarla.
2. Que enviar el formulario vacío muestra los 4 mensajes de validación.
3. El registro de un usuario con el nombre, el correo (como usuario) y la contraseña de
   `ABP_ADMIN_*`, y el inicio de sesión con él ("Hi Monitor!").

## Solución de problemas

- **`Could not find Chrome (ver. …)`**: la descarga del navegador no se ejecutó durante la
  instalación; ejecuten `npx puppeteer browsers install chrome` desde la carpeta del módulo.
- **`npm warn install-scripts … puppeteer`**: npm 11 avisa que Puppeteer ejecuta un script al
  instalarse (la descarga de Chrome). Es esperado.
- **Linux ARM64**: Chrome for Testing no tiene versión para esa plataforma; instalen Chromium del
  sistema y definan `PUPPETEER_EXECUTABLE_PATH` (por ejemplo `/usr/bin/chromium`).
- **Falla el `beforeEach`**: el demo es un sitio externo; verifiquen que carga en el navegador.
- **Advertencia `EBADENGINE`**: están usando una versión de Node.js anterior a la 24.

## Referencias

- [Documentación de Puppeteer](https://pptr.dev/guides/what-is-puppeteer)
- [jest-puppeteer](https://github.com/argos-ci/jest-puppeteer) y
  [expect-puppeteer](https://github.com/argos-ci/jest-puppeteer/tree/main/packages/expect-puppeteer)
- [Documentación de Jest](https://jestjs.io/docs/getting-started)
