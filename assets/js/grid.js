/*
	GRID
	-matrix[][];
 
 */

var gridConstruct = function (spec){
	/*
		get constructor specifications
	 */
	
	// square matrix assumed
	var gridSize = (spec && spec.size) || 20;


	/*
		construct Grid
	 */
	//init
	var matrix = [];
	
	//populate matrix with 0
	for(let x = 0; x < gridSize ; x++){
		matrix[x] = new Array(gridSize);
		for(let y = 0; y < gridSize ; y++){
			matrix[x][y] = 0;
		}
	}

	/*
		Prepare object
	 */
	
	//declare the object we return
	var gridObj = {
		checkTile: function(x,y){
			return matrix[x] && matrix[x][y];
		},

		setShip: function(Ship){
			var shipSize = Ship && Ship.getSize();

			while(shipSize){
				matrix[Ship.cells[shipSize].x][Ship.cells[shipSize].y] = Ship.cells[];

				shipSize--;
			}
		}
	};

	return gridObj;
};