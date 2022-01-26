'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    let date = new Date('2020-06-01T00:00:00');
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}

exports.secondsToDate = secondsToDate;

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    return decimal.toString(2);
}

exports.toBase2Converter = toBase2Converter;

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    return (text.trim().toLowerCase().split(substring.trim().toLowerCase()).length - 1);
}

exports.substringOccurrencesCounter = substringOccurrencesCounter;

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let array = Array.from(string);
    let newArray = array.map(value => {
        if (array.indexOf(value) === array.lastIndexOf(value)) {
            return value.repeat(2);
        }
        return value;
    });
    return newArray.join("");
}

exports.repeatingLitters = repeatingLitters

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => str;
}

exports.redundant = redundant;

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    return (Math.pow(2, disks) - 1);
}

exports.towerHanoi = towerHanoi;

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let m = matrix1.length;
    let n = matrix2.length;
    let matrix = new Array(n);
    for (let k = 0; k < m; k++) {
        matrix[k] = (new Array(m).fill(0));
    }
    for (let c = 0; c < m; c++) {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                matrix[i][c] += matrix1[i][j] * matrix2[j][c];
            }
        }
    }
    return matrix;
}

exports.matrixMultiplication = matrixMultiplication;

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    let arrayChar = [];
    let arrayOrder = [];
    arrayChar.push(str);
    return {
        gather: function(str) {
            arrayChar.push(str);
            return this;
        },
        order: function(n) {
            arrayOrder.push(n);
            return this;
        },
        get: function() {
            let array = [];
            for (let i = 0; i < arrayChar.length; i++) {
                array.push(arrayChar[arrayOrder[i]]);
            }
            return array.join("");
        }
    }
}

exports.gather = gather;