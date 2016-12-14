// Character CONSTRUCTOR
var Character = function() {
    this.phys = {};
    this.phys.hair = rdm(0,4);
    this.phys.skin = rdm(0,4);
    this.phys.body = rdm(0,4);
    this.phys.legs = rdm(0,4);
   
    this.totalLife = rdm(10,50);
    this.currentLife = this.totalLife;
   
    this.eaten = {};
    this.likes = rdm(1,3);
    console.log('Character Ready !');
}
 
// Food CONSTRUCTOR
var Food = function() {
    this.type = rdm(0,4);
    this.level = rdm(0,4);
    this.cost = rdm(0,4);
    console.log('Food Ready !');
}
 
// Upgrade CONSTRUCTOR
var Upgrade = function(type, cost, prod) {
    this.type = type;
    this.cost = cost;
    this.prod = prod; // ( in seconds )
    this.sell = cost/1.5;
    this.level = 1;
    console.log(this.type+' Ready !');
}
 
// Waiter CONSTRUCTOR
function Waiter() {
    Upgrade.call(this, 'Waiter', 100, 1);
}
Waiter.prototype = Object.create(Upgrade.prototype);
 
// Cooker CONSTRUCTOR
function Cooker() {
    Upgrade.call(this, 'Cooker', 1000, 10);
}
Cooker.prototype = Object.create(Upgrade.prototype);
 
// Manager CONSTRUCTOR
function Manager() {
    Upgrade.call(this, 'manager', 3000, 100);
}
Manager.prototype = Object.create(Upgrade.prototype);
 
    // VARIABLES
// Constructor
var character = new Character();
var food = new Food();
var upgrade = new Upgrade('god', 0,0);
// Constructor's tables
var upgrades = [];
// COINS
var $clickBtn = document.querySelector('.clickBtn');
var $hp = document.querySelector('.hp');
var $hpBar = $hp.querySelector('.hpCurr');
var $coins = document.querySelector('.coins');
var click = 1;
// upgrades
var $upgrade1 = document.querySelector('.upgrade1');
var $upgrade10 = document.querySelector('.upgrade10');
var $upgrade100 = document.querySelector('.upgrade100');
 
    // FUNCTIONS
// Give food ONCLICK
$clickBtn.addEventListener('click', function() {
   giveFood(click);  
});
 
// New upgrades ONCLICK
$upgrade1.addEventListener('click', function() {
    addWaiter();
});
$upgrade10.addEventListener('click', function() {
    addCooker();
});
$upgrade100.addEventListener('click', function() {
    addManager();
});
 
// function to add a Serveur
function addWaiter() {
   _waiter = new Waiter();
   if (dataRestore.coins >= _waiter.cost) {
       dataRestore.coins -= _waiter.cost;
       upgrades.push(_waiter);
       dataRestore.upgrades.waiter += 1;
    }
    else {
        _waiter = null;
        console.log('Vous n\'avez pas asssez pour votre Serveur de merde !');
    }    
}
 
// function to add a Cuisinier
function addCooker() {
    _cooker = new Cooker();
    if (dataRestore.coins >= _cooker.cost) {  
        dataRestore.coins -= _cooker.cost;
        upgrades.push(_cooker);
        dataRestore.upgrades.cooker += 1;
    }
    else {
        _cooker = null;
        console.log('Vous n\'avez pas asssez pour votre Cuisinier de merde !');
    }
}
 
// function to add a Manager
function addManager() {
    _manager = new Manager();
    if (dataRestore.coins >= _manager.cost) {    
        dataRestore.coins -= _manager.cost;
        upgrades.push(_manager);
        dataRestore.upgrades.manager += 1;
    }
    else {
        _manager = null;
        console.log('Vous n\'avez pas asssez pour votre Manager de merde !');
    }
}
 
// function auto to Give food
function autoFood() {
    var income = 0;
    for (var i = 0; i < upgrades.length; i++) {
        income += upgrades[i].prod;
    }
    giveFood(income);
}
 
// function that giveFood
function giveFood(value) {
    dataRestore.coins += value;
    $coins.innerHTML = dataRestore.coins;
    character.currentLife -= value;
    var ratio = character.currentLife/character.totalLife;
    $hpBar.style.transform = 'rotate('+(-ratio*360)+'deg)';
   
    if(character.currentLife <= 0) {
        delete character;
        character = new Character();
        console.log('dead');
    }
}
 
// LocalStorage of basic DATAS ( Coins, Upgrades, etc. )
    if (!localStorage.getItem('data')) {
        var dataRestore = {
            coins: 0,
            level: 0,
            upgrades: {
                waiter: 0,
                cooker: 0,
                manager: 0,
                total: 0
            },
            firstGame: new Date(),
        };
        localStorage.setItem('data', JSON.stringify(dataRestore));
        console.log('datas created !');
    }
    else {
        var dataRestore = JSON.parse(localStorage.getItem('data'));
        console.log('datas restored !');
    }
 
function init() {
    // Restore Upgrades
    for (var prop in dataRestore.upgrades) {
        if ( prop == 'waiter') {
           for (var i = 0; i < dataRestore.upgrades[prop] - i; i++) {
               dataRestore.coins += 100;
               addWaiter();
               dataRestore.upgrades.waiter -= 1;
           }
        }
        else if ( prop == 'cooker') {
            console.log(dataRestore.upgrades[prop]);
           for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
               dataRestore.coins += 1000;
               addCooker();
               dataRestore.upgrades.cooker -= 1;
           }
        }
        else if ( prop == 'manager')  {
             console.log(dataRestore.upgrades[prop]);
            for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
                dataRestore.coins += 3000;
               addManager();
                dataRestore.upgrades.manager -= 1;
            }
        }
    }
}
init();
 
// function RANDOM
function rdm(rMin, rMax) {
    return ~~((Math.random()*(rMax-rMin+1))+rMin);
}
 
// loop for food income
var loop = setInterval(function() {
    autoFood();
    localStorage.setItem('data', JSON.stringify(dataRestore));
}, 1000)