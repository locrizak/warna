
/**
 * Warna gradient utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Gradient utility test:', function() {

	describe('getSlices()', function() {

		it('should return proper formatted warna object', function() {

			var colors = warna.gradient('#ffffff', '#000000').getSlices(3);

			assert.deepEqual(colors, [
				{
					red: 255, 
					green: 255,
					blue: 255,
					hex: '#ffffff'
				},
				{
					red: 127,
					green: 127,
					blue: 127,
					hex: "#7f7f7f"
				},
				{
					red: 0, 
					green: 0,
					blue: 0,
					hex: '#000000'
				},
			]);

		});

	});

	describe('getPosition()', function() {

		it('should return proper formatted warna object', function() {

			var color = warna.gradient('#ffffff', '#000000').getPosition(0.5);
			assert.deepEqual(color, {
				red: 127,
				green: 127,
				blue: 127,
				hex: "#7f7f7f"
			});
		});
		
	});

});