import puppeteer from "puppeteer";

const md_web_scraper = async (name) => {
  try {
    const url = `https://mdcomputers.in/index.php?search=${name}&submit_search=&route=product%2Fsearch`;
    console.log(url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract data if elements exist
    const allArticles = {};

    allArticles.source = "MdComputers";

    allArticles.image = await page.$eval(
      ".product-image-container img",
      (img) => img.src,
    );
    allArticles.link = await page.$eval(
      ".product-image-container a",
      (a) => a.href,
    );

    allArticles.price = await page.$eval(".price .price-new", (span) =>
      span.textContent.trim(),
    );
    allArticles.title = await page.$eval(".right-block h4 a", (a) =>
      a.textContent.trim(),
    );
    //   allArticles.source = "mdcomputers";
    //   allArticles.image = await page.evaluate(
    //     (element) => element.src,
    //     imageElements,

    // if (imageElements) {
    //   allArticles.status = "ok";
    //   allArticles.source = "mdcomputers";
    //   allArticles.image = await page.evaluate(
    //     (element) => element.src,
    //     imageElements,
    //   );
    //   //
    //   // allArticles.link = await page.evaluate(
    //   //   (element) => element.href,
    //   //   linkElement,
    //   // );
    //   // allArticles.price = await page.evaluate(
    //   //   (element) => element.innerText,
    //   //   priceElement,
    //   // );
    //   // allArticles.title = await page.evaluate(
    //   //   (element) => element.innerText,
    //   //   titleElement,
    //   // );
    // } else {
    //   throw new Error("One or more required elements not found in md.");
    // }
    //
    // Close browser to free up resources
    await browser.close();
    return allArticles;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export { md_web_scraper };
