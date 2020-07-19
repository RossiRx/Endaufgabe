/* namespace zauberbild {

    export class Cloud extends Moveable {


        public constructor(_position?: Vector) {

            super(_position);
            
            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 170);  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            //console.log("particle drawn" + this.position.x + this.position.y);
            let particlesPath: Path2D = new Path2D();

            crc.save();
            //crc.translate(this.position.x, this.position.y);

            crc.fillStyle = "rgba(202, 183, 183, 0.1)";
            particlesPath.arc(this.position.x, this.position.y, 35, 0, 2 * Math.PI);

            crc.fill(particlesPath);
            crc.restore();
        }
    }
} */