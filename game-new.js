// Game Object: Punch, Slap, or Kick the Stick figure to death
//              before he does the same to you.

// Game Design: Turn-Based, choose an attack and a direction.
//              Stick will dodge right or left at random and
//              choose an attack at random.
//              Player cannot dodge, but Stick's damage is
//              halved.

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
    slap: 1
}
// {obj} player
var player = {
    health: 100,
    energy: 10,
    attack: null,
    attackModifier: 1,
    position: null
}
// {obj} stick
var stick = {
    health: 100,
    attack: null,
    attackModifier: 0.5,
    position: null
}
// {obj} stick health
var hElem = document.getElementsByID('h-elem');
// {obj} player health
var pElem = document.getElementById('p-elem');
// {obj} energy bar
var eElem = document.getElementById('e-elem');
// {obj} energy number
var e2Elem = document.getElementById('e2-elem');
// {obj} body element
var bElem = document.getElementById('b-elem');
// {obj} attack image
var aElem = document.getElementById('attack-img');

// FUNCTIONS
// attack(attackType,attackPosition) {}
function attack(attackType,attackPosition) {
    
    
    
}
// update() {}
function update() {
    
    
    
}
// reset() {}
function reset() {
    
    
    
}