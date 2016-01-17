// Item Constructor
//array.splice method
var Item = function (name, modHealth, modAttack, affectsPlayer, desc) {
    // NEEDS: ID?
    this.name = name;
    this.modHealth = modHealth;
    this.modAttack = modAttack;
    this.affectsPlayer = affectsPlayer;
    this.desc = desc;
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
        $("#whatever").append("<li>" + this.name + " " + this.desc + "</li>");
        // Draws a single item in target div? We really don't need this right now.
    }
}
var items = {
    // List of items available in the game
    potion: new Item("Health Potion", 10, 0, true, "Tastes like cherries!"),
    sword: new Item("Longsword", 0, .5, true, "A shiny longsword with a sharp edge."),
    poison: new Item("Alien Ant Poison", -10, 0, false, "Goes down so smooth it's criminal."),
    twig: new Item("A broken twig", 0, -.5, true, "It's broken, you're going to do less damage with this.")
}
function giveItem(item) {
    // Gives the player a random item if !item
}
function drawInventory() {
    debugger;
    // Lists all items in player.inventory in target div
    for (var i = 0; i < player.inventory.length; i++) {
        player.inventory[i].draw();
    }
}