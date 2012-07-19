function include(file) {
	if (document.createElement && document.getElementsByTagName) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', 'js/' + file);
		head.appendChild(script);
	}
}
	
include("lib/UtilityFunctions.js");
include("lib/dataUtils/SortedList.js");
include("lib/graphics/ObjectRenderingParameters.js");
include("lib/graphics/Renderer.js");
include("lib/graphics/RenderedObject.js");
include("lib/graphics/renderedObjects/ObjectContainer.js");
include("lib/graphics/renderedObjects/LocationObject.js");


require(["dojo/dom", "geo/viewportCanvasControl", "dojo/domReady!"], function(dom, areaControl) {
});
