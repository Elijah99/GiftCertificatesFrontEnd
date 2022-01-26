const task = require('../js_practical_task');

test('seconds to date', () => {
    expect(task.secondsToDate(86400).toString())
        .toBe('Tue Jun 02 2020 00:00:00 GMT+0300 (Москва, стандартное время)');
});

test('convert decimal to binary', () => {
    expect(task.toBase2Converter(10)).toBe('1010');
});

test('count substring in text', () => {
    expect(task.substringOccurrencesCounter('T', 'test it')).toBe(3);
});

test('repeat character once', () => {
    expect(task.repeatingLitters('Hello world')).toBe('HHeello  wworrldd');
});

test('redundant function', () => {
    const f = task.redundant('apple');
    expect(f()).toBe('apple');
})

test('hanoi tower', () => {
    expect(task.towerHanoi(4)).toBe(15);
});

test('multiply two matrix', () => {
    let matrix1 = [
        [9, 3, 5],
        [2, 0, 3],
        [0, 1, -6]
    ]

    let matrix2 = [
        [1, -1, -1],
        [-1, 4, 7],
        [8, 1, -1]
    ]

    let matrix = [
        [46, 8, 7],
        [26, 1, -5],
        [-49, -2, 13]
    ]
    expect(task.matrixMultiplication(matrix1, matrix2)).toEqual(matrix);
});