<!DOCTYPE html>
<html>
<head>
	<title>l a p s e n s e</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes" />

	<link rel="manifest" href="/manifest.json">

	<script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
	<script type="text/javascript" src="js/haptic/haptic.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>

	<link rel="import" href="bower_components/core-toolbar/core-toolbar.html">
	<link rel="import" href="bower_components/core-menu/core-menu.html">
	<link rel="import" href="bower_components/core-item/core-item.html">
	<link rel="import" href="bower_components/core-header-panel/core-header-panel.html">
	<link rel="import" href="bower_components/core-drawer-panel/core-drawer-panel.html">
	<link rel="import" href="bower_components/core-icons/core-icons.html">
	<link rel="import" href="bower_components/paper-icon-button/paper-icon-button.html">
	<link rel="import" href="bower_components/font-roboto/roboto.html">
	<link rel="import" href="bower_components/google-map/google-map.html">
	<link rel="import" href="bower_components/geo-location/geo-location.html">
	<link rel="import" href="bower_components/core-selector/core-selector.html">
	<link rel="import" href="bower_components/core-image/core-image.html">
	<link rel="import" href="bower_components/paper-item/paper-item.html">
	<link rel="import" href="bower_components/paper-input/paper-input.html">
	<link rel="import" href="bower_components/paper-fab/paper-fab.html">

	<link rel="stylesheet" type="text/css" href="css/style.css">



</head>

<body fullbleed unresolved>
<geo-location watchpos></geo-location>

<!-- sidemenu + frontal layer -->

<script>
document.addEventListener('polymer-ready', function() {
  var navicon = document.getElementById('navicon');
  var drawerPanel = document.getElementById('drawerPanel');
  navicon.addEventListener('click', function() {
    drawerPanel.togglePanel();
  });

});
</script>

<?php 
	$zoomMap = 14;
	if(isset($_POST['zoomMap']) && $_POST['zoomMap']>14){
		//$zoomMap = $_POST['zoomMap'];
		//$_POST['zoomMap']=14;
		//echo $_POST['zoomMap'];
	}
?>
<div id="coreApp">
	<core-drawer-panel id="drawerPanel" drawerWidth="300px">
		<!-- sidemenu -->

		<core-header-panel mode="waterfall-tall" drawer style="background-color: #eaeaea; ">
			<?php include('slidemenu.php'); ?>
		</core-header-panel>

		<!-- frontal layer -->

		<core-header-panel main mode="seamed" id='mainPanel'>
			<core-toolbar id="mainheader" style="color:white" >
				<paper-icon-button id="navicon" icon="menu"></paper-icon-button>
				<form method='post' action="index.php" id='form'>
					<input type="text" value="17" class="hidden" name='zoomMap'>
					<paper-icon-button id="cancel" icon="clear" class="hidden" onclick="document.getElementById('form').submit();"></paper-icon-button>
				</form>
				<paper-input-decorator class="custom" label="#yourhastag"><input id="i1" is="core-input" maxlength="20" type="search">
					<paper-char-counter class="counter" target="i1"></paper-char-counter>
				</paper-input-decorator>
				<paper-icon-button id="refresh" icon="refresh" onclick="window.open('index.php','_parent');"></paper-icon-button>
				<paper-icon-button id="accept" icon="done" class="hidden"></paper-icon-button>
			</core-toolbar>


			<!-- threejs random geometry -->

			<div id="container"></div>
			<script src="js/threejs/three.min.js"></script>
			<script src="js/threejs/geometries/ConvexGeometry.js"></script>
			<script src="js/threejs/libs/OrbitControls.js"></script>
			<script src="js/threejs/Detector.js"></script>
			<script src="js/threejs/lapse_color.js"></script>

			<!-- capture button -->
			<div class="capture">
				<paper-fab id="fab1" icon="polymer"></paper-fab>
				<paper-icon-button id="iconList" icon="menu"></paper-icon-button>
			</div>

		</core-header-panel>

	</core-drawer-panel>
	<!-- map -->

	<div class="map" >
		<template is="auto-binding">
	    	<geo-location latitude="{{lat}}" longitude="{{lng}}" watchpos highaccuracy></geo-location>
	   		<google-map latitude="{{lat}}" longitude="{{lng}}" minZoom="<?php echo $zoomMap ?>" maxZoom="<?php echo $zoomMap ?>" disableDefaultUI showCenterMarker fit></google-map>
	   	</template>
	</div>
</div>
	<!-- List of old captures-->
	<div id='listLateral'>
		<div id='lateral'>
			<div id="listHeader">
			    <paper-icon-button id="back" icon="arrow-back"></paper-icon-button>
			</div>
			<div id='theList'>
				<?php include('list.php'); ?>
			</div>
		</div>
	</div>

	<script src="js/captureButtonProcess.js"></script>

</body>