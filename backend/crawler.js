import { chromium } from 'playwright';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

export async function startCrawler(keyword, prompt, url) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const results = [];
    const visitedUrls = new Set(); 
    
    const crawl = async (url, depth = 1) => {
        if (depth > 2 || visitedUrls.has(url) || results.length >= 5) {
            return;
        }
        
        visitedUrls.add(url);
        console.log(`Crawling depth ${depth}: ${url}`);

        try {
            await page.goto(url);
            const title = await page.title();
            console.log(`Title of ${url}: ${title}`);

            // First, analyze the current page
            await crawlEachLink(url, keyword, prompt);

            // Then get all links for next level
            const links = await page.$$eval('a', anchors => 
                anchors.map(anchor => anchor.href)
                    .filter(href => href.startsWith('http')) // Only keep valid external links
            );
            
            // Recursively crawl each link at the next depth
            for (const link of links) {
                await crawl(link, depth + 1);
            }
    
        } catch (error) {
            console.error(`Failed to crawl ${url}:`, error.message);
        }
    };


    const crawlEachLink = async (url, keyword, prompt) => {
        try {
            console.log(`Crawling link: ${url} with keyword: ${keyword}`); 
            await page.goto(url);
            const content = await page.content();
            if (content.includes(keyword)) {
                console.log(`Keyword "${keyword}" found in ${url}`);
                const textContent = await page.evaluate(() => {
                    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, article, section');
                    return Array.from(textElements).map(el => el.textContent.trim()).join('\n');
                });
                const { score, relevantContent } = await analyzeContent(textContent, keyword, prompt);
    
                const result = {
                    url,
                    content: relevantContent,
                    score
                };
                results.push(result);
                console.log(`Analysis result for ${url}:`, result);
                return result;
            }
        } catch (error) {
            console.error(`Failed to crawl ${url}:`, error.message);
        }
    };

    // const urlsToCrawl = [
    //     'https://www.roboleary.net/frontend/2022/03/28/why-doesnt-the-video-element-have-native-lazy-loading.html'
    // ];

    const analyzeContent = async (content, keyword, prompt) => {
        try {
            const groq = new Groq({
                apiKey: process.env.GROQ_API_KEY,
            });

            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You must respond with valid JSON only, in this exact format:
                        {
                            "score": <number between 0-10>,
                            "relevantContent": "<most relevant text excerpt>"
                        }`
                    },
                    {
                        role: "user",
                        content: `Prompt: ${prompt}\nContent: ${content}\nKeyword: ${keyword}`
                    }
                ],
                model: "llama3-8b-8192",
            });

            let result;
            try {
                result = JSON.parse(response.choices[0]?.message?.content?.trim());
            } catch (parseError) {
                console.warn('Failed to parse LLM response as JSON:', response.choices[0]?.message?.content);
                result = { score: 0, relevantContent: '' };
            }
            console.log("result score : " + result.score + "content : " + result.relevantContent);
            return {
                score: result.score || 0,
                relevantContent: result.relevantContent || ''
            };
        } catch (error) {
            console.error('Error analyzing content:', error);
            return { score: 0, relevantContent: '' };
        }
    };

    await crawl(url);
    
    const topResults = results
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    await browser.close();
    console.log('Final Top 3 Results:', topResults);
    return topResults;
}
// startCrawler("lazy loading", "How to lazy load videos")
//     .then(results => console.log('Top 3 results:', results))
//     .catch(error => console.error('Error:', error));