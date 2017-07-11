/*globals window,btoa,alert,document*/

/**
 * Literacy Planet
 */
var LPFlashBridge = {

    /**
     * Determine device operation mode manually.
     */
    userAgent: 'browser',

    /**
     * Callbacks that can be accessed by a call from Actionscript.
     */
    callbacks: {},

    call: function (func, args) {
        // Call a function IN Javascript FROM Flash
        // Javascript will NEVER call this directly
        if (this.callbacks[func]) {
            this.callbacks[func]();
        } else {
            //silently fail
        }
    },

    setUserAgent: function (userAgent) {
        "use strict";
        this.userAgent = userAgent.toLowerCase();
    },

    isTablet: function() {
        return this.userAgent != 'browser';
    },

    /**
     * Call back to flash on an android device.
     */
    androidNotify: function (pd) {
        "use strict";
        window.location = '#lpwv:' + pd;
    },

    /**
     * Call back to flash on an ios device.
     */
    iosNotify: function (pd) {
        "use strict";
        window.location = 'lpwv:' + pd;
    },

    browserNotify: function (flashObjElement, func, args) {
        // Send a notification to Flash FROM Browser
        flashObjElement.notify(func, args);
    },

    /**
     * Attempt to call a remote function located in a LPWebViewManager.
     */
    tabletNotify: function (fn) {
        "use strict";
        try {

            var fc, i, packedData;

            // Initialise the callback structure
            fc = {"func": fn, "args": []};

            // Iterate over any additional arguments
            for (i = 1; i < arguments.length; i += 1) {
                fc.args.push(arguments[i]);
            }

            // Set the window location, this will be received by
            // the actionscript web view manager.
            packedData = btoa(JSON.stringify(fc));

            this[this.userAgent+'Notify'](packedData);

        } catch (err) {
            //silently fail
        }
    }

};
