"use strict";
var zauberbild;
(function (zauberbild) {
    window.addEventListener("load", handleLoad);
    let canvas;
    let symbolArray = [];
    let backgroundImage;
    let selectedBackground;
    let selectedSymbol;
    let url = "http://localhost:5001";
    // let savedPictures: Picture[] = [];
    let pictureJson;
    function handleLoad() {
        console.log("init");
        canvas = document.getElementById("canvasMain");
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        canvas.addEventListener("click", handlePlace);
        if (!selectedBackground) {
            selectedBackground = 1;
        }
        setBackgroundTools();
        setSysmbolTools();
        window.setInterval(update, 20);
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
        button3.addEventListener("click", chooseVirus);
        let button4 = document.getElementById("button4");
        button4.addEventListener("click", chooseCloud);
        let button5 = document.getElementById("button5");
        button5.addEventListener("click", chooseClassicStar);
        let button6 = document.getElementById("moon");
        button6.addEventListener("click", chooseMoon);
        let button7 = document.getElementById("triangle");
        button7.addEventListener("click", chooseTriangle);
        let deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", loadPicture);
        let saveButton = document.getElementById("saveButton");
        saveButton.addEventListener("click", savePicture);
        let loadButton = document.getElementById("loadButton");
        loadButton.addEventListener("click", reloadPicture);
    }
    function chooseCircle() {
        handleChoose(new zauberbild.Circle());
    }
    function chooseVirus() {
        handleChoose(new zauberbild.Virus());
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
    function chooseMoon() {
        handleChoose(new zauberbild.Moon());
    }
    function chooseTriangle() {
        handleChoose(new zauberbild.Triangle());
    }
    function handleChoose(_symbol) {
        selectedSymbol = _symbol;
    }
    /*  function createCircle(): void {
         let circle: Circle;
         circle = new Circle(new Vector(0, 0));
         symbolArray.push(circle);
         circle.draw();
     }
  */
    /* function createParticles(_nParticles: number): void {
        console.log("Create Particles");
        for (let i: number = 0; i < _nParticles; i++) {
            let particle: Particle = new Particle();
            moveableArray.push(particle);
        }
    } */
    /*    function update(): void {
   
           crc.putImageData(backgroundImage, 0, 0);
   
   
       }
   
       for (let particle of moveableArray) {
           particle.move(1 / 100);
           particle.draw();
   
       }
   
   }
   
    */
    /* function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 25;
        let radiusParticle: number = 20;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");

        crc.save();
        crc.translate(_position.x, _position.y);
        crc.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc.translate(x, y);
            crc.fill(particle);
            crc.restore();
        }
        crc.restore();
    } */
    function setBackground(selectedBackgroudNumber) {
        selectedBackground = selectedBackgroudNumber;
    }
    function handlePlace(_event) {
        console.log(_event.clientX + "..." + zauberbild.crc.canvas.offsetLeft);
        console.log(_event.clientY + "....." + zauberbild.crc.canvas.offsetTop);
        let position = mapClientToCanvas(_event.clientX, _event.clientY);
        if (selectedSymbol) { //selectedSymbol darf nicht undefiend sein 
            // crc.putImageData(backgroundImage, 0, 0);
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
    function saveBackground(selectedCrc) {
        console.log("auswählen");
        //backgroundImage = selectedCrc.getImageData(0, 0,crc.canvas.width,crc.canvas.height);
        loadPicture();
        console.log("teeeeest");
        console.log(backgroundImage);
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
        let picture;
        picture = new zauberbild.Picture();
        picture.setName("teeeeeeestbild");
        picture.setBackgroundNumber(selectedBackground);
        picture.setSymbolArry(symbolArray);
        pictureJson = JSON.stringify(picture);
        console.log(pictureJson);
        sendData(pictureJson);
    }
    function reloadPicture() {
        console.log("reload");
        let pictureParsed = new zauberbild.Picture();
        pictureParsed = JSON.parse(pictureJson);
        let picture = Object.assign(new zauberbild.Picture, pictureParsed);
        selectedBackground = picture.getBackgroundNumber();
        symbolArray = [];
        for (let symbol of picture.getSymbolArray()) {
            let symbolForArray;
            if (symbol.name == "sun") {
                symbolForArray = Object.assign(new zauberbild.Sun, symbol);
            }
            else if (symbol.name == "circle") {
                symbolForArray = Object.assign(new zauberbild.Circle, symbol);
            }
            else if (symbol.name == "virus") {
                symbolForArray = Object.assign(new zauberbild.Virus, symbol);
            }
            else if (symbol.name == "cloud") {
                symbolForArray = Object.assign(new zauberbild.Cloud, symbol);
            }
            else if (symbol.name == "classicStar") {
                symbolForArray = Object.assign(new zauberbild.ClassicStar, symbol);
            }
            else if (symbol.name == "triangle") {
                symbolForArray = Object.assign(new zauberbild.Triangle, symbol);
            }
            else {
                continue;
            }
            symbolArray.push(symbolForArray);
        }
    }
    async function sendData(json) {
        console.log("Send order");
        let response = await fetch(url + "?" + json);
        let responseText = await response.text();
        alert(responseText);
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Main.js.map