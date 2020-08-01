"use strict";
var zauberbild;
(function (zauberbild) {
    class Moon extends zauberbild.Dyeable {
        constructor(_position) {
            super(_position);
            // this.size = 30;
            //console.log("Particle Constructor");
            this.position = new zauberbild.Vector(0, 0);
            /*  this.velocity = new Vector(0, 0);
             this.velocity.random(100, 170); */ //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("Draw moon");
            this.flash(1 / 400);
            let moonPath = new Path2D();
            zauberbild.crc.save();
            zauberbild.crc.lineWidth = 2;
            zauberbild.crc.beginPath();
            moonPath.bezierCurveTo(4, 42, 0, 0, 42, 4);
            moonPath.moveTo(4, 42);
            moonPath.bezierCurveTo(4, 42, 0, 84, 42, 84);
            zauberbild.crc.stroke(moonPath);
            let crescentPath = new Path2D();
            zauberbild.crc.lineWidth = 2;
            zauberbild.crc.beginPath();
            crescentPath.arc(55, 75, 50, 0, Math.PI * 2, true);
            crescentPath.moveTo(165, 75);
            crescentPath.arc(75, 75, 50, 0, Math.PI * 2, true);
            zauberbild.crc.fill(crescentPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Moon = Moon;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Moon.js.map