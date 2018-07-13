'use strict';

/**
 * Class => Item(name)
 * -----------------------------
 * Creates an item.
 *
 * @name Item
 * @param {string} name     The item's name.
 * @property {string} name
 */

function Item(name) {
  this.name = name;
}

/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */


/**
 * Weapon Extends Item Class
 * -----------------------------
 */

function Weapon(name, damage) {
  Item.call(this, name);
  this.damage = damage;
}

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */


/**
 * Food Extends Item Class
 * -----------------------------
 */

function Food(name, energy) {
  Item.call(this, name);
  this.energy = energy;
}

Food.prototype = Object.create(Item.prototype);
Food.prototype.constructor = Food;

/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */

function Player(name, health, strength, speed) {
  let _pack = [];
  let _maxHealth = health;

  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  this.equipped = false;

  this.getPack = function () {
    return _pack;
  }

  this.getMaxHealth = function () {
    return _maxHealth;
  }
}

/** 
* Player Class Method => isItInPack
 * -----------------------------
 * Player checks to see if the item is in the pack, 
 * returns a boolean or index number depending on the return type.
 * 
 * @param {Item} item 
 * @return {Number}
 */

Player.prototype.isItInPack = function (item) {
  return this.getPack().indexOf(item);
}

/** 
* Player Class Method => packRemoveOrReplace
 * -----------------------------
 * Player checks to see if the item is in the pack, 
 * if it is removes the item or replaces it. Otherwise it 
 * returns false
 * 
 * @param {Number} indexOfRemoval
 * @param {Item} itemThatReplaces
 */

Player.prototype.packRemoveOrReplace = function (indexOfRemoval, itemThatReplaces) {

  if (itemThatReplaces) {
    this.getPack().splice(indexOfRemoval, 1, itemThatReplaces);
  } else {
    this.getPack().splice(indexOfRemoval, 1);
  }
}

/**
 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */

Player.prototype.checkPack = function () {
  let playerPack = this.getPack();
  if (playerPack.length > 0) {
    playerPack.forEach((itemInPack, i) => {
      console.log('Item' + (i + 1) + ': ' + itemInPack.name);
    });
  } else {
    console.log('The pack is empty.');
  }
}

/**
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
 */

Player.prototype.takeItem = function (item) {
  let playerPack = this.getPack();

  if (playerPack.length < 3) {
    playerPack.push(item);
    console.log(this.name + ' added ' + item.name + ' to pack.');
  } else {
    console.log('The pack is full, item could not be stored.');
    return false;
  }
}

/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 *
 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
 */

Player.prototype.discardItem = function (item) {
  let indexOfItem = this.isItInPack(item);
  let success = false;

  if (indexOfItem > -1) {
    this.packRemoveOrReplace(indexOfItem);
    console.log(this.name + ' threw ' + item.name + ' out of the pack.');
    success = true;
  }

  console.log('Nothing was found, so nothing was discarded.');
  return success;
}

/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */

Player.prototype.equip = function (itemToEquip) {
  if (itemToEquip instanceof Weapon) {
    let indexOfItem = this.isItInPack(itemToEquip);

    if (indexOfItem > -1) {

      if (this.equipped !== false) {
        console.log((this.equipped.name) + ' swapped for ' + itemToEquip.name + '.');
        this.packRemoveOrReplace(indexOfItem, this.equipped);
      } else {
        this.packRemoveOrReplace(indexOfItem);
      }

      this.equipped = itemToEquip;

    }
  }
}

/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */

Player.prototype.eat = function (itemToEat) {
  if (itemToEat instanceof Food) {
    let indexOfItem = this.isItInPack(itemToEat);

    if (indexOfItem > -1) {
      this.packRemoveOrReplace(indexOfItem);
      this.health += itemToEat.energy;

      if (this.health > this.getMaxHealth()) {
        this.health = this.getMaxHealth();
      }
    }
  }
}

/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
 */

Player.prototype.useItem = function(item) {
  if(item instanceof Weapon){
    this.equip(item);
  } else if (item instanceof Food){
    this.eat(item);
  } else {
    return false;
  }
}

/**
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.
 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */

 Player.prototype.equippedWith = function () {
   if(this.equipped){
     console.log(this.name 
      + ' currently has ' + this.equipped.name + 'equipped.');
      return this.equipped.name;
   } else {
    console.log(this.name 
      + ' currently has nothing equipped.');
     return false;
   }
 }

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */

function Zombie (health, strength, speed) {
  let _maxHealth = health;

  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;

}

/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a Strong zombie.
 *
 * The StrongZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */

 function FastZombie (health, strength, speed) {
  Zombie.call(this,health,strength,speed);
 }

 FastZombie.prototype = Object.create(Zombie.prototype);
 FastZombie.prototype.constructor =  FastZombie;

/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */
function StrongZombie (health, strength, speed) {
  Zombie.call(this,health,strength,speed);
 }

 StrongZombie.prototype = Object.create(Zombie.prototype);
 StrongZombie.prototype.constructor =  StrongZombie;


/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * RangedZombie Extends Zombie Class
 * -----------------------------
 */

function RangedZombie (health, strength, speed) {
  Zombie.call(this,health,strength,speed);
 }

 RangedZombie.prototype = Object.create(Zombie.prototype);
 RangedZombie.prototype.constructor =  RangedZombie;

/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */

function ExplodingZombie (health, strength, speed) {
  Zombie.call(this,health,strength,speed);
 }

 ExplodingZombie.prototype = Object.create(Zombie.prototype);
 ExplodingZombie.prototype.constructor =  ExplodingZombie;


/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  // var player = new Player("Joan", 500, 30, 70);
  // var zombie = new Zombie(40, 50, 20);
  // var charger = new StrongZombie(175, 25, 60);
  // var tank = new StrongZombie(250, 100, 15);
  // var spitter = new RangedZombie(150, 20, 20);
  // var boomer = new ExplodingZombie(50, 15, 10);

  // var shovel = new Weapon("shovel", 15);
  // var sandwich = new Food("sandwich", 30);
  // var chainsaw = new Weapon("chainsaw", 25);

  // player.takeItem(shovel);
  // player.takeItem(sandwich);
  // player.takeItem(chainsaw);
  // player.discardItem(new Weapon("scythe", 21));
  // player.discardItem(shovel);
  // player.checkPack();
  // player.takeItem(shovel);
  // player.checkPack();

  // player.equippedWith();
  // player.useItem(chainsaw);
  // player.equippedWith();
  // player.checkPack();

  // player.useItem(shovel);
  // player.equippedWith();
  // player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();
}
