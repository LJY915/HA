/*
 * @Author: your name
 * @Date: 2021-05-17 14:22:34
 * @LastEditTime: 2021-05-17 14:31:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\vscode\01-HTML\javascript 基础\HTML\基础练习\四月\Vue\axios\lib\index3_http.js
 */

var http = require("http");
var url = require("url");

var bookdata = [
    { no: 11, name: "《javascript权威指南》", author: "David Flanagan", price: 60 },
    { no: 32, name: "《javascript高级程序设计》", author: "Nicholas C.Zakas", price: 90 },
    { no: 44, name: "《三体》", author: "刘慈欣", price: 110 },
    { no: 65, name: "《人类简史》", author: "尤瓦尔·赫拉利", price: 60 },
    { no: 19, name: "《未来简史》", author: "尤瓦尔·赫拉利", price: 68 },
    { no: 46, name: "《超新星纪元》", author: "刘慈欣", price: 80 }
];
var server = http.createServer(function(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "text/html;charset=utf8");
    var query = url.parse(request.url).query;
    var result = {};
    console.log(query)
    if (query !== null && query.split("=").length === 2) {
        var key = query.split("=")[0];
        var value = decodeURI(query.split("=")[1]);
        console.log(key, value);
        result.data = getData(key, value);
    } else {
        result.data = getData();
    }
    result.msg = "查询成功";
    response.write(JSON.stringify(result));
    response.end();
}).listen(4000, function(err) {
    if (!err) {
        console.log("server is running on port 4000...");
    }
});


function getData(key, value) {
    if (key && value) {
        return bookdata.filter(function(item, i, arr) {
            return item[key].indexOf(value) !== -1;
        });
    } else {
        return bookdata;
    }
}