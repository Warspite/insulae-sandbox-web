var TooltipObject = function(ctx, tooltipString, tooltipContainer)
{
	mixin(new WindowObject(0, 0, 200, 48), this); 
	
	this.rendered = false;
	tooltipContainer.addChild(this);
	
	var self = this;
	
	this.tickSelf = function(tickInterval) {
		if(this.displayAfter == null)
			return;
		
		self.orp.x = self.mouseCoords.x;
		self.orp.y = self.mouseCoords.y;
		
		if(new Date().getTime() > self.displayAfter) {
			self.displayAfter = null;
			self.rendered = true;
		}
	};
	
	this.textObject = new TextObject(ctx, 0, 0, tooltipString, "11px Arial", "#00ffff", 12); 
	this.addChild(this.textObject);
};

TooltipObject.prototype.showIn = function(ms, mouseCoords) {
	this.displayAfter = new Date().getTime() + ms;
	this.mouseCoords = mouseCoords;
};

TooltipObject.prototype.setText = function(text) {
	this.textObject.setText(text);
	this.setSize({width: this.textObject.dimensions.width + 4, height: this.textObject.dimensions.height + 4});
};

TooltipObject.prototype.hide = function() {
	this.rendered = false;
	this.displayAfter = null;
};
