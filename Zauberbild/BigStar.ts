namespace zauberbild {

    export class BigStar extends Star {


        public constructor(_position?: Vector) {

            super(_position);
            this.name = "bigStar";
            this.size = 65;
            this.outerRadius = 50;
            this.innerRadius = 15;
            this.innerRadiusMin = 10;
            this.innerRadiusMax = 30;

            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            /*  this.velocity = new Vector(0, 0);
             this.velocity.random(100, 170); */  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }

            //console.log("Draw classic star");



            this.glow(1 / 400);



            crc.save();


            var rot: number = Math.PI / 2 * 3;
            var cx: number = this.position.x;
            var cy: number = this.position.y;
            var spikes: number = 7;
            //this.outerRadius = 30;
            //this.innerRadius = 15;
            var x: number = cx;
            var y: number = cy;
            var step: number = Math.PI / spikes;

            crc.strokeStyle = "#000";
            crc.beginPath();
            crc.moveTo(cx, cy - this.outerRadius);
            for (let i: number = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * this.outerRadius;
                y = cy + Math.sin(rot) * this.outerRadius;
                crc.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * this.innerRadius;
                y = cy + Math.sin(rot) * this.innerRadius;
                crc.lineTo(x, y);
                rot += step;
            }
            crc.lineTo(cx, cy - this.outerRadius);
            crc.closePath();
            crc.lineWidth = 5;
            crc.strokeStyle = "rgb(75, 82, 43)";
            crc.stroke();
            crc.fillStyle = "rgb(205, 248, 11)";
            crc.fill();

            crc.restore();

        }




    }

  
}

