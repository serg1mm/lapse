$(window).load(function() {
	    $("#fab1").click(function(){

			shortAndSharp(1); 
			$("#fab1").addClass('hidden');
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
	    	//window.open('index.html','_parent');
	    });
	
});
