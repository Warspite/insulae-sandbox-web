var LocationObject = function(location, locationTypes, tooltipContainer)
{
	this.renderSize = 64;
	this.data = location;
	this.locationTypes = locationTypes;
	
	mixin(
		new TooltippingObject(
			new ObjectRenderingParameters(
				location.coordinatesX * this.renderSize,
				location.coordinatesY * this.renderSize,
				0.0,
				this.renderSize, 
				this.renderSize, 
				1.0, 
				GraphicsType.IMAGE, 
				"images/locations/" + locationTypes[location.locationTypeId].canonicalName + ".png", 
				0
			),
			tooltipContainer
		),
		this);
	
	this.tooltipObject.setText("You're pointing at a " + this.locationTypes[this.data.locationTypeId].name + " tile. " + this.locationTypes[this.data.locationTypeId].description);
};
