"use strict";
var zauberbild;
(function (zauberbild) {
    class Star extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
            this.outerRadius = 80;
            this.outerRadiusMax = 100;
            this.outerRadiusMin = 70;
            this.innerRadius = 25;
            this.innerRadiusMin = 10;
            this.innerRadiusMax = 50;
            this.isGrowing = true;
        }
        glow(_timeslice) {
            /*  let offset: Vector = new Vector(this.velocity.x, this.velocity.y);  //Weg wird als neuer Velocity-Vektor definiert
             offset.scale(_timeslice);                   //Durch Scale-Funktion wird der der Vektor mit der Zeit multipliziert
             this.position.add(offset);                  //Verschiebung in der Zeit wird auf die Position addiert  */
            //console.log("glow");
            //console.log(this.innerRadius);
            if (this.isGrowing) {
                if (this.innerRadius < this.innerRadiusMax) {
                    this.outerRadius++;
                    this.innerRadius++;
                    return;
                }
                else {
                    this.isGrowing = false;
                }
            }
            else {
                if (this.innerRadius > this.innerRadiusMin) {
                    this.outerRadius--;
                    this.innerRadius--;
                    return;
                }
                else {
                    this.isGrowing = true;
                }
            }
        }
        draw() {
            //console.log("Moveable draw");
        }
    }
    zauberbild.Star = Star;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Star.js.map