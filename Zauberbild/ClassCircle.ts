namespace zauberbild {

    export class Circle extends Symbol {


        public constructor(_position?: Vector) {

            super(_position);
            this.size = 20;
            console.log("Circle Constructor");


        }


        public draw(): void {
            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }
            //console.log("particle drawn" + this.position.x + this.position.y);
            let circlesPath: Path2D = new Path2D();

            crc.save();
            //crc.translate(this.position.x, this.position.y);

            crc.fillStyle = "rgba(0, 0, 0)";
            circlesPath.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);

            crc.fill(circlesPath);
            crc.restore();
        }
    }
}
