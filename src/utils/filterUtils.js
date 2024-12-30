const IGNORED_DIRS = ['.git', 'node_modules'];
const IGNORED_FILES = ['.DS_Store', 'Thumbs.db'];

export function shouldProcessEntry(path) {
  return !IGNORED_DIRS.some(dir => path.includes(`/${dir}/`)) &&
         !IGNORED_FILES.some(file => path.endsWith(file));
}