import { processZipFile } from './processor.js';
import { askForZipPath, showError } from './ui.js';
import { validateZipPath } from './validator.js';

async function main() {
  try {
    const zipPath = await askForZipPath();
    await validateZipPath(zipPath);
    await processZipFile(zipPath);
  } catch (error) {
    showError(error.message);
    process.exit(1);
  }
}

main();