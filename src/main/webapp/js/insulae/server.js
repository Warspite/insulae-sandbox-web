define(["dojo/_base/xhr"], function(xhr){
    function buildRequest(servlet, params, failureCallback, successCallback) {
		return {
			url: "api/" + servlet,
			handleAs: "json",
			headers: { "params": JSON.stringify(params) },
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
        put: function(servlet, params, failureCallback, successCallback){
        	xhr.put(buildRequest(servlet, params, failureCallback, successCallback));
        }
	};
});
