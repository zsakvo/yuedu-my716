var rp = require("request-promise");
var config = require("../config");
var fs = require("fs");

async function bd(bid, intro) {
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

  var urlc = "http://api.zhuishushenqi.com/atoc/" + a_bid + "?view=chapters";

  var optc = {};
  optc["uri"] = urlc;
  optc["timeout"] = config.timeout;
  optc["User-Agent"] = config.ua;

  return rp(optc)
    .then(res => {
      var json = JSON.parse(res);
      var chapters = json.chapters;
      var chtml = "";
      chapters.forEach(element => {
        var chapter = element.title;
        var url = element.link;
        chtml += '<dd><a href="/chapter/' + url + '">' + chapter + "</a></dd>";
      });
      chtml = '<dl id="dir">' + chtml + "</dl>";
      var body =
        '<body><div id="book_info" style="display:none">' +
        '<div class="intro">' +
        intro +
        "</div>" +
        chtml +
        "</body>";

      var html = fs.readFileSync("./lib/ex.html", "utf-8");

      return html.replace("Null", body);
    })
    .catch(e => {
      return e.toString();
    });
}

module.exports = bd;
