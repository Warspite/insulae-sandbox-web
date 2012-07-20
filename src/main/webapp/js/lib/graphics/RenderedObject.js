var RenderedObject = function(orp, oip)
{
	this.parent = parent;
	this.orp = orp;
	this.children = new SortedList("zIndex");
	this.lastUsedTransform = new Transform();
	
	if( oip != null ) {
		this.oip = oip;
	}
	else {
		this.oip = new ObjectInteractionParameters(false);
	}
};

RenderedObject.prototype.zIndex = function() {
	return parseInt(this.orp.zIndex);
}

RenderedObject.prototype.render = function(ctx, transform)
{
	transform.translate(this.orp.x, this.orp.y);
	transform.rotate(this.orp.angle);
	ctx.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);

	var selfDrawn = false;

	var c = this.children.firstElement;
	while( c != null ) {
		if( c.zIndex >= 0 && !selfDrawn ) {
			this.drawSelf(ctx);
			selfDrawn = true;
		}

		c.render(ctx, transform.clone());
		c = c.nextElement;
	}

	if(!selfDrawn)
		this.drawSelf(ctx);
	
	this.lastUsedTransform = transform;
};

RenderedObject.prototype.drawSelf = function(ctx)
{
	if( this.orp.graphicsType == GraphicsType.INVIS )
		return;
	
	ctx.globalAlpha = this.orp.alpha;
	var boundaries = this.calculateBoundaries();
	
	if( this.orp.graphicsType == GraphicsType.IMAGE ) {
		ctx.drawImage(this.orp.content, boundaries.left, boundaries.top, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.ANIM ) {
		ctx.drawImage(this.orp.content, 0, this.animationTracker.frameTop, this.image.width, this.orp.frameHeight, -this.orp.offsetX, -this.orp.offsetY, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.RECT ) {
		ctx.content = this.orp.content;
		ctx.fillRect(boundaries.left, boundaries.top, this.orp.width, this.orp.height);
	}
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
		c = c.nextElement;
	}
	
	this.children = new SortedList("zIndex");
};

RenderedObject.prototype.calculateBoundaries = function()
{
	return {
		top: -0.5 * this.orp.height,
		left: -0.5 * this.orp.width,
		right: 0.5 * this.orp.width,
		bottom: 0.5 * this.orp.height
	};
};

RenderedObject.prototype.pointIsWithinBoundaries = function(point)
{
	var boundaries = this.calculateBoundaries();
	return (point.x >= boundaries.left && point.x <= boundaries.right && point.y >= boundaries.top && point.y <= boundaries.bottom);
};

RenderedObject.prototype.findTopmostObjectAtCoordinates = function(coords)
{
	var c = this.children.firstElement;
	var topmostHit = null;
	while( c != null ) {
		var topmostHitOfChild = c.findTopmostObjectAtCoordinates(coords);
		if(topmostHitOfChild != null)
			topmostHit = topmostHitOfChild;
		c = c.nextElement;
	}
	
	if( this.oip.mouseVisible ) {
		if(topmostHit == null || topmostHit.orp.zIndex < this.orp.zIndex) {
			if(this.pointIsWithinBoundaries(this.lastUsedTransform.cloneInvert().transformPoint(coords))) {
				topmostHit = this;
			}
		}
	}
	
	return topmostHit;
};
