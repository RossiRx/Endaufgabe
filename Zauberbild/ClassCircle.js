"use strict";
var zauberbild;
(function (zauberbild) {
    class Circle extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
            this.size = 20;
            console.log("Circle Constructor");
        }
        draw() {
            //console.log("particle drawn" + this.position.x + this.position.y);
            let circlesPath = new Path2D();
            zauberbild.crc.save();
            //crc.translate(this.position.x, this.position.y);
            zauberbild.crc.fillStyle = "rgba(0, 0, 0)";
            circlesPath.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
            zauberbild.crc.fill(circlesPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Circle = Circle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=ClassCircle.js.map