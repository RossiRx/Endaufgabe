import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

//mongodb+srv://TestUser:<password>@zauberbild.wwae0.mongodb.net/<dbname>?retryWrites=true&w=majority


export namespace zauberbild {

    let pictures: Mongo.Collection;


    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    // let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl: string = "mongodb+srv://TestUser:1234@zauberbild.wwae0.mongodb.net/<dbname>?retryWrites=true&w=majority";


    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        pictures = mongoClient.db("Zauberbild").collection("Pictures");
        console.log("Database connection ", pictures != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            let urlParts: string[] = _request.url.split("&");
            if (urlParts[0] == "/?save") {

                for (let key in url.query) {
                    console.log("key---->" + key);
                    console.log("query---->" + url.query[key]);

                    if (key == "picture") {
                        let jsonObj: any = url.query[key];
                        storePicture(JSON.parse(jsonObj));
                    }
                }

                _response.write("save");
                _response.end();  //nach jedem write ==> nicht am Ende, sonst wird eventuelle end() aufgerufen bevor write() fertig ist

            } else if (urlParts[0] == "/?load") {
                console.log("in load");
                loadPictures()
                    .then(response => {
                        console.log(response);
                        _response.write(response);
                        _response.end();
                    })
                    .catch(err => console.log(err));
            } else {
                _response.write("unknown request");
                _response.end();

            }


        }

    }


    async function storePicture(_picture: any): Promise<void> {
        console.log("Store picture..." + _picture);
        console.log("picture: " + _picture.name);
        await pictures.deleteOne({ name: _picture.name });
        await pictures.insert(_picture);
    }

    async function loadPictures(): Promise<string> {
        let cursor: Mongo.Cursor<any> = await pictures.find();
        let allPictures: any[] = [];
        await cursor.forEach(element => {
            if (element != null) {
                console.log("gepusht");
                allPictures.push(element);
            }
        });
        let jsonString: string = JSON.stringify(allPictures);
        return jsonString;
    }
}
