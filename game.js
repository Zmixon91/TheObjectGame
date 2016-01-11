// Initialize Vars
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
// There should be a way to assign this in one statement right?
var sattacks = {
    1: 10,
    2: 5,
    3: 1
}
// Functions
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
    // Set page text to js vars
    hElem.innerText = String(stickHealth);
    pElem.innerText = String(playerHealth);
    // Show attack image
    setTimeout(function () {
        aElem.className = "hidden";
    }, 500);
    // If Win condition is met congratulate player
    if (win) {
        bElem.innerText = String("YOU WIN");
        if (overKill) {
            // If the player keeps attacking ask them to stop
            if (overKill <= 4) { }
            else if (overKill <= 10) {
                bElem.innerText = String("Stop! You won!");
            } else if (overKill <= 12) {
                bElem.innerText = String("No really! You're hurting him!");
            } else if (overKill <= 15) {
                bElem.innerText = String("You're a monster!");
            } else if (overKill >= 16) {
                // Player needs help, give it to them
                window.location.href = 'http://www.angermgmt.com/'
            }
        }
        // If player lost let them know
    } else if (lose) {
        bElem.innerText = String("YOU LOSE");
    }
}
// Do Over!
function reset() {
    location.reload();
}
// Run program
update();