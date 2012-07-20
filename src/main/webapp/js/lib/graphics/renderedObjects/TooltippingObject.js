var TooltippingObject = function(orp, tooltipContainer)
{
	mixin(new RenderedObject(orp, new ObjectInteractionParameters(true)), this);
	
	this.tooltipDelay = 800;
	
	if(this.preRenderEffects == null)
		this.preRenderEffects = new Array(0);

	this.tooltipObject = new TooltipObject("Undefined", tooltipContainer);
};

TooltippingObject.prototype.mouseEnter = function(mouseCoords) {
	this.tooltipObject.showIn(this.tooltipDelay, mouseCoords);
};

TooltippingObject.prototype.mouseExit = function(mouseCoords) {
	this.tooltipObject.hide();
};
