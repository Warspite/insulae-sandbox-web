define(["dojo/dom", "dojo/dom-class", "insulae/server", "geo/accountControl"], function(dom, domClass, srv, accountControl) {
    var areaChoiceList = dom.byId("areaChoiceList"); 
    var areaSelectionListeners = new Array(0);
    var lastSelectedAreaId = null;
    
    var areas = {}; 
    
    accountControl.addAvatarSelectionListener(function(avatar) {
    	if( avatar == null ) {
    		areas = {};
    		updateAreaChoiceList();
    	}
    	else {
    		srv.get("geography/Area", { "realmId": avatar.realmId }, areasLoaded);
    	}
    });
    
    function updateAreaChoiceList() {
		html = "";
		
		for(i in areas) {
			html += "<li id=\"areaChoice" + areas[i].id + "\"><a onClick=\"require(['geo/areaControl'], function(ac) { ac.selectArea(" + areas[i].id + ");});\"><span>View " + areas[i].name + "</span>" + areas[i].name + "</a></li>";
		}
		
		areaChoiceList.innerHTML = html;
    }
    
    function areasLoaded(result) {
    	areas = srv.mapify(result.content.areas);
    	updateAreaChoiceList();
    }
    
    return {
        selectArea: function(areaId){
        	var previouslyActiveAreaChoice = dom.byId("areaChoice" + lastSelectedAreaId); 
        	if( previouslyActiveAreaChoice != null ) {
        		domClass.remove(previouslyActiveAreaChoice, "active");
        	}
        	
        	domClass.add(dom.byId("areaChoice" + areaId), "active");
        	
        	for (var i in areaSelectionListeners) {
				areaSelectionListeners[i](areas[areaId]);
			}
			
			lastSelectedAreaId = areaId;
        },
        
        addAreaSelectionListener: function(callback) {
        	areaSelectionListeners.push(callback);
        }
        
    };
});
