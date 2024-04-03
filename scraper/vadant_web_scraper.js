import puppeteer from "puppeteer";

const vedantcomputers_web_scraper = async (name) => {
  try {
    const url = `https://www.vedantcomputers.com/index.php?route=product/search&search=${encodeURIComponent(name)}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Scroll down the page to trigger lazy loading
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // Check if the elements exist before accessing them
    const priceElement = await page.$(".price-new");
    const titleElement = await page.$(".name");
    const imageElement = await page.$(".img-responsive");
    const linkElement = await page.$(".product-img");

    // Extract data if elements exist
    const allArticles = {};
    if (titleElement) {
      allArticles.source = "vedantcomputers";
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
        (element) => element.innerText,
        titleElement,
      );
    } else {
      throw new Error("One or more required elements not found.");
    }

    // Close browser to free up resources
    await browser.close();

    // Return the scraped data
    return allArticles;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export { vedantcomputers_web_scraper };

