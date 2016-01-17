// Item Constructor
//array.splice method
var id = 0;
var Item = function (name, modHealth, modAttack, affectsPlayer, desc) {
    // Define items
    this.name = name;
    this.modHealth = modHealth;
    this.modAttack = modAttack;
    this.affectsPlayer = affectsPlayer;
    this.desc = desc;
    this.id = id++;
    // Constructed functions
    this.add = function () {
        player.inventory.push(this);
        // Push into player.inventory array
    }
    this.delete = function () {
        // Deletes objects from player.inventory array, might need splice
        // How do I get it to target itself in the array?
        // Seems like any pop/shift method will remove either the front
        // or back and not the one I'm specifically using
    }
    this.draw = function () {
        // Draws itself to the page
        $("#whatever").append("<li class=" + this.id + " onclick=''>" + this.name + " " + this.desc + "</li>");
    }
}
var items = {
    // List of items available in the game
    potion: new Item("Health Potion", 10, 0, true, "Tastes like cherries!"),
    sword: new Item("Longsword", 0, .5, true, "A shiny longsword with a sharp edge."),
    poison: new Item("Alien Ant Poison", -10, 0, false, "Goes down so smooth it's criminal."),
    twig: new Item("A broken twig", 0, -.5, true, "It's broken, you're going to do less damage with this.")
}
var randomProperty = function (object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};
function giveItem(item) {
    if (!item) {
        // math stuff to give a random item
        randomProperty(items).add();
    }
    else items[item].add();
    update();
    // Gives the player a random item if !item
}
function drawInventory() {
    // Lists all items in player.inventory in target div
    $("#whatever").empty();
    for (var i = 0; i < player.inventory.length; i++) {
        player.inventory[i].draw();
    }
}