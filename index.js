import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { amazon_web_scraper } from "./scraper/amazon_web_scraper.js";
import { vedantcomputers_web_scraper } from "./scraper/vadant_web_scraper.js";

// Create Express app
const app = express();

app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const { product } = req.body;

  const [amazonScrapedData, vedantcomputersScrapeData] = await Promise.all([
    amazon_web_scraper(product),
    vedantcomputers_web_scraper(product),
  ]);

  const finalScrapeData = {
    amazon: amazonScrapedData,
    vedantcomputers: vedantcomputersScrapeData,
  };
  // Send the scraped data back as JSON response
  res.json(finalScrapeData);

});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
