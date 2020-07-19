"use strict";
var zauberbild;
(function (zauberbild) {
    class Particle extends zauberbild.Moveable {
        constructor(_position) {
            super(_position);
            //console.log("Particle Constructor");
            this.position = new zauberbild.Vector(0, 0);
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity.random(100, 170); //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }
        draw() {
            //console.log("particle drawn" + this.position.x + this.position.y);
            let particlesPath = new Path2D();
            zauberbild.crc.save();
            //crc.translate(this.position.x, this.position.y);
            zauberbild.crc.fillStyle = "rgba(202, 183, 183, 0.1)";
            particlesPath.arc(this.position.x, this.position.y, 35, 0, 2 * Math.PI);
            zauberbild.crc.fill(particlesPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Particle = Particle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=ClassVirus.js.map