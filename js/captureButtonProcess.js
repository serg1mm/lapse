$(window).load(function() {
	    $("#fab1").click(function(){

			shortAndSharp(1); 
			$("#fab1").addClass('hidden');
			$("#iconList").addClass('hidden');
			$("#navicon").addClass('hidden');
			$("#refresh").addClass('hidden');
			$("#accept").removeClass('hidden');
			$("#cancel").removeClass('hidden');
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			// prepare three.js

			var container;
			var camera, controls, scene, renderer;

			var def_col = ran_col();

			var points = init(def_col);

			creatObject3D(points,def_col);
			render();
	        
	    });

	    $('#accept').click(function(){
	    	window.open('index.php','_parent');
	    });
	
});

jQuery(document).ready(function () {
	jQuery("#iconList").click(function () {
		jQuery("#drawerPanel").animate({"width": ["0%", 'easeOutExpo']}, {
	        duration: 700
	    });

	    $('#mainheader').addClass('hidden');
	    $('.capture').addClass('hidden');
	    jQuery("#listLateral").animate({"marginLeft": ["-1px", 'easeOutExpo']}, {
	        duration: 700
	    });
	    jQuery(".map").animate({"opacity": ["0", 'easeOutSine']}, {
	        duration: 700
	    });
	});
	jQuery("#myList").click(function () {
		jQuery("#drawerPanel").animate({"width": ["0%", 'easeOutExpo']}, {
	        duration: 700
	    });
  		var drawerPanel = document.getElementById('drawerPanel');
  		sleep(200);
    	drawerPanel.togglePanel();

	    $('#mainheader').addClass('hidden');
	    $('.capture').addClass('hidden');
	    jQuery("#listLateral").animate({"marginLeft": ["-1px", 'easeOutExpo']}, {
	        duration: 700
	    });
	    jQuery(".map").animate({"opacity": ["0", 'easeOutSine']}, {
	        duration: 700
	    });
	});
	jQuery("#back").click(function () {
		jQuery("#drawerPanel").animate({"width": ["100%", 'easeOutExpo']}, {
	        duration: 700
	    });
	    jQuery(".map").animate({"opacity": ["1", 'easeOutSine']}, {
	        duration: 700
	    });
	    $('#mainheader').removeClass('hidden');
	    $('.capture').removeClass('hidden');
	    jQuery("#listLateral").animate({"marginLeft": ["100%", 'easeOutExpo']}, {
	        duration: 700
	    });
	});
});
/*
function showList(){
	//set margin for the whole container with a jquery UI animation
    $("#coreApp").animate({"marginRight": ["100%", 'easeOutExpo']}, {
        duration: 700
    });
	$('#coreApp').addClass('hidden');
	$("#listLateral").removeClass('hidden');
}

function goBack(){
	$('#coreApp').removeClass('hidden');
	$("#listLateral").addClass('hidden');
}
*/