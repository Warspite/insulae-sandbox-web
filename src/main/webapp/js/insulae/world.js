define(["dojo/dom", "insulae/server", "insulae/sessionKeeper"], function(dom, srv, sessionKeeper) {

	var avatarManagementContainer = null;
	var realms = {};
	var avatars = {};
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
    	output("Failed to retrieve avatars: " + result.messsage);
    }
    
    function getAvatarsSucceeded(result) {
    	avatars = result.content.avatars
		var avatarPrintout = "";
		for(i in avatars) {
			avatarPrintout += avatars[i].name + " (" + realms[avatars[i].realmId].name + ")<br />";
		}
		
		var avatarCreationForm = "email: <input type='text' id='createAvatar-name'/><br />" +
			"realm: <select id='createAvatar-realm'/>";
			
		for(i in realms) {
			var avatarAlreadyExistsInRealm = false;
			for(j in avatars) {
				if(avatars[j].realmId == realms[i].id) {
					avatarAlreadyExistsInRealm = true;
				}
			}
			
			if(!avatarAlreadyExistsInRealm) {
				avatarCreationForm += "<option value=" + i + ">" + realms[i].name + "</option>";
			}
		}
			
		avatarCreationForm += "</select><br />" +
			"<button onClick=\"require(['dojo/dom', 'insulae/world'], function(dom, world) {" + 
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
    
    return {
        setAvatarManagementContainer: function(container) {
        	avatarManagementContainer = container;
        },

        createAvatar: function(name, realmId, raceId, sexId) {
        	console.log("Create avatar " + name + " " + realmId + " " + raceId + " " + sexId); 
        }
    };
});
