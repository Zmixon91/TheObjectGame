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

/* Game Design 3:   Now make it not suck by unspaghettifying your
*                   code. Also make use of mutliple .js files.
*                   Also code better.
*/

// Initialize Vars

// NUMBERS
// {num} overKill
var overKill = 0;
// OBJECTS
// {enum} states
var states = {
    initialize: 0,
    running: 1,
    win: 2,
    lose: 3
}
// {enum} gameState
var gameState = states.initialize;
// {obj} attacks
var attacks = {
    // This can be cleaned up
    "kick": 10,
    "punch": 5,
    "slap": 1,
}
// {obj} player
var player = {
    // player and stick share some properties, maybe make a constructor?
    health: 100,
    energy: 10,
    attackModifier: 1,
    inventory: []
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
    playerHealthBarElem: document.getElementById('healthBar-elem'),
    playerHealthBarOverElem: document.getElementById('healthBarOver-elem'),
    stickHealthElem: document.getElementById('h-elem'),
    stickHealthBarElem: document.getElementById('healthBarStick-elem'),
    playerEnergyElem: document.getElementById('e-elem'),
    playerEnergy2Elem: document.getElementById('e2-elem'),
    bodyElem: document.getElementById('b-elem'),
    attackElem: document.getElementById('attack-img'),
    stickImgElem: document.getElementById('stick-img'),
    panelElem: document.getElementById('panel-elem')
}

// FUNCTIONS
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// randomProperty() {}
// Useful for those pesky associative arrays.
var randomProperty = function (object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};
// attack(type,position) {}
// This needs cleaning
function attack(type, position) {
    // Player Attack
    var energy = player.energy - attacks[type];
    if (energy < 0) {
        console.log("Error: Not enough Energy");
        return;
    }
    if (stick.position === position) {
        gameElem.attackElem.className = "attack-img " + gameElem.stickImgElem.className;
        stick.health -= Math.ceil(player.attackModifier * attacks[type]);
    }
    player.energy = energy;
    // Stick Attack
    player.health -= Math.ceil(stick.attackModifier * randomProperty(attacks));
    // run game update
    update();
}
// update() {}
// This needs cleaning
function update() {
    setTimeout(function () {
        gameElem.attackElem.className = "hidden";
    }, 500);
    // Check health values
    if (player.health <= 0) {
        player.health = 0;
        gameState = states.lose;
    }
    if (stick.health <= 0) {
        stick.health = 0;
        gameState = states.win;
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
            gameElem.panelElem.setAttribute('class', 'panel panel-success');
            overKill += 1;
            // Please rewrite to be less if/else offensive
            if (overKill <= 5) {
            } else {
                if (overKill <= 7) {
                    gameElem.bodyElem.innerText = "Okay, you win!";
                } else {
                    if (overKill <= 10) {
                        gameElem.bodyElem.innerText = "Stop you're hurting him!";
                    } else {
                        if (overKill <= 12) {
                            gameElem.bodyElem.innerText = "You're a monster!";
                        } else {
                            if (overKill >= 15) {
                                gameElem.bodyElem.innerText = "You need help!";
                                window.location.href = "https://www.google.com/search?q=anger+management+services";
                            }
                        }
                    }
                }
            }
            break;
        case 3:
            console.log("Game is over: Player lost");
            gameElem.panelElem.setAttribute('class', 'panel panel-danger');
            break;
    }
    // Update HTML Elems
    gameElem.playerHealthElem.innerText = String(player.health);
    gameElem.stickHealthElem.innerText = String(stick.health);
    gameElem.playerEnergyElem.style.width = String(player.energy * 100 / 10).concat("%");
    gameElem.playerHealthBarElem.style.width = String(player.health).concat("%");
    if (player.health > 100) {
        var newHealth = player.health - 100;
        gameElem.playerHealthBarOverElem.style.width = String(newHealth).concat("%");
        gameElem.playerHealthBarElem.style.width = String(100 - newHealth).concat("%");
    } else {
        gameElem.playerHealthBarOverElem.style.width = "0%";
    }
    gameElem.stickHealthBarElem.style.width = String(stick.health).concat("%");
    gameElem.playerEnergy2Elem.innerText = String(player.energy);
    drawInventory();



}
// reset() {}
function reset() {
    
    // Reset game values
    // Give this a better method for utilizing game difficulty
    gameState = 0;
    overKill = 0;
    player.health = 100;
    player.energy = 10;
    player.attackModifier = 1;
    stick.health = 100;
    stick.attackModifier = .5;
    gameElem.panelElem.setAttribute('class', 'panel panel-primary');
    $("#whatever").empty();
    player.inventory = [];
    update();

}
// Initialize game
update();