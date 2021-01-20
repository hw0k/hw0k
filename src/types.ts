import type { Output } from 'rss-parser';

export type RSSFeedItem = Output<{ [x: string]: any; }>['items'][number];

export interface ParsedItem extends Required<Pick<RSSFeedItem, 'title' | 'link' | 'pubDate'>> {}
