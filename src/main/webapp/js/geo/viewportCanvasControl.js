define(["dojo/dom", "dojo/dom-class", "insulae/server", "geo/areaControl"], function(dom, domClass, srv, areaControl) {
    var canvas = dom.byId("viewportCanvas");
    var locations = {};
    
    areaControl.addAreaSelectionListener(function(area) { 
    	if( area == null ) {
    		locations = {};
    		renderLocations();
    	}
    	else {
    		srv.get("geography/Location", { "areaId": area.id }, locationsLoaded);
    	}
    });
    
    function locationsLoaded(result) {
    	locations = srv.mapify(result.content.locations);
    	renderLocations();
    }
    
	function renderLocations(){
		var ctx = canvas.getContext("2d");
		ctx.setTransform(1.0, 0.0, 0.0, 1.0, 1.0, 1.0);
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#ffffff";
		console.log("Canvas size: " + canvas.width + "x" + canvas.height);
		for(i in locations) {
			ctx.save();
			ctx.translate(locations[i].coordinatesX * 16, locations[i].coordinatesY * 16);
			ctx.fillRect(-7, -7, 14, 14);
			ctx.restore();
		}
	}

    return {
    };
});
