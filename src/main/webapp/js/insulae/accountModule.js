define(["dojo/dom", "dojo/_base/xhr"], function(dom, xhr){
    var ouputField = dom.byId('outputField');
    
    return {
        createAccount: function(email, password, callSign, givenName, surname){
        	var params = { "email": email, "password": password, "callSign": callSign, "givenName": givenName, "surname": surname };
        	console.log(JSON.stringify(params));
        	
        	xhr.put({
        		url: "api/account/Account",
        		handleAs: "json",
				headers: {
					"params": JSON.stringify(params) 
				},
        		load: function(result) {
        			alert("Server returned: " + JSON.stringify(result));
        		}
        	});
        },

        login: function(email, password){
            outputField.innerHTML = 'Attempting to login, now with Dojo!<br />' + email + password; 
        }
    };
});
