var health = 100;
var win = false;
var hElem = document.getElementById('h-elem');
var bElem = document.getElementById('b-elem');
var aElem = document.getElementById('attack-img');

var attacks = {
	kick: 10,
	punch: 5,
	slap: 1
};

function attack(attackType){
	aElem.className = "attack-img";
	health -= attacks[attackType];
    if (health <= 0) {
        health = 0;
        win = true;
    }
	update();
}

function update(){
	hElem.innerText = String(health);
	setTimeout(function() {
		aElem.className="hidden";
	}, 500);
    if (win) {
        bElem.innerText = String("YOU WIN");
    }
}

function reset() {
    location.reload();
}
update();