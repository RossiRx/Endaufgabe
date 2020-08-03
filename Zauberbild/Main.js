"use strict";
var zauberbild;
(function (zauberbild) {
    window.addEventListener("load", handleLoad);
    let loadedPictures;
    let inputField;
    let canvas;
    let canvasWidth;
    let canvasHeight;
    let symbolArray = [];
    let selectedBackground;
    let selectedSymbol;
    let pictureName;
    let url = "https://zauberbildrossi.herokuapp.com/";
    //let url: string = "http://localhost:5001";
    // let savedPictures: Picture[] = [];
    let pictureJson;
    function handleLoad() {
        console.log("init");
        renewPicture();
        setBackgroundTools();
        setSysmbolTools();
        window.setInterval(update, 20);
    }
    function renewPicture() {
        setCanvasSize(600, 400);
        canvas = document.getElementById("canvasMain");
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        canvas.addEventListener("click", handlePlace);
        if (!selectedBackground) {
            selectedBackground = 1;
        }
        symbolArray = [];
        getDataFromServer();
    }
    function setBackgroundTools() {
        let crc1;
        let crc2;
        let crc3;
        let crc4;
        let canvas1 = document.getElementById("canvas1");
        if (!canvas1)
            return;
        crc1 = canvas1.getContext("2d");
        drawBackground1(crc1);
        canvas1.addEventListener("click", () => setBackground(1));
        let canvas2 = document.getElementById("canvas2");
        if (!canvas2)
            return;
        crc2 = canvas2.getContext("2d");
        drawBackground2(crc2);
        canvas2.addEventListener("click", () => setBackground(2));
        let canvas3 = document.getElementById("canvas3");
        if (!canvas3)
            return;
        crc3 = canvas3.getContext("2d");
        drawBackground3(crc3);
        canvas3.addEventListener("click", () => setBackground(3));
        let canvas4 = document.getElementById("canvas4");
        if (!canvas4)
            return;
        crc4 = canvas4.getContext("2d");
        drawBackground4(canvas4, crc4);
        canvas4.addEventListener("click", () => setBackground(4));
    }
    function setSysmbolTools() {
        let button = document.getElementById("button1");
        button.addEventListener("click", chooseCircle);
        let button2 = document.getElementById("button2");
        button2.addEventListener("click", chooseSun);
        let button3 = document.getElementById("button3");
        button3.addEventListener("click", chooseBall);
        let button4 = document.getElementById("button4");
        button4.addEventListener("click", chooseCloud);
        let button5 = document.getElementById("button5");
        button5.addEventListener("click", chooseClassicStar);
        let button6 = document.getElementById("button6");
        button6.addEventListener("click", chooseBigStar);
        let button7 = document.getElementById("triangle");
        button7.addEventListener("click", chooseTriangle);
        let deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", loadPicture);
        let saveButton = document.getElementById("saveButton");
        saveButton.addEventListener("click", savePicture);
        let loadButton = document.getElementById("loadButton");
        loadButton.addEventListener("click", getDataFromServer);
        let newButton = document.getElementById("newButton");
        newButton.addEventListener("click", renewPicture);
        let bigButton = document.getElementById("bigButton");
        bigButton.addEventListener("click", () => setCanvasSize(600, 400));
        let mediumButton = document.getElementById("mediumButton");
        mediumButton.addEventListener("click", () => setCanvasSize(550, 350));
        let smallButton = document.getElementById("smallButton");
        smallButton.addEventListener("click", () => setCanvasSize(500, 300));
        inputField = document.getElementById("nameInput");
        inputField.addEventListener("input", () => { pictureName = inputField.value; console.log(pictureName); });
        let dataList = document.getElementById("pictureListInput");
        dataList.addEventListener("input", () => {
            console.log("listChanged");
            changePicture(dataList.value);
        });
    }
    function chooseCircle() {
        handleChoose(new zauberbild.Circle());
    }
    function chooseBall() {
        handleChoose(new zauberbild.Ball());
    }
    function chooseSun() {
        handleChoose(new zauberbild.Sun());
    }
    function chooseCloud() {
        handleChoose(new zauberbild.Cloud());
    }
    function chooseClassicStar() {
        handleChoose(new zauberbild.ClassicStar());
    }
    function chooseBigStar() {
        handleChoose(new zauberbild.BigStar());
    }
    function chooseTriangle() {
        handleChoose(new zauberbild.Triangle());
    }
    function setCanvasSize(width, height) {
        canvasHeight = height;
        canvasWidth = width;
    }
    function handleChoose(_symbol) {
        selectedSymbol = _symbol;
    }
    function setBackground(selectedBackgroudNumber) {
        selectedBackground = selectedBackgroudNumber;
    }
    function handlePlace(_event) {
        console.log(_event.clientX + "..." + zauberbild.crc.canvas.offsetLeft);
        console.log(_event.clientY + "....." + zauberbild.crc.canvas.offsetTop);
        let position = mapClientToCanvas(_event.clientX, _event.clientY);
        if (selectedSymbol) { //selectedSymbol darf nicht undefiend sein 
            selectedSymbol.setPosition(position.x, position.y);
            symbolArray.push(selectedSymbol);
            loadPicture();
        }
        else {
            for (let i = symbolArray.length - 1; i >= 0; i--) {
                if (symbolArray[i].isSelected(position)) {
                    console.log("is selected");
                    selectedSymbol = symbolArray[i];
                    symbolArray.splice(i, 1);
                    return;
                }
            }
        }
    }
    function mapClientToCanvas(_x, _y) {
        return new zauberbild.Vector(_x - zauberbild.crc.canvas.offsetLeft, _y - zauberbild.crc.canvas.offsetTop);
    }
    function loadPicture() {
        zauberbild.crc.resetTransform();
        canvas = document.getElementById("canvasMain");
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        drawBackground();
        for (let symbol of symbolArray) {
            symbol.draw();
        }
        if (selectedSymbol != null) {
            selectedSymbol.draw();
        }
        selectedSymbol = null;
    }
    function update() {
        zauberbild.crc.resetTransform();
        canvas = document.getElementById("canvasMain");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        drawBackground();
        for (let symbol of symbolArray) {
            symbol.draw();
        }
        if (selectedSymbol != null) {
            selectedSymbol.draw();
        }
    }
    function drawBackground() {
        if (selectedBackground == 1) {
            drawBackground1(zauberbild.crc);
        }
        if (selectedBackground == 2) {
            drawBackground2(zauberbild.crc);
        }
        if (selectedBackground == 3) {
            drawBackground3(zauberbild.crc);
        }
        if (selectedBackground == 4) {
            drawBackground4(canvas, zauberbild.crc);
        }
    }
    function drawBackground1(_crc) {
        let gradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0, "rgb(150, 154, 204)");
        gradient.addColorStop(0.6, "rgb(201, 203, 230)");
        gradient.addColorStop(0.6, "rgb(27, 184, 48)");
        gradient.addColorStop(0.8, "rgb(20, 99, 13)");
        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);
    }
    function drawBackground2(_crc) {
        let gradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0, "rgb(123, 59, 243)");
        gradient.addColorStop(0.3, "rgb(49, 8, 124)");
        gradient.addColorStop(0.8, "rgb(16, 10, 27)");
        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);
    }
    function drawBackground3(_crc) {
        let gradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0.2, "rgb(0, 0, 0)");
        gradient.addColorStop(1, "rgb(177, 29, 19) ");
        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);
    }
    function drawBackground4(_canvas, _crc) {
        let pattern = document.createElement("canvas").getContext("2d");
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
        _crc.fillStyle = _crc.createPattern(pattern.canvas, "repeat");
        _crc.fillRect(0, 0, _canvas.width, _canvas.height);
    }
    function savePicture() {
        if (pictureName == null || pictureName == "") {
            console.log("picture name missing");
            alert("Bildname fehlt!");
            return;
        }
        let picture;
        picture = new zauberbild.Picture();
        picture.setName(pictureName);
        picture.setBackgroundNumber(selectedBackground);
        picture.setSymbolArry(symbolArray);
        sendData(picture);
        getDataFromServer();
    }
    function parseAsPicture(json) {
        console.log("parse");
        let returnPicture = new zauberbild.Picture();
        let pictureParsed = Object.assign(new zauberbild.Picture, json);
        console.log(pictureParsed.name);
        returnPicture.name = pictureParsed.name;
        returnPicture.backgroundNumber = pictureParsed.backgroundNumber;
        returnPicture.symbolArray = [];
        for (let symbol of pictureParsed.symbolArray) {
            let symbolForArray;
            if (symbol.name == "sun") {
                symbolForArray = Object.assign(new zauberbild.Sun, symbol);
            }
            else if (symbol.name == "circle") {
                symbolForArray = Object.assign(new zauberbild.Circle, symbol);
            }
            else if (symbol.name == "ball") {
                symbolForArray = Object.assign(new zauberbild.Ball, symbol);
            }
            else if (symbol.name == "cloud") {
                symbolForArray = Object.assign(new zauberbild.Cloud, symbol);
            }
            else if (symbol.name == "classicStar") {
                symbolForArray = Object.assign(new zauberbild.ClassicStar, symbol);
            }
            else if (symbol.name == "bigStar") {
                symbolForArray = Object.assign(new zauberbild.BigStar, symbol);
            }
            else if (symbol.name == "triangle") {
                symbolForArray = Object.assign(new zauberbild.Triangle, symbol);
            }
            else {
                continue;
            }
            returnPicture.symbolArray.push(symbolForArray);
        }
        return returnPicture;
    }
    async function sendData(picture) {
        console.log("Send order");
        let response = await fetch(url + "?save&" + "picture" + "=" + JSON.stringify(picture));
        let responseText = "";
        responseText = await response.text();
        alert(responseText);
    }
    async function getDataFromServer() {
        console.log("get dataaaaaaaa");
        let response = await fetch(url + "?load&");
        let responseText = await response.text();
        console.log("Resp: " + responseText);
        loadedPictures = [];
        let arrayFromDB = [];
        arrayFromDB = JSON.parse(responseText);
        console.log("Array: " + arrayFromDB);
        for (let element of arrayFromDB) {
            console.log("vakue" + JSON.stringify(element));
            loadedPictures.push(parseAsPicture(element));
        }
        console.log("Loaded pic:" + loadedPictures);
        fillList();
    }
    function fillList() {
        let str = "";
        for (let picture of loadedPictures) {
            str += '<option "id="option' + picture.name + ' "value="' + picture.name + '" />'; // Storing options in variable
        }
        let list = document.getElementById("options");
        list.innerHTML = str;
    }
    function findPicture(name) {
        for (let picture of loadedPictures) {
            if (picture.name == name) {
                return picture;
            }
        }
        return null;
    }
    function changePicture(name) {
        let selectedPicture = findPicture(name);
        if (selectedPicture == null) {
            return;
        }
        selectedBackground = selectedPicture.getBackgroundNumber();
        symbolArray = selectedPicture.getSymbolArray();
        inputField.value = selectedPicture.name;
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Main.js.map