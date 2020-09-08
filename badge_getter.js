const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();

(async () => {
  const website = "http://vibe.adatechschool.fr/?page_id=111"

  const browser = await puppeteer.launch({
    headless: false,
    slowmo: 200,
  });

  const page = await browser.newPage();

  await page.goto(website)
  page.click("[class=um-button]")
  await page.$eval("#username-107", (el, value) => el.value = value, process.env.User)
  await page.$eval("#user_password-107", (el, value) => el.value = value, process.env.PASSWORD)
})();
