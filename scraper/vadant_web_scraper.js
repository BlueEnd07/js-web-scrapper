import puppeteer from "puppeteer";
const vedantcomputers_web_scraper = async (name) => {
  try {
    const url = `https://www.vedantcomputers.com/index.php?route=product/search&search=${encodeURIComponent(name)}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Check if the elements exist before accessing them
    const priceElement = await page.$(".price-new");
    const titleElement = await page.$(".name");
    const imageElement = await page.$(".img-responsive");
    const linkElement =  await page.$(".product-img");

    // Extract data if elements exist
    const allArticles = {};
    if (priceElement) {
      allArticles.source='vadent computers';
      allArticles.image = await page.evaluate(element => element.src, imageElement);
      allArticles.link  = await page.evaluate(element => element.href, linkElement);
      allArticles.price = await page.evaluate(element => element.innerText, priceElement);
      allArticles.title = await page.evaluate(element => element.innerText.slice(0,50), titleElement);

    } 
    await browser.close();

    // Return the scraped data
    return allArticles;
  } catch (error) {
    return [{ source: "Vadent computers"}];
  }
};

export { vedantcomputers_web_scraper };

