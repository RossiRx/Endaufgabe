namespace zauberbild {

    export class Triangle extends Symbol {


        public constructor(_position?: Vector) {

            super(_position);
            this.size = 80;
            this.name = "triangle";
            //console.log("Triangle Constructor");


        }


        public draw(): void {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("particle drawn" + this.position.x + this.position.y);
            
            let trianglePath: Path2D = new Path2D();

        
            
            crc.save();
            //trianglePath.beginPath();
            trianglePath.moveTo(this.position.x, this.position.y-this.size);
            trianglePath.lineTo(this.position.x-this.size, this.position.y+this.size);
            trianglePath.lineTo(this.position.x+this.size, this.position.y+this.size);
            trianglePath.closePath();

            
            crc.fillStyle = "grey";
            crc.fill(trianglePath);
            crc.restore();
        }
    }
}
