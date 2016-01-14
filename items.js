// Item Constructor
//array.splice method
var Item = function (name, modHealth, modAttack, affectsPlayer, desc) {
    // NEEDS: ID
    this.add = function () {
        // Push into player.inventory array
    }
    this.delete = function () {
        // Deletes objects from player.inventory array?
    }
    this.draw = function () {
        // Draws a single item in target div? We really don't need this right now.
    }
    this.drawInventory = function () {
        // Lists all items in player.inventory in target div
    }
}
var items = {
    // List of items available in the game
    potion: new Item("Health Potion", 10, 0, true, "Tastes like cherries!"),
    sword: new Item("Longsword", 0, .5, true, "A shiny longsword with a sharp edge."),
    poison: new Item("Alien Ant Poison", -10, 0, false, "Goes down so smooth it's criminal."),
    twig: new Item("A broken twig", 0, -.5, true, "It's broken, you're going to do less damage with this.")
}
function giveItem(given) {
    // Gives the player a random item if !given
}