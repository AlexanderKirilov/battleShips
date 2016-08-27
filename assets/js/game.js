var game = function (){
	/*
		Create player , grid , ships
	 */
	var player = new Player({ammo:25});

	var gridContainer = document.getElementById('gridContainer');

	var grid = gridConstruct({
		gridSize:VARS.gridSize,
		tileSize:VARS.tileSize
	});

	//get UI elements
	uiShipObserver = new UIShipObserver();
	
	var ship1 = new Ship(5);
		ship1.addUIObserver(uiShipObserver);
	var ship2 = new Ship(4);
		ship2.addUIObserver(uiShipObserver);
	var ship3 = new Ship(3);
		ship3.addUIObserver(uiShipObserver);
	

	/*
		Helper functions
	 */
	var checkWinCondition = function(){
		if(grid.checkShipsOnGridCondition()){
			gridContainer.className += " GameWon ";
		}else if(player.ammo === 0){
			gridContainer.className += " GameLost ";
		}
	};



	var init = function(){
		//bind ships to grid and to UI
		grid.positionShipOnMap(ship1, {
			x:1,
			y:5,
			vertical:false
		});
		grid.positionShipOnMap(ship2, {
			x:4,
			y:4,
			vertical:false
		});
		grid.positionShipOnMap(ship3, {
			x:10,
			y:9,
			vertical:true
		});
		//debug Console.log
		grid.printMap();

		//size the map according to tile length
		gridContainer.style.width = gridContainer.style.height = VARS.tileSize*VARS.gridSize+'px';

		//build the map
		grid.build();
		
		var tileList = gridContainer.children;
		//This is a turn based game, so I can handle all updates on player input
		//in a sense this is onEvent-onLoop-onRender baked in one
		Array.prototype.forEach.call( tileList , function(elRow , index){
			Array.prototype.forEach.call(elRow.children, function(elTile, tileIndex){
				elTile.addEventListener('click', function responseClick(){
					
					onLoop.call(this, index, tileIndex);
					
					this.removeEventListener('click', responseClick);
				});
			});
		});
	};

	var onLoop = function(xIndex,yIndex){
		var res = grid.tryToHit(xIndex,yIndex);
		
		if(res){
			this.classList += ' TileHitShip ';
			player.registerHit();
			console.log('hit');
		}else{
			this.classList += ' TileHit ';
			player.registerMiss();
			console.log('miss');
		}

			checkWinCondition();
	};
	return {
		execute: function(){
			init();
		}
	}
/* 		Game module		*/
}();
