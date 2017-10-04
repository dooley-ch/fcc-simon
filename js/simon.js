define("simon", function (require, exports) {
    "use strict";
    
    var _ = require("lodash");
    
    var _strictMode = false;

    var _playRedCb = null;
    var _playGreenCb = null;
    var _playBlueCb = null;
    var _playYellowCb = null;
    var _displaySteps = null;

    /**
     * Records the callback to display the steps
     * 
     * @param {function} cb 
     */
    function _setDisplaySteps(cb) {
        _displaySteps = cb;
    }

    /**
     * Records the callbacks for playing music
     * 
     * @param {function} redCb Callback to play music
     * @param {function} greenCb Callback to play music 
     * @param {function} blueCb Callback to play music 
     * @param {function} yellowCb Callback to play music 
     */
    function _setPlayCallbacks(redCb, greenCb, blueCb, yellowCb) {
        _playRedCb = redCb;
        _playGreenCb = greenCb;
        _playBlueCb = blueCb;
        _playYellowCb = yellowCb;
    }

    function _resetGame() {
        console.log("Reset game...");
    }

    function _startGame() {
        console.log("Start game...");
    }

    /**
     * Sets the game mode
     * 
     * @param {boolean} value Flag to indicate if strict mode is set 
     */
    function _setStrictMode(value) {
        _strictMode = value;
        console.log("Strict mode set: " + value);
    }

    function _redPressed() {
        console.log("Red pressed");
    }

    function _bluePressed() {
        console.log("Blue pressed");
    }

    function _greenPressed() {
        console.log("Green pressed");
    }

    function _yellowPressed() {
        console.log("Yellow pressed");
    }

    exports.redPressed = function () {
        return _redPressed();
    }
    exports.bluePressed = function () {
        return _bluePressed();
    }
    exports.greenPressed = function () {
        return _greenPressed();
    }
    exports.yellowPressed = function () {
        return _yellowPressed();
    }
    exports.setStrictMode = function (value) {
        return _setStrictMode(value);
    };
    exports.resetGame = function () {
        return _resetGame();
    };
    exports.startGame = function () {
        return _startGame();
    }
    exports.setPlayCallbacks = function (redCb, greenCb, blueCb, yellowCb) {
        return _setPlayCallbacks(redCb, greenCb, blueCb, yellowCb)
    }
    exports.setDisplayCallback = function (cb) {
        return _setDisplaySteps(cb)
    }
});