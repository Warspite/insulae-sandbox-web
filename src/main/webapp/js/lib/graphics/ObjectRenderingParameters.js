var ObjectRenderingParameters = function(x, y, angle, width, height, alpha, graphicsType, content)
{
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.width = width;
	this.height = height;
	this.alpha = alpha;
	this.setGraphicsType(graphicsType, content);
};

ObjectRenderingParameters.prototype.setGraphicsType = function(graphicsType, content) {
	this.graphicsType = graphicsType;
	
	if( this.graphicsType == GraphicsType.IMAGE ) {
		this.content = new Image();
		this.content.src = content;
	}
	else {
		this.content = content;
	}
};
