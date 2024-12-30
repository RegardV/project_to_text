import AdmZip from 'adm-zip';
import fs from 'fs/promises';
import { shouldSkipEntry, processFile, formatFileContent } from './fileProcessor.js';
import { showProgress, showSuccess } from './ui.js';

export async function processZipFile(zipPath) {
  try {
    showProgress('Reading ZIP file...');
    const zip = new AdmZip(zipPath);
    const entries = zip.getEntries();
    
    let output = '# Repository Contents\n\n';
    
    for (const entry of entries) {
      if (shouldSkipEntry(entry)) continue;
      
      showProgress(`Processing: ${entry.entryName}`);
      
      if (!entry.isDirectory) {
        const content = await processFile(entry);
        if (content) {
          output += formatFileContent(entry.entryName, content);
        }
      }
    }
    
    await fs.writeFile('allcode.txt', output, 'utf8');
    showSuccess('\nProcessing complete! Output saved to allcode.txt');
    
  } catch (error) {
    throw new Error(`Failed to process ZIP file: ${error.message}`);
  }
}