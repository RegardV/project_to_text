const BINARY_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico', 'webp',
  'mp3', 'wav', 'ogg', 'mp4', 'webm',
  'pdf', 'doc', 'docx', 'xls', 'xlsx',
  'zip', 'rar', '7z', 'tar', 'gz',
  'exe', 'dll', 'so', 'dylib',
  'ttf', 'otf', 'woff', 'woff2'
]);

function isBinaryFile(filename) {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? BINARY_EXTENSIONS.has(extension) : false;
}

async function detectEncoding(uint8Array) {
  // Check for UTF-8 BOM
  if (uint8Array[0] === 0xEF && uint8Array[1] === 0xBB && uint8Array[2] === 0xBF) {
    return 'utf-8';
  }
  
  // Check for UTF-16 BOMs
  if (uint8Array[0] === 0xFE && uint8Array[1] === 0xFF) {
    return 'utf-16be';
  }
  if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {
    return 'utf-16le';
  }
  
  // Default to UTF-8
  return 'utf-8';
}

export async function extractContent(entry) {
  if (isBinaryFile(entry.name)) {
    return null;
  }
  
  const uint8Array = await entry.async('uint8array');
  const encoding = await detectEncoding(uint8Array);
  
  try {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(uint8Array);
  } catch (error) {
    console.warn(`Failed to decode ${entry.name} with ${encoding}, falling back to UTF-8`);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    return decoder.decode(uint8Array);
  }
}

export function formatContent(path, content) {
  const extension = path.split('.').pop() || 'text';
  return `\n## ${path}\n\`\`\`${extension}\n${content}\n\`\`\`\n`;
}