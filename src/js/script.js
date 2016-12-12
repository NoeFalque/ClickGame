// RANDOM 
function rdm(rMin, rMax) {
    return ~~((Math.random()*(rMax-rMin+1))+rMin);
}



var Character = function() {
    this.phys = {};
        this.phys.hair = rdm(0,4);
        this.phys.skin = rdm(0,4);
        this.phys.body = rdm(0,4);
        this.phys.legs = rdm(0,4);
    this.currentLife = totalLife; 
    this.totalLife = rdm(100,500);
    this.eaten = {};
    this.preference = rdm(1,3);
}

var Food = function() {
    this.type = rdm(0,4);
    this.level = rdm(0,4);
    this.cost = rdm(0,4);
}

var character = new Character();
var food = new Food();
