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
    // list containing player inventory
    this.list = []
    // method of adding items to inventory, if no item given select at random
    this.add = function (item) {
        if (!item) this.list.push(randomProperty(items));
        else this.list.push(item);
        update();
    }
    // method of removing objects from inventory, processess item affects
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
    // method to clear player inventory
    this.clear = function () {
        this.list = [];
        update();
    }
    // method to draw player inventory to target div
    this.draw = function () {
        $("#whatever").empty();
        for (var i = 0; i < this.list.length; i++) {
            $("#whatever").append("<div><a href='javascript:;' onclick='player.inventory.remove(" + i + ");'>" + this.list[i].name + " " + this.list[i].desc + "</a></div>");
        }
    }
}
// List of items available in the game
var items = {
    potion: new Item("Health Potion", 10, 0, true, "Tastes like cherries!"),
    sword: new Item("Longsword", 0, .5, true, "A shiny longsword with a sharp edge."),
    poison: new Item("Alien Ant Poison", -10, 0, false, "Goes down so smooth it's criminal."),
    twig: new Item("A broken twig", 0, -.5, true, "It's broken, you're going to do less damage with this.")
}