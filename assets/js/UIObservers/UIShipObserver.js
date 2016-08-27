function UIShipObserver(){
	Observer.call(this);

	this.subjectList = [];
	/**
	 * [update description]
	 * @param  {Ship.cell} grilCell
	 * @param  {Ship} subjectShip the Ship sending the notification
	 * @return {[type]}
	 */
	this.shipUIContainer = document.getElementById('shipUIContainer');	

	this.update = function(gridCellIndex, subjectShip){
		var Ship = this.findSubjectShip(subjectShip)
		if(!Ship){
			throw new Error(' unknown ship subject to observe');
		}
		Ship.DOM.children[gridCellIndex].className += ' shipPartHit ';
	}
}

UIShipObserver.prototype.findSubjectShip = function(Ship){
	var searchSubject = this.subjectList.find(function(el){
		if(el.Ship === Ship){
			return true;
		}else{
			return false;
		}
	});
	return searchSubject;
}

UIShipObserver.prototype.registerShipForObserving = function(Ship){
	var searchSubject = this.findSubjectShip(Ship);
	if(!searchSubject){
		var shipContainerFragment = document.createDocumentFragment();
		var shipSize = Ship.getSize();
		var shipUIRow = document.createElement('div');
		shipUIRow.className = ' shipUIRow ';
		for(var k=0; k < shipSize; k++){
			var shipPart = document.createElement('div');
			if(k === 0){
				shipPart.className = ' shipHead ';
			}else if(k === shipSize-1){
				shipPart.className = ' shipTail ';
			}else{
				shipPart.className = ' shipMiddle ';
			}
			shipUIRow.appendChild(shipPart);
			shipContainerFragment.appendChild(shipUIRow);
		}
		this.shipUIContainer.appendChild(shipContainerFragment);

		this.subjectList.push({
			Ship:Ship,
			DOM: shipUIRow
		});
	}
}