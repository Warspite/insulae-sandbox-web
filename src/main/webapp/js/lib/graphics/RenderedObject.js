var RenderedObject = function(orp, oip, zIndex)
{
	this.parent = parent;
	this.orp = orp;
	this.zIndex = zIndex;
	this.children = new SortedList("zIndex");
	this.lastUsedTransform = new Transform();
	this.rendered = true;
	
	if( oip != null ) {
		this.oip = oip;
	}
	else {
		this.oip = new ObjectInteractionParameters(false);
	}
};

RenderedObject.prototype.tick = function(tickInterval)
{
	var c = this.children.firstElement;
	while( c != null ) {
		c.tick(tickInterval);
		c = c.nextElement;
	}

	this.tickSelf(tickInterval);
};

RenderedObject.prototype.tickSelf = function(tickInterval)
{
};

RenderedObject.prototype.render = function(ctx, transform)
{
	if(!this.rendered)
		return;
	
	this.extraEffects(this.preTransformEffects, transform);
	
	transform.translate(this.orp.x, this.orp.y);
	transform.rotate(this.orp.angle);

	this.extraEffects(this.preRenderEffects, transform);
	
	var selfDrawn = false;
	var c = this.children.firstElement;
	while( c != null ) {
		if( c.zIndex >= 0 && !selfDrawn ) {
			this.drawSelf(ctx, transform);
			selfDrawn = true;
		}

		c.render(ctx, this.createStartingTransformOfChild(c, transform));
		c = c.nextElement;
	}

	if(!selfDrawn)
		this.drawSelf(ctx, transform);
	
	this.lastUsedTransform = transform;

	this.extraEffects(this.postRenderEffects, transform);
};

RenderedObject.prototype.drawSelf = function(ctx, transform)
{
	if( this.orp.graphicsType == GraphicsType.NONE )
		return;
	
	ctx.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);
	ctx.globalAlpha = this.orp.alpha;
	var boundaries = this.calculateBoundaries();
	
	if( this.orp.graphicsType == GraphicsType.IMAGE ) {
		ctx.drawImage(this.orp.content, boundaries.left, boundaries.top, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.ANIM ) {
		ctx.drawImage(this.orp.content, 0, this.animationTracker.frameTop, this.image.width, this.orp.frameHeight, -this.orp.offsetX, -this.orp.offsetY, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.RECT ) {
		ctx.fillStyle = this.orp.content;
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

RenderedObject.prototype.extraEffects = function(effectsList, transform) {
	if(effectsList == null)
		return;
	
	for(i in effectsList)
		effectsList[i](transform);
};

RenderedObject.prototype.createStartingTransformOfChild = function(child, originalTransform) {
	var childTransform = originalTransform.clone();
	var trans = {x: 0, y: 0};
	if(child.orp.horizontalAnchor == Anchor.LEFT)
		trans.x = - 0.5 * this.orp.width;
	else if(child.orp.horizontalAnchor == Anchor.RIGHT)
		trans.x = 0.5 * this.orp.width;

	if(child.orp.verticalAnchor == Anchor.TOP)
		trans.y = - 0.5 * this.orp.height;
	else if(child.orp.verticalAnchor == Anchor.BOTTOM)
		trans.y = 0.5 * this.orp.height;
		
	childTransform.translate(trans.x, trans.y);
	
	return childTransform;
};
