namespace zauberbild {

    export class Symbol {

        position: Vector;
        size: number;

        public constructor(_position?: Vector) {

            //console.log("Particle Constructor");

            if (_position) {
                this.position = new Vector(_position.x, _position.y);
            } else {
                this.position = new Vector(0, 0);
            }

        }

        public setPosition(x: number, y: number): void {
            this.position.x = x;
            this.position.y = y;

        }

        isSelected(_point: Vector): boolean {
            let difference: Vector = new Vector(_point.x - this.position.x, _point.y - this.position.y);
            return (Math.abs(difference.x) < this.size && Math.abs(difference.y) < this.size);
        }

        public draw(): void {
            //
        }
    }
}
