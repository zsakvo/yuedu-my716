var rp = require("request-promise");
var config = require("../config");
var SocksProxyAgent = require("socks-proxy-agent");

async function gc(param) {
  var url =
    "http://chapter2.zhuishushenqi.com/chapter/" + encodeURIComponent(param);
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
      var chapter = json.chapter.body;
      chapter = chapter.replace(/\n/g, "<br>");
      return (
        '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><div id="content">' +
        chapter +
        "</div></html>"
      );
    })
    .catch(e => {
      return e.toString();
    });
}

module.exports = gc;
