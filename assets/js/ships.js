/**
 * constructor function for Ship object
 */
var Ship = function(shipSize){

	var shipSize = shipSize;

	this.observers = new ObserverList();

	/*  	construct Ship 		*/
	this.cells = [];

	for(let j = 0;j < shipSize; j++){
		this.cells.push({
			isHit: false
		});
	}

	this.getSize = function(){
		return shipSize;
	};
};

Ship.prototype.isSank = function(){
	var isShot = true;
	for(let j = 0; j < this.getSize(); j++){
		if(!this.cells[j].isHit){
			isShot = false;
		}
	}
	return isShot;
};

Ship.prototype.hitCell = function(cellIndex){
	this.cells[cellIndex].isHit = true;

	this.notifyOnHit(cellIndex);
};

Ship.prototype.addUIObserver = function(observer){
	this.observers.add( observer );
	observer.registerShipForObserving(this);
};

Ship.prototype.removeObserver = function(observer){
	this.observers.removeAt(this.observers.indexOf(observer,0));
};

Ship.prototype.notifyOnHit = function(gridCellIndex){
	var observerCount = this.observers.count();
	for(var i=0;i < observerCount; i++){
		this.observers.get(i).update(gridCellIndex,this);
	}
};

/*
	//Build UI
	this.shipUIFragment = document.createDocumentFragment();

	var shipUIContainer = document.createElement('div');
	shipUIContainer.width = '100%';
	for(var k = 0;k < shipSize;k++){
		let shipPart = document.createElement('div');
		if(k === 0){
			shipPart.className = 'shipHead';
		}else if(k === shipSize-1){
			shipPart.className = 'shipEnd';
		}else{
			shipPart.className = 'shipMiddle';
		}
		shipUIContainer.appendChild(shipPart);
	}

	this.shipUIFragment.appendChild(shipUIContainer);
 */