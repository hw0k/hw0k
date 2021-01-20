import RSSParser from 'rss-parser';
import type { RSSFeedItem, ParsedItem } from './types';

async function parseRSS(url: string) {
  const parser = new RSSParser();

  const feed = await parser.parseURL(url);
  const items = feed.items.map(mapItem).filter(filterItem).slice(0, 5);

  return items;
}

function mapItem({ title, link, pubDate }: RSSFeedItem) {
  return { title, link, pubDate };
}

function isValid(str: string | undefined) {
  return !!str && str !== '';
}

function filterItem(item: RSSFeedItem): item is ParsedItem {
  const { title, link, pubDate } = item;
  // TODO: link, pubDate validate 따로 해야 함
  return isValid(title) && isValid(link) && isValid(pubDate);
}

export default parseRSS;
