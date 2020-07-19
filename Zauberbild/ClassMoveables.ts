namespace zauberbild {

    export class Moveable {

        public position: Vector;
        public velocity: Vector;

        public constructor(_position?: Vector) {
            //console.log("Moveable Constructor");

            if (_position)
                this.position = new Vector(this.position.x, this.position.y);  // alternativ: _position.copy();
            else 
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            
        }

        public move(_timeslice: number): void {
            //console.log(" Move");
            
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);  //Weg wird als neuer Velocity-Vektor definiert
            offset.scale(_timeslice);                   //Durch Scale-Funktion wird der der Vektor mit der Zeit multipliziert
            this.position.add(offset);                  //Verschiebung in der Zeit wird auf die Position addiert  

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


