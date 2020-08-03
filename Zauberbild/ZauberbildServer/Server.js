"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var zauberbild;
(function (zauberbild) {
    let pictures;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb://localhost:27017";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        pictures = mongoClient.db("Zauberbild").collection("Pictures");
        console.log("Database connection ", pictures != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let urlParts = _request.url.split('&');
            if (urlParts[0] == "/?save") {
                for (let key in url.query) {
                    console.log("key---->" + key);
                    console.log("query---->" + url.query[key]);
                    if (key == "picture") {
                        let jsonObj = url.query[key];
                        storePicture(JSON.parse(jsonObj));
                    }
                }
                //console.log(urlParts[1]);
                // storePicture(url.query[key]);
                _response.write("save");
                _response.end(); //nach jedem write ==> nicht am Ende, sonst wird eventuelle end() aufgerufen bevor write() fertig ist
            }
            else if (urlParts[0] == "/?load") {
                console.log("in load");
                loadPictures()
                    .then(response => {
                    console.log(response);
                    _response.write(response);
                    _response.end();
                })
                    .catch(err => console.log(err));
            }
            else {
                _response.write("unknown request");
                _response.end();
            }
        }
    }
    function storePicture(_picture) {
        console.log("Store picture..." + _picture);
        console.log("picture: " + _picture.name);
        pictures.deleteOne({ name: _picture.name });
        pictures.insert(_picture);
    }
    async function loadPictures() {
        let cursor = await pictures.find();
        let allPictures = [];
        await cursor.forEach(element => {
            if (element != null) {
                console.log("gepusht");
                allPictures.push(element);
            }
        });
        let jsonString = JSON.stringify(allPictures);
        return jsonString;
    }
})(zauberbild = exports.zauberbild || (exports.zauberbild = {}));
//# sourceMappingURL=Server.js.map