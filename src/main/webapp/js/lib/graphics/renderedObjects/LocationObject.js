var LocationObject = function(location)
{
	this.renderSize = 32;
	this.data = location;
	mixin(new RenderedObject(new ObjectRenderingParameters(
			location.coordinatesX * this.renderSize,
			location.coordinatesY * this.renderSize,
			0.0,
			this.renderSize, 
			this.renderSize, 
			1.0, 
			"rect", 
			"#00ff00", 
			0)),
			this);
};
