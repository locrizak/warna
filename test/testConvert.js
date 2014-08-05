

/**
 * Warna convert utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Convert utility test:', function(){

	describe('hexToRgb()', function(){

		it('should return null when supplied with wrong hex string format', function() {
			assert.equal(null, warna.hexToRgb('#ffppa'))
		});

		it('should return correct rgb format based on 3-characters hex string', function() {
			assert.deepEqual({
				red: 255,
				green: 255,
				blue: 255
			}, warna.hexToRgb('#FFF'))
		});

		it('should return correct rgb format based on 6-characters hex string', function() {
			assert.deepEqual({
				red: 255,
				green: 255,
				blue: 255
			}, warna.hexToRgb('#FFFFFF'))
		});

	});

	describe('rgbToHex()', function() {
		it('should return correct hex string based on rgb value', function() {
			assert.equal('#ffffff', warna.rgbToHex(255, 255, 255));
		});
	});

	describe('parse()', function() {

		it('should return proper warna object when supplied with hex string', function() {
			assert.deepEqual({
				red: 255,
				green: 255,
				blue: 255,
				hex: '#ffffff'
			}, warna.parse('#ffffff'));
		});

		it('should return proper warna object when supplied with rgb array', function() {
			assert.deepEqual({
				red: 255,
				green: 255,
				blue: 255,
				hex: '#ffffff'
			}, warna.parse([255, 255, 255]));
		});

		it('should return proper warna object when supplied with rgb object', function() {
			assert.deepEqual({
				red: 255,
				green: 255,
				blue: 255,
				hex: '#ffffff'
			}, warna.parse({
				red: 255,
				green: 255,
				blue: 255
			}));
		});

	});
});