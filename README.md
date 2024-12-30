# Repository File Processor

This application processes a ZIP file containing a Git repository and generates a single Markdown file containing all text-based file contents with proper formatting.

## Features

- Processes ZIP files containing Git repositories
- Recursively analyzes all files
- Generates formatted Markdown output
- Preserves directory structure
- Handles various text encodings
- Skips binary files and system directories
- Maintains original formatting

## Usage

```bash
npm start <path-to-zip-file>
```

The application will generate an `allcode.txt` file containing the formatted output.

## Output Format

The generated file will contain:
- Hierarchical listing of all files
- Complete file contents
- Markdown formatting with proper code blocks
- Language hints based on file extensions

## Ignored Items

The following are automatically skipped:
- Binary files
- .git directory
- node_modules directory
- System files (.DS_Store, Thumbs.db)