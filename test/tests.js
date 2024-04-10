'use strict';

var hasBigInts = require('has-bigints')();
var forEach = require('es-abstract/helpers/forEach');
var inspect = require('object-inspect');

var testCases = require('./testCases');

module.exports = function (sumPrecise, t) {
	t['throws'](
		function () { sumPrecise([1, 'not a number']); },
		TypeError,
		'throws on non-numbers'
	);

	if (hasBigInts) {
		t['throws'](
			function () { sumPrecise([1, BigInt(0)]); },
			TypeError,
			'throws on bigints'
		);
	}

	forEach(testCases, function (testCase) {
		t.equal(
			sumPrecise(testCase[0]),
			testCase[1],
			inspect(testCase[0]) + ' sums to ' + inspect(testCase[1])
		);
	});

	t.test('fuzzing', { skip: !(/^v21\./).test(process.version) }, function (st) {
		// eslint-disable-next-line global-require
		var Random = require('xoshiro128/random').Random;

		var bits = new ArrayBuffer(8);
		var view = new DataView(bits);
		function floatFromParts(sign, exponent, significand) {
			view.setBigUint64(0, BigInt(significand));
			var top16Bits = (sign << 15) | (exponent << 4) | (view.getUint8(1) & 0xf);
			view.setUint16(0, top16Bits);
			return view.getFloat64(0);
		}

		var interestingExponents = [2046, 2045, 1994, 1995, 1993, 0, 1, 2, 1021, 1022, 1023, 1024, 1025, 1026];
		var interestingSignificands = [
			parseInt('1111111111111111111111111111111111111111111111111111', 2),
			parseInt('1000000000000000000000000000000000000000000000000000', 2),
			parseInt('1000000000000000000000000000000000000000000000000001', 2),
			parseInt('1111111111111111111111111111111111111111111111111110', 2),
			parseInt('111111111111111111111111111111111111111111111111111', 2),
			0,
			1,
			2
		];

		function randomFloat(random) {
			var sign = random['int'](0, 1);
			var exponent = random['boolean']() ? random.pick(interestingExponents) : random['int'](0, 2046);
			var significand = random['boolean']() ? random.pick(interestingSignificands) : Math.floor(random['float'](0, Math.pow(2, 52)));
			return floatFromParts(sign, exponent, significand);
		}

		// eslint-disable-next-line global-require
		var proposalPolyfill = require('./proposal-polyfill');

		var seed = Math.floor(Math.random() * Math.pow(2, 31));
		st.comment('fuzzer seed: ' + inspect(seed));

		var random = new Random(seed);
		var N = 1e6;
		for (var i = 0; i < N; ++i) {
			if ((i % 100e3) === 0) {
				t.comment('fuzzer: ran ' + i + ' test cases');
			}
			var data = [];
			var length = random['int'](3, 10);
			for (var j = 0; j < length; ++j) {
				data.push(randomFloat(random));
			}

			var actual = sumPrecise(data);
			var expected = proposalPolyfill(data);
			if (actual !== expected) {
				st.equal(
					actual,
					expected,
					inspect(data) + ' sums to ' + inspect(expected)
				);
			}
		}

		st.end();
	});
};
