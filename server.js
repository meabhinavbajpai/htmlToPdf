const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

app.get('/convert', async (req, res) => {
  const { html } = req?.query;

  const browser = await puppeteer?.launch();
  const page = await browser?.newPage();
  await page?.setContent(html);

  const pdfBuffer = await page?.pdf({ format: 'A4',omitBackground:true, waitUntil: 'domcontentloaded' ,printBackground:true});

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
  res.send(pdfBuffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
