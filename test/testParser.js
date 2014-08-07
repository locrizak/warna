

/**
 * Warna convert utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Parser utility test:', function(){

	describe('Parse HEX color', function(){

		it('should return null if supplied with wrong hex string format', function() {
			assert.equal(null, warna.parse('#ffppa'))
		});

		it('should return correct warna object if supplied with 3-characters hex string', function() {

			var color = warna.parse('#FFF');

			assert.deepEqual(color.rgb, {
				red: 255,
				green: 255,
				blue: 255
			});

			assert.deepEqual(color.hsv, {
				hue: 0,
				saturation: 0,
				value: 100
			});

		});

		it('should return correct warna object if supplied with 6-characters hex string', function() {
			
			var color = warna.parse('#FFFFFF');

			assert.deepEqual(color.rgb, {
				red: 255,
				green: 255,
				blue: 255
			});

			assert.deepEqual(color.hsv, {
				hue: 0,
				saturation: 0,
				value: 100
			});

		});

	});

	describe('Parse RGB color', function() {

		it('should return correct warna object if supplied with RGB object', function() {

			var color = warna.parse({red: 255, green: 255, blue: 255});

			assert.deepEqual(color.hex, '#ffffff');

			assert.deepEqual(color.hsv, {
				hue: 0,
				saturation: 0,
				value: 100
			});

		});

	});

	describe('Parse RGBA color', function() {

		it('should return correct warna object if supplied with RGBA object', function() {

			var color = warna.parse({red: 255, green: 255, blue: 255, alpha: 0.5});

			assert.deepEqual(color.hex, '#ffffff');

			assert.deepEqual(color.hsv, {
				hue: 0,
				saturation: 0,
				value: 100
			});

		});

	});

	describe('Parse HSV color', function() {

		it('should return correct warna object if supplied with HSV object', function() {

			var color = warna.parse({hue: 0, saturation: 0, value: 100});

			assert.deepEqual(color.hex, '#ffffff');

			assert.deepEqual(color.rgb, {
				red: 255,
				green: 255,
				blue: 255
			});

		});

	});
	
});