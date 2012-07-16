define(["dojo/dom", "insulae/server", "insulae/sessionKeeper"], function(dom, srv, sessionKeeper) {

	var avatarManagementContainer = null;
	var realms = {};
	var avatars = {};
	var races = null;
	sessionKeeper.addSessionChangeListener(refreshAvatarListing);
	
	srv.get("world/Realm", {}, getRealmsFailed, getRealmsSucceeded);
	
	function getRealmsFailed(result) {
		alert("Failed to retrieve realm list from server: " + result.message);
	}
    
	function getRealmsSucceeded(result) {
		realms = {};
		for(i in result.content.realms) {
			realms[result.content.realms[i].id] = result.content.realms[i];
		}
	}
	
    function getAvatarsFailed(result) {
    	output("Failed to retrieve avatars: " + result.message);
    }
    
    function getAvatarsSucceeded(result) {
    	avatars = result.content.avatars;
		refreshAvatarCreationForm();
    }
    
    function getRacesFailed(result) {
    	output("Failed to retrieve races: " + result.message);
    }
    
    function getRacesSucceeded(result) {
    	races = result.content.races;
		refreshAvatarCreationForm();
    }
    
    function refreshAvatarCreationForm() {
		var avatarPrintout = "";
		for(i in avatars) {
			avatarPrintout += avatars[i].name + " (" + realms[avatars[i].realmId].name + ")<br />";
		}
		
		var avatarCreationForm = "email: <input type='text' id='createAvatar-name'/><br />" +
			"realm: <select id='createAvatar-realm' onChange=\"require(['dojo/dom', 'insulae/world'], function(dom, world) {" + 
				"world.getRaces(parseInt(dom.byId('createAvatar-realm').value));" +
			"});\">";
			
		var firstListedRealm = null;
		for(i in realms) {
			var avatarAlreadyExistsInRealm = false;
			for(j in avatars) {
				if(avatars[j].realmId == realms[i].id) {
					avatarAlreadyExistsInRealm = true;
				}
			}
			
			if(!avatarAlreadyExistsInRealm) {
				if(firstListedRealm == null)
					firstListedRealm = realms[i];
					
				avatarCreationForm += "<option value=" + i + ">" + realms[i].name + "</option>";
			}
		}
		
		avatarCreationForm += "</select><br />";
		
		avatarCreationForm += "race: <select id='createAvatar-race'>";
		
		if(races != null) {
			for(i in races) {
				avatarCreationForm += "<option value=" + races[i].id + ">" + races[i].name + "</option>";
			}
		}
		else {
			innerGetRaces(firstListedRealm.id);
		}
		 
		avatarCreationForm += "</select><br />";
		
		avatarCreationForm += "<button onClick=\"require(['dojo/dom', 'insulae/world'], function(dom, world) {" + 
				"world.createAvatar(dom.byId('createAvatar-name').value, dom.byId('createAvatar-realm').value, dom.byId('createAvatar-race').value, dom.byId('createAvatar-sex').value);" +
			"});\">" +
			"Create new avatar" +
		"</button>";
		
    	output("Your current avatars: <br />" + avatarPrintout + "<br />" + avatarCreationForm);
    }
    
    function refreshAvatarListing() {
    	var session = sessionKeeper.getSession();
    	if(session == null) {
    		output("Listing no characters when logged out.");
    		return;
    	}
    	
    	output("Let's list some characters for account " + session.id + "...");
    	srv.get("world/Avatar", {"accountId": session.id}, getAvatarsFailed, getAvatarsSucceeded);
    }
    
    function output(html) {
    	if(avatarManagementContainer == null) {
    		alert("Avatar management field is undefined!");
    		return;
		}
    		
    	avatarManagementContainer.innerHTML = html;
    }
    
    function innerGetRaces(realmId) {
		srv.get("world/Race", {"realmId": realmId}, getRacesFailed, getRacesSucceeded);    
    }
    
    return {
        setAvatarManagementContainer: function(container) {
        	avatarManagementContainer = container;
        },

        createAvatar: function(name, realmId, raceId, sexId) {
        	console.log("Create avatar " + name + " " + realmId + " " + raceId + " " + sexId); 
        },
        
		getRaces: function(realmId) {
        	 innerGetRaces(realmId);
        }
        
    };
});
