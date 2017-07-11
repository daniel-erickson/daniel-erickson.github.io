/*globals alert*/
var LPExternalInterface = {
    // The flash DOM element
    flash: null,

    // Callbacks container
    callbacks: {},

    // Initialise on a flash element
    init: function (flashElement) {
        "use strict";

        this.flash = flashElement;

        // TODO: Initialise pingback sequence
    },

    // Call a callback function in the container (from the flash)
    call: function (func) {
        "use strict";

        if (this.callbacks[func]) {
            this.callbacks[func]();
        } else {
            alert("No callback function \"" + func + "\"");
        }
    },

    // Notify the flash object
    notify: function (func, args) {
        "use strict";

        this.flash.notify(func, args);
    }
};
