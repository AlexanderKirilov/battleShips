

var playerConstructor = function(spec){
	var playerObj = {};
	
	var ammo = (spec && spec.ammo) || 20; // handle defaults
	var hits = 0;
	var misses = 0;

	playerObj.shoot = function(x,y){

	};

	return playerObj;
};
