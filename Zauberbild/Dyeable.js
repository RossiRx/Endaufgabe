"use strict";
var zauberbild;
(function (zauberbild) {
    class Dyeable extends zauberbild.Symbol {
        constructor(_position) {
            super(_position);
        }
        flash(_timeslice) {
            //
        }
        draw() {
            //console.log("Dyeable draw");
        }
    }
    zauberbild.Dyeable = Dyeable;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Dyeable.js.map