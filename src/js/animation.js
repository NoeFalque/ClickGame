var $client = document.querySelector("#client");
var $svg = document.querySelector("svg");

var s = Snap("#client");

var man = Snap.load("man7.svg", function (f) {
	var g = f.select("svg");
	s.append(g);
	eatingAnim();
});

var duration = 1000;
var maxClicks = 10;

var step = duration / maxClicks;
var anims = [];
var clicks = 0;
var nbCoins = 15;

var disabled = false;
document.querySelector("#client").addEventListener("click", function(){
	if(disabled) return;
	if(clicks >= maxClicks-1){
		disabled = true;
		explosionAnim();
	}
	else{
		fatAnim();
		setTimeout(function(){
			for(var i in anims){
				anims[i].stop();
			}
		}, step);
		clicks++;
	}
});

function fatAnim(){
	var parts = ["#shirt","#jean","#skin", "#skin_body", "#neck", "#neck_shadow", "#arm_left", "#arm_right"];

	for(var i in parts){
		var thin = s.select( parts[i] + "_thin");
		var fat = document.querySelector(parts[i] + "_fat").getAttribute("d");
		var anim = thin.animate({ d: fat }, duration);
		anims.push(anim);
	}
	duration -= step;
}


function explosionAnim(){
	var parts = ["#shirt","#jean","#skin", "#skin_body", "#neck", "#neck_shadow", "#arm_left", "#arm_right", "#navel", "#shoe_top_left", "#sole_left", "#shoe_top_right", "#sole_right", "#eyebow_left", "#eyebow_right"];

	for(var i in parts){
		var fat = s.select( parts[i] + "_thin");
		var exploded = document.querySelector(parts[i] + "_exploded").getAttribute("d");
		fat.animate({ d: exploded }, 400, mina.easeout);
	}
	setTimeout(function(){
		var $group = document.querySelector("#thin");
		$group.classList.add("destroyed");
		setTimeout(function(){ $group.style.display = "none"; }, 100);
	}, 100);

	coinsAnim();

}
/*
function coinsAnim1(){
	var coins = [];

	for(var i=0; i< nbCoins; i++){

		var coin = {};
		var $navel = document.querySelector("#navel_thin");
		coin.x = $navel.getBoundingClientRect().left;
		coin.y = $navel.getBoundingClientRect().top;
		coin.direction = (Math.random()*Math.PI*2)-Math.PI;
		coins.push(coin);

		coins[i].el = document.createElement("img");
		$client.appendChild(coins[i].el);
		coins[i].el.classList.add("coin");
		coins[i].el.setAttribute("src", "src/images/coin.png");

	}

	function step(){
		for(var i in coins){
			if( coins[i].x > limit.right 	+ 100 ||
				  coins[i].y > limit.bottom + 100 ||
				  coins[i].x < limit.left 	- 100 ||
				  coins[i].y < limit.top		- 100  ) {
				coins[i].el.parentElement.removeChild(coins[i].el);
				coins.splice(i, 1);
			}
			if(coins[i]){
				coins[i].x += Math.cos(coins[i].direction) * 10;  
				coins[i].y += Math.sin(coins[i].direction) * 10;  
				coins[i].el.style.left 	= coins[i].x + "px";  
				coins[i].el.style.top = coins[i].y + "px";
			}
		}
		if(coins.length > 0) {
			raf = requestAnimationFrame(step);
		}
	}//end step
	var limit = $client.getBoundingClientRect();
	var raf = requestAnimationFrame(step);

}*/


function coinsAnim(){
	var coins = [];

	for(var i=0; i< nbCoins; i++){

		var coin = {};
		var $navel = document.querySelector("#navel_thin");
		coin.x = $navel.getBoundingClientRect().left;
		coin.y = $navel.getBoundingClientRect().top;
		coin.direction = (Math.random()*Math.PI*2)-Math.PI;
		coin.speed = 90+ 10*i/nbCoins;
		coins.push(coin);

		coins[i].el = document.createElement("img");
		$client.appendChild(coins[i].el);
		coins[i].el.classList.add("coin");
		coins[i].el.setAttribute("src", "src/images/coin.png");

	}

	var limit = $navel.getBoundingClientRect();
	var $box = document.querySelector("#coinBox")
	setTimeout(function(){ var raf = requestAnimationFrame(step) }, 200);

	function step(time){
		for(var i in coins){
			if(	//coins go to the box
				coins[i].x > limit.right 	+ 200 ||
				coins[i].y > limit.bottom + 200 ||
				coins[i].x < limit.left 	- 200 ||
				coins[i].y < limit.top		- 200  
			) {
				coins[i].el.style.transition = ".8s";
//				coins[i].x	= (coins[i].x + $box.offsetLeft) / 2;
//				coins[i].y	= (coins[i].y + $box.offsetTop) / 2;
				coins[i].x	= $box.offsetLeft;
				coins[i].y	= $box.offsetTop;
				coins[i].el.style.transform	= 	"translateX("+ coins[i].x +"px) ";
				coins[i].el.style.transform	+= 	"translateY("+ coins[i].y +"px) ";
			}
			else { // coins explode
				coins[i].x += Math.cos(coins[i].direction) * time/(coins[i].speed)+1;  
				coins[i].y += Math.sin(coins[i].direction) * time/(coins[i].speed)+1; 
				coins[i].el.style.transform	= 	"translateX("+ coins[i].x +"px) ";
				coins[i].el.style.transform	+= 	"translateY("+ coins[i].y +"px) ";
			}
			if( time > 5000 ) { // delete hidden
				coins[i].el.parentElement.removeChild(coins[i].el);
				coins.splice(i, 1);
			}
		}
		if(coins.length > 0) {
			raf = requestAnimationFrame(step);
		}
	}//end step

}

/*function animation(parts, el, initFlag, modif, modifFlag, callback){
	for(var i in parts){
		el = s.select( parts[i] + initFlag);
		modif = document.querySelector(parts[i] + modifFlag).getAttribute("d");
		el.node.style.visibility = "visible";
		el.animate(
			{ d: modif }, 
			1000, 
			mina.easeinout,
			callback()
		);
	}
}*/

function eatingAnim(){
	var parts = ["#mouth_hole", "#mouth", "#cheek_left", "#cheek_right", "#ear_right", "#ear_left", "#ear_right_hole", "#ear_left_hole"];
	/*			animation(parts, open, "_open", eating, "_eating", function(){
				animation(parts, eating, "_eating", open, "_open", function(){});
			});*/

	function triggerAnim(open, path, delay){
		setTimeout(function(){
			open.animate(
				{ d: path }, 
				750, 
				mina.easeinout
			);
		}, delay);
	}

	for(var i in parts){
		var eatingPath = document.querySelector(parts[i] + "_eating").getAttribute("d");
		var openPath = document.querySelector(parts[i] + "_open").getAttribute("d");
		var open = s.select( parts[i] + "_open");
		triggerAnim(open, eatingPath, 0);
		triggerAnim(open, openPath, 750);
	}
	setInterval(function(){ eatingAnim(); }, 1500);
}

