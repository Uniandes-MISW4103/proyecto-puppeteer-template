import "jest-puppeteer";

describe("Tutorial Puppeteer", () => {
  beforeAll(async () => {
    const fs = require("fs");
    fs.mkdirSync(screenshotPath, { recursive: true });
  });

  beforeEach(async () => {
    await page.goto(`${baseUrl}/register`);
    await page.waitForSelector("button");
    await page.click("button");
  });

  it("Test links between registration and login page", async () => {
    await page.waitForSelector("button");
    await page.click("a.btn.btn-link");
    await page.screenshot({ path: `${screenshotPath}/cancel.png` });
    expect(page.url()).toEqual(`${baseUrl}/login`);

    await page.click("a.btn.btn-link");
    await page.screenshot({ path: `${screenshotPath}/register.png` });
    expect(page.url()).toEqual(`${baseUrl}/register`);
  });

  it("Test form feedback", async () => {
    page.click("button.btn.btn-primary");
    await page.screenshot({ path: `${screenshotPath}/form-feedback.png` });
    const feedback = await page.$$("div.invalid-feedback");
    expect(feedback.length).toEqual(4);
  });

  it("Create an user and login", async () => {
    await page.type('input[formcontrolname="firstName"]', "Monitor");
    await page.type('input[formcontrolname="lastName"]', "Pruebas");
    await page.type('input[formcontrolname="username"]', "pruebas");
    await page.type('input[formcontrolname="password"]', "MISO4208");

    await page.click("button.btn.btn-primary");

    await page.screenshot({ path: `${screenshotPath}/success-feedback.png` });

    await expect(page).toMatchTextContent("Registration successful");

    await page.type('input[formcontrolname="username"]', "pruebas");
    await page.type('input[formcontrolname="password"]', "MISO4208");
    await page.click("button.btn.btn-primary");

    await page.waitForSelector("h1");
    await expect(page).toMatchElement("h1", { text: "Hi Monitor!" });
  });
});
