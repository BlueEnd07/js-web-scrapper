import puppeteer from "puppeteer";
const md_web_scraper = async (name) => {
  try {
    const url = `https://mdcomputers.in/index.php?search=${name}&submit_search=&route=product%2Fsearch`;
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url);


    // Check if the elements exist before accessing them
    const priceElement = await page.$(".price-new");
    const titleElement = await page.$(".right-block h4 a");
    const imageElement = await page.$(".product-image-container img");
    const linkElement = await page.$(".product-image-container a");

    // Extract data if elements exist
    const allArticles = {};
    if (priceElement) {
      allArticles.source = "md computers";
      allArticles.image = await page.evaluate(
        (element) => element.src,
        imageElement,
      );
      allArticles.link = await page.evaluate(
        (element) => element.href,
        linkElement,
      );
      allArticles.price = await page.evaluate(
        (element) => element.innerText,
        priceElement,
      );
      allArticles.title = await page.evaluate(
        (element) => element.innerText.slice(0, 50),
        titleElement,
      );
    }
    await browser.close();

    // Return the scraped data
    return allArticles;
  } catch (error) {
    console.log("error from md ",error);
    return [{ source: "md computers" }];
  }
};

export { md_web_scraper };
