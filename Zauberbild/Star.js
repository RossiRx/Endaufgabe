"use strict";
var zauberbild;
(function (zauberbild) {
    class Star extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
            this.isGrowing = true;
        }
        glow(_timeslice) {
            //console.log(" Move");
            let offset = new zauberbild.Vector(this.velocity.x, this.velocity.y); //Weg wird als neuer Velocity-Vektor definiert
            offset.scale(_timeslice); //Durch Scale-Funktion wird der der Vektor mit der Zeit multipliziert
            this.position.add(offset); //Verschiebung in der Zeit wird auf die Position addiert  
            if (this.position.x < 0) //Bedingungen für Verlassen des Canvas-Felds
                this.position.x += zauberbild.crc.canvas.width;
            if (this.position.y < 0)
                this.position.y += zauberbild.crc.canvas.height;
            if (this.position.x > zauberbild.crc.canvas.width)
                this.position.x -= zauberbild.crc.canvas.width;
            if (this.position.y > zauberbild.crc.canvas.height)
                this.position.y -= zauberbild.crc.canvas.height;
        }
        draw() {
            //console.log("Moveable draw");
        }
    }
    zauberbild.Star = Star;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Star.js.map