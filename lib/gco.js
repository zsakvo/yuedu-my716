var rp = require("request-promise");
var config = require("../config");
var fs = require("fs");

async function gco(bid) {
  var urlb = "http://api.zhuishushenqi.com/atoc?view=summary&book=" + bid;
  var optb = {};
  var a_bid;
  optb["uri"] = urlb;
  optb["timeout"] = config.timeout;
  optb["User-Agent"] = config.ua;

  var tmp = await rp(optb);
  var mixbsres = JSON.parse(tmp);
  for (var i in mixbsres) {
    var json = mixbsres[i];
    if (json.source != "my176") {
      continue;
    } else {
      a_bid = json._id;
    }
  }

  var chtml = "";
  var html = fs.readFileSync("./lib/ex.html", "utf-8");
  var body;

  if (a_bid == null) {
    body =
      '<body><div id="book_info" style="display:none"><dl id="chapter"><dd><a href="/chapter/error">尚不支持本书籍哦~</a></dd></dl></body>';
    return html.replace("Null", body);
  } else {
    var urlc = "http://api.zhuishushenqi.com/atoc/" + a_bid + "?view=chapters";

    var optc = {};
    optc["uri"] = urlc;
    optc["timeout"] = config.timeout;
    optc["User-Agent"] = config.ua;

    return rp(optc)
      .then(res => {
        var json = JSON.parse(res);
        var chapters = json.chapters;
        chapters.forEach(element => {
          var chapter = element.title;
          var url = element.link;
          chtml +=
            '<dd><a href="/chapter/' + url + '">' + chapter + "</a></dd>";
        });
        chtml = '<dl id="chapter">' + chtml + "</dl>";
        body =
          '<body><div id="book_info" style="display:none">' + chtml + "</body>";

        return html.replace("Null", body);
      })
      .catch(e => {
        console.log(e + "");
        return null;
      });
  }
}

module.exports = gco;
