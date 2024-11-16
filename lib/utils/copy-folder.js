import fs from 'fs';
import path from 'path';

export async function copyFolderSync(from, to, excludeNames = []) {
  fs.mkdirSync(to, { recursive: true });
  for (const element of fs.readdirSync(from)) {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);

    if (excludeNames.includes(element)) {
      continue;
    }

    if (fs.lstatSync(fromPath).isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else {
      await copyFolderSync(fromPath, toPath, excludeNames);
    }
  }
}
