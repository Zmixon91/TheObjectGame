// Item Constructor, contains item data
var Item = function (name, modHealth, modAttack, affectsPlayer, desc) {
    this.name = name;
    this.modHealth = modHealth;
    this.modAttack = modAttack;
    this.affectsPlayer = affectsPlayer;
    this.desc = desc;
}
// Inventory constructor, contains item logic
var Inventory = function () {
    this.list = []
    this.add = function (item) {
        this.list.push(item);
    }
    this.remove = function (item) {
        if (this.list[item].affectsPlayer) {
            player.health += this.list[item].modHealth;
            player.attackModifier += this.list[item].modAttack;
        } else {
            stick.health += this.list[item].modHealth;
            stick.attackModifier += this.list[item].modAttack;
        }
        this.list.splice(item, 1);
        update();
    }
    this.clear = function () {
        this.list = [];
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
    if (!item) {
        // math stuff to give a random item
        player.inventory.add(randomProperty(items))
    }
    else player.inventory.add(items[item]);
    update();
    // Gives the player a random item if !item
}
function drawInventory() {
    // Lists all items in player.inventory in target div
    $("#whatever").empty();
    for (var i = 0; i < player.inventory.list.length; i++) {
        $("#whatever").append("<div><a href='javascript:;' onclick='player.inventory.remove(" + i + ");'>" + player.inventory.list[i].name + " " + player.inventory.list[i].desc + "</a></div>");
    }
}