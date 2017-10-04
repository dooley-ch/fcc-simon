requirejs.config({
    shim : {
        semantic: {
            deps : ["jquery"]
        }
    },

    paths: {
        jquery: "jquery.min",
        lodash: "lodash.min",
        semantic: "semantic.min"
    }
});

define("main", function (require, exports) {
    "use strict";

    var $ = require("jquery");
    require("semantic");
    var simon = require("simon");

    /**
     * This function initializes the applicaiton
     *
     */
    function _init() {
    }

    exports.init = function () {
        _init();
    };
});

requirejs(["main"], function (main) {
    "use strict";
    main.init();
});
