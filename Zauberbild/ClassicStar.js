"use strict";
var zauberbild;
(function (zauberbild) {
    class ClassicStar extends zauberbild.Star {
        constructor(_position) {
            super(_position);
            this.name = "classicStar";
            this.size = 25;
            this.outerRadius = 20;
            this.innerRadius = 5;
            this.innerRadiusMin = 3;
            this.innerRadiusMax = 10;
            //console.log("Particle Constructor");
            this.position = new zauberbild.Vector(0, 0);
        }
        draw() {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("Draw classic star");
            this.glow(1 / 400);
            zauberbild.crc.save();
            var rot = Math.PI / 2 * 3;
            var cx = this.position.x;
            var cy = this.position.y;
            var spikes = 5;
            //this.outerRadius = 30;
            //this.innerRadius = 15;
            var x = cx;
            var y = cy;
            var step = Math.PI / spikes;
            zauberbild.crc.strokeStyle = "#000";
            zauberbild.crc.beginPath();
            zauberbild.crc.moveTo(cx, cy - this.outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * this.outerRadius;
                y = cy + Math.sin(rot) * this.outerRadius;
                zauberbild.crc.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * this.innerRadius;
                y = cy + Math.sin(rot) * this.innerRadius;
                zauberbild.crc.lineTo(x, y);
                rot += step;
            }
            zauberbild.crc.lineTo(cx, cy - this.outerRadius);
            zauberbild.crc.closePath();
            zauberbild.crc.lineWidth = 5;
            zauberbild.crc.strokeStyle = "rgb(75, 82, 43)";
            zauberbild.crc.stroke();
            zauberbild.crc.fillStyle = "rgb(205, 248, 11)";
            zauberbild.crc.fill();
            zauberbild.crc.restore();
        }
    }
    zauberbild.ClassicStar = ClassicStar;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=ClassicStar.js.map