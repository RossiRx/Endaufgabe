namespace zauberbild {

    interface ServerRequest {
        name: string;
        picture: Picture;
    }

    window.addEventListener("load", handleLoad);
    let loadedPictures: Picture[];


    export let crc: CanvasRenderingContext2D;
    let inputField: HTMLInputElement;
    let canvas: HTMLCanvasElement;
    let canvasWidth: number;
    let canvasHeight: number;
    let symbolArray: Symbol[] = [];
    let selectedBackground: number;
    let selectedSymbol: Symbol;
    let pictureName: string;
    let url: string = "https://zauberbildrossi.herokuapp.com/";
    //let url: string = "http://localhost:5001";
    // let savedPictures: Picture[] = [];
    let pictureJson: string;

    function handleLoad(): void {
        console.log("init");

        renewPicture();
        setBackgroundTools();
        setDrawingTools();

        window.setInterval(update, 20);

    }

    function renewPicture(): void {
        setCanvasSize(600, 400);
        canvas = <HTMLCanvasElement>document.getElementById("canvasMain");
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.addEventListener("click", handlePlace);
        if (!selectedBackground) {
            selectedBackground = 1;
        }
        symbolArray = [];
        getDataFromServer();
    }

    function setBackgroundTools(): void {

        let crc1: CanvasRenderingContext2D;
        let crc2: CanvasRenderingContext2D;
        let crc3: CanvasRenderingContext2D;
        let crc4: CanvasRenderingContext2D;

        let canvas1: HTMLCanvasElement | null = <HTMLCanvasElement>document.getElementById("canvas1");
        if (!canvas1)
            return;
        crc1 = <CanvasRenderingContext2D>canvas1.getContext("2d");
        drawBackground1(crc1);
        canvas1.addEventListener("click", () => setBackground(1));

        let canvas2: HTMLCanvasElement | null = <HTMLCanvasElement>document.getElementById("canvas2");
        if (!canvas2)
            return;
        crc2 = <CanvasRenderingContext2D>canvas2.getContext("2d");
        drawBackground2(crc2);
        canvas2.addEventListener("click", () => setBackground(2));

        let canvas3: HTMLCanvasElement | null = <HTMLCanvasElement>document.getElementById("canvas3");
        if (!canvas3)
            return;
        crc3 = <CanvasRenderingContext2D>canvas3.getContext("2d");
        drawBackground3(crc3);
        canvas3.addEventListener("click", () => setBackground(3));

        let canvas4: HTMLCanvasElement | null = <HTMLCanvasElement>document.getElementById("canvas4");
        if (!canvas4)
            return;
        crc4 = <CanvasRenderingContext2D>canvas4.getContext("2d");
        drawBackground4(canvas4, crc4);
        canvas4.addEventListener("click", () => setBackground(4));

    }
    function setDrawingTools(): void {

        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button1");
        button.addEventListener("click", chooseCircle);

        let button2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button2");
        button2.addEventListener("click", chooseSun);

        let button3: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button3");
        button3.addEventListener("click", chooseBall);

        let button4: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button4");
        button4.addEventListener("click", chooseCloud);

        let button5: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button5");
        button5.addEventListener("click", chooseClassicStar);

        let button6: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button6");
        button6.addEventListener("click", chooseBigStar);

        let button7: HTMLButtonElement = <HTMLButtonElement>document.getElementById("triangle");
        button7.addEventListener("click", chooseTriangle);


        let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
        deleteButton.addEventListener("click", loadPicture);

        let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveButton");
        saveButton.addEventListener("click", savePicture);

        let loadButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loadButton");
        loadButton.addEventListener("click", getDataFromServer);

        let newButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("newButton");
        newButton.addEventListener("click", renewPicture);

        let bigButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("bigButton");
        bigButton.addEventListener("click", () => setCanvasSize(600, 400));

        let mediumButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("mediumButton");
        mediumButton.addEventListener("click", () => setCanvasSize(550, 350));

        let smallButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("smallButton");
        smallButton.addEventListener("click", () => setCanvasSize(500, 300));


        inputField = <HTMLInputElement>document.getElementById("nameInput");
        inputField.addEventListener("input", () => { pictureName = inputField.value; console.log(pictureName); });

        let dataList: HTMLInputElement = <HTMLInputElement>document.getElementById("pictureListInput");
        dataList.addEventListener("input", () => {
            console.log("listChanged");
            changePicture(dataList.value);

        });

    }


    function chooseCircle(): void {
        handleChoose(new Circle());
    }

    function chooseBall(): void {
        handleChoose(new Ball());
    }

    function chooseSun(): void {
        handleChoose(new Sun());
    }

    function chooseCloud(): void {
        handleChoose(new Cloud());
    }

    function chooseClassicStar(): void {
        handleChoose(new ClassicStar());
    }

    function chooseBigStar(): void {
        handleChoose(new BigStar());
    }

    function chooseTriangle(): void {
        handleChoose(new Triangle());
    }

    function setCanvasSize(width: number, height: number): void {
        canvasHeight = height;
        canvasWidth = width;
    }

    function handleChoose(_symbol: Symbol): void {
        selectedSymbol = _symbol;
    }


    function setBackground(selectedBackgroudNumber: number): void {
        selectedBackground = selectedBackgroudNumber;
    }

    function handlePlace(_event: MouseEvent): void {
        //console.log(_event.clientX + "..." + crc.canvas.offsetLeft);
        //console.log(_event.clientY + "....." + crc.canvas.offsetTop);
        let position: Vector = mapClientToCanvas(_event.clientX, _event.clientY);

        if (selectedSymbol) {     //selectedSymbol darf nicht undefiend sein 

            selectedSymbol.setPosition(position.x, position.y);
            
            symbolArray.push(selectedSymbol);
            loadPicture();
        }
        else {
            for (let i: number = symbolArray.length - 1; i >= 0; i--) {
                if (symbolArray[i].isSelected(position)) {
                    console.log("is selected");
                    selectedSymbol = symbolArray[i];
                    symbolArray.splice(i, 1);
                    return;
                }
            }
        }

    }

    function mapClientToCanvas(_x: number, _y: number): Vector {
        return new Vector(_x - crc.canvas.offsetLeft, _y - crc.canvas.offsetTop);
    }

    function loadPicture(): void {


        crc.resetTransform();
        canvas = <HTMLCanvasElement>document.getElementById("canvasMain");
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();

        for (let symbol of symbolArray) {
            symbol.draw();
        }
        if (selectedSymbol != null) {
            selectedSymbol.draw();
        }

        selectedSymbol = null;
    }


    function update(): void {
        crc.resetTransform();
        canvas = <HTMLCanvasElement>document.getElementById("canvasMain");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();

        for (let symbol of symbolArray) {
            symbol.draw();
        }

        if (selectedSymbol != null) {
            selectedSymbol.draw();
        }

    }

    function drawBackground(): void {
        if (selectedBackground == 1) {
            drawBackground1(crc);
        }
        if (selectedBackground == 2) {
            drawBackground2(crc);
        }
        if (selectedBackground == 3) {
            drawBackground3(crc);
        }
        if (selectedBackground == 4) {
            drawBackground4(canvas, crc);
        }


    }


    function drawBackground1(_crc: CanvasRenderingContext2D): void {
        let gradient: CanvasGradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0, "rgb(150, 154, 204)");
        gradient.addColorStop(0.6, "rgb(201, 203, 230)");
        gradient.addColorStop(0.6, "rgb(27, 184, 48)");
        gradient.addColorStop(0.8, "rgb(20, 99, 13)");

        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);

    }



    function drawBackground2(_crc: CanvasRenderingContext2D): void {
        let gradient: CanvasGradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);

        gradient.addColorStop(0, "rgb(123, 59, 243)");
        gradient.addColorStop(0.3, "rgb(49, 8, 124)");
        gradient.addColorStop(0.8, "rgb(16, 10, 27)");

        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);

    }

    function drawBackground3(_crc: CanvasRenderingContext2D): void {
        let gradient: CanvasGradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0.2, "rgb(0, 0, 0)");
        gradient.addColorStop(1, "rgb(177, 29, 19) ");

        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);

    }


    function drawBackground4(_canvas: HTMLCanvasElement, _crc: CanvasRenderingContext2D): void {

        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;


        pattern.fillStyle = "rgb(86, 77, 163) ";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.stroke();


        _crc.fillStyle = <CanvasPattern>_crc.createPattern(pattern.canvas, "repeat");
        _crc.fillRect(0, 0, _canvas.width, _canvas.height);


    }


    function savePicture(): void {
        if (pictureName == null || pictureName == "") {
            console.log("picture name missing");
            alert("Bildname fehlt!");

            return;
        }

        let picture: Picture;
        picture = new Picture();
        picture.setName(pictureName);
        picture.setBackgroundNumber(selectedBackground);
        picture.setSymbolArry(symbolArray);


        sendData(picture);
        getDataFromServer();

    }

    function parseAsPicture(json: string): Picture {
        console.log("parse");
        let returnPicture: Picture = new Picture();
        let pictureParsed: Picture = Object.assign(new Picture, json);
        console.log(pictureParsed.name);

        returnPicture.name = pictureParsed.name;
        returnPicture.backgroundNumber = pictureParsed.backgroundNumber;
        returnPicture.symbolArray = [];

        for (let symbol of pictureParsed.symbolArray) {
            let symbolForArray: Symbol;
            if (symbol.name == "sun") {
                symbolForArray = Object.assign(new Sun, symbol);
            }
            else if (symbol.name == "circle") {
                symbolForArray = Object.assign(new Circle, symbol);

            }
            else if (symbol.name == "ball") {
                symbolForArray = Object.assign(new Ball, symbol);

            }
            else if (symbol.name == "cloud") {
                symbolForArray = Object.assign(new Cloud, symbol);

            }
            else if (symbol.name == "classicStar") {
                symbolForArray = Object.assign(new ClassicStar, symbol);

            } else if (symbol.name == "bigStar") {
                symbolForArray = Object.assign(new BigStar, symbol);

            }
            else if (symbol.name == "triangle") {
                symbolForArray = Object.assign(new Triangle, symbol);

            }
            else {
                continue;
            }
            returnPicture.symbolArray.push(symbolForArray);

        }
        return returnPicture;
    }

    async function sendData(picture: Picture): Promise<void> {
        console.log("Send order");
        let response: Response = await fetch(url + "?save&" + "picture" + "=" + JSON.stringify(picture));
        let responseText: string = "";
        responseText = await response.text();
        alert(responseText);
    }

    async function getDataFromServer(): Promise<any> {
        console.log("get dataaaaaaaa");
        let response: Response = await fetch(url + "?load&");
        let responseText: string = await response.text();
        console.log("Resp: " + responseText);
        loadedPictures = [];
        let arrayFromDB: [] = [];
        arrayFromDB = JSON.parse(responseText);
        console.log("Array: " + arrayFromDB);


        for (let element of arrayFromDB) {
            console.log("vakue" + JSON.stringify(element));
            loadedPictures.push(parseAsPicture(element));
        }
        console.log("Loaded pic:" + loadedPictures);
        fillList();

    }

    function fillList(): void {
        let str: string = "";
        for (let picture of loadedPictures) {
            str += '<option "id="option' + picture.name + ' "value="' + picture.name + '" />'; // Storing options in variable

        }
        let list: HTMLElement = <HTMLElement>document.getElementById("options");
        list.innerHTML = str;
    }

    function findPicture(name: string): Picture {
        for (let picture of loadedPictures) {
            if (picture.name == name) {
                return picture;
            }
        }
        return null;

    }

    function changePicture(name: string): void {
        let selectedPicture: Picture = findPicture(name);
        if (selectedPicture == null) {
            return;
        }

        selectedBackground = selectedPicture.getBackgroundNumber();
        symbolArray = selectedPicture.getSymbolArray();
        inputField.value = selectedPicture.name;



    }









}