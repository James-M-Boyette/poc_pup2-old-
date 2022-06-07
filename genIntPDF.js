import puppeteer from "puppeteer";

(async () => {
  try {
    // Set target website
    const url = "https://dog.ceo/dog-api/";
    const dimensions = { width: 2550, height: 3300 };

    // Note: "headless" necessary for pdf generation
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--window-size=${dimensions.width},${dimensions.height}`],
    });
    // Open a tab/page:
    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height,
    });

    // Alternative viewport dimension setting:
    const windowDimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    });
    console.log("windowDimensions:", windowDimensions);

    // Go to a website:
    await page.goto(url, { waitUntil: "networkidle0" });

    // await page.setContent(html); // Don't think this is needed, but kept here just in case

    // const pdfBuffer = await page.pdf();
    page.emulateMediaType("screen");

    await page.pdf({
      width: dimensions.width,
      height: dimensions.height,
      path: `./ver2-a4-format.pdf`,
    });

    await page.close();
    await browser.close();

    // return pdfBuffer;
  } catch (error) {
    console.error("Error:", error);
  }
})();
