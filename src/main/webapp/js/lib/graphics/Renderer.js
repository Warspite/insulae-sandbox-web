var Renderer = function(canvas, ctx, backgroundFillStyle)
{
	mixin(new ObjectContainer(0), this);
	this.canvas = canvas;
	this.ctx = ctx;
	this.backgroundFillStyle = backgroundFillStyle;
	this.setViewportParameters(0.0, 0.0, 1.0);
	
	this.tickSelf = function(tickInterval) {
		this.ctx.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
		this.ctx.fillStyle = this.backgroundFillStyle;
		this.ctx.globalAlpha = 1.0;
		this.ctx.fillRect(-1, -1, this.canvas.width + 1, this.canvas.height + 1);

		this.render(this.ctx, this.calculateViewportTransform());
	};
};

Renderer.prototype.setViewportParameters = function(x, y, scale) {
	this.viewportX = x;
	this.viewportY = y;
	this.viewportScale = scale;
}

Renderer.prototype.calculateViewportTransform = function()
{
	var t = new Transform();
	t.translate(this.canvas.width * 0.5, this.canvas.height * 0.5 );
	t.scale(this.viewportScale, this.viewportScale);
	t.translate(-this.viewportX, -this.viewportY);
	return t;
};