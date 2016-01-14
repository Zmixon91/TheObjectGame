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
var attacks = { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    "kick": 10,
    "punch": 5,
    "slap": 1,
    "1": 10,
    "2": 5,
    "3": 1
}
// {obj} player
var player = {
    health: 100,
    energy: 10,
    attackModifier: 1
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
var items = {
    pot: new item("Health Potion", 10, 0, true, "Tastes like cherries!", "pot",1), //<<<<<<<<<<<<<<<<<<<<<<<
    srd: new item("Longsword", 0, .5, true, "A shiny longsword with a sharp edge.", "srd",2),
    psn: new item("Alien Ant Poison", -10, 0, false, "Goes down so smooth it's criminal.", "psn",3),
    twg: new item("A broken twig", 0, -.5, true, "It's broken, you're going to do less damage with this.", "twg",4)
}
// FUNCTIONS
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Item Constructor
function item(name, modHealth, modAttack, affectsPlayer, desc, id, idNum) {
    this.name = name;
    this.modHealth = modHealth;
    this.modAttack = modAttack;
    this.affectsPlayer = affectsPlayer;
    this.desc = desc;
    this.id = id;
    this.idNum = idNum;
    this.draw = function () {
        $("#whatever").append("<p id=" + this.id + " onclick='items." + this.id + ".delete()'>You have a " + this.name + "! " + this.desc + " Click here to use it!</p>");
        update();
        return true;
    }
    this.delete = function () {
        $("#" + this.id).remove();
        if (this.affectsPlayer) {
            // FIX THIS LATER
            if (this.modHealth != 0) { player.health += this.modHealth; }
            if (this.modAttack != 0) { player.attackModifier += this.modAttack; }
        } else {
            if (this.modHealth != 0) { stick.health += this.modHealth; }
            if (this.modAttack != 0) { stick.attackModifier += this.modAttack; }
        }
        update();
        return this.id;
    }
}
// giveItem(item) {}
function giveItem(given) {
    if (!given) {
        given = {1:"pot",2:"srd",3:"psn",4:"twg"};
        given = given[(Math.floor(Math.random() * 4) + 1)]
    }
    items[given].draw();
    update();
}
// attack(type,position) {}
function attack(type, position) {
    // ADD ATTACK ANIMATION FROM OLD JS
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
            gameElem.panelElem.setAttribute('class', 'panel panel-success');
            overKill += 1;
            if (overKill) {
                // Add later
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



}
// reset() {}
function reset() {
    
    // Reset game values
    gameState = 0;
    overKill = 0;
    player.health = 100;
    player.energy = 10;
    player.attackModifier = 1;
    stick.health = 100;
    stick.attackModifier = .5;
    gameElem.panelElem.setAttribute('class', 'panel panel-primary');
    $("#whatever").empty();
    update();

}
// Initialize game
update();