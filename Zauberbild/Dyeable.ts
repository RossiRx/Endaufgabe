namespace zauberbild {

    export class Dyeable extends Symbol {

        public position: Vector;
       

        

        public constructor(_position?: Vector) { 

            super(_position);

       

        }

        public flash(_timeslice: number): void {


          
            //
            
            
        
        }

        public draw(): void {
            //console.log("Dyeable draw");
        }
    }
}


