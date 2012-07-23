var TextObject = function(ctx, x, y, text, font, fillStyle, lineHeight, maxWidth)
{
	mixin(new RenderedObject(
		new ObjectRenderingParameters(
			x,
			y,
			0.0,
			0,
			11,
			1.0, 
			GraphicsType.NONE, 
			{text: new Array(0)}
		),
		null,
		0), this); 
	
	this.orp.verticalAnchor = Anchor.TOP;
	this.orp.horizontalAnchor = Anchor.LEFT;
	this.ctx = ctx;
	this.lineHeight = lineHeight;
	this.maxWidth = maxWidth;
	this.dimensions = { width: 0, height: this.lineHeight };
	this.setText(text, font, fillStyle);
	
	var self = this;
	this.drawSelf = function(ctx, transform) {
		self.prepareContext(ctx);
		
		for(i in self.orp.content.text) {
			ctx.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);
			ctx.fillText(self.orp.content.text[i], 5, this.lineHeight);
			transform.translate(0, self.lineHeight)
		}
	};
};

TextObject.prototype.setText = function(text, font, fillStyle) {
	this.orp.content.text = new Array(0);
	
	var explicitTextLines = text.split('\n');
	
	for(i in explicitTextLines) {
		if( this.maxWidth == null )
			this.orp.content.text.push(explicitTextLines[i]);
		else {
			this.pushImplicitTextLines(explicitTextLines[i], this.orp.content.text)
		}
	}
	
	if(font != null)
		this.orp.content.font = font;
	
	if(font != null)
		this.orp.content.fillStyle = fillStyle;

	this.updateDimensions();
};

TextObject.prototype.updateDimensions = function(ctx) {
	this.ctx.save();
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	this.prepareContext(this.ctx);
	this.ctx.restore();

	var longestLineWidth = 0;
	//The TextMetrics.width is smaller than the actual bounding box.
	//According to the standard, it should contain actualBoundingBoxRight
	//and actualBoundingBoxLeft, but at least in Chrome these are not
	//(yet) present. So we'll just pad the width a bit, hoping for the best!
	for(i in this.orp.content.text) {
		var lineWidth = this.ctx.measureText(this.orp.content.text[i]).width * 1.1 + 5;
		if(lineWidth > longestLineWidth)
			longestLineWidth = lineWidth;
	}
	
	this.dimensions.width = longestLineWidth;
	this.dimensions.height = this.lineHeight * this.orp.content.text.length;
};

TextObject.prototype.prepareContext = function(ctx) {
	ctx.fillStyle = this.orp.content.fillStyle || "#ffffff";
	ctx.font = this.orp.content.font || "11px Arial";
};

TextObject.prototype.pushImplicitTextLines = function(line, pushTarget) {
	var words = line.split(' ');

	var lastAcceptedCandidateString = null;
	for(i in words) {
		if(lastAcceptedCandidateString == null) {
			lastAcceptedCandidateString = words[i];
		}
		else {
			var candidateString = lastAcceptedCandidateString + " " + words[i];
			var lineWidth = this.ctx.measureText(candidateString).width * 1.1 + 5;
			if( lineWidth > this.maxWidth ) {
				pushTarget.push(lastAcceptedCandidateString);
				lastAcceptedCandidateString = words[i];
			}
			else {
				lastAcceptedCandidateString = candidateString;
			}
		}
	}
	
	if( lastAcceptedCandidateString != null )
		pushTarget.push(lastAcceptedCandidateString);
};


