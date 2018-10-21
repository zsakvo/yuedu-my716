var rp = require("request-promise");
var config = require("../config");

async function gc(param) {
  var url =
    "http://chapterup.zhuishushenqi.com/chapter/" +
    param.replace(" ", "%20").replace("?", "%3F");
  var opt = {};
  opt["uri"] = url;
  opt["timeout"] = config.timeout;
  opt["User-Agent"] = config.ua;
  return rp(opt)
    .then(res => {
      var json = JSON.parse(res);
      var chapter = json.chapter.body;
      chapter = chapter.replace(/\n/g, "<br><br>");
      return (
        '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><div id="content">' +
        chapter +
        "</div></html>"
      );
    })
    .catch(e => {
      console.log(e + "");
      return '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><div id="content">本书籍为追书神器独有正版Vip书籍，目前不支持解析阅读哦~</div></html>';
    });
}

module.exports = gc;
