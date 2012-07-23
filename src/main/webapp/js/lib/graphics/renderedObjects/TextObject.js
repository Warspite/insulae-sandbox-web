var TextObject = function(ctx, x, y, text, font, fillStyle, lineHeight)
{
	mixin(new RenderedObject(
		new ObjectRenderingParameters(
			x,
			y,
			0.0,
			0,
			11,
			1.0, 
			GraphicsType.NONE, 
			{text: ""}
		),
		null,
		0), this); 
	
	this.ctx = ctx;
	this.lineHeight = lineHeight;
	this.dimensions = { width: 0, height: this.lineHeight };
	this.setText(text, font, fillStyle);
	
	var self = this;
	this.drawSelf = function(ctx, transform) {
		self.prepareContext(ctx);
		console.log("Measured text at render time: " + ctx.measureText(self.orp.content.text).width);
		ctx.fillText(self.orp.content.text, - self.dimensions.width * 0.5, self.dimensions.height * 0.5 - 2);
	};
};

TextObject.prototype.setText = function(text, font, fillStyle) {
	this.orp.content.text = text;
	
	if(font != null)
		this.orp.content.font = font;
	
	if(font != null)
		this.orp.content.fillStyle = fillStyle;

	this.updateDimensions();
};

TextObject.prototype.updateDimensions = function(ctx) {
	this.ctx.save();
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	this.prepareContext(this.ctx);
	this.ctx.restore();

	//The TextMetrics.width is smaller than the actual bounding box.
	//According to the standard, it should contain actualBoundingBoxRight
	//and actualBoundingBoxLeft, but at least in Chrome these are not
	//(yet) present. So we'll just pad the width a bit, hoping for the best!
	var maxWidth = this.ctx.measureText(this.orp.content.text).width * 1.1 + 5;
	
	this.dimensions.width = maxWidth;
	this.dimensions.height = this.lineHeight;
};

TextObject.prototype.prepareContext = function(ctx) {
	ctx.fillStyle = this.orp.content.fillStyle || "#ffffff";
	ctx.font = this.orp.content.font || "11px Arial";
};