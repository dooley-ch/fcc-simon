define("simon", function (require, exports) {
    "use strict";
    
    var _ = require("lodash");
    
    // Holds the game steps
    var _gameSteps = [];
    var _userSteps = [];

    // Flag to indicates if the game is being played in strict mode
    var _strictMode = false;

    // Flag to indicate if the game is running
    var _gameOn = false;

    // Callback references used to get the UI to play the music and flash the colours
    var _playRedCb = null;
    var _playGreenCb = null;
    var _playBlueCb = null;
    var _playYellowCb = null;

    // Callback reference to display the number of steps
    var _displaySteps = null;

    // Callback reference to play alarm
    var _playAlarmCb = null;

    /**
     * Records a link to the callback to play the alarm
     * 
     * @param {any} cb Callback function to play the alarm
     */
    function _setAlarmCallback(cb) {
        _playAlarmCb = cb;
    }

    /**
     * Generates a random integer between min and max
     * 
     * @param {integer} min 
     * @param {integer} max 
     * @returns {integer} random integer
     */
    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random colour used by the game engine to add
     * a new step
     * 
     * @returns {string} A random colour
     */
    function _getRandomColor() {
        var randInt = _getRandomInt(1, 4);
        var randColor = "";

        switch (randInt) {
            case 1:
                randColor = "Red";
                break;
            case 2:
                randColor = "Green";
                break;
            case 3:
                randColor = "Blue";
                break;
            case 4:
                randColor = "Yellow";
                break;
        }

        return randColor;
    }

    /**
     * Adds a step to the game
     * 
     */
    function _addGameStep() {
        var iterations = _getRandomInt(1, 4);
        var randColour = _getRandomColor();

        for (var i = 0; i < iterations; i++ ) {
            _gameSteps.push(randColour);
        }

        _playGameSteps();
        _displaySteps(_gameSteps.length);
    }

    /**
     * Links up to the UI to play music
     * 
     */
    function _playGameSteps() {
        for (var i = 0; i < _gameSteps.length; i++) {
            var step = _gameSteps[i];

            if (step === "Red") {
                _playRedMusic();
            }

            if (step === "Blue") {
                _playBlueMusic();
            }

            if (step === "Green") {
                _playGreenMusic();
            }

            if (step === "Yellow") {
                _playYellowMusic();
            }
        }
    }

    /**
     * Plays the music and flashes the colour block a number of times
     * 
     * @param {int} value The numbe of times this should occur 
     */
    function _playRedMusic(value) {
        if (_.isFunction(_playRedCb)) {
            _playRedCb(value);
        }
    }

    /**
     * Plays the music and flashes the colour block a number of times
     * 
     * @param {int} value The numbe of times this should occur 
     */
    function _playGreenMusic(value) {
        if (_.isFunction(_playGreenCb)) {
            _playGreenCb();
        }
    }

    /**
     * Plays the music and flashes the colour block a number of times
     * 
     * @param {int} value The numbe of times this should occur 
     */
    function _playBlueMusic(value) {
        if (_.isFunction(_playBlueCb)) {
            _playBlueCb(value);
        }
    }

    /**
     * Plays the music and flashes the colour block a number of times
     * 
     * @param {int} value The numbe of times this should occur 
     */
    function _playYellowMusic(value) {
        if (_.isFunction(_playYellowCb)) {
            _playYellowCb(value);
        }
    }

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

    /**
     * Resets the game 
     * 
     */
    function _resetGame() {
        if (_gameOn) {
            _gameSteps = [];
            _userSteps = [];
            _displaySteps(0);
            _gameOn = false;
        }
    }

    /**
     * Start the game
     * 
     */
    function _startGame() {
        if (!_gameOn) {
            _addGameStep();
            _gameOn = true;
        }
    }

    /**
     * Sets the game mode
     * 
     * @param {boolean} value Flag to indicate if strict mode is set 
     */
    function _setStrictMode(value) {
        _strictMode = value;
        _resetGame();
    }

    function _checkGameState() {

    }

    /**
     * Records the user's choice and checks that it is in line with the game steps
     * 
     */
    function _redPressed() {
        _userSteps.push("Red");
        _checkGameState();
    }

    /**
     * Records the user's choice and checks that it is in line with the game steps
     * 
     */
    function _bluePressed() {
        _userSteps.push("Blue");
        _checkGameState();
    }

    /**
     * Records the user's choice and checks that it is in line with the game steps
     * 
     */
    function _greenPressed() {
        _userSteps.push("Green");
        _checkGameState();
    }

    /**
     * Records the user's choice and checks that it is in line with the game steps
     * 
     */
    function _yellowPressed() {
        _userSteps.push("Yellow");
        _checkGameState();
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
    exports.setAlarmCallback = function (cb) {
        return _setAlarmCallback(cb);
    }
});