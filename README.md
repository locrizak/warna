# Warna - v0.1.0

Warna is color utility library written in Javascript
to help you parse, convert, or manipulate colors.
It can works on browser or Node.js as npm modules.

## Installation

You can install Warna via npm,

```
npm install warna
```

or via Bower,

```
bower install warna
```

or download latest version from [Github](https://github.com/publicis-indonesia/warna/releases)

## Getting Started

**Node.js**

```javascript
var warna = require('warna');

var hex = '#ffffff';
var rgb = warna.hexToRgb(hex);

console.log(rgb);
// will print {red: 255, green: 255, blue: 255}
```

**Browser**

```html
<script src="/path/to/warna.js"></script>
<script>
  var hex = '#ffffff';
  var rgb = warna.hexToRgb(hex);
  
  console.log(rgb);
  // will print {red: 255, green: 255, blue: 255}
</script>
```

## Quick Examples

__Convert color to RGB or HEX.__

```javascript
// Convert HEX to RGB
var rgb = warna.hexToRgb('#000000');
console.log(rgb); 
// will print {red: 0, green: 0, blue: 0}

// Convert RGB to HEX
var hex = warna.rgbToHex(0, 0, 0);
console.log(hex); 
// will print '#ffffff'
```

__Get gradient color position or color slices.__

```javascript
// Get color in center of white-black gradient
var color = warna.gradient('#ffffff', '#000000').getPosition(0.5);
console.log(color); 
// will print { red: 127, green: 127, blue: 127, hex: '#7f7f7f' }

// Get 3 color slices in red-blue gradient
var color = warna.gradient('#ff0000', '#0000ff').getSlices(3);
console.log(color);

//  will print
//  [ { red: 255, green: 0, blue: 0, hex: '#ff0000' },
//  { red: 127, green: 0, blue: 127, hex: '#7f007f' },
//  { red: 0, green: 0, blue: 255, hex: '#0000ff' } ]
```

__Lighten or darken color.__

```javascript
// Lighten red by 20%
var color = warna.lighten('#ff0000', 0.2);
console.log(color); 
// will print { red: 255, green: 51, blue: 51, hex: '#ff3333' }

// Darken red by 20%
var color = warna.darken('#ff0000', 0.2);
console.log(color); 
// will print { red: 204, green: 0, blue: 0, hex: '#cc0000' }
```

## API

### hexToRgb(str)

Convert HEX color string into RGB object.

_Argument:_

* `str` - _(string)_ HEX formatted color string. HEX string can be 3-characters long (like `#fff`) or 6-characters long (like `#ffffff`).

_Example:_

```javascript
warna.hexToRgb('#ffffff');
// return {red: 255, green: 255, blue: 255}
```

### rgbToHex(red, green, blue)

Convert RGB color number into HEX color string.

_Arguments:_

* `red` - _(integer)_ Red integer value.
* `green` - _(integer)_ Green integer value.
* `blue` - _(integer)_ Blue integer value.

_Example:_

```javascript
warna.rgbToHex(255, 255, 255);
// return '#FFFFFF'
```

### parse(color)

Parse color value into Warna object.

_Argument:_

* `color` - _(mixed)_ Color value that will be parsed. It can be a HEX color string, RGB object or RGB array.

_Example:_

```javascript
// Parse HEX color string
warna.parse('#000000');
// return {red: 0, green: 0, blue: 0, hex: '#000000'}

// Parse RGB object
warna.parse({red: 0, green: 0, blue: 0});
// return {red: 0, green: 0, blue: 0, hex: '#000000'}

// Parse RGB array
warna.parse([0, 0, 0]);
// return {red: 0, green: 0, blue: 0, hex: '#000000'}
```

### gradient(begin, end)

Set gradient color object which can be chained with other gradient utility function like `getPosition()` or `getSlices()`.

_Arguments:_

* `begin` - _(mixed)_ Beginning color value. It can be a HEX color string, RGB object or RGB array.
* `end` - _(mixed)_ Ending color value. It can be a HEX color string, RGB object or RGB array.

### getSlices(slice)

Get color slices of a gradient and return array of Warna object based on number slices you want to get. Slice should be more than `2`, if you want to get other color value other than start color and ending color.

_Argument:_

* `slice` - _(integer)_ Integer value of number slices you want to get.

_Example:_

```javascript
// Getting 3 color slices of black-white gradient
warna.gradient('#ffffff', '#000000').getSlices(3);

//  Return
//  [ 
//    { red: 255, green: 255, blue: 255, hex: '#ffffff' },
//    { red: 127, green: 127, blue: 127, hex: '#7f7f7f' },
//    { red: 0, green: 0, blue: 0, hex: '#000000' } 
//  ]
```

### getPosition(pos)

Get color value on gradient based on their position and return Warna object.

_Argument:_

* `pos` - _(float)_ Float value (percent) of color position.

_Example:_

```javascript
// Getting middle color of red-white gradient
warna.gradient('#ff0000', '#ffffff').getPosition(0.5);

// Return { red: 255, green: 127, blue: 127, hex: '#ff7f7f' }
```

### lighten(color, pos)

Lighten a color.

_Arguments:_

* `color` - _(mixed)_ Color value that will be lighten. It can be a HEX color string, RGB object or RGB array.
* `pos` - _(float)_ Float value of lighten percentation. `0` will returning base color and `1` will return white `#ffffff`.

_Example:_

```javascript
// Lighten red by 20%
warna.lighten('#ff0000', 0.2);

// Return { red: 255, green: 51, blue: 51, hex: '#ff3333' }
```

### darken(color, pos)

Darken a color.

_Arguments:_

* `color` - _(mixed)_ Color value that will be lighten. It can be a HEX color string, RGB object or RGB array.
* `pos` - _(float)_ Float value of lighten percentation. `0` will returning base color and `1` will return black `#000000`.

_Example:_

```javascript
// Darken red by 20%
warna.darken('#ff0000', 0.2);

// Return { red: 204, green: 0, blue: 0, hex: '#cc0000' }
```

## Copyright and license

Copyright 2014 Publicis Metro Indonesia, PT. Code released under [the BSD license](LICENSE).

