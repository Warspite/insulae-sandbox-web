define(["dojo/dom", "insulae/server", "insulae/sessionKeeper"], function(dom, srv, sessionKeeper) {
    var ouputField = dom.byId('outputField');
    var passwordOfCreatedAccount = null;
    
    function createAccountFailed(result) {
    	outputField.innerHTML = 'Account creation failed!<br />' + result.message;
    }
    
    function createAccountSucceeded(result) {
    	outputField.innerHTML = 'Account created! Logging in to it...';
    	innerLogin(result.content.email, passwordOfCreatedAccount);
    }
    
    function loginFailed(result) {
    	outputField.innerHTML = 'Login failed!<br />' + result.message;
    }
    
    function loginSucceeded(result) {
    	outputField.innerHTML = 'Login succeeded! ' + JSON.stringify(result);
    	sessionKeeper.setSession({"id": result.content.id, "key": result.content.key});
    }
    
    function innerLogin(email, password) {
    	console.log("Logging in with " + email + "/" + password);
       	srv.put("account/Session", { "email": email, "password": password }, loginSucceeded, loginFailed);
    }
    
    function logoutFailed(result) {
    	outputField.innerHTML = 'Logout failed!<br />' + result.message;
    }
    
    function logoutSucceeded(result) {
    	outputField.innerHTML = 'Logout succeeded! ' + JSON.stringify(result);
    	sessionKeeper.setSession(null);
    }
    
    return {
        createAccount: function(email, password, callSign, givenName, surname) {
        	passwordOfCreatedAccount = password;
        	var params = { "email": email, "password": password, "callSign": callSign, "givenName": givenName, "surname": surname };
        	srv.put("account/Account", params, createAccountSucceeded, createAccountFailed);
        },

        login: function(email, password){
        	innerLogin(email, password);
        },
        
        logout: function(){
        	srv.delete("account/Session", {}, logoutSucceeded, logoutFailed);
        }
    };
});
