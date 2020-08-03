namespace zauberbild {

    export class Ball extends Moveable {


        public constructor(_position?: Vector) {

            super(_position);
            this.name = "ball";

            this.size = 35;

            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 170);  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }


            this.move(1 / 100);

            //console.log("particle drawn" + this.position.x + this.position.y);
            let ballPath: Path2D = new Path2D();

            crc.save();
            //crc.translate(this.position.x, this.position.y);

            crc.fillStyle = "red";
            ballPath.arc(this.position.x, this.position.y,  this.size, 0, 2 * Math.PI);

            crc.fill(ballPath);
            crc.restore();
        }
    }
}
