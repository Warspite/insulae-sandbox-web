var ItemStorageIconLabel = function(x, y, itemType, storage, graphicLayers, ctx)
{
	mixin(new IconLabel(
			x, 
			y, 
			itemType.name, 
			new RenderedObject(
				new ObjectRenderingParameters(
					0,
					0,
					0.0,
					0, 
					0, 
					1.0, 
					GraphicsType.IMAGE, 
					"images/items/" + itemType.canonicalName + ".png" 
				),
				null,
				1
			),
			itemType.name + ": " + storage.amount,
			graphicLayers, 
			ctx), 
		this);
	
	this.icon.orp.width = this.orp.height;
	this.icon.orp.height = this.orp.height;
};
