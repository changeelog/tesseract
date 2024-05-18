# OCR Screenshot Text Extraction

This script extracts text from screenshots using Tesseract.js, a pure JavaScript port of the popular Tesseract OCR engine. It processes all the screenshots in a specified folder and saves the extracted text to a file.

## Features

- Extracts text from screenshots using Tesseract.js
- Supports multiple image formats (PNG and JPG)
- Logs processing progress and errors to a log file and console
- Saves the extracted text to a file
- Tested with Jest (96.15% coverage)

## Prerequisites

- Node.js (v16.x)
- Tesseract.js (5.1.0)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/changeelog/tesseract.git
```

2. Navigate to the project directory:

```bash
cd ocr
```

3. Install the dependencies:

```bash
pnpm install
```

## Usage

Place your screenshot images in the `IGOR` folder (or update the `SCREENSHOTS_FOLDER` constant in the script to match your folder name).

The script will process all the screenshots in the specified folder and extract the text using Tesseract.js.

The extracted text will be saved to a file named extracted_text.txt in the project directory.

Processing progress and any errors will be logged to the console and a log file named log.txt.

## Configuration

`SCREENSHOTS_FOLDER`: The path to the folder containing the screenshots. Default is `"./IGOR/"`.
`LOG_FILE`: The name of the log file. Default is `"log.txt"`.

## Testing

To run the tests, run the following command:

```bash
pnpm test
```

## Coverage

To generate the coverage report, run the following command:

```bash
pnpm coverage
```

The coverage report will be displayed in the console and saved to the coverage directory.
