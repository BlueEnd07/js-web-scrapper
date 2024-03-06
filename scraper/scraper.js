import puppeteer from "puppeteer";

const url = `https://www.amazon.in/s?k=4060`;

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const all = await page.evaluate(() => {
    const articles = document.querySelector(".a-price-whole").innerText;
    console.log(articles);
    const image = document.querySelector('.s-image').src;
    console.log(image)
    return{articles,image}
  });
  console.log(all)
};

scraper();
