import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { amazon_web_scraper } from "./scraper/amazon_web_scraper.js";
// import { vedantcomputers_web_scraper } from "./scraper/vadant_web_scraper.js";

// Create Express app
const app = express();

app.use(cors()); // Simplified CORS setup
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.json({ "test": "working" });
});

app.get("/scrape", async (req, res) => { 
  try {
    const { product } = req.query;
  
    const [amazonScrapedData] = await Promise.all([
      amazon_web_scraper(product),
      // vedantcomputers_web_scraper(product),
    ]);
  
    const finalScrapeData = {
      amazon: amazonScrapedData,
      // vedantcomputers: vedantcomputersScrapeData,
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

