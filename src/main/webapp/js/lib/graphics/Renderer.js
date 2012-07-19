var Renderer = function(canvas, ctx, backgroundFillStyle)
{
	mixin(new ObjectContainer(0), this);
	this.canvas = canvas;
	this.ctx = ctx;
	this.backgroundFillStyle = backgroundFillStyle;
	this.setViewportParameters(0.0, 0.0, 1.0);
};

Renderer.prototype.tick = function(tickInterval)
{
	this.ctx.setTransform(1.0, 0.0, 0.0, 1.0, 1.0, 1.0);
	this.ctx.fillStyle = this.backgroundFillStyle;
	this.ctx.fillRect(-1, -1, this.canvas.width + 1, this.canvas.height + 1);
	this.applyViewportTransforms();

	this.render(this.ctx);
};

Renderer.prototype.setViewportParameters = function(x, y, scale) {
	this.viewportX = x;
	this.viewportY = y;
	this.viewportScale = scale;
}

Renderer.prototype.applyViewportTransforms = function()
{
	this.ctx.translate(this.canvas.width * 0.5, this.canvas.height * 0.5 );
	this.ctx.scale(this.viewportScale, this.viewportScale);
	this.ctx.translate(-this.viewportX, -this.viewportY);

};
