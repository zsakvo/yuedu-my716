var rp = require("request-promise");
var config = require("../config");
var SocksProxyAgent = require("socks-proxy-agent");

async function gs(keyword) {
  var url =
    "http://api.zhuishushenqi.com/book/fuzzy-search?query=" +
    encodeURI(keyword);
  var opt = {};
  opt["uri"] = url;
  opt["timeout"] = config.timeout;
  opt["User-Agent"] = config.ua;
  if (config.proxy.includes("http://")) {
    opt["proxy"] = config.proxy;
  } else if (config.proxy.includes("socks://")) {
    opt["agent"] = new SocksProxyAgent(config.proxy);
  }

  return rp(opt)
    .then(res => {
      var json = JSON.parse(res);
      var books = json.books;
      var list = "";
      books.forEach(element => {
        if (element.contentType === "epub") {
          return true;
        }
        list +=
          '<li><h2><a href="/book/' +
          element._id +
          '">' +
          element.title +
          '</a></h2><img src="' +
          decodeURIComponent(element.cover.replace("/agent/", "")) +
          '"><h4>' +
          element.author +
          "</h4>" +
          "<h4>" +
          element.cat +
          "</h4>" +
          '<div class="intro">' +
          element.shortIntro +
          "</div></li>";
      });
      var html =
        '<body><div id="right"><ul class="list_box">' +
        list +
        "</ul></div></body>";
      return (
        '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>' +
        html +
        "</html>"
      );
    })
    .catch(e => {
      return e.toString();
    });
}

module.exports = gs;
