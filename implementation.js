'use strict';

var GetIterator = require('es-abstract/2024/GetIterator');
var IteratorClose = require('es-abstract/2024/IteratorClose');
var IteratorStepValue = require('es-abstract/2024/IteratorStepValue');
var RequireObjectCoercible = require('es-abstract/2024/RequireObjectCoercible');
var ThrowCompletion = require('es-abstract/2024/ThrowCompletion');

var isNaN = require('es-abstract/helpers/isNaN');
var isNegativeZero = require('es-abstract/helpers/isNegativeZero');

var MAX_SAFE_INTEGER = 9007199254740992; // Number.MAX_SAFE_INTEGER, 2**53

var $RangeError = require('es-errors/range');
var $TypeError = require('es-errors/type');

var pSum = require('./sum');

module.exports = function sumPrecise(items) {
	RequireObjectCoercible(items); // step 1

	var iteratorRecord = GetIterator(items, 'SYNC'); // step 2

	var state = 'MINUS-ZERO'; // step 3

	// var sum = 0; // step 4
	var toAdd = [];
	var count = 0; // step 5
	var next; // step 6

	// while (next !== 'DONE') {
	while (!iteratorRecord['[[Done]]']) { // step 7
		next = IteratorStepValue(iteratorRecord); // step 7.a

		// if (next !== 'DONE') {
		if (!iteratorRecord['[[Done]]']) { // step 7.b
			count += 1; // step 7.b.i

			if (count >= MAX_SAFE_INTEGER) { // step 7.b.ii
				var error = ThrowCompletion(new $RangeError('sumPrecise count >= 2**53')); // step 7.b.ii.1
				return IteratorClose(iteratorRecord, error); // step 7.b.ii.2
			}

			if (typeof next !== 'number') { // step 7.b.iv
				var errorT = ThrowCompletion(new $TypeError('iterator yielded a non-Number value')); // step 7.b.iv.1
				return IteratorClose(iteratorRecord, errorT); // step 7.b.iv.2
			}

			var n = next; // step 7.b.v

			if (state !== 'NOT-A-NUMBER') { // step 7.b.vi
				if (isNaN(n)) { // step 7.b.vi.1
					state = 'NOT-A-NUMBER'; // step 7.b.vi.1.a
				} else if (n === Infinity) { // step 7.b.vi.2
					state = state === 'MINUS-INFINITY' ? 'NOT-A-NUMBER' : 'PLUS-INFINITY'; // step 7.b.vi.2.a-b
				} else if (n === -Infinity) { // step 7.b.vi.3
					state = state === 'PLUS-INFINITY' ? 'NOT-A-NUMBER' : 'MINUS-INFINITY'; // step 7.b.vi.3.a-b
				} else if (!isNegativeZero(n) && (state === 'MINUS-ZERO' || state === 'FINITE')) { // step 7.b.vi.4
					state = 'FINITE'; // step 7.b.vi.4.a
					// sum += n; // step 7.b.vi.4.b
					toAdd[toAdd.length] = n;
				}
			}
		}
	}

	if (state === 'NOT-A-NUMBER') {
		return NaN; // step 8
	}
	if (state === 'PLUS-INFINITY') {
		return Infinity; // step 9
	}
	if (state === 'MINUS-INFINITY') {
		return -Infinity; // step 10
	}
	if (state === 'MINUS-ZERO') {
		return -0; // step 11
	}

	// return sum; // step 12
	return pSum(toAdd);
};
