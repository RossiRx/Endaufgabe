namespace zauberbild {

    window.addEventListener("load", handleLoad);


    export let crc: CanvasRenderingContext2D;
    let symbolArray: Symbol[] = [];
    //let backgroundImage: ImageData;

    let selectedSymbol: Symbol;
    let backgroundImage: ImageData;

    function handleLoad(): void {
        console.log("init");



        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");


        drawBackground1(canvas);
        backgroundImage = crc.getImageData(0, 0, crc.canvas.width, crc.canvas.height);

        canvas.addEventListener("click", handlePlace);

        //drawCloud({ x: 500, y: 125 }, { x: 100, y: 35 });

        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button1");
        button.addEventListener("click", chooseCircle);

        let button2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button2");
        button2.addEventListener("click", chooseSun);

        let button3: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button3");
        button3.addEventListener("click", chooseVirus);

        let button4: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button4");
        button4.addEventListener("click", chooseCloud);

        let button5: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button5");
        button5.addEventListener("click", chooseStar);

        let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
        deleteButton.addEventListener("click", loadPicture);



        /* createParticles(150); */

        window.setInterval(update, 20);

    }

    function chooseCircle(): void {
        handleChoose(new Circle());
    }

    function chooseVirus(): void {
        handleChoose(new Virus());
    }

    function chooseSun(): void {
        handleChoose(new Sun());
    }

    function chooseCloud(): void {
        handleChoose(new Cloud());
    }

    function chooseStar(): void {
        handleChoose(new Star());
    }



    function drawBackground1(_canvas: HTMLCanvasElement): void {
        //console.log("background");
        let gradient: CanvasGradient = crc.createLinearGradient(0, 0, 0, crc.canvas.height);
        gradient.addColorStop(0, "rgb(150, 154, 204)");
        gradient.addColorStop(0.6, "rgb(201, 203, 230)");
        gradient.addColorStop(0.6, "rgb(27, 184, 48)");
        gradient.addColorStop(0.8, "rgb(20, 99, 13)");

        crc.fillStyle = gradient;
        crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);

    }

    function handleChoose(_symbol: Symbol) {
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

    function drawCloud(_position: Vector, _size: Vector): void {
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
    }

    function handlePlace(_event: MouseEvent): void {
        console.log(_event.clientX + "..." + crc.canvas.offsetLeft);
        console.log(_event.clientY + "....." + crc.canvas.offsetTop);
        let position: Vector = mapClientToCanvas(_event.clientX, _event.clientY);

        if (selectedSymbol) {     //selectedSymbol darf nicht undefiend sein 

            crc.putImageData(backgroundImage, 0, 0);
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
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground1(canvas);

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
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground1(canvas);

        for (let symbol of symbolArray) {
            symbol.draw();
        }

        if (selectedSymbol != null) {
            selectedSymbol.draw();
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














}