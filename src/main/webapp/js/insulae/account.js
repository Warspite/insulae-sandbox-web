define(["dojo/dom", "insulae/server"], function(dom, srv){
    var ouputField = dom.byId('outputField');
    var passwordOfCreatedAccount = "";
    
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
    }
    
    function innerLogin(email, password) {
    	console.log("Logging in with " + email + "/" + password);
       	srv.put("account/Session", { "email": email, "password": password }, loginFailed, loginSucceeded);
    }
    
    return {
        createAccount: function(email, password, callSign, givenName, surname){
        	passwordOfCreatedAccount = password;
        	var params = { "email": email, "password": password, "callSign": callSign, "givenName": givenName, "surname": surname };
        	srv.put("account/Account", params, createAccountFailed, createAccountSucceeded);
        },

        login: function(email, password){
        	innerLogin(email, password);
        }
    };
});
