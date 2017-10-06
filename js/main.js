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
    var _simon = require("simon");

    // References to the coloured blocks
    var _redBlock = $("#redBlock");
    var _blueBlock = $("#blueBlock");
    var _greenBlock = $("#greenBlock");
    var _yellowBlock = $("#yellowBlock");
    
    // Reference to the lable used to display the steps
    var _steps = $("#steps");

    // The music files to be played when the user clicks on a block
    var _redMusic = new Audio("music/simonSound1.mp3");
    var _blueMusic = new Audio("music/simonSound2.mp3");
    var _greenMusic = new Audio("music/simonSound3.mp3");
    var _yellowMusic = new Audio("music/simonSound4.mp3");
    var _alarmMusic = new Audio("music/horn.mp3");
    
    /**
     * - Swiches the colour to the light version
     * - Plays the music
     * - Switches the colour back to the normal version
     */
    function _playRed() {
        _changeToLightRed();
        _redMusic.play();

        setTimeout(function () {
            _changeToRed();
        }, 400);
    }

    /**
     * - Swiches the colour to the light version
     * - Plays the music
     * - Switches the colour back to the normal version
     */
    function _playGreen() {
        _changeToLightGreen();
        _greenMusic.play();

        setTimeout(function () {
            _changeToGreen();          
        }, 400);
    }

    /**
     * - Swiches the colour to the light version
     * - Plays the music
     * - Switches the colour back to the normal version
     */
    function _playBlue() {
        _changeToLightBlue();
        _blueMusic.play();

        setTimeout(function () {
            _changeToBlue();          
        }, 400);
    }

    /**
     * - Swiches the colour to the light version
     * - Plays the music
     * - Switches the colour back to the normal version
     */
    function _playYellow() {
        _changeToLightYellow();
        _yellowMusic.play();

        setTimeout(function () {
            _changeToYellow();       
        }, 400);
    }

    /**
     * Plays the alarm when called by the game engine
     * 
     */
    function _playAlarm() {
        _alarmMusic.play();
    }

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

    /**
     * Changes the colour back to it's original value when the mouse is lifted of the block 
     * 
     */
    function _redUp() {
        _changeToRed();
    }

     /**
     * Changes the colour to lighter value when the mouse is down on the block 
     * 
     */
    function _redDown() {
        _changeToLightRed();
        _redMusic.play();
    }

     /**
     * Indicates to the game engine that the key was pressed
     * 
     */
    function _redClick() {
        _simon.redPressed();
    }

    /**
     * Changes the colour back to it's original value when the mouse is lifted of the block 
     * 
     */
    function _blueUp() {
        _changeToBlue();
    }
        
     /**
     * Changes the colour to lighter value when the mouse is down on the block 
     * 
     */
    function _blueDown() {
        _changeToLightBlue();
        _blueMusic.play();
    }
        
     /**
     * Indicates to the game engine that the key was pressed
     * 
     */
    function _blueClick() {
        _simon.bluePressed();
    }

    /**
     * Changes the colour back to it's original value when the mouse is lifted of the block 
     * 
     */
    function _greenUp() {
        _changeToGreen();
    }
        
     /**
     * Changes the colour to lighter value when the mouse is down on the block 
     * 
     */
    function _greenDown() {
        _changeToLightGreen();
        _greenMusic.play();
    }
        
     /**
     * Indicates to the game engine that the key was pressed
     * 
     */
    function _greenClick() {
        _simon.greenPressed();
    }
        
    /**
     * Changes the colour back to it's original value when the mouse is lifted of the block 
     * 
     */
    function _yellowUp() {
        _changeToYellow();
    }
        
     /**
     * Changes the colour to lighter value when the mouse is down on the block 
     * 
     */
    function _yellowDown() {
        _changeToLightYellow();
        _yellowMusic.play();
    }
        
     /**
     * Indicates to the game engine that the key was pressed
     * 
     */
    function _yellowClick() {
        _simon.yellowPressed();
    }
        
    /**
     * Switches the game's strict mode on or off
     * 
     * @param {object} e Button clicked object 
     */
    function _strictClick(e) {
        if (e.target.checked) {
            _simon.setStrictMode(true);
        } else {
            _simon.setStrictMode(false);
        }
    }

    /**
     * Causes the game engine to start the game
     * 
     */
    function _startGame() {
        _simon.startGame();
    }

    /**
     * Causes the game engine to be reset
     * 
     */
    function _resetGame() {
        _simon.resetGame();
        _displaySteps(0);
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
     * Play's the game sequence as requested from the game engine
     * 
     * @param {array} sequence 
     */
    function _playSequence(sequence) {
        var i = 0;

        var moves = setInterval(function (){
            var colr = sequence[i];

            if (colr === "Red") {
                _playRed();
            }

            if (colr === "Blue") {
                _playBlue();
            }

            if (colr === "Green") {
                _playGreen();
            }

            if (colr === "Yellow") {
                _playYellow();
            }

            i++;
            if (i >= sequence.length) {
                clearInterval(moves);
            }
        }, 800);

        _displaySteps(sequence.length);
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

        // Sets the callbacks
        _simon.setPlaySequenceCallback(_playSequence);
        _simon.setAlarmCallback(_playAlarm);
        _simon.setDisplayStepsCallback(_displaySteps);
    }

    exports.init = function () {
        _init();
    };
});

requirejs(["main"], function (main) {
    "use strict";
    main.init();
});
