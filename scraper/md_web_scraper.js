import puppeteer from "puppeteer";
const md_web_scraper = async (name) => {
  console.log(`searching for ${name} on md`);
  try {
    console.log(`searching for ${name} on md inside try`);
    const url = `https://mdcomputers.in/index.php?search=${name}&submit_search=&route=product%2Fsearch`;
    console.log(` before await url = ${url}`)
    const browser = await puppeteer.launch({ headless: true });
    console.log('after await')
    const page = await browser.newPage();
    await page.goto(url);

    const pageContent = await page.content();
    console.log("Page Content:", pageContent);

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
    console.log("error from md  ");
    return [{ source: "md computers" }];
  }
};

export { md_web_scraper };
