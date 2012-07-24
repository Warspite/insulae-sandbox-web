var WindowObject = function(x, y, width, height, backgroundObject)
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
				GraphicsType.NONE, 
				null),
			null,
			50),
		this);
	
	if(backgroundObject != null)
		this.setBackgroundObject(backgroundObject);
	else
		this.setDefaultBackgroundObject();
};

WindowObject.prototype.setBackgroundObject = function(obj)
{
	if(this.backgroundObject != null)
		this.removeChild(this.backgroundObject);
	
	this.backgroundObject = obj;
	
	if(this.backgroundObject != null)
		this.addChild(this.backgroundObject);
};

WindowObject.prototype.setDefaultBackgroundObject = function()
{
	this.setBackgroundObject(
		new RenderedObject(
			new ObjectRenderingParameters(
				0,
				0,
				0.0,
				this.orp.width,
				this.orp.height,
				0.7, 
				GraphicsType.RECT, 
				"202020"
			),
		-1
		)
	);
};

WindowObject.prototype.setSize = function(newSize)
{
	if(this.backgroundObject == null)
		return;
	
	this.backgroundObject.orp.width = newSize.width;
	this.backgroundObject.orp.height = newSize.height;
	this.orp.width = newSize.width;
	this.orp.height = newSize.height;
};

WindowObject.prototype.addCloseButton = function()
{
	var self = this;
	var btn = new Button(0, 0, 16, 16, "images/close.png", function() {
		self.parent.removeChild(self);
	});
	
	btn.orp.verticalAnchor = Anchor.TOP;
	btn.orp.horizontalAnchor = Anchor.RIGHT;
	btn.orp.verticalOrigin = Origin.TOP;
	btn.orp.horizontalOrigin = Origin.RIGHT;
	this.addChild(btn);
};