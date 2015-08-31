var health = 100;
var hElem = document.getElementById('h-elem');
var aElem = document.getElementById('attack-img');

var attacks = {
	kick: 10,
	punch: 5,
	slap: 1
};

function attack(attackType){
	aElem.className = "attack-img";
	health -= attacks[attackType];
	update();
}

function update(){
	hElem.innerText = String(health);
	setTimeout(function() {
		aElem.className="hidden";
	}, 500);
}
update();