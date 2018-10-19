var rp = require("request-promise");
var config = require("../config");
var SocksProxyAgent = require("socks-proxy-agent");

async function bd(bid, intro) {
  var urlb = "http://api.zhuishushenqi.com/book/" + bid;
  var urlc = "http://api.zhuishushenqi.com/mix-atoc/" + bid + "?view=chapters";
  var optb = {};
  optb["uri"] = urlb;
  optb["timeout"] = config.timeout;
  optb["User-Agent"] = config.ua;
  if (config.proxy.includes("http://")) {
    optb["proxy"] = config.proxy;
  } else if (config.proxy.includes("socks://")) {
    optb["agent"] = new SocksProxyAgent(config.proxy);
  }

  var optc = {};
  optc["uri"] = urlc;
  optc["timeout"] = config.timeout;
  optc["User-Agent"] = config.ua;
  if (config.proxy.includes("http://")) {
    optc["proxy"] = config.proxy;
  } else if (config.proxy.includes("socks://")) {
    optc["agent"] = new SocksProxyAgent(config.proxy);
  }

  return rp(optc)
    .then(res => {
      var json = JSON.parse(res);
      var chapters = json.mixToc.chapters;
      var chtml = "";
      chapters.forEach(element => {
        var chapter = element.title;
        var url = element.link;
        chtml += '<dd><a href="/chapter/' + url + '">' + chapter + "</a></dd>";
      });
      chtml = '<dl id="dir">' + chtml + "</dl>";
      var html =
        '<body><div id="book_info">' +
        '<div class="intro">' +
        intro +
        "</div>" +
        chtml +
        "</body>";
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

module.exports = bd;
