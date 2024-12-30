import isBinary from 'is-binary';
import iconv from 'iconv-lite';
import chardet from 'chardet';
import { IGNORED_DIRS, IGNORED_FILES } from '../config.js';

export function shouldSkipEntry(entry) {
  const entryPath = entry.entryName;
  return IGNORED_DIRS.some(dir => entryPath.includes(`/${dir}/`)) ||
         IGNORED_FILES.some(file => entryPath.endsWith(file));
}

export async function processFile(entry) {
  const buffer = entry.getData();
  
  if (isBinary(buffer)) {
    return null;
  }
  
  const encoding = chardet.detect(buffer);
  if (!encoding) {
    return null;
  }
  
  return iconv.decode(buffer, encoding);
}

export function formatFileContent(filePath, content) {
  const extension = filePath.split('.').pop() || 'text';
  return `\n## ${filePath}\n\`\`\`${extension}\n${content}\n\`\`\`\n`;
}