var video = document.querySelector('#video');
var cPallete = document.querySelector("#doit");


video.addEventListener('click', takeimage, true);
cPallete.addEventListener('click', takeimage, true);

//---------------

 //normalize window.URL
  window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);

  //normalize navigator.getUserMedia
  navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
  //detect if {video: true} or "video" style options
  //by creating an iframe and blowing it up
  //style jacked from @kangax
  var optionStyle = (function(win){
    //only test if there's something to test
    if (!navigator.getUserMedia) return;

    var el = document.createElement('iframe'),
    root = document.body || document.documentElement,
    string = true, object = true, nop = function(){};
    root.appendChild(el);
    
    var f = win.frames[win.frames.length-1];

    f.navigator.getUserMedia || (f.navigator.getUserMedia = f.navigator.webkitGetUserMedia || f.navigator.mozGetuserMedia || f.navigator.msGetUserMedia);

    try { //try it with spec syntax
      f.navigator.getUserMedia({video: true}, nop);
    } catch (e) {
      object = false;
      try { //try it with old spec string syntax
        f.navigator.getUserMedia("video", nop);
      } catch (e) { //neither is supported
        string = false;
      }
    } finally { //clean up
      root.removeChild(el);
      el = null;
    }
      
    return {string: string, object: object}
  })(window),
  
  //normalize the options object to a string
  //if that's the only thing supported
  norm = function(opts){ // has to be {video: false, audio: true}. caveat emptor.
    var stringOptions = [];

    if (optionStyle.string && !optionStyle.object) {
      //pluck the "true"s
      for (var o in opts) {
        if (opts[o] == true) {
          stringOptions.push(o);
        }
      }
      return stringOptions.join(" ");
    } else {

    //really, this will blow up if you pass it {video: true, rofl: "copter"}. so don't. 
    return opts; 
    }
  }, 

  hollaback = function(stream) {
    video.src = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(stream) : stream;   
  };

  
  if (navigator.getUserMedia) {
    navigator.getUserMedia(norm({video: true, audio: false}), hollaback, not_supported);
  }
  else 
  {alert('Browser does not support getUserMedia!');}


// ----------------

function not_supported(){
	var vid_c = document.querySelector("#video_container");
	vid_c.innerHTML = "It seems this browser does not support <code>navigator.getUserMedia()<\/code>, please use a browser which does in order to see this demo in action.";
	cPallete.className = "hide";
}

function v_success(stream){
	video.src = stream;
}

function v_error(error){
	console.log("Error! Error code is:"+error.code);
}

function takeimage(){
var canvas = document.querySelector('#mycanvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;
var pixelCount = cw*ch;
ctx.drawImage(video, 0, 0, cw, ch);
var pixels = ctx.getImageData(0, 0, cw, ch).data;
//otherColors(pixels, pixelCount);
dominantColor(pixels, pixelCount);
}

function dominantColor(pixels, pixelCount) {
	var pixelArray = [];
	for (var i = 0; i < pixelCount; i++) {  
		// If pixel is mostly opaque and not white
		if(pixels[i*4+3] >= 125){
			if(!(pixels[i*4] > 250 && pixels[i*4+1] > 250 && pixels[i*4+2] > 250)){
	   			pixelArray.push( [pixels[i*4], pixels[i*4+1], pixels[i*4+2]]);
			}
		}
	}

	// Send array to quantize function which clusters values
	// using median cut algorithm
	var cmap = MMCQ.quantize(pixelArray, 16);
	var newPalette = cmap.palette();
	
	var colorArray = {"r": newPalette[0][0], "g": newPalette[0][1], "b": newPalette[0][2]};
	
		var colors = document.querySelector("#colors");
		var thediv = document.createElement('div');
		thediv.className = 'othercolors';
	var colors = ['#aaffee','#cc44cc','#00cc55','#0000aa'];
	var rgb = ['+colorArray.r+','+colorArray.g+','+colorArray.b+'];
	var best = 768;
	var canvasColor = colors[0];
	for (i=0; i< colors.length; i++){
    	t = 0;
		for (j=0; j<3; j++){
        	t += Math.abs(rgb[j] - parseInt(colors[i].substring(j*2+1,j*2+3), 16));
			}
			if (t < best){
				best = t;
				canvasColor = colors[i];
				}   
			}
		thediv.setAttribute('style', "background-color:rgb("+colorArray.r+","+colorArray.g+","+colorArray.b+");");
		colorlist.appendChild(thediv);
	
}
