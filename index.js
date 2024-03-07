
const cors = require("cors");
import bodyParser from "body-parser";
import express from "express";
import { amazon_web_scraper } from "./scraper/amazon_web_scraper.js";
import { vedantcomputers_web_scraper } from "./scraper/vadant_web_scraper.js";


// Create Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',async(req,res)=>{
res.send("hi this is working ")
})

app.post("/q", async (req, res) => {
  const { product } = req.body;

  const [amazonScrapedData, vedantcomputersScrapeData] = await Promise.all([
    amazon_web_scraper(product),
  vedantcomputers_web_scraper(product)

  ])

const finalScrapeData = {
  amazon: amazonScrapedData,
  vedantcomputers: vedantcomputersScrapeData
};
// Send the scraped data back as JSON response
res.json(finalScrapeData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
