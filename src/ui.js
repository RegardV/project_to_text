export function setupUI(onFileSelected) {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const downloadBtn = document.getElementById('downloadBtn');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  dropZone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) onFileSelected(file);
  }, false);

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) onFileSelected(file);
  }, false);

  downloadBtn.addEventListener('click', handleDownload, false);
}

export function showStatus(message) {
  const statusEl = document.getElementById('status');
  const statusTextEl = document.getElementById('statusText');
  
  statusEl.classList.remove('hidden');
  statusTextEl.textContent = message;
}

export function showResult(content) {
  const resultEl = document.getElementById('result');
  const resultContentEl = document.getElementById('resultContent');
  
  resultEl.classList.remove('hidden');
  resultContentEl.innerHTML = marked.parse(content);
}

function handleDownload() {
  const content = document.getElementById('resultContent').textContent;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'repository-contents.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}