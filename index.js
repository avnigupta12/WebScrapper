const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { head } = require("request");

async function main() {
  const html = await request.get(
    //   "https://www.codingwithstefan.com/table-example/"
    "https://trends.builtwith.com/websitelist/Responsive-Tables/"
  );

  fs.writeFileSync("test.html", html);

  const $ = await cheerio.load(html);

  const header = [];
  const data = [];
  $("div > table > thead > tr").each((index, element) => {
    const tableHeaders = $(element).find("th");
    tableHeaders.each((index, element) => {
      header.push($(element).text());
    });
  });
  console.log(`header = ${header}`);

  $("div > table > tbody > tr").each((index, element) => {
    const row = {};
    const tableRows = $(element).find("td");
    tableRows.each((index, element) => {
      row[header[index]] = $(element).text();
      console.log(row);
    });
    data.push(row);
  });
  console.log(data);

  console.log(data);
}

main();
