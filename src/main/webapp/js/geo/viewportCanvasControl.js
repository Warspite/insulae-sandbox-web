define(["dojo/dom", "dojo/dom-class", "insulae/server", "geo/areaControl"], function(dom, domClass, srv, areaControl) {
    var canvas = dom.byId("viewportCanvas");
    var ctx = canvas.getContext("2d");
    var locationGraphics = new ObjectContainer(0);
    var renderer = new Renderer(canvas, ctx, 40, "#ff0000");
    var locationTypes = {};
    
    renderer.addChild(locationGraphics);
    
    areaControl.addAreaSelectionListener(function(area) { 
		locationGraphics.clearChildren();
    	
		if( area != null ) {
    		srv.get("geography/Location", { "areaId": area.id }, locationsLoaded);
    	}
    });
    
    srv.get("geography/LocationType", {}, function(result) {
    	locationTypes = srv.mapify(result.content.locationTypes);
    });
    
    function locationsLoaded(result) {
    	for(i in result.content.locations) {
    		locationGraphics.addChild(new LocationObject(result.content.locations[i], locationTypes));
    	}
    }
    
    return {
    };
});
