import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { amazon_web_scraper } from "./scraper/amazon_web_scraper.js";
import { vedantcomputers_web_scraper } from "./scraper/vadant_web_scraper.js";
import { md_web_scraper } from "./scraper/md_web_scraper.js";
import{ tlg_web_scraper} from "./scraper/tlg_web_scraper.js";


// Create Express app
const app = express();

app.use(cors()); // Simplified CORS setup
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.json({ test: "working" });
});

app.get("/scrape", async (req, res) => {
  try {
    const { product } = req.body;
    // const { product } = req.query;
    console.log("Product Name from index:", product);

    const dataAmazon = amazon_web_scraper(product);
    const datavedant = vedantcomputers_web_scraper(product);
    const datamd = md_web_scraper(product);
    const datatlg = tlg_web_scraper(product);

    const [
      amazonScrapedData,
      vedantcomputersScrapeData,
      mdScrapeData,
      tlgScrapeData,
    ] = await Promise.all([dataAmazon, datavedant, datamd, datatlg]);

    const finalScrapeData = {
      amazon: amazonScrapedData,
      vedantcomputers: vedantcomputersScrapeData,
      md: mdScrapeData,
      tlg: tlgScrapeData,
    };

    res.json(finalScrapeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
