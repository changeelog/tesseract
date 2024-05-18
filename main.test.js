const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");
const { log, processScreenshot, processScreenshots } = require("./main");

jest.mock("fs");
jest.mock("tesseract.js");

describe("OCR Script", () => {
  beforeEach(() => {
    fs.writeFileSync.mockClear();
    fs.appendFileSync.mockClear();
    fs.readdirSync.mockClear();
    Tesseract.recognize.mockClear();
  });

  test("log function should write message to console and log file", () => {
    const consoleSpy = jest.spyOn(console, "log");
    log("Test message");
    expect(consoleSpy).toHaveBeenCalledWith("Test message");
    expect(fs.appendFileSync).toHaveBeenCalledWith("log.txt", "Test message\n");
    consoleSpy.mockRestore();
  });

  test("processScreenshot function should extract text from screenshot", async () => {
    const screenshotFile = "1.png";
    const imagePath = path.join("./IGOR/", screenshotFile);
    const expectedText = "Extracted text";
    Tesseract.recognize.mockResolvedValue({ data: { text: expectedText } });

    const result = await processScreenshot(screenshotFile);
    expect(Tesseract.recognize).toHaveBeenCalledWith(imagePath, "rus");
    expect(result).toBe(`Text from ${screenshotFile}:\n${expectedText}\n\n`);
  });

  test("processScreenshot function should handle errors", async () => {
    const screenshotFile = "1.png";
    const errorMessage = "Processing error";
    Tesseract.recognize.mockRejectedValue(new Error(errorMessage));

    const result = await processScreenshot(screenshotFile);
    expect(result).toBe("");
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      "log.txt",
      `Error processing ${screenshotFile}: ${errorMessage}\n`
    );
  });

  test("processScreenshots function should process all screenshots and save extracted text", async () => {
    const screenshotFiles = ["1.png", "2.jpg"];
    fs.readdirSync.mockReturnValue(screenshotFiles);
    Tesseract.recognize.mockResolvedValue({ data: { text: "Extracted text" } });

    await processScreenshots();
    expect(fs.readdirSync).toHaveBeenCalledWith("./IGOR/"); // Update the path to match the actual path
    expect(Tesseract.recognize).toHaveBeenCalledTimes(screenshotFiles.length);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "extracted_text.txt",
      expect.any(String),
      "utf-8"
    );
  });
});
