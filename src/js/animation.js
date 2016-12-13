

//var s = Snap("#thin");


var s = Snap("#svg");

var man = Snap.load("man5.svg", function (f) {
	var g = f.select("svg");
	s.append(g);
	fatAnim();
	explosionAnim();
} );


function fatAnim(){
	var parts = ["#shirt","#jean","#skin", "#skin_body", "#neck", "#neck_shadow", "#arm_left", "#arm_right"];

	for(var i in parts){
		var thin = s.select( parts[i] + "_thin");
		var fat = document.querySelector(parts[i] + "_fat").getAttribute("d");
		//	thin.node.style.visibility = "visible";
		thin.animate({ d: fat }, 3000, mina.backout);
	}
}


function explosionAnim(){
	setTimeout(function(){
		var parts = ["#shirt","#jean","#skin", "#skin_body", "#neck", "#neck_shadow", "#arm_left", "#arm_right", "#navel", "#shoe_top_left", "#sole_left", "#shoe_top_right", "#sole_right", "#eyebow_left", "#eyebow_right"];

		for(var i in parts){
			var fat = s.select( parts[i] + "_thin");
			var exploded = document.querySelector(parts[i] + "_exploded").getAttribute("d");
			fat.animate({ d: exploded }, 300, mina.easeout);
		}

	}, 3000);
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

	function doSetTimeout(open, openPath){
		setTimeout(function(){
			open.animate(
				{ d: openPath }, 
				750, 
				mina.easeinout
			);
		}, 750);
	}

	for(var i in parts){

		var eatingPath = document.querySelector(parts[i] + "_eating").getAttribute("d");
		var openPath = document.querySelector(parts[i] + "_open").getAttribute("d");

		var open = s.select( parts[i] + "_open");
		open.animate(
			{ d: eatingPath }, 
			750, 
			mina.easeinout
		);
		doSetTimeout(open, openPath);
	}
}
setInterval(function(){ eatingAnim(); }, 1500);

