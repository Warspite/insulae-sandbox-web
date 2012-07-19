var Renderer = function(canvas, ctx, framerate, backgroundFillStyle)
{
	mixin(new ObjectContainer(0), this);
	this.canvas = canvas;
	this.ctx = ctx;
	this.backgroundFillStyle = backgroundFillStyle;
	this.setFramerate(framerate);

	var self = this;
	setInterval(function(){ self.tick(self.tickInterval); }, self.tickInterval);
};

Renderer.prototype.tick = function(tickInterval)
{
	this.ctx.setTransform(1.0, 0.0, 0.0, 1.0, 1.0, 1.0);
	this.ctx.fillStyle = this.backgroundFillStyle;
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.render(this.ctx);
};

Renderer.prototype.setFramerate = function(framerate)
{
	this.framerate = framerate;
	this.tickInterval = 1000/framerate;
};