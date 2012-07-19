var ObjectRenderingParameters = function(x, y, angle, width, height, alpha, graphicsType, content, zIndex)
{
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.width = width;
	this.height = height;
	this.alpha = alpha;
	this.zIndex = 0;
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

var GraphicsType = {
	RECT: {val: 0, name: "Rectangle" },
	IMAGE: {val: 1, name: "Image" },
	INVIS: {val: 2, name: "Invisible" },
	ANIM: {val: 3, name: "Animation" },
}
