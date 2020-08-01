namespace zauberbild {

    window.addEventListener("load", handleLoad);
    let crc1: CanvasRenderingContext2D;
    let crc2: CanvasRenderingContext2D;
    let crc3: CanvasRenderingContext2D;
    let crc4: CanvasRenderingContext2D;
    export let backgroundImage: ImageData;



    function handleLoad(): void {
        console.log("init Background");

        let canvas1: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById("canvas1");
        if (!canvas1)
            return;
        crc1 = <CanvasRenderingContext2D>canvas1.getContext("2d");
        drawBackground1(crc1);
        canvas1.addEventListener("click", () => saveBackground(crc1));

        let canvas2: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById("canvas2");
        if (!canvas2)
            return;
        crc2 = <CanvasRenderingContext2D>canvas2.getContext("2d");
        drawBackground2(crc2);
        canvas2.addEventListener("click", () => saveBackground(crc2));

        let canvas3: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById("canvas3");
        if (!canvas3)
            return;
        crc3 = <CanvasRenderingContext2D>canvas3.getContext("2d");
        drawBackground3(crc3);
        canvas3.addEventListener("click", () => saveBackground(crc3));

        let canvas4: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById("canvas4");
        if (!canvas4)
            return;
        crc4 = <CanvasRenderingContext2D>canvas4.getContext("2d");
        drawBackground4(canvas4, crc4);
        canvas4.addEventListener("click", () => saveBackground(crc4));


    }

    function saveBackground(selectedCrc: CanvasRenderingContext2D):void {
        console.log("auswählen");
        backgroundImage = selectedCrc.getImageData(0, 0, selectedCrc.canvas.width, selectedCrc.canvas.height);
        console.log("teeeeest");
        console.log(backgroundImage);
    }


    function drawBackground1(_crc: CanvasRenderingContext2D): void {
        console.log("background1 draw");
        let gradient: CanvasGradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);
        gradient.addColorStop(0, "rgb(150, 154, 204)");
        gradient.addColorStop(0.6, "rgb(201, 203, 230)");
        gradient.addColorStop(0.6, "rgb(27, 184, 48)");
        gradient.addColorStop(0.8, "rgb(20, 99, 13)");

        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);

    }



    function drawBackground2(_crc: CanvasRenderingContext2D): void {
        //console.log("background");
        let gradient: CanvasGradient = _crc.createLinearGradient(0, 0, 0, _crc.canvas.height);

        gradient.addColorStop(0, "rgb(123, 59, 243)");
        gradient.addColorStop(0.3, "rgb(49, 8, 124)");
        gradient.addColorStop(0.8, "rgb(16, 10, 27)");

        _crc.fillStyle = gradient;
        _crc.fillRect(0, 0, _crc.canvas.width, _crc.canvas.height);

    }

    function drawBackground3(_crc: CanvasRenderingContext2D): void {
        //console.log("background");
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














}