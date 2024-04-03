import puppeteer from "puppeteer";

const tlg_web_scraper = async (name) => {
  try {
    const url = `https://tlggaming.com/search?search=${name}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract data if elements exist
    const allArticles = {};


    allArticles.source = "TLGGaming";
    allArticles.image = await page.$eval(".product-img img", (img) => img.src);
    allArticles.link = await page.$eval(".caption .name a", (a) => a.href);
    allArticles.price = await page.$eval(".caption .price .price-new", (span) =>
      span.textContent.trim(),
    );
    allArticles.title = await page.$eval(".caption .name", (a) =>
      a.textContent.trim(),
    );


    // Close browser to free up resources
    await browser.close();
    return allArticles;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export { tlg_web_scraper };
