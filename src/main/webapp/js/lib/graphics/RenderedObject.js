var RenderedObject = function(orp)
{
	this.parent = parent;
	this.orp = orp;
	this.children = new SortedList("zIndex");
};

RenderedObject.prototype.zIndex = function() {
	return parseInt(this.orp.zIndex);
}

RenderedObject.prototype.render = function(ctx)
{
	ctx.save();
	ctx.translate(this.orp.x, this.orp.y);
	ctx.rotate(this.orp.angle);

	var selfDrawn = false;

	var c = this.children.firstElement;
	while( c != null ) {
		if( c.zIndex >= 0 && !selfDrawn ) {
			this.draw(ctx);
			selfDrawn = true;
		}

		c.render(ctx);
		c = c.nextElement;
	}

	if(!selfDrawn)
		this.draw(ctx);

	ctx.restore();
};

RenderedObject.prototype.draw = function(ctx)
{
	if( this.orp.graphicsType == "none" )
		return;
	
	ctx.globalAlpha = this.orp.alpha;
	ctx.fillStyle = this.orp.fillStyle;
	
	if( this.orp.graphicsType == "image" )
		ctx.drawImage(this.image, -this.orp.offsetX, -this.orp.offsetY, this.orp.width, this.orp.height);
	else if( this.orp.graphicsType == "animation" )
		ctx.drawImage(this.image, 0, this.animationTracker.frameTop, this.image.width, this.orp.frameHeight, -this.orp.offsetX, -this.orp.offsetY, this.orp.width, this.orp.height);
	else if( this.orp.graphicsType == "rect" )
		ctx.fillRect(-0.5 * this.orp.width, -0.5 * this.orp.height, this.orp.width, this.orp.height);
};

RenderedObject.prototype.addChild = function(child)
{
	this.children.add(child);
	child.parent = this;
};

RenderedObject.prototype.removeChild = function(child)
{
	this.children.remove(child);
	child.parent = null;
};

RenderedObject.prototype.clearChildren = function()
{
	var c = this.children.firstElement;
	while( c != null ) {
		c.parent = null;
	}
	
	this.children = new SortedList("zIndex");
};
