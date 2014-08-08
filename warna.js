
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
		global = typeof global !== 'undefined' ? global : this;

	function clone(obj) {

	    if (null === obj || "object" !== typeof obj) {
	    	return obj;
	    }

	    var copy = obj.constructor();

	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) {
	        	copy[attr] = obj[attr];
	        }
	    }

	    return copy;
	}

	/** 
	 * Converter tools
	 */
	function hexToRgb(hex) {

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

	}

	function rgbToHex(red, green, blue) {
		return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
	}

	function hsvToRgb(hue, saturation, value) {

		var red, green, blue;

		if (saturation === 0) {

			red = green = blue = Math.round(value * 2.55);

		} else {

			hue /= 60;
			saturation /= 100;
			value /= 100;

			var i = Math.floor(hue);
			var f = hue - i;
			var p = value * (1 - saturation);
			var q = value * (1 - saturation * f);
			var t = value * (1 - saturation * (1 - f));

			switch(i) {
				case 0: 
					red 	= hsv.value; 
					green 	= t; 
					blue 	= p; 
					break;
				case 1: 
					red 	= q; 
					green 	= hsv.value; 
					blue 	= p; 
					break;
				case 2: 
					red 	= p; 
					green 	= hsv.value; 
					blue 	= t; 
					break;
				case 3: 
					red 	= p; 
					green 	= q; 
					blue 	= hsv.value; 
					break;
				case 4: 
					red 	= t; 
					green 	= p; 
					blue 	= hsv.value; 
					break;
				default: 
					red 	= hsv.value; 
					green 	= p; 
					blue 	= q;
			}

			red 	= Math.round(red * 255);
			green 	= Math.round(green * 255);
			blue 	= Math.round(blue * 255);
		}

		return {
			red: red,
			green: green,
			blue: blue
		};
	}

	function rgbToHsv(red, green, blue) {

		var hue, saturation, value;

		function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
		function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }

		var max = max3(red, green, blue);
		var dif = max - min3(red, green, blue);

		saturation = (max === 0.0) ? 0 : (100 * dif / max);

		if (saturation === 0) {
			hue = 0;
		} else if (red === max) {
			hue = 60.0 * (green - blue) / dif;
		} else if (green === max) {
			hue = 120.0 + 60.0 * (rgb.b - rgb.r) / dif;
		} else if (blue === max) {
			hue = 240.0 + 60.0 * (rgb.r - rgb.g) / dif;
		}

		if (hue < 0.0) {
			hue += 360.0;
		}

		return {
			hue: Math.round(hue),
			saturation: Math.round(saturation),
			value: Math.round(max * 100 / 255)
		};
	}

	/**
	 * Parser utility
	 */
	warna.parse = function(color) {

		var rgb, hex, hsv, alpha = 1;

		// Convert all type to rgb object
		if (typeof color === 'string') {

			rgb 		= hexToRgb(color);

		} else if (color instanceof Object) {

			// Parse RGB object
			if (
				('red' in color) && 
				('green' in color) && 
				('blue' in color)
			) {
				rgb = {
					red: color.red,
					green: color.green,
					blue: color.blue
				};
			}

			// Convert HSV object
			if (
				('hue' in color) && 
				('saturation' in color) && 
				('value' in color)
			) {
				rgb = hsvToRgb(color.hue, color.saturation, color.value);
			}

		}

		// RGB is not converted
		if (!rgb) {
			return null;
		}

		// Check alpha
		if (color instanceof Object) {
			if ('alpha' in color) {
				alpha = color.alpha;
			}
		}

		return {
			rgb: rgb,
			hex: rgbToHex(rgb.red, rgb.green, rgb.blue),
			hsv: rgbToHsv(rgb.red, rgb.green, rgb.blue),
			alpha: alpha
		};
	};

	/**
	 * Gradient utility
	 */
	function Gradient(begin, end) {

		// Prepare gradient
		var gradient = {
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

		this.gradient = gradient;
		
		return this;
	}

	Gradient.prototype.getPosition = function(pos) {

		var gradient = this.gradient;

		// Check gradient color
		if (!gradient.begin || !gradient.end) {
			throw Error('Gradient color is not defined.');
		}

		// Redefine color
		var begin 	= gradient.begin.rgb;
		var end 	= gradient.end.rgb;

		var color = {
		    red: begin.red + Math.floor(pos * (end.red - begin.red)),
		    green: begin.green + Math.floor(pos * (end.green - begin.green)),
		    blue: begin.blue + Math.floor(pos * (end.blue - begin.blue))
		};

		// Check alpha value
		var beginAlpha 	= gradient.begin.alpha;
		var endAlpha 	= gradient.end.alpha;

		if (beginAlpha !== endAlpha) {
			color.alpha = beginAlpha + (pos * (endAlpha - beginAlpha));
		}

		return warna.parse(color);
	};

	Gradient.prototype.getSlices = function(slice, type) {

		type = type || null;
		var gradient = this.gradient;	

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
			colors.push(this.getPosition(positions[a]));
		}

		function convert(type) {
			var result = [];

			for (var a = 0; a < colors.length; a++) {
				result.push(colors[type]);
			}

			return result;
		}

		// Return raw type
		if (!type) {
			return colors;
		}

		return convert(type);
	};

	warna.Gradient = Gradient;

	/**
	 * Brightness utility
	 */
	warna.lighten = function(color, pos) {
		var grad = new Gradient(color, '#ffffff');
		return grad.getPosition(pos);
	};

	warna.darken = function(color, pos) {
		var grad = new Gradient(color, '#000000');
		return grad.getPosition(pos);
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