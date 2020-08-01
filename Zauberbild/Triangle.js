"use strict";
var zauberbild;
(function (zauberbild) {
    class Triangle extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
            this.size = 80;
            //console.log("Triangle Constructor");
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("particle drawn" + this.position.x + this.position.y);
            let trianglePath = new Path2D();
            zauberbild.crc.save();
            //trianglePath.beginPath();
            trianglePath.moveTo(this.position.x, this.position.y - this.size);
            trianglePath.lineTo(this.position.x - this.size, this.position.y + this.size);
            trianglePath.lineTo(this.position.x + this.size, this.position.y + this.size);
            trianglePath.closePath();
            zauberbild.crc.fillStyle = "grey";
            zauberbild.crc.fill(trianglePath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Triangle = Triangle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Triangle.js.map