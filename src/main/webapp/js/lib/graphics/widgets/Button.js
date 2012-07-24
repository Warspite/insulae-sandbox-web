var Button = function(x, y, width, height, imgSrc, callback)
{
	mixin(
		new RenderedObject(
			new ObjectRenderingParameters(
				x,
				y,
				0.0,
				width,
				height,
				1.0, 
				GraphicsType.IMAGE, 
				imgSrc),
			new ObjectInteractionParameters(true),
			1),
		this);

	this.mouseCursor = "pointer";
	this.mousePressed = callback;
};