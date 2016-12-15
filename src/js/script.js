init();
/* ----------------> CONSTRUCTORS <---------------- */

    // FOOD CONSTRUCTORS
// Food CONSTRUCTOR
var Food = function(name, level, cost, value) {
    this.name   = name;
    this.level  = level;
    this.cost   = cost
    this.value  = value;
    console.log(this.name+' Ready !');
}

// Bread CONSTRUCTOR
function Bread() {
    Food.call(this, 'Bread', dataRestore.level.food.bread, dataFood[0].cost[dataRestore.level.food.bread], dataFood[0].value[dataRestore.level.food.bread] );
}
Bread.prototype = Object.create(Food.prototype);
// Chicken CONSTRUCTOR
function Chicken() {
    Food.call(this, 'Chicken', dataRestore.level.food.chicken, dataFood[1].cost[dataRestore.level.food.chicken], dataFood[0].value[dataRestore.level.food.bread+1]*2);
}
Chicken.prototype = Object.create(Food.prototype);
// Dessert CONSTRUCTOR
function Dessert() {
    Food.call(this, 'Dessert', dataRestore.level.food.dessert, dataFood[2].cost[dataRestore.level.food.dessert], dataFood[0].value[dataRestore.level.food.bread+1]*2);
}
Dessert.prototype = Object.create(Food.prototype);
// Drink CONSTRUCTOR
function Drink() {
    Food.call(this, 'Drink', dataRestore.level.food.drink, dataFood[3].cost[dataRestore.level.food.drink], dataFood[0].value[dataRestore.level.food.bread+1]*2);
}
Drink.prototype = Object.create(Food.prototype);



    // UPGRADES CONSTRUCTOR
// Upgrade CONSTRUCTOR
var Upgrade = function(name, level, cost, prod) {
    this.name   = name;
    this.level  = level;
    this.cost   = cost;
    this.prod   = prod; // ( in seconds )
    this.sell   = cost/1.5;
    console.log(this.name+' Ready !');
}
 
// Waiter CONSTRUCTOR
function Waiter() {
    Upgrade.call(this, 'Waiter', dataRestore.level.resto.waiter, 100, dataResto[2].value[dataRestore.level.resto.waiter]);
}
Waiter.prototype = Object.create(Upgrade.prototype);
// Cooker CONSTRUCTOR
function Cooker() {
    Upgrade.call(this, 'Cooker', dataRestore.level.resto.cooker, 1000, dataResto[1].value[dataRestore.level.resto.cooker]);
}
Cooker.prototype = Object.create(Upgrade.prototype);
// Resto CONSTRUCTOR
function Resto() {
    Upgrade.call(this, 'Resto', dataRestore.level.resto.resto, 3000, dataResto[0].value[dataRestore.level.resto.resto]);
}
Resto.prototype = Object.create(Upgrade.prototype);
 
/* ----------------> VARIABLES <---------------- */
    // CONSTRUCTOR

// Constructor's tables
var upgrades = [];
var foods    = [];
    //DOM INTEGRATION
// Variables Coins & Click
var $clickBtn = document.querySelector("#client");
    $coins    = document.querySelector('.currentCoins'),
    $recipes  = document.querySelector('.currentBlueprints'),
    clickDmg  = 1,
    $gameScreen   = document.querySelector('.gameSection .game');
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
// Variables du choix de la food
var $foodChoice = {};
    $foodChoice.bread   = document.querySelector('.breadButton'),
    $foodChoice.chicken = document.querySelector('.chickenButton'),
    $foodChoice.dessert = document.querySelector('.dessertButton'),
    $foodChoice.drink   = document.querySelector('.drinkButton'),
    $foodChoice.foods   = document.querySelectorAll('.containerFoodButton');
var $menuHamb               = {};            
    $menuHamb.button        = document.querySelector('.menuHamb'),
    $menuHamb.quest         = document.querySelector('.questSection'),
    $menuHamb.ameliorations = document.querySelector('.ameliorationsSection');
// Mouse
var $cursorImg              = document.getElementById("foodImg");
// Variable Upgrades
var $food                  = document.querySelectorAll('.listFood .upgradeContainer');
var $resto            = document.querySelectorAll('.listRestaurant .upgradeContainer');
var $upgrades              = {};
    // Food + Resto
    $upgrades.food         = document.querySelectorAll('.listFood .upgradeContainer .levelButton'),
    $upgrades.resto   = document.querySelectorAll('.listRestaurant .upgradeContainer .levelButton');
// Variable Character
var $character             = {};
    $character.screenValue = document.querySelector('.clientCoins');
// screen values
$coins.innerHTML = dataRestore.coins;
$recipes.innerHTML = dataRestore.recipes;
foodInit();
upgradeInit();


console.log(dataFood[0].value[dataRestore.level.food.bread]);
var bread = new Bread();
var chicken = new Chicken();
var dessert = new Dessert();
var drink = new Drink();
foods.push(bread);
foods.push(chicken);
foods.push(dessert);
foods.push(drink);
dataRestore.food[0].bread++;
dataRestore.food[0].chicken++;
dataRestore.food[0].dessert++;
dataRestore.food[0].drink++;


     // ACHIEVEMENTS
var clickCpt = 0; // 1st A

/* ----------------> FUNCTIONS <---------------- */

    /* --------> UPGRADES<-------- */
// Upgrades Food ONCLICK ( All food's type )
$upgrades.food[0].addEventListener('click', function() {
   upBread();
});
$upgrades.food[1].addEventListener('click', function() {
   upChicken(); 
});
$upgrades.food[2].addEventListener('click', function() {
   upDessert(); 
});
$upgrades.food[3].addEventListener('click', function() {
   upDrink(); 
});

// Upgrades Resto ONCLICK ( All Ressource's type )
$upgrades.resto[0].addEventListener('click', function(){
    upResto();
});
$upgrades.resto[1].addEventListener('click', function(){
   upCooker(); 
});
$upgrades.resto[2].addEventListener('click', function(){
    upWaiter();
});


    // FOOD UPGRADES
// Upgrade the bread's lvl
function upBread() {
    if ( (dataRestore.level.food.bread < 9 && dataRestore.level.food.bread <= dataRestore.level.resto.resto ) && (dataRestore.recipes >= dataFood[0].cost[dataRestore.level.food.bread+1] ) ) {  
        dataRestore.level.food.bread += 1;
        dataRestore.recipes -= dataFood[0].cost[dataRestore.level.food.bread]; 
        for (var i = 0; i < foods.length; i++) {
            if (foods[i].name == 'Bread') {
                if (foods[i].level < 9) {
                    foods[i].level++;
                    foods[i].value = dataFood[0].value[dataRestore.level.food.bread+1];
                }
            }
        }  
        foodInit();
    }
}

// Upgrade the chicken's lvl
function upChicken() {
    if ( (dataRestore.level.food.chicken < 9 && dataRestore.level.food.chicken < dataRestore.level.resto.resto) && (dataRestore.recipes >= dataFood[1].cost[dataRestore.level.food.chicken+1] ) ) {
        dataRestore.level.food.chicken += 1;
        dataRestore.recipes -= dataFood[1].cost[dataRestore.level.food.chicken]; 
        for (var i = 0; i < foods.length; i++) {
            if (foods[i].name == 'Chicken') {
                if (foods[i].level < 9) {
                    foods[i].level++;
                    foods[i].value = dataFood[1].value[dataRestore.level.food.chicken+1];
                }
            }
        }  
        foodInit();
    }
}

// Upgrade the dessert's lvl
function upDessert() {
    if ( (dataRestore.level.food.dessert < 9 && dataRestore.level.food.dessert < dataRestore.level.resto.resto) && (dataRestore.recipes >= dataFood[2].cost[dataRestore.level.food.dessert+1] ) ) {
        dataRestore.level.food.dessert += 1;
        dataRestore.recipes -= dataFood[2].cost[dataRestore.level.food.dessert]; 
        for (var i = 0; i < foods.length; i++) {
            if (foods[i].name == 'Dessert') {
                if (foods[i].level < 9) {
                    foods[i].level++;
                    foods[i].value = dataFood[2].value[dataRestore.level.food.dessert+1];
                }
            }
        }  
        foodInit();
    }
}

// Upgrade the drink's lvl
function upDrink() {
    if ( (dataRestore.level.food.drink < 9 && dataRestore.level.food.drink < dataRestore.level.resto.resto) && (dataRestore.recipes >= dataFood[3].cost[dataRestore.level.food.drink+1] ) ) {
        dataRestore.level.food.drink += 1;
        dataRestore.recipes -= dataFood[3].cost[dataRestore.level.food.drink];
        for (var i = 0; i < foods.length; i++) {
            if (foods[i].name == 'Drink') {
                if (foods[i].level < 9) {
                    foods[i].level++;
                    foods[i].value = dataFood[3].value[dataRestore.level.food.drink+1];
                }
            }
        }  
        foodInit();
    }
}
//function for the cook to add a Bread
/* 
function newBread() {
    foods.push(new Bread());
    dataRestore.food[0].bread += 1;
}*/

    // Resto UPGRADES
// Upgrade the waitor's lvl
function upWaiter() {
    if ( (dataRestore.level.resto.waiter < 9 && dataRestore.level.resto.waiter < dataRestore.level.resto.resto) && (dataRestore.coins >= dataResto[2].cost[dataRestore.level.resto.waiter+1] ) ) { 
        dataRestore.level.resto.waiter += 1;
        dataRestore.coins -= dataResto[2].cost[dataRestore.level.resto.waiter];
        for (var i = 0; i < upgrades.length; i++) {
            if (upgrades[i].name == 'Waiter') {
                if (upgrades[i].level < 9) {
                    upgrades[i].level++;
                    upgrades[i].prod = dataResto[2].value[dataRestore.level.resto.waiter]; 
                }
            }  
        }
        upgradeInit();
    }
}
// Upgrade the cooker's lvl
function upCooker() {
    if ( (dataRestore.level.resto.cooker < 9 && dataRestore.level.resto.cooker < dataRestore.level.resto.resto) && (dataRestore.coins >= dataResto[1].cost[dataRestore.level.resto.cooker+1] ) ) { 
        dataRestore.level.resto.cooker += 1;
        dataRestore.coins -= dataResto[1].cost[dataRestore.level.resto.cooker];
        for (var i = 0; i < upgrades.length; i++) {
            if (upgrades[i].name == 'Cooker') {
                if (upgrades[i].level < 9) {
                    upgrades[i].level++;
                    upgrades[i].prod = dataResto[1].value[dataRestore.level.resto.cooker]; 
                }
            }
        }
        upgradeInit();
    }
}
// Upgrade the truck's lvl
function upResto() {
    if ( (dataRestore.level.resto.resto < 9) && (dataRestore.coins >= dataResto[0].cost[dataRestore.level.resto.resto+1] ) ) { 
        dataRestore.level.resto.resto += 1;
        dataRestore.coins -= dataResto[0].cost[dataRestore.level.resto.resto];
        for (var i = 0; i < upgrades.length; i++) {
            if (upgrades[i].name == 'Resto') {
                if (upgrades[i].level < 9) {
                    upgrades[i].level++;
                    upgrades[i].prod = dataResto[2].value[dataRestore.level.resto.cooker]; 
                }
            }
        }
        upgradeInit();
    }
}

    /* --------> INCOME <-------- */
// Give food ONCLICK
$clickBtn.addEventListener('click', function() {
    giveFood(clickDmg); 
    // 1st Achievement
    console.log(dataAchievement.clickCpt);
    dataAchievement.clickCpt++;
    if (dataAchievement.clickCpt >= achievements[0].cond[achievements[0].unlocked]) {
       achievements[0].unlocked++; 
       // 2nd, 3rd, 4th A
       if ( $foodChoice.bread.classList.contains('active') ) {
           dataAchievement.breadCpt++;
           if (dataAchievement.breadCpt >= achievements[1].cond[achievements[1].unlocked]) achievements[1].unlocked++;
       }
       if ( $foodChoice.chicken.classList.contains('active') ) {
           dataAchievement.chickenCpt++;
           if (dataAchievement.chickenCpt >= achievements[2].cond[achievements[2].unlocked]) achievements[2].unlocked++;
       }
       if ( $foodChoice.dessert.classList.contains('active') ) {
           dataAchievement.dessertCpt++;
           if (dataAchievement.dessertCpt >= achievements[3].cond[achievements[3].unlocked]) achievements[3].unlocked++;
       }
       if ( $foodChoice.drink.classList.contains('active') ) {
           dataAchievement.drinkCpt++;
           if (dataAchievement.drinkCpt >= achievements[8].cond[achievements[8].unlocked]) achievements[8].unlocked++;
       } 
    }
});

// 5th A ONCLICK
//$caisseDalleux.addEventListener('click', function(){
//   dataAchievement.dalleuxCpt++;
//   if (dataAchievement.dalleuxCpt >= 50) {
//        achievements[5].unlocked++;
//   }
//});
 
    // ADDS
// function to add a Waiter
function newWaiter() {
   _waiter = new Waiter();
//   if (dataRestore.coins >= _waiter.cost) {
//       dataRestore.coins -= _waiter.cost;
       upgrades.push(_waiter);
       dataRestore.upgrades[0].waiter += 1;
//    }
//    else {
//        _waiter = null;
//        console.log('Vous n\'avez pas asssez pour votre Serveur de merde !');
//    }    
}
function newCooker() {
   _cooker = new Cooker();
//   if (dataRestore.coins >= _waiter.cost) {
//       dataRestore.coins -= _waiter.cost;
       upgrades.push(_cooker);
       dataRestore.upgrades[0].cooker += 1;
//    }
//    else {
//        _waiter = null;
//        console.log('Vous n\'avez pas asssez pour votre Serveur de merde !');
//    }    
}

// function auto to Give food
function autoFood() {
    var income = 0; 
    for (var i = 0; i < upgrades.length; i++) {
        income = upgrades[i].prod;
        if (upgrades[i].name == 'Waiter') {
            giveFood(income);
        }
        if (upgrades[i].name == 'Cooker') {
            dataRestore.recipes += income; 
            $recipes.innerHTML = dataRestore.recipes;
        }
        if (upgrades[i].name == 'Resto') {}
    }   
}

function autoDirect() {
    $recipes.innerHTML = dataRestore.recipes;
    $coins.innerHTML = dataRestore.coins;
}
 
// function that giveFood
function giveFood(value) {
    character.currentLife -= value;
   
    if(character.currentLife <= 0) {
        dataRestore.coins += character.value;
        $character.screenValue.innerHTML = character.value+' $';
        $coins.innerHTML = dataRestore.coins;
        console.log('dead');
    }
}

newWaiter();
newCooker();

/* --------> INIT <-------- */
/*
 // Init of the datas
//function restoreUpgrade() {
//    // Restore Upgrades
//    for (var prop in dataRestore.upgrades) {
//        if ( prop == 'waiter') {
//           for (var i = 0; i < dataRestore.upgrades[prop] - i; i++) {
//               dataRestore.coins += 100;
//               upWaiter();
//               dataRestore.upgrades[0].waiter -= 1;
//           }
//        }
//        else if ( prop == 'cooker') {
//            console.log(dataRestore.upgrades[prop]);
//           for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
//               dataRestore.coins += 1000;
//               upCooker();
//               dataRestore.upgrades[0].cooker -= 1;
//           }
//        }
//        else if ( prop == 'resto')  {
//             console.log(dataRestore.upgrades[prop]);
//            for (var i = 0; i < dataRestore.upgrades[prop]-i; i++) {
//                dataRestore.coins += 3000;
//               upResto();
//                dataRestore.upgrades[0].resto -= 1;
//            }
//        }
//    }
//    // Init Show coins
//    $coins.innerHTML = dataRestore.coins;
//    // Init upgrades
//    foodInit();   
//}
*/
// Init of the food with JSON
function foodInit(unlock) {
    // Prices + Levels
    for (var i = 0; i < $food.length; i++) {
        for (var j = 0; j < dataFood.length; j++) {
            if ( $food[i].querySelector('.title .name').innerHTML == dataFood[j].name) {
                for (var prop in dataRestore.food[1]) {
                    if ( dataRestore.food[1][prop] == dataFood[j].name ) {   
                        $food[i].querySelector('.levelButton .costRecipe').innerHTML = '<br>'+dataFood[j].cost[dataRestore.level.food[prop]+1];
                        $food[i].querySelector('.title .lvl').innerHTML = 'Niveau '+(dataRestore.level.food[prop]+1);
                    }
                }
            }   
        }
    }
}
// Init of the Upgrades with JSON
function upgradeInit() {    
   for (var i = 0; i < $resto.length; i++) {
        for (var j = 0; j < dataResto.length; j++) {
            if ( $resto[i].querySelector('.title .name').innerHTML == dataResto[j].name ) {
                for (var prop in dataRestore.upgrades[1]) {
                    if ( dataRestore.upgrades[1][prop] == dataResto[j].name ) {   
                        $resto[i].querySelector('.levelButton .costCoin').innerHTML = '<br>'+dataResto[j].cost[dataRestore.level.resto[prop]+1];
                        $resto[i].querySelector('.title .lvl').innerHTML = 'Niveau '+(dataRestore.level.resto[prop]+1);
                    }
                }
            }
        }
    } 
       
//       (dataRestore.level.food.bread < 9 && dataRestore.level.food.bread <= dataRestore.level.resto.resto ) && (dataRestore.recipes >= dataFood[0].cost[dataRestore.level.food.bread+1] )
}
//restoreUpgrade();

    // LOOPS
// loop for food income
var loop = setInterval(function() {
    autoFood();
    autoDirect();
    save();
}, 1000);

/* ----------------> Ressources <---------------- */

// function RANDOM
function rdm(rMin, rMax) {
    return ~~((Math.random()*(rMax-rMin+1))+rMin);
}

function save() {
    localStorage.setItem('data', JSON.stringify(dataRestore));
    localStorage.setItem('dataAch', JSON.stringify(dataAchievement));
    localStorage.setItem('dataF', JSON.stringify(initFood));
    localStorage.setItem('dataA', JSON.stringify(initAchievements));
    localStorage.setItem('dataR', JSON.stringify(initResto));
}

function load(){
   dataRestore = JSON.parse(localStorage.getItem('data'));
   dataAchievement = JSON.parse(localStorage.getItem('dataAch'));
   dataFood = JSON.parse(localStorage.getItem('dataF'));
   achievements = JSON.parse(localStorage.getItem('dataA'));
   dataResto = JSON.parse(localStorage.getItem('dataR')); 
}

function init(){
    if (!localStorage.getItem('data')) {
        dataRestore = {
            coins: 0,
            recipes: 0,
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
            level: {
                food: {
                   bread: 0,
                    chicken: 0,
                    dessert: 0,
                    drink: 0,
                },
                resto: {
                    waiter: 0,
                    cooker: 0,
                    resto: 0,
                }  
            }
        };
        dataAchievement = {
            clickCpt: 0,
            breadCpt: 0,
            chickenCpt: 0,
            dessertCpt: 0,
            sherlock: 0,
            dalleuxCpt: 0,
            explodeCpt: 0,
            chefCpt: 0,
            drinkCpt: 0
        };
        save();
        load();
        console.log('datas created !');
    }
    else {
        load();
        console.log('datas restored !');
    }
}

/* ----------------> DOM PART <---------------- */

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

// SWitch Food
$foodChoice.bread.addEventListener('click', function() {
    if ( !$foodChoice.bread.classList.contains('active') ) {
        for (var i = 0; i < $foodChoice.foods.length; i++) {
           $foodChoice.foods[i].classList.remove('active');
        }
        $foodChoice.bread.classList.add('active');
        clickDmg = bread.value;
        $cursorImg.setAttribute('src', '../src/images/upgradeFood/bread.png');
    } 
});
$foodChoice.chicken.addEventListener('click', function() {
    if ( !$foodChoice.chicken.classList.contains('active') ) {
        for (var i = 0; i < $foodChoice.foods.length; i++) {
           $foodChoice.foods[i].classList.remove('active');
        }
        $foodChoice.chicken.classList.add('active'); 
        clickDmg = chicken.value;
        $cursorImg.setAttribute('src', '../src/images/upgradeFood/wings.png');
    } 
});
$foodChoice.dessert.addEventListener('click', function() {
    if ( !$foodChoice.dessert.classList.contains('active') ) {
        for (var i = 0; i < $foodChoice.foods.length; i++) {
           $foodChoice.foods[i].classList.remove('active');
        }
        $foodChoice.dessert.classList.add('active'); 
        clickDmg = dessert.value;
        $cursorImg.setAttribute('src', '../src/images/upgradeFood/yogurt.png');
    } 
});
$foodChoice.drink.addEventListener('click', function() {
    if ( !$foodChoice.drink.classList.contains('active') ) {
        for (var i = 0; i < $foodChoice.foods.length; i++) {
           $foodChoice.foods[i].classList.remove('active');
        }
        $foodChoice.drink.classList.add('active');
        clickDmg = drink.value;
        $cursorImg.setAttribute('src', '../src/images/upgradeFood/water.png');
    } 
});

    // Responsive
// Switch Burger ONCLICK
$menuHamb.button.addEventListener('click', function() {
    menuSwitch();
});
window.addEventListener('resize', function() {
    if (window.innerWidth > 955) {
       menuSwitch(); 
    }
    
});
// Switch du MENU BURGER
function menuSwitch() {
     if ( !$menuHamb.button.classList.contains('opened') ) {
       $menuHamb.button.classList.add('opened');
       $menuHamb.quest.style.marginLeft = '0';
       $menuHamb.ameliorations.style.marginLeft = '0';
    } else if (window.innerWidth < 955) {
       $menuHamb.button.classList.remove('opened');
       $menuHamb.quest.style.marginLeft = '100%';
       $menuHamb.ameliorations.style.marginLeft = '100%';
    }
}


    // MOUSE
// Mouse Cursor Follow
$gameScreen.addEventListener('mousemove', function(e) {
    if(navigator.appName=="Microsoft Internet Explorer") {
         var x = event.x+document.body.scrollLeft;
         var y = event.y+document.body.scrollTop;
    }
    else {
         var x =  e.pageX;
         var y =  e.pageY;
    }
    $cursorImg.style.left = (x+1)+'px';
    $cursorImg.style.top  = (y+1)+'px';
});
// Disabling / Active Cursor Follow
$gameScreen.addEventListener('mouseout', function() { 
        $cursorImg.style.display = 'none';
});
$gameScreen.addEventListener('mouseover', function() {
    $cursorImg.style.display = 'block';
});

/* ----------------> Achievements Part <---------------- */

