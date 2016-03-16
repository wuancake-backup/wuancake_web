/**
 * Created by Administrator on 2016/3/2.
 */
var fs = require('fs');
    url = require('url');

exports.goIndex = function(res, req) {
    var readPath = __dirname + '/' +url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    /* 返回 */
    res.end(indexPage);
}
