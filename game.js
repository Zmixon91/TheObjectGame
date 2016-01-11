var stickHealth = 100;
var playerHealth = 100;
var win = false;
var lose = false;
var overKill = 0;
var hElem = document.getElementById('h-elem');
var pElem = document.getElementById('p-elem');
var bElem = document.getElementById('b-elem');
var aElem = document.getElementById('attack-img');

var attacks = {
    kick: 10,
    punch: 5,
    slap: 1
};
var sattacks = {
    1: 10,
    2: 5,
    3: 1
}

function attack(attackType) {
    // Attack image
    aElem.className = "attack-img";
    // Damage to Stick
    if (!lose) {
        stickHealth -= attacks[attackType];
    }
    // Damage to Player
    playerHealth -= sattacks[Math.floor(Math.random() * 3) + 1]
    // Calculate results to Stick
    if (stickHealth <= 0 && !win) {
        stickHealth = 0;
        win = true;
    } else if (win) {
        stickHealth = 0;
        overKill += 1;
    }
    
    // Calculate results to Player
    if (playerHealth <= 0 && !win) {
        playerHealth = 0;
        lose = true;
    }
    update();
}

function update() {
    hElem.innerText = String(stickHealth);
    pElem.innerText = String(playerHealth);
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
    } else if (lose) {
        bElem.innerText = String("YOU LOSE");
    }
}

function reset() {
    location.reload();
}
update();