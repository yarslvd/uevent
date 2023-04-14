const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const Mustache = require("mustache");
const { default: puppeteer } = require("puppeteer");
const path = require("path");

const dateOptions = { 
  day: 'numeric', 
  month: 'short',
  year: 'numeric',  
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
}

const generatePdf = async (template, data) => {
  const filledTemplate = Mustache.render(template, data);

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  await page.setContent(filledTemplate, { waitUntil: 'domcontentloaded' });
  
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();

  return pdf;
}

const generateTicketPdf = async (user, event, tickets) => {
  const parsedDate = new Date(event.date);
  const date = parsedDate.toLocaleString('en-US', dateOptions).toUpperCase();
  const time = parsedDate.toLocaleString('en-US', timeOptions);

  const data = {
    eventTitle: event.title,
    eventDescription: event.description,
    format: event.format,
    theme: event.theme,
    address: event.address,
    location: event.location,
    date: `${date} ${time}`,
    pricePerTicket: event.price,
    isoCurrency: event.iso_currency,
    ticketsAmount: tickets.length,
    totalPrice: tickets.length * event.price,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    location_black_icon_binary: fs.readFileSync(path.resolve(__dirname, "../../client/public/assets/location_black_icon.png")).toString("base64"),
    clock_icon_binary: fs.readFileSync(path.resolve(__dirname, "../../client/public/assets/clock_icon.png")).toString("base64")
  }

  const template = fs.readFileSync(path.resolve(__dirname, "../assets/ticket.html"), { encoding: "utf8" });
  return await generatePdf(template, data);
}

module.exports = {
  generatePdf,
  generateTicketPdf
}