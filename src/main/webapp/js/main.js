require(["dojo/dom", "insulae/sessionKeeper"], 
	function(dom, sessionKeeper) {
		sessionKeeper.addSessionChangeListener(function(newSession) {
			if(newSession == null) {
				dom.byId("sessionStatus").innerHTML = "Not logged in";
			}
			else {
				dom.byId("sessionStatus").innerHTML = "Logged in"; 
			}

			dom.byId("login-button").disabled = (newSession != null);
			dom.byId("createAccount-button").disabled = (newSession != null);
			dom.byId("logout-button").disabled = (newSession == null);
		});
	}
);
