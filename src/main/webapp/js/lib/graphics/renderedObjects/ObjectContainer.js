var ObjectContainer = function(zIndex)
{
	mixin(new RenderedObject(new ObjectRenderingParameters(
			0,
			0,
			0.0,
			0,
			0,
			1.0, 
			"none", 
			"#000000", 
			zIndex)),
			this);
};
