/**
 * constructor function for Ship object
 * DO NOT USE new
 * 
 * @param  {specObject} spec 
 * @return {Ship}      ship object
 */
var shipConstruct = function(spec){
	/*
		get constructor specifications
	 */
	var shipSize = (spec && spec.size) || 3;
	//var grid = spec && spec.grid;
	
	// default horizontal
	// true for vertical
	var vertical = (spec && spec.vertical) || 0;
	
	//TODO: make these random;
	var x = (spec && spec.x) || 0;
	var y = (spec && spec.y) || 0;

	/*
		construct Ship
	 */
	var cells = [];

	for(let j = 0;j < shipSize; j++){
		cells.push({
			x: x,
			y: y,
			isHit: false
		});

		vertical ? y++ : x++;
	}
	
	/*
		Prepare object
	 */

	var shipObj = {
		isShot: function(){
			var isShot = true;
			for(let j = 0; j < shipSize; j++){
				isShot = cells[j].isHit ? true : false; 
			}

			return isShot;
		}

		getSize: function(){
			return shipSize;
		}
	};

	return shipObj;
};

var testShip = shipConstruct();

console.log(testShip.isShot());