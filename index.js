import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { amazon_web_scraper } from "./scraper/amazon_web_scraper.js";
import { vedantcomputers_web_scraper } from "./scraper/vadant_web_scraper.js";
import { md_web_scraper } from "./scraper/md_web_scraper.js";
import { tlg_web_scraper } from "./scraper/tlg_web_scraper.js";
import { clarion_web_scraper } from "./scraper/clarion_web_scraper.js";
// import { mdWebScraper } from "./scraper/md_web_scraper.js";

// Create Express app
const app = express();

app.use(cors()); // Simplified CORS setup
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const amaz= await amazon_web_scraper('4060')
  res.json(amaz);
});

app.get("/scrape", async (req, res) => {
  try {
    const { product } = req.body;
    // const { product } = req.query;
    console.log("Product Name from index:", product);

    const [
      amazonScrapedData,
      vedantcomputersScrapeData,
      mdScrapeData,
      tlgScrapeData,
      // clarionScrapeData
    ] = await Promise.all([
      amazon_web_scraper(product),
      vedantcomputers_web_scraper(product),
      md_web_scraper(product),
      tlg_web_scraper(product),
      // clarion_web_scraper(product)
    ]);

    const finalScrapeData = {
      amazon: amazonScrapedData,
      vedantcomputers: vedantcomputersScrapeData,
      md: mdScrapeData,
      tlg: tlgScrapeData,
      // clariom: clarionScrapeData
    };

    // const finalScrapeData=await mdWebScraper(product)
    //
    console.log(finalScrapeData)
    res.json(finalScrapeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
