const puppeteer = require("puppeteer");
const { generatePOM } = require("./generator");

async function crawlPage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Extract page title
  const pageTitle = await page.title();

  // Extract elements with stable attributes
  const elements = await page.evaluate(() => {
    const elementList = [];
    document.querySelectorAll("*").forEach((el) => {
      let uniqueSelector = "";

      if (el.getAttribute("data-test-id")) {
        uniqueSelector = `[data-test-id='${el.getAttribute("data-test-id")}']`;
      } else if (el.id) {
        uniqueSelector = `#${el.id}`;
      }

      if (uniqueSelector) {
        elementList.push({
          tagName: el.tagName,
          selector: uniqueSelector,
          text: el.innerText.trim(),
        });
      }
    });

    return elementList;
  });

  await browser.close();
  return elements;
}

module.exports = { crawlPage };
