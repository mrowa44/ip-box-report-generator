const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { PAGES } = require('./config');
const TEMPLATE = './template.html';
const STYLE = './style.css';

function getPageConfig(initialPageConfig) {
  const { hWorkedMonth } = initialPageConfig;
  const ratePerH = Math.round(initialPageConfig.ratePerH);
  const meetingsH = Math.round(initialPageConfig.meetingsH);
  const workH = Math.round(hWorkedMonth - meetingsH);
  const workValue = Math.round(ratePerH * workH);
  const meetingsValue = Math.round(ratePerH * meetingsH);
  const copyrightPercentage = Math.round(workH / hWorkedMonth * 100);
  return {
    ...initialPageConfig,
    ratePerH,
    workValue,
    workH,
    meetingsH,
    meetingsValue,
    copyrightPercentage,
  };
}

async function generate() {
  const browser = await puppeteer.launch();
  for (const pageConfig of PAGES) {
    await generatePage({ browser, pageConfig });
  }
  await browser.close();
}

async function generatePage({ browser, pageConfig }) {
  const config = getPageConfig(pageConfig);
  const dom = await JSDOM.fromFile(TEMPLATE);
  const { document } = dom.window;

  Object.keys(config).forEach((key) => {
    const idEl = document.getElementById(key);
    if (idEl) {
      idEl.innerHTML = config[key];
    }
    const classArr = [...document.querySelectorAll(`.${key}`)];
    if (classArr.length > 0) {
      for (const item of classArr) {
        item.innerHTML = config[key];
      }
    }
  });
  if (!config.additionalRowValue) {
    document.getElementById('additionalRow').remove();
  }

  const html = dom.serialize();
  const browserPage = await browser.newPage();
  await browserPage.setContent(html);
  await browserPage.addStyleTag({path: STYLE});
  await browserPage.pdf({
    path: `output/${config.clientLine1} - ${config.invoiceMonth}.pdf`,
  });
  await browserPage.close();
}

(async () => {
  await generate();
})();

