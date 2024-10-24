import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const crawl = async (url) => {
        try {
            await page.goto(url);
            const title = await page.title();
            console.log(`Title of ${url}: ${title}`);

            const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.href));
            console.log(`Links found on ${url}:`, links);

            const keywordToSearch = 'Development';

            for (const link of links) {
                await crawlEachLink(link, keywordToSearch);
            }
        } catch (error) {
            console.error(`Failed to crawl ${url}:`, error.message);
        }
    };

    const crawlEachLink = async (url, keyword) => {
        try {
            await page.goto(url);
            const content = await page.content();
            if (content.includes(keyword)) {
                console.log(`Keyword "${keyword}" found on ${url}`);
            }
        } catch (error) {
            console.error(`Failed to crawl ${url}:`, error.message);
        }
    };

    const urlsToCrawl = [
        'https://portfolio-tejas.vercel.app/'
    ];

    for (const url of urlsToCrawl) {
        await crawl(url);
    }
    await browser.close();
})();
