var IconLabel = function(x, y, tooltip, icon, labelText, graphicLayers, ctx)
{
	mixin(
			new TooltippingObject(
				new ObjectRenderingParameters(
					x,
					y,
					0.0,
					150, 
					32, 
					1.0, 
					GraphicsType.IMAGE, 
					"images/iconLabelBackground.png" 
				),
				1,
				graphicLayers.tooltip,
				ctx
			),
			this);
	
	this.tooltipObject.setText(tooltip);
	
	this.icon = icon;
	this.icon.orp.horizontalAnchor = Anchor.LEFT;
	this.icon.orp.horizontalOrigin = Origin.LEFT;
	this.icon.orp.verticalAnchor = Anchor.CENTER;
	this.icon.orp.verticalOrigin = Origin.CENTER;
	this.addChild(this.icon);
	
	this.labelText = new TextObject(ctx, this.orp.height, 0, labelText, "11p Arial", "#eeeeee", 13, this.orp.width - this.orp.height);
	this.addChild(this.labelText);
};
