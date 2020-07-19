"use strict";
var zauberbild;
(function (zauberbild) {
    window.addEventListener("load", handleLoad);
    let symbolArray = [];
    //let backgroundImage: ImageData;
    let selectedSymbol;
    let selectedCanvasSymbol;
    let backgroundImage;
    function handleLoad() {
        console.log("init");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        drawBackground1(canvas);
        backgroundImage = zauberbild.crc.getImageData(0, 0, zauberbild.crc.canvas.width, zauberbild.crc.canvas.height);
        canvas.addEventListener("click", handlePlace);
        //drawCloud({ x: 500, y: 125 }, { x: 100, y: 35 });
        let button = document.getElementById("button1");
        button.addEventListener("click", chooseCircle);
        let button2 = document.getElementById("button2");
        button2.addEventListener("click", chooseSun);
        let deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", loadPicture);
        /* createParticles(150); */
        /*  window.setInterval(update, 20); */
    }
    function chooseCircle() {
        handleChoose(new zauberbild.Circle());
    }
    function chooseSun() {
        handleChoose(new zauberbild.Sun());
    }
    function drawBackground1(_canvas) {
        //console.log("background");
        let gradient = zauberbild.crc.createLinearGradient(0, 0, 0, zauberbild.crc.canvas.height);
        gradient.addColorStop(0, "rgb(150, 154, 204)");
        gradient.addColorStop(0.6, "rgb(201, 203, 230)");
        gradient.addColorStop(0.6, "rgb(27, 184, 48)");
        gradient.addColorStop(0.8, "rgb(20, 99, 13)");
        zauberbild.crc.fillStyle = gradient;
        zauberbild.crc.fillRect(0, 0, zauberbild.crc.canvas.width, zauberbild.crc.canvas.height);
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
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 25;
        let radiusParticle = 20;
        let particle = new Path2D();
        let gradient = zauberbild.crc.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");
        zauberbild.crc.save();
        zauberbild.crc.translate(_position.x, _position.y);
        zauberbild.crc.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            zauberbild.crc.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            zauberbild.crc.translate(x, y);
            zauberbild.crc.fill(particle);
            zauberbild.crc.restore();
        }
        zauberbild.crc.restore();
    }
    function handlePlace(_event) {
        console.log(_event.clientX + "..." + zauberbild.crc.canvas.offsetLeft);
        console.log(_event.clientY + "....." + zauberbild.crc.canvas.offsetTop);
        let position = mapClientToCanvas(_event.clientX, _event.clientY);
        if (selectedSymbol) { //selectedSymbol darf nicht undefiend sein 
            zauberbild.crc.putImageData(backgroundImage, 0, 0);
            selectedSymbol.setPosition(position.x, position.y);
            symbolArray.push(selectedSymbol);
            selectedSymbol = null;
            loadPicture();
        }
        else {
            for (let i = 0; symbolArray.length > i; i++) {
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
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        zauberbild.crc = canvas.getContext("2d");
        drawBackground1(canvas);
        for (let symbol of symbolArray) {
            symbol.draw();
        }
    }
    /*  function drawBackground2(_canvas: HTMLCanvasElement): void {
         //console.log("background");
         let gradient: CanvasGradient = crc.createLinearGradient(0, 0, 0, crc.canvas.height);
         
         gradient.addColorStop(0, "rgb(123, 59, 243)");
         gradient.addColorStop(0.3, "rgb(49, 8, 124)");
         gradient.addColorStop(0.8, "rgb(16, 10, 27)");
 
         crc.fillStyle = gradient;
         crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);
         
     }
 
     function drawBackground3(_canvas: HTMLCanvasElement): void {
         //console.log("background");
         let gradient: CanvasGradient = crc.createLinearGradient(0, 0, 0, crc.canvas.height);
         gradient.addColorStop(0.2, "rgb(0, 0, 0)");
         gradient.addColorStop(1, "rgb(177, 29, 19) ");
 
         crc.fillStyle = gradient;
         crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);
         
     }
 
 
     function drawBackground4(_canvas: HTMLCanvasElement): void {
         
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
 
 
         crc.fillStyle = <CanvasPattern>crc.createPattern(pattern.canvas, "repeat");
         crc.fillRect(0, 0, _canvas.width, _canvas.height);
 
          
     }  */
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Main.js.map