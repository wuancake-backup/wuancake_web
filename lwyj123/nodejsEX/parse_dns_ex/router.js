/**
 * Created by Administrator on 2016/3/2.
 */
var ParseDns = require('./parse_dns.js'),
    MainIndex = require('./main_index.js');
exports.router = function router(res, req, pathname){
    switch (pathname){
        case "/parse":
            ParseDns.parseDns(res, req)
            break;
        default:
            MainIndex.goIndex(res, req)
    }
};