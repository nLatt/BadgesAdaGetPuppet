const puppeteer = require("puppeteer");
const cluster = require("puppeteer-cluster");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

(async () => {
  const website = "http://vibe.adatechschool.fr/?page_id=53";
  var data = await read_urls();

  const browser = await puppeteer.launch({
    headless: false,
    slowmo: 200,
  });

  const page = await browser.newPage();

  await page.goto(website)
  await page.$eval("#username-107", (el, value) => el.value = value, process.env.User);
  await page.$eval("#user_password-107", (el, value) => el.value = value, process.env.PASSWORD);
  page.click("[class=um-button]");

  console.log(data[0])
})();

function read_urls() {
  fs.readFile("generated_files/requirement_urls.csv", "utf8", function(err, data) {
    if (err) throw err;
    console.log("File read!");
    return data
  });
};
