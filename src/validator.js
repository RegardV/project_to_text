import fs from 'fs/promises';
import path from 'path';

export async function validateZipPath(zipPath) {
  if (!zipPath) {
    throw new Error('No file path provided');
  }

  try {
    const stats = await fs.stat(zipPath);
    
    if (!stats.isFile()) {
      throw new Error('Path does not point to a file');
    }
    
    if (path.extname(zipPath).toLowerCase() !== '.zip') {
      throw new Error('File must have a .zip extension');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('File does not exist');
    }
    throw error;
  }
}