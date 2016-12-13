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
    this.preference = rdm(1,3);
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

// Serveur CONSTRUCTOR
function Serveur() {
    Upgrade.call(this, 'serveur', 100, 1);
}
Serveur.prototype = Object.create(Upgrade.prototype);

// Cuisinier CONSTRUCTOR
function Cuisinier() {
    Upgrade.call(this, 'cuisinier', 1000, 10);
}
Cuisinier.prototype = Object.create(Upgrade.prototype);

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
    addServeur();
});
$upgrade10.addEventListener('click', function() {
    addCuisinier();
});
$upgrade100.addEventListener('click', function() {
    addManager();
});

// function to add a Serveur
function addServeur() {
   _serveur = new Serveur();
   if (dataRestore.coins >= _serveur.cost) {
       dataRestore.coins -= _serveur.cost;
       upgrades.push(_serveur); 
       dataRestore.upgrades.serveur += 1;
    }
    else {
        _serveur = null;
        console.log('Vous n\'avez pas asssez pour votre Serveur de merde !');
    }    
}

// function to add a Cuisinier
function addCuisinier() {
    _cuisinier = new Cuisinier();
    if (dataRestore.coins >= _cuisinier.cost) {   
        dataRestore.coins -= _cuisinier.cost;
        upgrades.push(_cuisinier); 
        dataRestore.upgrades.cuisinier += 1;
    }
    else {
        _cuisinier = null;
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
                serveur: 0,
                cuisinier: 0,
                manager: 0
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
//
// Init of the upgrades 
//for (var i = 0; i < dataRestore.upgrades.length; i++) {
//   for (var j = 0; j < dataRestore.upgrades[i]; j++) {
//       
//       case ()
//       
//       
//   }
//}

for (var prop in dataRestore.upgrades) {
    if ( prop == 'serveur')
       for (var i = 0; i < dataRestore.upgrades[prop]; i++)
           addServeur();
    else if ( prop == 'cuisinier') 
       for (var i = 0; i < dataRestore.upgrades[prop]; i++)
           addCuisinier();
    else if ( prop == 'manager') 
        for (var i = 0; i < dataRestore.upgrades[prop]; i++)
           addManager();
}
 
// function RANDOM 
function rdm(rMin, rMax) {
    return ~~((Math.random()*(rMax-rMin+1))+rMin);
}

// loop for food income
var loop = setInterval(function() {
    autoFood();
    localStorage.setItem('data', JSON.stringify(dataRestore));
}, 1000);
