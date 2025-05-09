import { chromium } from 'playwright';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

export async function preCrawlWebsite(url, websiteName) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  
    const visitedUrls = new Set();
    const pages = [];
  
    const crawl = async (url, depth = 1) => {
      if (depth > 3 || visitedUrls.has(url)) return;
  
      visitedUrls.add(url);
      console.log(`Crawling level ${depth}: ${url}`);
  
      try {
        await page.goto(url);
        const title = await page.title();
        const content = await page.evaluate(() => {
          const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, article, section');
          return Array.from(elements).map(el => el.textContent.trim()).join('\n');
        });
  
        pages.push({ 
          id: pages.length + 1 + "", // Convert to string to match Meilisearch format
          url, 
          title, 
          content 
        });
  
        const links = await page.$$eval('a', anchors =>
          anchors.map(anchor => anchor.href).filter(href => href.startsWith('http'))
        );
  
        for (const link of links) {
          await crawl(link, depth + 1);
        }
      } catch (error) {
        console.error(`Failed to crawl ${url}:`, error.message);
      }
    };
  
    await crawl(url);
    await browser.close();
  
    const outputPath = path.join('./data', `${websiteName}.json`);
    await fs.writeFile(outputPath, JSON.stringify(pages, null, 2));
    console.log(`Crawled data saved to ${outputPath}`);
}