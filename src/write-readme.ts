import { writeFile } from 'fs';
import type { PathLike } from 'fs';
import { resolve, join } from 'path';
import dayjs from 'dayjs';
import { ParsedItem } from "./types";

async function writeReadme(items: ParsedItem[]) {
  const str = items.map(getStringOfItem).join('\n');
  const readme = generateReadme(str);

  await writeFileAsync(resolve(join(__dirname, '..', 'README.md')), readme);
}

function generateReadme(str: string) {
  return `### Hi there 👋

세상이 아름다워지는 것을 지향하는 프론트엔드 개발자, 남현욱입니다.

### 블로그 포스트

${str}
`;
}

function isNewItem({ pubDate }: ParsedItem) {
  const now = dayjs();
  const itemPubDate = dayjs(pubDate);

  return now.isAfter(itemPubDate) && now.isBefore(itemPubDate.add(7, 'day'));
}

function getStringOfItem(item: ParsedItem) {
  return `- [${item.title}](${item.link})${isNewItem(item) ? ' `NEW!`' : ''}`;
}

function writeFileAsync(path: PathLike | number, data: string | NodeJS.ArrayBufferView) {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export default writeReadme;
