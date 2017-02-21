function a(){
	/*	Before
	Array.prototype.slice.call(arguments).map(function (v) {
		console.log(v);
	});
	*/

	// after
	Array.from(arguments).map(v => console.log(v));
}

a(1, 2, 55, 66, 777, 8);

var arguments = {
	0 : 1,
	1 : 2,
	key : 55,
	3 : 66,
	4 : 777
}