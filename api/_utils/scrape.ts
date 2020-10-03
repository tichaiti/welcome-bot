import cheerio from 'cheerio';
import fetch from 'node-fetch';

export default async function scrape(linktree) {
  const html = await fetch(linktree);
  const htmlString = await html.text();
  const $ = cheerio.load(htmlString);
  const links = []; 
  
  $('.link a').each((_, el) => {
    const { linkTitle, linkUrl } = $(el).data();
    links.push({
      name: linkTitle,
      link: linkUrl
    });
  });

  return links;
}