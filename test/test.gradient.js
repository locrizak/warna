
/**
 * Warna gradient utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Gradient utility test:', function() {

	describe('getPosition()', function() {

		it('should return proper formatted warna object', function() {

			var color = new warna.Gradient('#ffffff', '#000000');

			assert.deepEqual(color.getPosition(0.5), {
				rgb: {
					red: 127,
					green: 127,
					blue: 127
				},
				hsv: {
					hue: 0,
					saturation: 0,
					value: 50
				},
				hex: '#7f7f7f',
				alpha: 1
			});
		});

		it('should return proper warna object (with alpha)', function() {

			var color = new warna.Gradient({
				red: 255, 
				green: 255, 
				blue: 255, 
				alpha: 0.25
			}, {
				red: 0, 
				green: 0, 
				blue: 0, 
				alpha: 0.75
			});

			assert.deepEqual(color.getPosition(0.5), {
				rgb: {
					red: 127,
					green: 127,
					blue: 127
				},
				hsv: {
					hue: 0,
					saturation: 0,
					value: 50
				},
				hex: '#7f7f7f',
				alpha: 0.5
			});
		});
		
	});

});