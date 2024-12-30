import './style.css';
import { initFileProcessor } from './fileProcessor.js';
import { setupUI, showStatus, showResult } from './ui.js';
import { marked } from 'marked';

// Add marked to window for use in UI
window.marked = marked;

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Repository File Processor</h1>
      
      <div id="dropZone" class="bg-white rounded-lg shadow-md p-8 mb-6">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p class="text-gray-600 mb-4">Drag and drop a ZIP file here</p>
          <p class="text-sm text-gray-500">or</p>
          <label class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
            Choose File
            <input type="file" id="fileInput" class="hidden" accept=".zip" />
          </label>
        </div>
      </div>
      
      <div id="status" class="hidden bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-2">Processing Status</h2>
        <p id="statusText" class="text-gray-600"></p>
      </div>
      
      <div id="result" class="hidden bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Result</h2>
        <div id="resultContent" class="prose max-w-none"></div>
        <button id="downloadBtn" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Download Result
        </button>
      </div>
    </div>
  </div>
`;

// Initialize the UI with file processing callback
setupUI(async (file) => {
  try {
    showStatus('Processing ZIP file...');
    const output = await initFileProcessor(file);
    showResult(output);
    showStatus('Processing complete!');
  } catch (error) {
    showStatus(`Error: ${error.message}`);
  }
});