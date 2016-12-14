// Character CONSTRUCTOR
var Character = function() {
    this.phys      = {};
    this.phys.hair = rdm(0,5);
    this.phys.skin = rdm(0,4);
    this.phys.body = rdm(0,4);
    this.phys.legs = rdm(0,4);
   
    this.totalLife   = rdm(10,50);
    this.currentLife = this.totalLife;
   
    this.eaten  = {};
    this.likes  = rdm(1,3);
    this.value = rdm(10,20)+(this.totalLife/2);
    console.log('Character Ready !');
}
 
// Food CONSTRUCTOR
var Food = function(type, cost, value) {
    this.type   = type;
    this.level  = 1;
    this.cost   = cost
    this.value  = value*this.level;
    this.ofType = this.ofType+1 || 0;
    console.log(this.type+' Ready !');
}

// Bread CONSTRUCTOR
function Bread() {
    Food.call(this, 'Bread', 0, click);
}
Bread.prototype = Object.create(Food.prototype);
// Chicken CONSTRUCTOR
function Chicken() {
    Food.call(this, 'Chicken', 0, click*2);
}
Chicken.prototype = Object.create(Food.prototype);
// Dessert CONSTRUCTOR
function Dessert() {
    Food.call(this, 'Dessert', 0, click*2);
}
Dessert.prototype = Object.create(Food.prototype);
// Drink CONSTRUCTOR
function Drink() {
    Food.call(this, 'Drink', 0, click*2);
}
Drink.prototype = Object.create(Food.prototype);

 
// Upgrade CONSTRUCTOR
var Upgrade = function(type, cost, prod) {
    this.type   = type;
    this.cost   = cost;
    this.prod   = prod*(this.level); // ( in seconds )
    this.sell   = cost/1.5;
    this.level  = 1;
    this.ofType = this.ofType+1 || 0;
    console.log(this.type+'n°'+this.ofType+' Ready !');
}
 
// Waiter CONSTRUCTOR
function Waiter() {
    Upgrade.call(this, 'Waiter', 100, 0.1);
}
Waiter.prototype = Object.create(Upgrade.prototype);
// Cooker CONSTRUCTOR
function Cooker() {
    Upgrade.call(this, 'Cooker', 1000, 10);
}
Cooker.prototype = Object.create(Upgrade.prototype);
// Resto CONSTRUCTOR
function Resto() {
    Upgrade.call(this, 'Resto', 3000, 100);
}
Resto.prototype = Object.create(Upgrade.prototype);
 
    // VARIABLES
// Constructor
var character = new Character();
var food = new Food('GodBread', 0);
var upgrade = new Upgrade('god', 0,0);
// Constructor's tables
var upgrades = [];
// COINS
var $clickBtn = document.querySelector('.clickBtn');
var $hp = document.querySelector('.hp');
var $hpBar = $hp.querySelector('.hpCurr');
var $coins = document.querySelector('.currentCoins');
var click = 1;
var $aliment = document.querySelectorAll('.listFood .upgradeContainer');
// upgrades
var $upgrade1 = document.querySelector('.upgrade1');
var $upgrade10 = document.querySelector('.upgrade10');
var $upgrade100 = document.querySelector('.upgrade100');
    // DOM INTEGRATION
// Variables Menu
var $menu               = {};
    // 3 Titles
    $menu.food          = document.querySelector('.menuAmelioration ul li:first-child'),
    $menu.resto         = document.querySelector('.menuRestaurant'),
    $menu.stat          = document.querySelector('.menuStatistic'),
    $menu.upgrades      = document.querySelectorAll('.menuAmelioration ul li'),
    // 3 list
    $menu.listFood      = document.querySelector('.listFood'),
    $menu.listResto     = document.querySelector('.listRestaurant'),
    $menu.listStat      = document.querySelector('.listStatistic'),
    $menu.listUpgrades  = document.querySelectorAll('.listUpgrades');
// Variable Character
var $character            = {};
    $character.screenValue = document.querySelector('.clientCoins');
 
    // FUNCTIONS
// Give food ONCLICK
$clickBtn.addEventListener('click', function() {
   giveFood(click);  
});
 
//// New upgrades ONCLICK
//$upgrade1.addEventListener('click', function() {
//    upWaiter();
//});
//$upgrade10.addEventListener('click', function() {
//    upCooker();
//});
//$upgrade100.addEventListener('click', function() {
//    upResto();
//});
// 
// function to add a Serveur
function upWaiter() {
   _waiter = new Waiter();
   if (dataRestore.coins >= _waiter.cost) {
       dataRestore.coins -= _waiter.cost;
       upgrades.push(_waiter);
       dataRestore.upgrades[0].waiter += 1;
    }
    else {
        _waiter = null;
        console.log('Vous n\'avez pas asssez pour votre Serveur de merde !');
    }    
}
 
// function to add a Cuisinier
function upCooker() {
    _cooker = new Cooker();
    if (dataRestore.coins >= _cooker.cost) {  
        dataRestore.coins -= _cooker.cost;
        upgrades.push(_cooker);
        dataRestore.upgrades[0].cooker += 1;
    }
    else {
        _cooker = null;
        console.log('Vous n\'avez pas asssez pour votre Cuisinier de merde !');
    }
}
 
// function to add a Resto
function upResto() {
    _resto = new Resto();
    if (dataRestore.coins >= _resto.cost) {    
        dataRestore.coins -= _resto.cost;
        upgrades.push(_resto);
        dataRestore.upgrades[0].resto += 1;
    }
    else {
        _resto = null;
        console.log('Vous n\'avez pas asssez pour votre Resto de merde !');
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
    character.currentLife -= value;
    var ratio = character.currentLife/character.totalLife;
    $hpBar.style.transform = 'rotate('+(-ratio*360)+'deg)';
   
    if(character.currentLife <= 0) {
        dataRestore.coins += character.value;
        $character.screenValue.innerHTML = character.value+' $';
        delete character;
        character = new Character();
        $coins.innerHTML = dataRestore.coins;
        console.log('dead');
    }
}
// LocalStorage of basic DATAS ( Coins, Upgrades, etc. )
    if (!localStorage.getItem('data')) {
        var dataRestore = {
            coins: 0,
            level: 0,
            upgrades: [ 
            {
                waiter: 0,
                cooker: 0,
                resto: 0,
                total: 0
            },
            {
                waiter: "Serveur",
                cooker: "Cuisinier",
                resto: "Restaurant",
                total: "Total"
            }
            ],
            food: [
            {
                bread: 0,
                chicken: 0,
                dessert: 0,
                drink: 0,
                total: 0
            },
            {  
                bread: "Pain",
                chicken: "Poulet",
                dessert: "Dessert",
                drink: "Boisson",
                total: "Total"
            }], 
            firstGame: new Date(),
        };
        localStorage.setItem('data', JSON.stringify(dataRestore));
        console.log('datas created !');
    }
    else {
        var dataRestore = JSON.parse(localStorage.getItem('data'));
        console.log('datas restored !');
    }
 // Init of the datas
function init() {
    // Restore Upgrades
    for (var prop in dataRestore.upgrades) {
        if ( prop == 'waiter') {
           for (var i = 0; i < dataRestore.upgrades[prop] - i; i++) {
               dataRestore.coins += 100;
               upWaiter();
               dataRestore.upgrades[0].waiter -= 1;
           }
        }
        else if ( prop == 'cooker') {
            console.log(dataRestore.upgrades[prop]);
           for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
               dataRestore.coins += 1000;
               upCooker();
               dataRestore.upgrades[0].cooker -= 1;
           }
        }
        else if ( prop == 'resto')  {
             console.log(dataRestore.upgrades[prop]);
            for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
                dataRestore.coins += 3000;
               upResto();
                dataRestore.upgrades[0].resto -= 1;
            }
        }
    }
    // Init Show coins
    $coins.innerHTML = dataRestore.coins;
    // Init upgrades
    upgradeInit();   
}

// Init of the Upgrade with JSON
function upgradeInit() {
    for (var i = 0; i < $aliment.length; i++)
        for (var j = 0; j < dataFood.length; j++)
            if ( $aliment[i].querySelector('.title .name').innerHTML == dataFood[j].name )
                for (var prop in dataRestore.food[1]) 
                    if ( dataRestore.food[1][prop] == dataFood[j].name )       
                        $aliment[i].querySelector('.levelButton .costRecipe').innerHTML = '<br>'+dataFood[j].cost[dataRestore.food[0][prop]];
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



// SWitch Menus
$menu.food.addEventListener('click', function() {
    if ( !$menu.food.classList.contains('current') ) {
       for (var i = 0; i < $menu.upgrades.length; i++) {
           $menu.upgrades[i].classList.remove('current');
           $menu.listUpgrades[i].style.display = 'none';
       }
       $menu.food.classList.add('current'); 
       $menu.listFood.style.display = 'block';
        
    } 
});
$menu.resto.addEventListener('click', function() {
    if ( !$menu.resto.classList.contains('current') ) {
        for (var i = 0; i < $menu.upgrades.length; i++) {
           $menu.upgrades[i].classList.remove('current');
           $menu.listUpgrades[i].style.display = 'none';
        }
        $menu.resto.classList.add('current'); 
        $menu.listResto.style.display = 'block';
    }
});
$menu.stat.addEventListener('click', function() {
    if ( !$menu.stat.classList.contains('current') ) {
        for (var i = 0; i < $menu.upgrades.length; i++) {
           $menu.upgrades[i].classList.remove('current');
           $menu.listUpgrades[i].style.display = 'none';
        }
        $menu.stat.classList.add('current'); 
        $menu.listStat.style.display = 'block';
    }
});


