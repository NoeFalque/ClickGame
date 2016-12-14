
var s = Snap("#client");

var man = Snap.load("man6.svg", function (f) {
	var g = f.select("svg");
	s.append(g);
});

var duration = 1000;
var maxClicks = 5;

var step = duration / maxClicks;
var anims = [];
var clicks = 0;

document.querySelector("#client").addEventListener("mousedown", function(){
	if(clicks >= maxClicks){
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
		document.querySelector("#thin").classList.add("destroyed");
	}, 100);

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
}
setInterval(function(){ eatingAnim(); }, 1500);

