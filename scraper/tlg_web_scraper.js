import puppeteer from "puppeteer";

const tlg_web_scraper = async (name) => {
  try {
    const url = `https://tlggaming.com/search?search=${name}`;
    const browser = await puppeteer.launch({
      // args: [
      //   "--disable-setuid-sandbox",
      //   "--no-sandbox",
      //   "--single-process",
      //   "--no-zygote",
      // ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Extract data if elements exist
    // const allArticles = {};
    //
    // allArticles.source = "TLGGaming";
    // allArticles.image = await page.$eval(".product-img img", (img) => img.src);
    // allArticles.link = await page.$eval(".caption .name a", (a) => a.href);
    // allArticles.price = await page.$eval(".caption .price .price-new", (span) =>
    //   span.textContent.trim(),
    // );
    // allArticles.title = await page.$eval(".caption .name", (a) =>
    //   a.textContent.trim(),
    // );
    //

    // Check if the elements exist before accessing them
    const priceElement = await page.$(".price-new");
    const titleElement = await page.$(".name");
    const imageElement = await page.$(".product-img img");
    const linkElement = await page.$(".caption .name a ");

    // Extract data if elements exist
    const allArticles = {};
    if (priceElement) {
      allArticles.source = "tlg";
      allArticles.image = await page.evaluate(
        (element) => element.src,
        imageElement,
      );
      allArticles.link = await page.evaluate(
        (element) => element.href,
        linkElement,
      );
      allArticles.price = await page.evaluate(
        (span) => span.textContent,
        priceElement,
      );
      allArticles.title = await page.evaluate(
        (element) => element.textContent.trim(),
        titleElement,
      );
    }

    // Close browser to free up resources
    await browser.close();
    return allArticles;
  } catch (error) {
    return [{ source: "Tlg_web" }];
  }
};

export { tlg_web_scraper };
