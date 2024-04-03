import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://mdcomputers.in/index.php?search=4060&submit_search=&route=product%2Fsearch');

  // Wait for the element to be rendered
  await page.waitForSelector('.product-item-container');

  // Extracting image URL
  const imageUrl = await page.$eval('.product-image-container img', img => img.src);

  // Extracting title
  const title = await page.$eval('.right-block h4 a', a => a.textContent.trim());

  //Extracting link
  const link = await page.$eval('.right-block h4 a', a => a.href);

  // Extracting price
  const price = await page.$eval('.price .price-new', span => span.textContent.trim());

  console.log('Image URL:', imageUrl);
  console.log('Title:', title);
  console.log('link:', link);
  console.log('Price:', price);

  await browser.close();
})();

