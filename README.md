# Math.sumPrecise <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES-spec-compliant `Math.sumPrecise` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.es/proposal-math-sum/).

## Getting started

```sh
npm install --save math.sumprecise
```

## Usage/Examples

```js
const sumPrecise = require('math.sumprecise');
const assert = require('assert');

// assert.equal(sumPrecise(42.84), 42.84375);
// assert.equal(sumPrecise(0.123), 0.12298583984375);
// assert.equal(sumPrecise(-0.123), -0.12298583984375);
// assert.equal(sumPrecise(1.337), 1.3369140625);
// assert.equal(sumPrecise(65504), 65504);
// assert.equal(sumPrecise(65505), 65504);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/math.sumprecise
[npm-version-svg]: https://versionbadg.es/es-shims/Math.sumPrecise.svg
[deps-svg]: https://david-dm.org/es-shims/Math.sumPrecise.svg
[deps-url]: https://david-dm.org/es-shims/Math.sumPrecise
[dev-deps-svg]: https://david-dm.org/es-shims/Math.sumPrecise/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Math.sumPrecise#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/math.sumprecise.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/math.sumprecise.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/math.sumprecise.svg
[downloads-url]: https://npm-stat.com/charts.html?package=math.sumprecise
[codecov-image]: https://codecov.io/gh/es-shims/Math.sumPrecise/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Math.sumPrecise/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Math.sumPrecise
[actions-url]: https://github.com/es-shims/Math.sumPrecise/actions
