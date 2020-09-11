const puppeteer = require("puppeteer");
const cluster = require("puppeteer-cluster");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const util = require('util');

dotenv.config();

(async () => {
  const website = "http://vibe.adatechschool.fr/?page_id=53";
  data = await read_urls();
  await console.log(data);

  const browser = await puppeteer.launch({
    headless: false,
    slowmo: 200,
  });

  const page = await browser.newPage();

  await page.goto(website)
  await page.$eval("#username-107", (el, value) => el.value = value, process.env.User);
  await page.$eval("#user_password-107", (el, value) => el.value = value, process.env.PASSWORD);
  page.click("[class=um-button]");
  // await page.goto(data[0]);

})();

async function read_urls() {
  data = await fs.readFile("generated_files/requirement_urls.csv", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File read!");
  });
  return data.split(",")
};
