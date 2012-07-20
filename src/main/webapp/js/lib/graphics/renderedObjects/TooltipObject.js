var TooltipObject = function(tooltipString, tooltipContainer)
{
	this.tooltipString = tooltipString;
	this.tooltipContainer = tooltipContainer;

	mixin(
		new RenderedObject(
			new ObjectRenderingParameters(
				0,
				0,
				0.0,
				128, 
				32, 
				1.0, 
				GraphicsType.INVIS, 
				null, 
				0
			)
		),
		this);
	
	if(this.preRenderEffects == null)
		this.preRenderEffects = new Array(0);
	
	var self = this;
	this.preRenderEffects.push(function() {
		if(self.displayAfter != null) {
			self.orp.x = self.mouseCoords.x;
			self.orp.y = self.mouseCoords.y;
			
			if(new Date().getTime() > self.displayAfter) {
				self.displayAfter = null;
				self.orp.setGraphicsType(GraphicsType.TEXT, {text: self.tooltipString, fillStyle: "#cceecc" });
			}
		}
	});
};

TooltipObject.prototype.hide = function() {
	this.tooltipContainer.removeChild(this);
	this.displayAfter = null;
};

TooltipObject.prototype.showIn = function(ms, mouseCoords) {
	this.displayAfter = new Date().getTime() + ms;
	this.mouseCoords = mouseCoords;
	this.orp.setGraphicsType(GraphicsType.INVIS);
	this.tooltipContainer.addChild(this);
};

TooltipObject.prototype.setText = function(text) {
	this.tooltipString = text;
};
