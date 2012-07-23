var BuildingObject = function(ctx, building, buildingTypes, tooltipContainer)
{
	this.renderSize = 32;
	this.data = building;
	this.buildingTypes = buildingTypes;
	
	mixin(
		new TooltippingObject(
			new ObjectRenderingParameters(
				16,
				16,
				0.0,
				this.renderSize, 
				this.renderSize, 
				1.0, 
				GraphicsType.IMAGE, 
				"images/buildings/" + buildingTypes[building.buildingTypeId].canonicalName + ".png" 
			),
			1,
			tooltipContainer,
			ctx
		),
		this);
	
	this.tooltipObject.setText(this.buildingTypes[this.data.buildingTypeId].name);
};
