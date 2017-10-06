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

    // Callback reference used to get the UI to play the music and flash the colours
    var _playSequenceCb = null;

    // Callback reference to play alarm
    var _playAlarmCb = null;

    // Callback reference to display the number of steps
    var _displayStepsCb = null;

    /**
     * Records a link to the callback to display the number of steps
     * 
     * @param {function} cb 
     */
    function _setDisplayStepsCallback(cb) {
        _displayStepsCb = cb;
    }

    /**
     * Gets the UI to display the current number of steps
     * 
     * @param {int} value 
     */
    function _displaySteps(value) {
        if (_.isFunction(_displayStepsCb)) {
            _displayStepsCb(value);
        }
    }

    /**
     * Records a link to the callback to play the sequence
     * 
     * @param {function} cb Callback function to play the sequence
     */
    function _setPlaySequenceCallback(cb) {
        _playSequenceCb = cb;
    }

    /**
     * Records a link to the callback to play the alarm
     * 
     * @param {function} cb Callback function to play the alarm
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

        if (_.isFunction(_playSequenceCb)) {
            _playSequenceCb(_gameSteps);
        }
    }

    /**
     * Resets the game 
     * 
     */
    function _resetGame() {
        if (_gameOn) {
            _gameSteps = [];
            _userSteps = [];
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

    /**
     * Check's if the user has followed the sequence correctly
     * - If not, process the failure
     * - If so, then add another step
     * 
     * @returns {void} 
     */
    function _checkGameState() {
        setTimeout(function () {
            for (var i = 0; i < _userSteps.length; i++) {
                if (_userSteps[i] != _gameSteps[i]) {
                    return _processFailure();
                }
            }
            
            _displaySteps(_gameSteps.length - _userSteps.length);
    
            if (_userSteps.length === _gameSteps.length) {
                _addGameStep();
            }
        }, 500);
    }

    /**
     * If the user does not play the correct sequence, then
     * play the alarm and if in strict mode reset the game
     * 
     */
    function _processFailure() {
        _playAlarm();

        _userSteps = [];
        _displaySteps(_gameSteps.length);

        if (_strictMode) {
            _resetGame();

            setTimeout(function () {
                _addGameStep();
            }, 800);
        }
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

    /**
     * Get the UI to play the alarm
     * 
     */
    function _playAlarm() {
        if (_.isFunction(_playAlarmCb)) {
            _playAlarmCb();
        }
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
    exports.setAlarmCallback = function (cb) {
        return _setAlarmCallback(cb);
    }
    exports.setPlaySequenceCallback = function (cb) {
        return _setPlaySequenceCallback(cb);
    }
    exports.setDisplayStepsCallback = function (cb) {
        return _setDisplayStepsCallback(cb);
    };
});