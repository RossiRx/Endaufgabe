namespace zauberbild {

    export class ClassicStar extends Star {


        public constructor(_position?: Vector) {

            super(_position);

            this.size = 30;

            //console.log("Particle Constructor");

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 170);  //Zufällige Geschwindigkeit mit angegebenem Min- und Maxwert
        }


        public draw(): void {

            if (this.position.x == 0 && this.position.y == 0) {
                return;
            }

            console.log("Draw Virus");



            this.glow(1 / 400);



            crc.save();
          


            var rot = Math.PI / 2 * 3;
            var cx=this.position.x;
            var cy=this.position.y;
            var spikes=5
            outerRadius=30;
            innerRadius=15;
            var x = cx;
            var y = cy;
            var step = Math.PI / spikes;
    
            crc.strokeStyle = "#000";
            crc.beginPath();
            crc.moveTo(cx, cy - outerRadius)
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                crc.lineTo(x, y)
                rot += step
    
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                crc.lineTo(x, y)
                rot += step
            }
            crc.lineTo(cx, cy - outerRadius);
            crc.closePath();
            crc.lineWidth = 5;
            crc.strokeStyle = 'blue';
            crc.stroke();
            crc.fillStyle = 'skyblue';
            crc.fill();

            crc.restore();

        }

      

   
    }

 /*    drawStar(75, 100, 5, 30, 15);
    drawStar(175, 100, 12, 30, 10);
    drawStar(75, 200, 6, 30, 15);
    drawStar(175, 200, 20, 30, 25); */
}
}
