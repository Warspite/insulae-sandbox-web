var CameraController = function(keyboard, mouse, renderer)
{
	this.keyboard = keyboard;
	this.mouse = mouse;
	this.renderer = renderer;
	
	this.cameraX = 0.0;
	this.cameraY = 0.0;
	this.minZoom = 0.0;
	this.maxZoom = 1.5;
	this.zoom = this.minZoom;
};

CameraController.prototype.tick = function(elapsedTime)
{
	if( this.keyboard.isKeyDown(Key.X) )
		this.adjustZoom(-elapsedTime * 0.001);

	if( this.keyboard.isKeyDown(Key.Z) )
		this.adjustZoom(elapsedTime * 0.001);

	if( this.keyboard.isKeyDown(Key.LEFT) )
		this.pan(-elapsedTime * 0.3, 0);

	if( this.keyboard.isKeyDown(Key.RIGHT) )
		this.pan(elapsedTime * 0.3, 0);

	if( this.keyboard.isKeyDown(Key.UP) )
		this.pan(0, -elapsedTime * 0.3);

	if( this.keyboard.isKeyDown(Key.DOWN) )
		this.pan(0, elapsedTime * 0.3);

	if( this.mouse.mouseDown && !this.mouse.wihinBoundsOfAwareWidget )
		this.pan(-this.mouse.deltaX, -this.mouse.deltaY); 

	if( this.mouse.wheelDelta != 0 )
		this.adjustZoom(this.mouse.wheelDelta * 0.0007);
	
	this.renderer.setViewportParameters(this.cameraX, this.cameraY, this.calculateScale());
};

CameraController.prototype.pan = function(x, y)
{
	this.cameraX += x / this.calculateScale();
	this.cameraY += y / this.calculateScale();
};

CameraController.prototype.adjustZoom = function(amount)
{
	this.zoom += amount;
	if(this.zoom < this.minZoom)
		this.zoom = this.minZoom;
	
	if(this.zoom > this.maxZoom)
		this.zoom = this.maxZoom;
};

CameraController.prototype.calculateScale = function() {
	return Math.pow(10, this.zoom - this.maxZoom)
};
