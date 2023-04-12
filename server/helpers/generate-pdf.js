const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const Mustache = require("mustache");
const { default: puppeteer } = require("puppeteer");


const generatePdf = async (template, data) => {
  const generation = {
    html: "template.html",
    layout: {
      margin: {
        top: 25,
        left: 20,
        right: 20,
        bottom: 20,
      },
    },
  };

  const filledTemplate = Mustache.render(template, data);

  const body = new FormData();
  body.append("template.html", filledTemplate, { filename: "template.html" });
  body.append("generation", JSON.stringify(generation));

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  await page.setContent(filledTemplate, { waitUntil: 'domcontentloaded' });
  
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();

  return pdf;
}

module.exports = {
  generatePdf
}