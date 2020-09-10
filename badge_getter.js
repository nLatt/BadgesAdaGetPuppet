const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

(async () => {
  const website = "http://vibe.adatechschool.fr/?page_id=111";

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    slowmo: 200,
  });

  const page = await browser.newPage();

  await page.goto(website);
  await page.$eval("#username-107", (el, value) => el.value = value, process.env.User);
  await page.$eval("#user_password-107", (el, value) => el.value = value, process.env.PASSWORD);
  page.click("[class=um-button]");


  await page.waitForXPath("//li[@class='user-has-not-earned']/a[@href]");
  let links = await page.$x("//li[@class='user-has-not-earned']/a[@href]");

  const requirement_urls = await page.evaluate((...links) => {
    return links.map(e => e.href);
  }, ...links);
  await write_urls(requirement_urls);

})();


function write_urls(data) {
  if (data.constructor === Array ) {
    fs.writeFile("requirement_urls.csv", data, function(err) {
      if (err) throw err;
      console.log("File saved!");
    });
  };
  return
};

// async function get_badge()
