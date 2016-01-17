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
// Responsible for OverKill feature, easter egg for abusive users
var overKill = 0;
// Define Game States enum
var states = {
    initialize: 0,
    running: 1,
    win: 2,
    lose: 3
}
// Set initial game state
var gameState = states.initialize;
// Attack dictionary
var attacks = {
    "kick": 10,
    "punch": 5,
    "slap": 1,
}
// Player object, contains inventory
var player = {
    health: 100,
    energy: 10,
    attackModifier: 1,
    inventory: new Inventory()
}
// CPU player object, hereby referred to as Stick
var stick = {
    health: 100,
    attackModifier: 0.5,
    position: null
}
// {obj} game HTML elements
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

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// FUNCTIONS
// Useful for those pesky associative arrays. Used to select random objects from dictionaries/associative arrays
var randomProperty = function (object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};
// Responsible for processing attack logic
// Please clean
function attack(type, position) {
    // Player Attack
    var energy = player.energy - attacks[type];
    if (energy < 0) {
        console.log("Error: Not enough Energy");
        return;
    }
    if (stick.position === position) {
        gameElem.attackElem.className = "attack-img " + gameElem.stickImgElem.className;
        setTimeout(function () {
            gameElem.attackElem.className = "hidden";
        }, 500);
        stick.health -= Math.ceil(player.attackModifier * attacks[type]);
    }
    player.energy = energy;
    // Stick Attack
    player.health -= Math.ceil(stick.attackModifier * randomProperty(attacks));
    // run game update
    update();
}
// Responsible for displaying funny messages when player continues to attack after winning
function checkOverKill(val) {
    // Please rewrite to be less if/else offensive
    if (val <= 5) {
    } else {
        if (val <= 7) {
            gameElem.bodyElem.innerText = "Okay, you win!";
        } else {
            if (val <= 10) {
                gameElem.bodyElem.innerText = "Stop you're hurting him!";
            } else {
                if (val <= 12) {
                    gameElem.bodyElem.innerText = "You're a monster!";
                } else {
                    if (val >= 15) {
                        gameElem.bodyElem.innerText = "You need help!";
                        window.location.href = "https://www.google.com/search?q=anger+management+services";
                    }
                }
            }
        }
    }
}
// Responsible for processing game logic in accordance with game state
// This needs cleaning
function update() {

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
            checkOverKill(overKill);
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
    player.inventory.draw();



}
// Responsible for resetting variables for a fresh game
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
    player.inventory.clear();
    update();

}
// Initialize game
update();