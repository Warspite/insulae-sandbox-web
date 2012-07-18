define(["dojo/dom", "dojo/dom-class", "insulae/server", "insulae/sessionKeeper"], function(dom, domClass, srv, sessionKeeper) {
    var accountWindow = dom.byId("accountWindow"); 
    var loginView = dom.byId("loginView"); 
    var avatarsView = dom.byId("avatarsView");
    var avatarSelectionListeners = new Array(0);
    
    var avatars = null; 

    sessionKeeper.addSessionChangeListener(function(newSession) { 
    	if( newSession == null ) {
    		avatars = null;
    		displayLoginView();
    	}
    	else {
    		srv.get("world/Avatar", { "accountId": newSession.id }, avatarsLoaded);
    	}
    });
    
    function loginSucceeded(result) {
    	sessionKeeper.setSession({"id": result.content.id, "key": result.content.key});
    }
    
    function avatarsLoaded(result) {
    	avatars = srv.mapify(result.content.avatars);
    	displayAvatarsView(avatars);
    }
    
	function displayLoginView(){
        	domClass.add(loginView, "displayBlock");
        	domClass.remove(loginView, "displayNone");
        	domClass.add(avatarsView, "displayNone");
        	domClass.remove(avatarsView, "displayBlock");
	}

	function displayAvatarsView(avatars){
		domClass.add(avatarsView, "displayBlock");
		domClass.remove(avatarsView, "displayNone");
		domClass.add(loginView, "displayNone");
		domClass.remove(loginView, "displayBlock");

		html = "Characters: </br>";
		
		for(i in avatars) {
			html += "<a onClick=\"require(['geo/accountControl'], function(ac) { ac.selectAvatar(" + avatars[i].id + "); });\">" + avatars[i].name + "</a></br>";
		}
		
		avatarsView.innerHTML = html;
	}

    return {
        login: function(email, password){
       		srv.put("account/Session", { "email": email, "password": password }, loginSucceeded);
        },

        show: function(){
        	domClass.add(accountWindow, "displayBlock");
        	domClass.remove(accountWindow, "displayNone");
        },
        
        hide: function(){
        	domClass.remove(accountWindow, "displayBlock");
        	domClass.add(accountWindow, "displayNone");
        },
        
        selectAvatar: function(avatarId){
        	for (var i in avatarSelectionListeners) {
				avatarSelectionListeners[i](avatars[avatarId]);
			}
        },
        
        addAvatarSelectionListener: function(callback) {
        	avatarSelectionListeners.push(callback);
        }
    };
});
