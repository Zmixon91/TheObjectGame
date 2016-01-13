/* Game Object:     Punch, Slap, or Kick the Stick figure to death
*                   before he does the same to you.
*/

/* Game Design:     Turn-Based, choose an attack and a direction.
*                   Stick will dodge right or left at random and
*                   choose an attack at random.
*                   Player cannot dodge, but Stick's damage is
*                   halved.
*/

/* Game Design 2:   Now make it more complicated by adding some 
*                   items to further increase/decrease damage
*/

// Initialize Vars

// NUMBERS
// {num} gameState
// 0=init
// 1=running
// 2=win
// 3=lose
var gameState = 0;
// {num} overKill
var overKill = 0;
// OBJECTS
// {obj} attacks
var attacks = {
    kick: 10,
    punch: 5,
    slap: 1,
    "1": 10,
    "2": 5,
    "3": 1
}
// {obj} player
var player = {
    health: 100,
    energy: 10,
    attackModifier: 1,
}
// {obj} stick
var stick = {
    health: 100,
    attackModifier: 0.5,
    position: null
}
// {obj} game elements
var gameElem = {
    playerHealthElem: document.getElementById('p-elem'),
    stickHealthElem: document.getElementById('h-elem'),
    playerEnergyElem: document.getElementById('e-elem'),
    playerEnergy2Elem: document.getElementById('e2-elem'),
    bodyElem: document.getElementById('b-elem'),
    attackElem: document.getElementById('attack-img'),
    stickImgElem: document.getElementById('stick-img')
}
// FUNCTIONS
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// attack(type,position) {}
function attack(type, position) {
    
    // Player Attack
    var energy = player.energy - attacks[type];
    if (energy < 0) {
        console.log("Error: Not enough Energy");
    } else {
        if (stick.position === position) {
            stick.health -= Math.ceil(player.attackModifier * attacks[type]);
        }
        player.energy = energy;
    }
    // Stick Attack
    player.health -= Math.ceil(stick.attackModifier * (attacks[Math.floor(Math.random() * 3) + 1]));
    // run game update
    update();
}
// update() {}
function update() {
    
    // Check health values
    if (player.health <= 0) {
        player.health = 0;
        gameState = 3;
    }
    if (stick.health <= 0) {
        stick.health = 0;
        gameState = 2;
    }
    // Check game state
    switch (gameState) {
        case 0:
            console.log("Game starting");
            gameState = 1;
            break;
        case 1:
            console.log("Game is running");
            player.energy += 5;
            if (player.energy > 10) {
                player.energy = 10;
            }
            gameElem.stickImgElem.classList.remove("pull-left");
            gameElem.stickImgElem.classList.remove("pull-right");
            // !!!!!!!!! MOVE THIS TO THE ATTACK FUNCTION LATER !!!!!!!!!
            if (Math.round(Math.random())) {
                stick.position = "right";
                gameElem.stickImgElem.classList.add("pull-right");
            } else {
                stick.position = "left";
                gameElem.stickImgElem.classList.add("pull-left");
            }
            break;
        case 2:
            console.log("Game is over: Player won");
            overKill += 1;
            if (overKill) {
                // Add later
            }
            break;
        case 3:
            console.log("Game is over: Player lost");
            break;
    }
    // Update HTML Elems
    gameElem.playerHealthElem.innerText = String(player.health);
    gameElem.stickHealthElem.innerText = String(stick.health);
    gameElem.playerEnergyElem.style.width = String(player.energy * 100 / 10).concat("%");
    gameElem.playerEnergy2Elem.innerText = String(player.energy);

}
// reset() {}
function reset() {
    
    // Reset game values
    gameState = 0;
    overKill = 0;
    player.health = 100;
    player.energy = 10;
    stick.health = 100;
    update();

}
// Initialize game
update();