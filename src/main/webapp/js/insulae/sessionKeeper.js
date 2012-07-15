define([], function(){
	var session = null;
	var sessionChangeListeners = new Array(0);
	
    return {
        setSession: function(newSession) {
        	session = newSession;
        	for (var i = 0; i < sessionChangeListeners.length; i++) {
				sessionChangeListeners[i](session);
			}
        },
        
        addSessionChangeListener: function(callback) {
        	sessionChangeListeners.push(callback);
        },
        
        getSession: function() {
        	return session;
        }
	};
});
