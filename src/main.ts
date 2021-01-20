import { getInput, info, setFailed } from '@actions/core';
import parseRSS from './parse-rss';
import writeReadme from './write-readme';

async function run() {
  try {
    const url = getInput('url') ?? 'https://hw0k.me/rss.xml';

    const items = await parseRSS(url);
    items.forEach(item => info(`${item.pubDate} - ${item.title} - ${item.link}`));

    await writeReadme(items);
  } catch (err) {
    console.error(err);
    setFailed(err.message);
  }
}

run();
