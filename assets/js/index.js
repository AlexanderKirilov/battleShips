var game = function (){
	var player = player({ammo:25});

	var grid = grid();

	var Ships = [];

	return {
		init: function(){		
			Ships;
		}
	}
};

var gridSize = 10;

var matrix = [];

//populate matrix with 0
for(let x = 0; x < gridSize ; x++){
	matrix[x] = new Array(gridSize);
	for(let y = 0; y < gridSize ; y++){
		matrix[x][y] = 0;
	}
}

matrix[9][9] = 1;
function checkMat(x,y){
	return matrix[x] && matrix[x][y];
}

console.log(matrix);