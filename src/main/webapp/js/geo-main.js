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
include("lib/Ticker.js");

include("lib/dataUtils/SortedList.js");

include("lib/inputUtils/Key.js");
include("lib/inputUtils/Keyboard.js");
include("lib/inputUtils/Mouse.js");

include("lib/graphics/ObjectRenderingParameters.js");
include("lib/graphics/ObjectInteractionParameters.js");
include("lib/graphics/GraphicsType.js");
include("lib/graphics/CameraController.js");
include("lib/graphics/Renderer.js");
include("lib/graphics/Transform.js");
include("lib/graphics/RenderedObject.js");
include("lib/graphics/renderedObjects/ObjectContainer.js");
include("lib/graphics/renderedObjects/OverlayContainer.js");
include("lib/graphics/renderedObjects/LocationObject.js");
include("lib/graphics/renderedObjects/BuildingObject.js");
include("lib/graphics/renderedObjects/TooltippingObject.js");
include("lib/graphics/renderedObjects/TooltipObject.js");


require(["dojo/dom", "geo/viewportCanvasControl", "dojo/domReady!"], function(dom, areaControl) {
});
