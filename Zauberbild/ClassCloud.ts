 namespace zauberbild {

    export class Cloud extends Moveable {


        public constructor(_position?: Vector) {

            super(_position);
            
            //console.log("Particle Constructor");
            this.size=100;

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 170);  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            this.move(1/400);

            this.drawCloud(this.position, new Vector(100,35) );
        }

        public drawCloud(_position: Vector, _size: Vector): void {
            console.log("Cloud", _position, _size);
    
            let nParticles: number = 15;
            let radiusParticle: number = 40;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
    
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");
    
            crc.save();
            crc.translate(_position.x, _position.y);
            crc.fillStyle = gradient;

            //TODO fixed particlepositions --> not random
    
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
    }
} 