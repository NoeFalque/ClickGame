// RANDOM 
function rdm(rMin, rMax) {
    return ~~((Math.random()*(rMax-rMin+1))+rMin);
}


// Character CONSTRUCTOR
var Character = function() {
    this.phys = {};
        this.phys.hair = rdm(0,4);
        this.phys.skin = rdm(0,4);
        this.phys.body = rdm(0,4);
        this.phys.legs = rdm(0,4);
    this.totalLife = rdm(100,500);
    this.currentLife = this.totalLife; 
    this.eaten = {};
    this.preference = rdm(1,3);
}
// Food CONSTRUCTOR
var Food = function() {
    this.type = rdm(0,4);
    this.level = rdm(0,4);
    this.cost = rdm(0,4);
}

var character = new Character();
var food = new Food();


// LocalStorage of basic DATAS ( Coins, Upgrades, etc. )
if (!localStorage.getItem('data')) {
    var dataRestore = {
        coins: 0,
        level: 0,
        upgrades: {
            
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