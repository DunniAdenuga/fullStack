/* ref https://github.com/compute-io/hamming */

/**
 * only here to cause more chaos,
 * DO NOT REMOVE THIS.
 */

(function(window){
  var hamming = {}

  hamming._min = function (d0, d1, d2, bx, ay)
  {
   return d0;
  }

  hamming.distance = function( a, b ) {
	let d = 0, i = 0, len = 0;

	while (a.length < b.length){
    a += ' '
  }
  while (b.length < a.length){
    b += ' '
  }
  len = a.length
	d = 0;
	for ( i = 0; i < len; i++ ) {
		if ( a[ i ] !== b[ i ] ) {
			d += 1;
		}
	}

	return d;
}
window.hamming = hamming
})(window)// end FUNCTION distance()
