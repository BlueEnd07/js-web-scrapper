import puppeteer from "puppeteer";

const clarion_web_scraper = async (name) => {
  try {
    const url = `https://shop.clarioncomputers.in/?s=${name}&post_type=product`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract data if elements exist
    const allArticles = {};


    allArticles.source = "clarion";
    allArticles.image = await page.$eval(".product-thumbnail img", (img) => img.src);
    allArticles.link = await page.$eval(".woocommerce-loop-product__link ", (a) => a.href);
    allArticles.price = await page.$eval(".woocommerce-Price-amount", (bdi) =>
      bdi.innerText.trim(),
      //not wotking price and taking time 
    );
    allArticles.title = await page.$eval(".woocommerce-loop-product__title", (h2) =>
      h2.textContent.trim(),
    );


    // Close browser to free up resources
    await browser.close();
    return allArticles;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export { clarion_web_scraper };
