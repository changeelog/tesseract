/**
 * @fileoverview A script to extract text from screenshots using Tesseract.js.
 * @author Your Name
 * @version 1.0.0
 */

const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");

/**
 * @constant {string} SCREENSHOTS_FOLDER - The path to the folder containing the screenshots.
 */
const SCREENSHOTS_FOLDER = "./IGOR/";

/**
 * @constant {string} LOG_FILE - The name of the log file.
 */
const LOG_FILE = "log.txt";

/**
 * Writes a message to the log file and console.
 * @param {string} message - The message to log.
 */
function log(message) {
  console.log(message);
  fs.appendFileSync(LOG_FILE, `${message}\n`);
}

/**
 * Processes a single screenshot and extracts the text using Tesseract.js.
 * @param {string} screenshotFile - The name of the screenshot file.
 * @returns {Promise<string>} A promise that resolves to the extracted text.
 */
async function processScreenshot(screenshotFile) {
  const imagePath = path.join(SCREENSHOTS_FOLDER, screenshotFile);
  log(`Processing screenshot: ${screenshotFile}`);

  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "rus");
    return `Text from ${screenshotFile}:\n${text}\n\n`;
  } catch (error) {
    log(`Error processing ${screenshotFile}: ${error.message}`);
    return "";
  }
}

/**
 * Processes all screenshots in the specified folder and saves the extracted text to a file.
 * @returns {Promise<void>} A promise that resolves when all screenshots have been processed.
 */
async function processScreenshots() {
  log("Starting screenshot processing");

  const screenshotFiles = fs
    .readdirSync(SCREENSHOTS_FOLDER)
    .filter((file) => file.endsWith(".png") || file.endsWith(".jpg"));

  const results = await Promise.all(screenshotFiles.map(processScreenshot));
  const extractedText = results.join("");

  fs.writeFileSync("extracted_text.txt", extractedText, "utf-8");
  log("Text extraction completed. Results saved to extracted_text.txt.");
}

// Clear the log file before starting
fs.writeFileSync(LOG_FILE, "");

processScreenshots()
  .then(() => {
    log("Script executed successfully");
  })
  .catch((error) => {
    log(`An error occurred: ${error.message}`);
  });

module.exports = {
  log,
  processScreenshot,
  processScreenshots,
};
