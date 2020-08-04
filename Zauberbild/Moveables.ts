namespace zauberbild {

    export class Moveable extends Symbol {

        public position: Vector;
        public velocity: Vector;

        public constructor(_position?: Vector) {

            super(_position);
            //console.log("Moveable Constructor");

            this.velocity = new Vector(0, 0);

        }

        public move(_timeslice: number): void {
            //console.log(" Move");

            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);  //Weg wird als neuer Velocity-Vektor definiert
            offset.scale(_timeslice);                   //Durch Scale-Funktion wird der der Vektor mit der Zeit multipliziert
            this.position.x = this.position.x + offset.x;                 //Verschiebung in der Zeit wird auf die Position addiert  
            this.position.y = this.position.y + offset.y;

            if (this.position.x < 0)                    //Bedingungen für Verlassen des Canvas-Felds
                this.position.x += crc.canvas.width;

            if (this.position.y < 0)
                this.position.y += crc.canvas.height;

            if (this.position.x > crc.canvas.width)
                this.position.x -= crc.canvas.width;

            if (this.position.y > crc.canvas.height)
                this.position.y -= crc.canvas.height;
        }

        public draw(): void {
            //console.log("Moveable draw");
        }
    }
}


