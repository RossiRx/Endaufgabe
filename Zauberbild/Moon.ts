namespace zauberbild {

    export class Moon extends Dyeable {


        public constructor(_position?: Vector) {

            super(_position);

            // this.size = 30;

            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            /*  this.velocity = new Vector(0, 0);
             this.velocity.random(100, 170); */  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }

            //console.log("Draw moon");



            this.flash(1 / 400);


            let moonPath: Path2D = new Path2D();

            crc.save();
            crc.lineWidth = 2;
            crc.beginPath();
            moonPath.bezierCurveTo(4, 42, 0, 0, 42, 4);
            moonPath.moveTo(4, 42);
            moonPath.bezierCurveTo(4, 42, 0, 84, 42, 84);
            crc.stroke(moonPath);

            let crescentPath: Path2D = new Path2D();

            crc.lineWidth = 2;

            crc.beginPath();
            crescentPath.arc(55, 75, 50, 0, Math.PI * 2, true);
            crescentPath.moveTo(165, 75);
            crescentPath.arc(75, 75, 50, 0, Math.PI * 2, true);
            crc.fill(crescentPath);
            crc.restore();

        }




    }


}

