namespace zauberbild {

    export class Virus extends Moveable {


        public constructor(_position?: Vector) {

            super(_position);
            this.name = "virus";

            this.size = 30;

            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 170);  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            //console.log("Draw Virus");
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }


            this.move(1 / 400);

            //console.log("particle drawn" + this.position.x + this.position.y);
            let virusPath: Path2D = new Path2D();

            crc.save();
            //crc.translate(this.position.x, this.position.y);

            crc.fillStyle = "rgba(202, 183, 183, 1)";
            virusPath.arc(this.position.x, this.position.y, 35, 0, 2 * Math.PI);

            crc.fill(virusPath);
            crc.restore();
        }
    }
}
