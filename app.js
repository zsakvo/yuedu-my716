const express = require("express");
const bodyParser = require("body-parser");
var gc = require("./lib/gc");
var bs = require("./lib/bs.json");
var gco = require("./lib/gco");
var cheerio = require("cheerio");
var rp = require("request-promise");
var ip = require("ip");
var config = require("./config");

var app = express();
app.listen(config.port);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/search", async function(req, res) {
  var keyword = req.query.keyword;
  var page = req.query.page;
  res.location(
    "http://www.zhuishushenqi.com/search?val=" + keyword + "&page=" + page
  );
  res.sendStatus(302);
});

app.get(/^\/comment\/(\w.+)$/, async function(req, res) {
  var bid = req.url.split("/comment/")[1];
  res.write(await gco(bid));
  res.end();
});

app.get(/^\/chapter\/(\w.+)$/, async function(req, res) {
  var url = req.url.split("/chapter/")[1];
  var html = await gc(url);
  res.write(html);
  res.end();
});

app.post("/gbs", function(req, res) {
  var body = req.body;
  var bsn = body.bsn;
  var bsu = body.bsu;
  bs.bookSourceName = bsn;
  bs.bookSourceUrl = bsu;
  bs.ruleSearchUrl = bsu + "/book/search?keyword=searchKey&page=searchPage";
  res.json(bs);
});

app.use("/gbs", express.static(__dirname + "/html"));

console.log("服务器启动成功");
console.log("当前监听端口：" + config.port);

var eip;
var iip;

async function getIPs() {
  var res = await rp("http://ip.gs");
  var $ = cheerio.load(res);
  eip = $(".btn-outline-primary").text();
  iip = ip.address();

  console.log(
    "若为公网，请访问 http://" + eip + ":" + config.port + "/gbs 生成书源。"
  );
  console.log(
    "若为内网，请访问 http://" + iip + ":" + config.port + "/gbs 生成书源。\n"
  );
}

getIPs();
