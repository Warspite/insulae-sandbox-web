define(["dojo/_base/xhr", "insulae/sessionKeeper"], function(xhr, sessionKeeper){
    function buildRequest(servlet, params, failureCallback, successCallback) {
		console.log("Making call to " + servlet + " with session: " +JSON.stringify(sessionKeeper.getSession()) + " and parameters " + JSON.stringify(params));
		return {
			url: "api/" + servlet,
			handleAs: "json",
			headers: { 
				"params": JSON.stringify(params),
				"auth": JSON.stringify(sessionKeeper.getSession()) 
			},
			error: handleRequestFault,
			load: function(result) {
				if( result.success )
					successCallback(result)
				else
					failureCallback(result)
			}
		};
    }
    
    function handleRequestFault(error) {
    	alert("Server request error: " + error);
    }
    
    return {
        get: function(servlet, params, failureCallback, successCallback){
        	xhr.get(buildRequest(servlet, params, failureCallback, successCallback));
        },

        post: function(servlet, params, failureCallback, successCallback){
        	xhr.post(buildRequest(servlet, params, failureCallback, successCallback));
        },

        put: function(servlet, params, failureCallback, successCallback){
        	xhr.put(buildRequest(servlet, params, failureCallback, successCallback));
        },

        delete: function(servlet, params, failureCallback, successCallback){
        	xhr.del(buildRequest(servlet, params, failureCallback, successCallback));
        }
	};
});
