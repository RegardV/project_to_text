import { readZipFile, getZipEntries } from './utils/zipUtils.js';
import { extractContent, formatContent } from './utils/contentUtils.js';
import { shouldProcessEntry } from './utils/filterUtils.js';

export async function initFileProcessor(file) {
  try {
    const zip = await readZipFile(file);
    const entries = await getZipEntries(zip);
    
    let output = '# Repository Contents\n\n';
    
    for (const { path, entry } of entries) {
      if (entry.dir || !shouldProcessEntry(path)) {
        continue;
      }
      
      const content = await extractContent(entry);
      if (content) {
        output += formatContent(path, content);
      }
    }
    
    return output;
  } catch (error) {
    throw new Error(`Failed to process ZIP file: ${error.message}`);
  }
}