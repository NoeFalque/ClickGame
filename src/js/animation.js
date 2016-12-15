
// function RANDOM
function rdm(rMin, rMax) {
	return ~~((Math.random()*(rMax-rMin+1))+rMin);
}
// Character CONSTRUCTOR
var Character = function() {
	this.colors  			= {};
	this.hairShape 		= rdm(0,2);
	this.colors.hair	= rdm(0,3);
	this.colors.top		= rdm(0,3);
	this.colors.skin	= rdm(0,3);
	this.colors.legs	= rdm(0,2);

	this.totalLife = rdm(10,50);
	this.currentLife = this.totalLife;

	this.eaten = {};
	this.likes = rdm(1,3);
	console.log('Character Ready !');
}

function createClient(){

	// initialize Snap SVG

	var $client = document.querySelector("#client");
	var s = Snap("#client");

	var man = Snap.load("man8.svg", function(f) {
		var g = f.select("svg");
		s.append(g);
		var $svg = document.querySelector("svg");

		initClient();

		eatingAnim();
	});


	// globals & settings
	var nbCoins = 20;

	var duration = 1000;
	var maxClicks = 5;

	function initClient(){

		var character = new Character();

		//svg hairs :
		var hairs = $client.querySelectorAll("path[id^=hair]");
		for(var i=0; i<hairs.length; i++){
			hairs[i].style.visibility = "hidden";
		}
		hairs[character.hairShape].style.visibility = "visible";

		// colors :
		var colors = {
			hair : {
				els: $client.querySelectorAll("path[id^=hair]"),
				cols: ["#ef763a", "#fcd73d", "#8d4d2a"]
			},
			top : {
				els: [	
					$client.querySelector("#shirt_thin"),
					$client.querySelector("#arm_left_thin"),
					$client.querySelector("#arm_right_thin")
				],
				cols: ["#ed4848", "#3d661a", "#0b8389", "#1f0549"]
			},
			skin : {
				els: [	
					$client.querySelector("#skin_body_thin"),
					$client.querySelector("#neck_thin"),
					$client.querySelector("#cheek_left_open"),
					$client.querySelector("#cheek_right_open"),
					$client.querySelector("#ear_left_open"),
					$client.querySelector("#ear_right_open"),
					$client.querySelector("#face"),
				],
				cols: ["#f4dbc6", "#c9a281", "#fdcc7a", "#fcee6d"]
			},
			legs : {
				els: [	
					$client.querySelector("#jean_thin")
				],
				cols: ["#3d342d", "#9cbdef", "#4a94ff"]
			}
		}
		var parts = Object.keys(colors); // body parts names in colors
		var partsChar = Object.keys(character.colors); // body parts names in character
		for(var i=0; i<parts.length; i++){ // for each part in colors

			var elements = colors[parts[i]].els;
			var colorsHex = colors[parts[i]].cols;
			var colorId = character.colors[partsChar[i]];
			for(var iEl=0; iEl<elements.length; iEl++){
				elements[iEl].style.fill = colorsHex[colorId];
			}

		}

	}

	// detect click

	var step = duration / maxClicks,
			anims = [],
			clicks = 0,
			disabled = false;
	$client.addEventListener("click", function(){
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
		var parts = ["#shirt","#jean","#skin", "#skin_body", "#arm_left", "#arm_right", "#navel", "#shoe_top_left", "#sole_left", "#shoe_top_right", "#sole_right"];

		for(var i in parts){
			var fat = s.select( parts[i] + "_thin");
			console.log(parts[i]);
			var exploded = document.querySelector(parts[i] + "_exploded").getAttribute("d");
			fat.animate({ d: exploded }, 500, mina.easeout);
		}
		setTimeout(function(){
			var remains = s.select("#thin");
			remains.animate({ opacity: "0"}, 100, mina.easein);
			setTimeout(function(){ remains.attr({ display: "none" })}, 100);
		}, 100);
		//		var remains = s.select("#thin");
		//		remains.animate({ opacity: "0"}, 200, mina.easein);

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

		// initialize coins
		for(var i=0; i< nbCoins; i++){

			var coin = {};
			var $navel = document.querySelector("#navel_thin");
			coin.x = $navel.getBoundingClientRect().left;
			coin.y = $navel.getBoundingClientRect().top;
			coin.direction = (Math.random()*Math.PI*2)-Math.PI;
			coin.speed = 30+ 70*i/nbCoins;
			//			coin.remove = function(){
			//				$client.removeChild(coin.el);
			//			}
			coins.push(coin);

			coins[i].el = document.createElement("img");
			$client.appendChild(coins[i].el);
			coins[i].el.classList.add("coin");
			coins[i].el.setAttribute("src", "src/images/coin.png");

		}

		var limit = $navel.getBoundingClientRect();
		var $box = document.querySelector("#coinBox");
		var raf;
		var delay;
		clearTimeout(delay);
		delay = setTimeout(function(){ raf = window.requestAnimationFrame(step) }, 200);

		function step(time){

			//			console.log("step");

			for(var i in coins){

				if(	//coins go to the box
					coins[i].x > limit.right 	+ 200 ||
					coins[i].y > limit.bottom + 200 ||
					coins[i].x < limit.left 	- 200 ||
					coins[i].y < limit.top		- 200  
				) {
					coins[i].el.style.transition = "1s";
					coins[i].x = $box.offsetLeft;
					coins[i].y = $box.offsetTop;
					coins[i].el.style.transform	= 	"translateX("+ coins[i].x +"px) ";
					coins[i].el.style.transform	+= 	"translateY("+ coins[i].y +"px) ";

					var timeoutDuration = Math.floor(1000 / nbCoins);
					setTimeout(function(){ coins.splice(i, 1) }, timeoutDuration);
				}

				else { // coins explode
					coins[i].x += Math.cos(coins[i].direction) * time/(coins[i].speed)+1;  
					coins[i].y += Math.sin(coins[i].direction) * time/(coins[i].speed)+1; 
					coins[i].el.style.transform	= 	"translateX("+ coins[i].x +"px) ";
					coins[i].el.style.transform	+= 	"translateY("+ coins[i].y +"px) ";
				}

			}

			//			console.log(coins.length);
			if(coins.length > 0) {
				raf = window.requestAnimationFrame(step);
			}

			else {
				console.log("stop");
				$client.innerHTML = "";
				window.cancelAnimationFrame(raf);
				createClient();
				return;
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
		if( !document.querySelector("svg") ) return;
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

}
createClient();

