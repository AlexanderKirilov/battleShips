var gridConstruct = function (spec){
	/*
		get constructor specifications
	 */
	// square matrix assumed
	var gridSize = (spec && spec.gridSize) || 20;

	var tileSize = (spec && spec.tileSize) || 32;
	/*
		construct the matrix that will surve as Grid
			0 - default, empty
			1 - hit
			{Ship , Ship.cellIndex} - ship
	 */
	//init
	var matrix = [];

	var shipsOnMap = [];
	
	//populate matrix with 0
	for(let x = 0; x < gridSize ; x++){
		matrix[x] = new Array(gridSize);
		for(let y = 0; y < gridSize ; y++){
			matrix[x][y] = 0;
		}
	}
	//DOM ELEMENTS
	var gridContainer = document.getElementById('gridContainer');

	var	checkTile = function(x,y){
		if(x <= gridSize && y <= gridSize){
			if(matrix[x][y] === 1){
				return 1;
			}else if(matrix[x][y] === 0){
				return 0;
			}
			return matrix[x][y];
		}
	}
	/*
		Prepare object
	 */
	//declare the object we return
	var gridObj = {
		build: function(){
			var mapFragment = document.createDocumentFragment();
			matrix.forEach( function(row, rowIndex) {
				var rowDiv = document.createElement('div');
				rowDiv.className += 'mapRow';

				row.forEach( function(element, index){
					var tileDiv = document.createElement('div');
					
					tileDiv.style.width = tileDiv.style.height = tileSize + 'px';
					tileDiv.className += 'Tile';
					
					rowDiv.appendChild(tileDiv);
				});
				mapFragment.appendChild(rowDiv);
			});
			gridContainer.appendChild(mapFragment);
		},

		positionShipOnMap: function(Ship,spec){
			var shipSize = Ship && Ship.getSize();
			
			// default horizontal
			// true for vertical
			var vertical = (spec && spec.vertical) || 0;

			//TODO: make these random;
			var x = (spec && spec.x) || 0;
			var y = (spec && spec.y) || 0;

			if(x+shipSize <= gridSize && y+shipSize <= gridSize){
				for(var k=0; k < shipSize;k++){
					var currCell = Ship.cells[shipSize];
					matrix[x][y] = {
						Ship: Ship,
						shipCellIndex: k
					};
					vertical ? y++ : x++;
				}
			}
			shipsOnMap.push(Ship);
		},
		
		tryToHit: function(x, y){
			var tileRes = checkTile(x,y);
			switch(typeof tileRes){
				case 'object':
					matrix[x][y].Ship.hitCell(matrix[x][y].shipCellIndex);
					return true;
					break;
				case 'number':
					matrix[x][y] = 1;
					return false;
					break;
			}
		},
		
		checkShipsOnGridCondition: function(){
			var win = true;
			Array.prototype.forEach.call(shipsOnMap, function(ship,index){
				win = ship.isSank() ? true : false;
			});
			return win;
		},
		/**
		 * 	DEBUGGING ONLY !!  	
		 */
		printMap: function(){
			console.log(matrix.join("\n"));
		},
	};
	return gridObj;
};