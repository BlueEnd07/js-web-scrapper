

import puppeteer from "puppeteer";

const amazon_web_scraper = async (name) => {
  try {
    const url = `https://www.amazon.in/s?k=${name}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Check if the elements exist before accessing them
    const priceElement = await page.$(".a-price-whole");
    const titleElement = await page.$("h2");
    const imageElement = await page.$(".s-image");
    const linkElement  = await page.$('.a-link-normal');
    // Extract data if elements exist
    const allArticles = {};
    if (priceElement && titleElement) {
      allArticles.source='Amazon';
      allArticles.image = await page.evaluate(element => element.src, imageElement);
      allArticles.link  = await page.evaluate(element => element.href, linkElement);
      allArticles.price = await page.evaluate(element => element.innerText, priceElement);
      allArticles.title = await page.evaluate(element => element.innerText.slice(0,50), titleElement);
      ;
      ;
    } else {
      throw new Error("Price or title element not found.");
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

export { amazon_web_scraper };

