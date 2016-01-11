var stickHealth = 100;
var playerHealth = 100;
var win = false;
var overKill = 0;
var hElem = document.getElementById('h-elem');
var bElem = document.getElementById('b-elem');
var aElem = document.getElementById('attack-img');

var attacks = {
    kick: 10,
    punch: 5,
    slap: 1
};

function attack(attackType) {
    aElem.className = "attack-img";
    stickHealth -= attacks[attackType];
    if (stickHealth <= 0 && !win) {
        stickHealth = 0;
        win = true;
    } else if (win) {
        stickHealth = 0;
        overKill += 1;
    }
    update();
}

function update() {
    hElem.innerText = String(stickHealth);
    setTimeout(function () {
        aElem.className = "hidden";
    }, 500);
    if (win) {
        bElem.innerText = String("YOU WIN");
        if (overKill) {
            if (overKill <= 4) { }
            else if (overKill <= 10) {
                bElem.innerText = String("Stop! You won!");
            } else if (overKill <= 12) {
                bElem.innerText = String("No really! You're hurting him!");
            } else if (overKill <= 15) {
                bElem.innerText = String("You're a monster!");
            } else if (overKill >= 16) {
                window.location.href = 'http://www.angermgmt.com/'
            }
        }
    }
}

function reset() {
    location.reload();
}
update();