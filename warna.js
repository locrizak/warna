
/*!
 * Warna v0.1.1
 * https://github.com/publicis-indonesia/warna/
 *
 * Copyright 2014 Publicis Metro Indonesia, PT. and other contributors
 * Released under the BSD license
 * https://github.com/publicis-indonesia/warna/blob/master/LICENSE
 */

(function (undefined) {
	'use strict';

	// Define module, global and property
	var warna = {},
		global = typeof global !== 'undefined' ? global : this,
		gradient;

	/** 
	 * Converter utility
	 */
	warna.hexToRgb = function(hex) {

	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        red: parseInt(result[1], 16),
	        green: parseInt(result[2], 16),
	        blue: parseInt(result[3], 16)
	    } : null;

	};

	warna.rgbToHex = function(red, green, blue) {
		return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
	};

	warna.parse = function(color) {

		var newColor = null;

		if (typeof color === 'string') {

			newColor = warna.hexToRgb(color);
			newColor.alpha = 1;

		} else if (color instanceof Array) {

			newColor = {
				red: color[0],
				green: color[1],
				blue: color[2],
				alpha: 1
			};

			if (color.length === 4) {
				newColor.alpha = color[3];
			}

		} else if (color instanceof Object) {

			newColor = {
				red: color.red,
				green: color.green,
				blue: color.blue,
				alpha: 1
			};

			if ('alpha' in color) {
				newColor.alpha = color.alpha;
			}

		}

		// Set hex format
		if (newColor) {
			newColor.hex = warna.rgbToHex(newColor.red, newColor.green, newColor.blue);
		}

		return newColor;
	};

	/**
	 * Gradient utility
	 */
	warna.gradient = function(begin, end) {

		// Prepare gradient
		gradient = {
			begin: null,
			end: null
		};

		// Parse color parameter
		gradient.begin = warna.parse(begin);
		gradient.end = warna.parse(end);

		if (!gradient.begin) {
			throw Error('Beginning color is not formatted properly.');
		}

		if (!gradient.end) {
			throw Error('Ending color is not formatted properly.');
		}
		
		return this;
	};

	warna.getSlices = function(slice) {

		// Check gradient color
		if (!gradient.begin || !gradient.end) {
			throw Error('Gradient color is not defined.');
		}

		if (slice < 1) {
			throw Error('Slices cannot be less than 1.');
		}

		// Get position of the slices
		var initialPos = 0,
			range = 1/(slice - 1),
			positions = [];

		positions.push(0);

		if (slice > 1 && range > 0 && range < 1) {
			while (initialPos < 1) {
				initialPos += range;

				if (initialPos > 0.999) {
					initialPos = 1;
				}

				positions.push(initialPos);
			}
		}

		if (slice == 2) {
			positions.push(1);
		}

		// Get color based on slices
		var colors = [];

		for (var a = 0; a < positions.length; a++) {
			colors.push(warna.getPosition(positions[a]));
		}

		return colors;
	};

	warna.getPosition = function(pos) {

		// Check gradient color
		if (!gradient.begin || !gradient.end) {
			throw Error('Gradient color is not defined.');
		}

		// Redefine color
		var begin 	= gradient.begin;
		var end 	= gradient.end;

		var color = {
		    red: begin.red + Math.floor(pos * (end.red - begin.red)),
		    green: begin.green + Math.floor(pos * (end.green - begin.green)),
		    blue: begin.blue + Math.floor(pos * (end.blue - begin.blue)),
		    alpha: begin.alpha + (pos * (end.alpha - begin.alpha))
		};

		// Add hex property to color
		color.hex = warna.rgbToHex(color.red, color.green, color.blue);

		return color;
	};

	/**
	 * Manipulation utility
	 */
	warna.lighten = function(color, pos) {
		return warna
			.gradient(warna.parse(color), [255, 255, 255])
			.getPosition(pos);
	};

	warna.darken = function(color, pos) {
		return warna
			.gradient(warna.parse(color), [0, 0, 0])
			.getPosition(pos);
	};

	/**
	 * Exposing Warna
	 */

	// Browser use
	if (typeof window === 'object') {
		window.warna = warna;
	}

	// Node.js use
	if (typeof module === 'object' && typeof module.exports === "object") {
		module.exports = warna;
	}

}).call(this);