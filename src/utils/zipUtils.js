import JSZip from 'jszip';

export async function readZipFile(file) {
  const zip = new JSZip();
  return await zip.loadAsync(file);
}

export async function getZipEntries(zip) {
  const entries = [];
  zip.forEach((path, entry) => {
    entries.push({ path, entry });
  });
  return entries;
}