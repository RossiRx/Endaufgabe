"use strict";
var zauberbild;
(function (zauberbild) {
    class Ball extends zauberbild.Moveable {
        constructor(_position) {
            super(_position);
            this.name = "ball";
            this.size = 35;
            //console.log("Particle Constructor");
            this.position = new zauberbild.Vector(0, 0);
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity.random(100, 170); //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            this.move(1 / 100);
            //console.log("particle drawn" + this.position.x + this.position.y);
            let ballPath = new Path2D();
            zauberbild.crc.save();
            //crc.translate(this.position.x, this.position.y);
            zauberbild.crc.fillStyle = "red";
            ballPath.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            zauberbild.crc.fill(ballPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Ball = Ball;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Ball.js.map