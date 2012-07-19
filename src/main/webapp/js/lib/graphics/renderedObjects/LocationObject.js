var LocationObject = function(location, locationTypes)
{
	this.renderSize = 64;
	this.data = location;
	mixin(new RenderedObject(new ObjectRenderingParameters(
			location.coordinatesX * this.renderSize,
			location.coordinatesY * this.renderSize,
			0.0,
			this.renderSize, 
			this.renderSize, 
			1.0, 
			GraphicsType.IMAGE, 
			"images/locations/" + locationTypes[location.locationTypeId].canonicalName + ".png", 
			0)),
			this);
};
