"use strict";
var zauberbild;
(function (zauberbild) {
    class Picture {
        constructor() {
            this.symbolArray = [];
            //
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getBackgroundNumber() {
            return this.backgroundNumber;
        }
        setBackgroundNumber(backgroundNumber) {
            this.backgroundNumber = backgroundNumber;
        }
        getSymbolArray() {
            return this.symbolArray;
        }
        setSymbolArry(symbolArray) {
            for (let symbol of symbolArray) {
                this.symbolArray.push(symbol);
            }
        }
    }
    zauberbild.Picture = Picture;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Picture.js.map