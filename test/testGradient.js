
/**
 * Warna gradient utility test
 */

var warna 	= require('../warna.js');
var assert 	= require('assert');

describe('Gradient utility test:', function() {

	describe('getSlices()', function() {

		it('should return proper formatted warna object', function() {

			var color = new warna.gradient('#ffffff', '#000000');

			assert.deepEqual(color.getSlices(3), [
				{
					red: 255, 
					green: 255,
					blue: 255,
					alpha: 1,
					hex: '#ffffff'
				},
				{
					red: 127,
					green: 127,
					blue: 127,
					alpha: 1,
					hex: "#7f7f7f"
				},
				{
					red: 0, 
					green: 0,
					blue: 0,
					alpha: 1,
					hex: '#000000'
				},
			]);

		});

	});

	describe('getPosition()', function() {

		it('should return proper formatted warna object', function() {

			var color = new warna.gradient('#ffffff', '#000000');

			assert.deepEqual(color.getPosition(0.5), {
				red: 127,
				green: 127,
				blue: 127,
				alpha: 1,
				hex: "#7f7f7f"
			});
		});

		it('should return proper warna object (with alpha)', function() {

			var color = new warna.gradient([255, 255, 255, 0.25], [0, 0, 0, 0.75]);
			
			assert.deepEqual(color.getPosition(0.5), {
				red: 127,
				green: 127,
				blue: 127,
				alpha: 0.5,
				hex: "#7f7f7f"
			});
		});
		
	});

});