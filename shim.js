'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimMathSumPrecise() {
	var polyfill = getPolyfill();

	define(
		Math,
		{ sumPrecise: polyfill },
		{ sumPrecise: function () { return Math.sumPrecise !== polyfill; } }
	);

	return polyfill;
};
