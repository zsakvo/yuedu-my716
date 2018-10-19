var cheerio = require("cheerio");
var rp = require("request-promise");

async function getExtraNetIP() {
  var res = await rp("http://ip.gs");
  var $ = cheerio.load(res);
  var ip = $(".btn-outline-primary").text();
  return ip;
}

module.exports = getExtraNetIP;
