var Player = function(spec){	
	this.ammo = (spec && spec.ammo) || 20; // handle defaults
	this.hits = 0;
	this.misses = 0;
};

Player.prototype.registerHit = function(){
	this.hits++;
	this.ammo--;
}

Player.prototype.registerMiss = function(){
	this.misses++;
	this.ammo--;
}