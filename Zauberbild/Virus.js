"use strict";
var zauberbild;
(function (zauberbild) {
    class Virus extends zauberbild.Moveable {
        constructor(_position) {
            super(_position);
            this.name = "virus";
            this.size = 30;
            //console.log("Particle Constructor");
            this.position = new zauberbild.Vector(0, 0);
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity.random(100, 170); //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }
        draw() {
            //console.log("Draw Virus");
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            this.move(1 / 400);
            //console.log("particle drawn" + this.position.x + this.position.y);
            let virusPath = new Path2D();
            zauberbild.crc.save();
            //crc.translate(this.position.x, this.position.y);
            zauberbild.crc.fillStyle = "rgba(202, 183, 183, 1)";
            virusPath.arc(this.position.x, this.position.y, 35, 0, 2 * Math.PI);
            zauberbild.crc.fill(virusPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Virus = Virus;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Virus.js.map