import "jest-puppeteer";

// Example on an external demo (not the application under test): registration and login with the
// administrator credentials of the repository's .env (the `abp` global, see jest.config.js).
const DEMO_URL = "https://angular-6-registration-login-example.stackblitz.io";
const [firstName, ...lastName] = abp.ABP_ADMIN_NAME.split(" ");
const username = abp.ABP_ADMIN_EMAIL;
const password = abp.ABP_ADMIN_PASSWORD;

describe("Tutorial Puppeteer", () => {
  /** Waits until the app's router shows `url` (router links change the URL without a page load). */
  const waitForUrl = (url) =>
    page.waitForFunction((expected) => window.location.href === expected, {}, url);

  beforeAll(async () => {
    const fs = require("fs");
    fs.mkdirSync(screenshotPath, { recursive: true });
  });

  beforeEach(async () => {
    await page.goto(`${DEMO_URL}/register`);
    await page.waitForSelector("button");
    await page.click("button");
  });

  it("Test links between registration and login page", async () => {
    await page.waitForSelector("a.btn.btn-link");
    await page.click("a.btn.btn-link");
    await waitForUrl(`${DEMO_URL}/login`);
    await page.screenshot({ path: `${screenshotPath}/cancel.png` });
    expect(page.url()).toEqual(`${DEMO_URL}/login`);

    await page.click("a.btn.btn-link");
    await waitForUrl(`${DEMO_URL}/register`);
    await page.screenshot({ path: `${screenshotPath}/register.png` });
    expect(page.url()).toEqual(`${DEMO_URL}/register`);
  });

  it("Test form feedback", async () => {
    await page.click("button.btn.btn-primary");
    await page.waitForSelector("div.invalid-feedback");
    await page.screenshot({ path: `${screenshotPath}/form-feedback.png` });
    const feedback = await page.$$("div.invalid-feedback");
    expect(feedback.length).toEqual(4);
  });

  it("Create an user and login", async () => {
    await page.type('input[formcontrolname="firstName"]', firstName);
    await page.type('input[formcontrolname="lastName"]', lastName.join(" "));
    await page.type('input[formcontrolname="username"]', username);
    await page.type('input[formcontrolname="password"]', password);

    await page.click("button.btn.btn-primary");

    await page.waitForSelector("div.alert.alert-success");
    await page.screenshot({ path: `${screenshotPath}/success-feedback.png` });

    await expect(page).toMatchTextContent("Registration successful");

    await page.type('input[formcontrolname="username"]', username);
    await page.type('input[formcontrolname="password"]', password);
    await page.click("button.btn.btn-primary");

    await page.waitForSelector("h1");
    await expect(page).toMatchElement("h1", { text: `Hi ${firstName}!` });
  });
});
