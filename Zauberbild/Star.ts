namespace zauberbild {

    export class Star extends Symbol {

        public position: Vector;
        public outerRadius: number;
/*         public outerRadiusMax: number;
        public outerRadiusMin: number; */
        public innerRadius: number;
        public innerRadiusMin: number;
        public innerRadiusMax: number;

        public isGrowing: boolean;

        public constructor(_position?: Vector) {
            super(_position);
            this.isGrowing = true;

        }

        public glow(_timeslice: number): void {


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

                } else {
                    this.isGrowing = false;
                }
            } else {
                if (this.innerRadius > this.innerRadiusMin) {
                    this.outerRadius--;
                    this.innerRadius--;
                    return;

                } else {
                    this.isGrowing = true;
                }
            }
        }

        public draw(): void {
            //console.log("Moveable draw");
        }
    }
}


