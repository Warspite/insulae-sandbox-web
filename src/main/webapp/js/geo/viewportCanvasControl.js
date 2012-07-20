define(["dojo/dom", "dojo/dom-class", "insulae/server", "geo/areaControl"], function(dom, domClass, srv, areaControl) {
    var canvas = dom.byId("viewportCanvas");
    var ctx = canvas.getContext("2d");
    var renderer = new Renderer(canvas, ctx, "#ff0000");
	var mouse = new Mouse(canvas, renderer);
	var keyboard = new Keyboard(); 
	var cameraController = new CameraController(keyboard, mouse, renderer);
    
    var locationGraphics = new ObjectContainer(0);
    renderer.addChild(locationGraphics);
	
    var locationTypes = {};
    
    areaControl.addAreaSelectionListener(function(area) { 
		locationGraphics.clearChildren();
    	
		if( area != null ) {
    		srv.get("geography/Location", { "areaId": area.id }, locationsLoaded);
    	}
    });
    
    srv.get("geography/LocationType", {}, function(result) {
    	locationTypes = srv.mapify(result.content.locationTypes);
    });
    
    var ticker = new Ticker(25);
    ticker.addListener(renderer);
    ticker.addListener(cameraController);
    ticker.addListener(keyboard);
    ticker.addListener(mouse);
    
    function locationsLoaded(result) {
    	for(i in result.content.locations) {
    		locationGraphics.addChild(new LocationObject(result.content.locations[i], locationTypes));
    	}
    }
    
    return {
    };
});

