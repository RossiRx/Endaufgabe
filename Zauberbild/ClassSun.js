"use strict";
var zauberbild;
(function (zauberbild) {
    class Sun extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
            this.size = 40;
            console.log("Sun Constructor");
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("particle drawn" + this.position.x + this.position.y);
            let circlesPath = new Path2D();
            zauberbild.crc.save();
            //crc.translate(this.position.x, this.position.y);
            zauberbild.crc.fillStyle = "rgba(255, 255, 0)";
            circlesPath.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
            zauberbild.crc.fill(circlesPath);
            zauberbild.crc.restore();
        }
    }
    zauberbild.Sun = Sun;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=ClassSun.js.map