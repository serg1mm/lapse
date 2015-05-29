		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			// switch wireframe

			// random background color

			function ran_col() {
                var color = '#';
                var letters = ['ef4437','e71f63','8f3e97','65499d','4554a4','478fcc','38a4dc','09bcd3', '009688','4cae4e','8bc248','cddc37','feea39','fdc010','f8971c','f0592b','607d8b', '795548'];
                color += letters[Math.floor(Math.random() * letters.length)];

                return color;
            }

			// prepare three.js

			var container;
			var camera, controls, scene, renderer;

			init();
			render();

			function animate() {

				requestAnimationFrame(animate);
				controls.update();
				if(dragging && !dragging2){ controls.inertiaFunction(); }

			}

			function init() {

				var def_col = ran_col();

				// color frontal layout

				var meta = document.createElement('meta');
				meta.name = "theme-color";
				meta.content = def_col;
				document.getElementsByTagName('head')[0].appendChild(meta);

				document.getElementById("mainheader", "fab1").style.backgroundColor = def_col;

				// create scene

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 900;

				controls = new THREE.OrbitControls( camera );
				controls.damping = 0.2;
				controls.addEventListener( 'change', render );

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( def_col, 0.0009 );
				bg = document.body.style;


				var light, geometry, material, mesh;


				// random convex

				materials = [
					new THREE.MeshLambertMaterial( { color: def_col, shading: THREE.FlatShading } ) // material random color
				];

				points = [];
				for ( var i = 3; i < 100; i ++ ) {

					points.push( randomPointInSphere( 100 ) ); // scale

				}

				object = THREE.SceneUtils.createMultiMaterialObject( new THREE.ConvexGeometry( points ), materials );
				scene.add( object );


				// lights

				light = new THREE.DirectionalLight( def_col, 0.5 );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				light = new THREE.DirectionalLight( def_col, 0.5 );
				light.position.set( -1, -1, -1 );
				scene.add( light );

				// renderer

				renderer = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
				renderer.setClearColor( 0x000000, 0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );
				animate();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}


			function randomPointInSphere( radius ) {

				return new THREE.Vector3(
					( Math.random() - 0.5 ) * Math.floor(Math.random() * Math.floor(Math.random() * 4) + 1) * radius,
					( Math.random() - 0.5 ) * Math.floor(Math.random() * Math.floor(Math.random() * 4) + 1) * radius,
					( Math.random() - 0.5 ) * Math.floor(Math.random() * Math.floor(Math.random() * 4) + 1) * radius
				);

			}

			function render() {

				renderer.render( scene, camera );
				stats.update();

			}