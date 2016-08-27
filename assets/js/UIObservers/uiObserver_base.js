/*
 	Create a pure Abstract class
 */
function Observer(){
	if(this.constructor === 'Observer'){
		throw new Error('This is a pure Abstract class');
	}
	this.update = function(){
		throw new Error('Overwrite virtual update method in child class');
	};
}

function ObserverList(){
	this.observerList = [];
}
 
ObserverList.prototype.add = function( obj ){
	return this.observerList.push( obj );
};
 
ObserverList.prototype.count = function(){
	return this.observerList.length;
};
 
ObserverList.prototype.get = function( index ){
	if( index > -1 && index < this.observerList.length ){
		return this.observerList[ index ];
	}
};
 
ObserverList.prototype.indexOf = function( obj, startIndex ){
	var i = startIndex;

	while( i < this.observerList.length ){
		if( this.observerList[i] === obj ){
			return i;
		}
			i++;
		}

	return -1;
};
 
ObserverList.prototype.removeAt = function( index ){
	this.observerList.splice( index, 1 );
};