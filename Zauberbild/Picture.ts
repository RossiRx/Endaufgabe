namespace zauberbild {

    export class Picture {

        private name: string;
        private backgroundNumber: number;
        private symbolArray: Symbol[] = [];

        public constructor() {
        }

        public getName(): string {

            return this.name;

        }

        public setName(name: string): void {
            this.name = name;
        }


        public getBackgroundNumber(): number {

            return this.backgroundNumber;

        }

        public setBackgroundNumber(backgroundNumber: number): void {
            this.backgroundNumber = backgroundNumber;
        }

        public getSymbolArray(): Symbol[] {

            return this.symbolArray;

        }

        public setSymbolArry(symbolArray: Symbol[]): void {
            for(let symbol of symbolArray){
                this.symbolArray.push(symbol);
            }            
        }
    }
}