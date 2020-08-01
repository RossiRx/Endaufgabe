"use strict";
var zauberbild;
(function (zauberbild) {
    class Symbol {
        constructor(_position) {
            //console.log("Particle Constructor");
            if (_position) {
                this.position = new zauberbild.Vector(_position.x, _position.y);
            }
            else {
                this.position = new zauberbild.Vector(0, 0);
            }
        }
        setPosition(x, y) {
            this.position.x = x;
            this.position.y = y;
        }
        isSelected(_point) {
            let difference = new zauberbild.Vector(_point.x - this.position.x, _point.y - this.position.y);
            return (Math.abs(difference.x) < this.size && Math.abs(difference.y) < this.size);
        }
        draw() {
            //
        }
    }
    zauberbild.Symbol = Symbol;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Symbol.js.map