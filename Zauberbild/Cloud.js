"use strict";
var zauberbild;
(function (zauberbild) {
    class Cloud extends zauberbild.Moveable {
        constructor(_position) {
            super(_position);
            //console.log("Particle Constructor");
            this.size = 70;
            this.name = "cloud";
            this.position = new zauberbild.Vector(0, 0);
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity.random(100, 170); //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            this.move(1 / 400);
            this.drawCloud(this.position, new zauberbild.Vector(100, 35));
        }
        drawCloud(_position, _size) {
            //console.log("Cloud", _position, _size);
            let nParticles = 15;
            let radiusParticle = 30;
            let particle = new Path2D();
            let gradient = zauberbild.crc.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");
            zauberbild.crc.save();
            zauberbild.crc.translate(_position.x, _position.y);
            zauberbild.crc.fillStyle = gradient;
            //TODO fixed particlepositions --> not random
            let particlePositionsX = [0.3, 0.6, 0.9, 0.4, 0.66, 0.77, 0.95, 0.72, 0.44, 0.35, 0.62, 0.73, 0.87, 0.16, 0.45];
            let particlePositionsY = [0.53, 0.56, 0.39, 0.54, 0.66, 0, 77, 0.22, 0.44, 0.65, 0.12, 0.23, 0.87, 0.56, 0.65, 0.47];
            for (let drawn = 0; drawn < nParticles; drawn++) {
                zauberbild.crc.save();
                let x = (particlePositionsX[drawn] - 0.5) * _size.x;
                let y = -(particlePositionsY[drawn] * _size.y);
                zauberbild.crc.translate(x, y);
                zauberbild.crc.fill(particle);
                zauberbild.crc.restore();
            }
            zauberbild.crc.restore();
        }
    }
    zauberbild.Cloud = Cloud;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Cloud.js.map