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

    var _redBlock = $("#redBlock");
    var _blueBlock = $("#blueBlock");
    var _greenBlock = $("#greenBlock");
    var _yellowBlock = $("#yellowBlock");
    
    var _steps = $("#steps");

    var _redMusic = new Audio("music/simonSound1.mp3");
    var _blueMusic = new Audio("music/simonSound2.mp3");
    var _greenMusic = new Audio("music/simonSound3.mp3");
    var _yellowMusic = new Audio("music/simonSound4.mp3");
    
    /**
     * Change the block's colour to lighter color
     * 
     */
    function _changeToLightRed() {
        _redBlock.attr("src", "img/light_red.png");
    }

    /**
     * Change the block's colour to darker color
     * 
     */
    function _changeToRed() {
        _redBlock.attr("src", "img/red.png");
    }

    /**
     * Change the block's colour to lighter color
     * 
     */
    function _changeToLightBlue() {
        _blueBlock.attr("src", "img/light_blue.png");
    }

    /**
     * Change the block's colour to darker color
     * 
     */
    function _changeToBlue() {
        _blueBlock.attr("src", "img/blue.png");
    }

    /**
     * Change the block's colour to lighter color
     * 
     */
    function _changeToLightGreen() {
        _greenBlock.attr("src", "img/light_green.png");
    }

    /**
     * Change the block's colour to darker color
     * 
     */
    function _changeToGreen() {
        _greenBlock.attr("src", "img/green.png");
    }

    /**
     * Change the block's colour to lighter color
     * 
     */
    function _changeToLightYellow() {
        _yellowBlock.attr("src", "img/light_yellow.png");
    }

    /**
     * Change the block's colour to darker color
     * 
     */
    function _changeToYellow() {
        _yellowBlock.attr("src", "img/yellow.png");
    }

    function _redUp() {
        _changeToRed();
    }

    function _redDown() {
        _changeToLightRed();
        _redMusic.play();
    }

    function _redClick() {
        console.log("Red clicked");
    }

    function _blueUp() {
        _changeToBlue();
    }
        
    function _blueDown() {
        _changeToLightBlue();
        _blueMusic.play();
    }
        
    function _blueClick() {
        console.log("Blue clicked");
    }

    function _greenUp() {
        _changeToGreen();
    }
        
    function _greenDown() {
        _changeToLightGreen();
        _greenMusic.play();
    }
        
    function _greenClick() {
        console.log("Green clicked");
    }
        
    function _yellowUp() {
        _changeToYellow();
    }
        
    function _yellowDown() {
        _changeToLightYellow();
        _yellowMusic.play();
    }
        
    function _yellowClick() {
        console.log("Yellow clicked");
    }
        
    function _strictClick(e) {
        var checked = "false";

        if (e.target.checked) {
            checked = "true";
        }

        console.log("Strict clicked: " + checked);
    }

    function _startGame() {
        console.log("Start game");
    }

    function _resetGame() {
        console.log("Reset game")
    }

    /**
     * Updates the pate to show the given number of steps
     * 
     * @param {int} value The number of steps to display 
     */
    function _displaySteps(value) {
        var valueToDisplay = ("0" + value).slice(-2);
        _steps.text("Steps: " + valueToDisplay);
    }

    /**
     * This function initializes the applicaiton
     *
     */
    function _init() {
        // Link up the blocks
        _redBlock.mouseup(_redUp);
        _redBlock.click(_redClick);
        _redBlock.mousedown(_redDown);

        _greenBlock.mouseup(_greenUp);
        _greenBlock.click(_greenClick);
        _greenBlock.mousedown(_greenDown);

        _blueBlock.mouseup(_blueUp);
        _blueBlock.click(_blueClick);
        _blueBlock.mousedown(_blueDown);

        _yellowBlock.mouseup(_yellowUp);
        _yellowBlock.click(_yellowClick);
        _yellowBlock.mousedown(_yellowDown);

        // Link up the buttons
        $("#strictButton").click(_strictClick);
        $("#startButton").click(_startGame);
        $("#resetButton").click(_resetGame);

        // Init the steps
        _displaySteps(0);
    }

    exports.init = function () {
        _init();
    };
});

requirejs(["main"], function (main) {
    "use strict";
    main.init();
});
