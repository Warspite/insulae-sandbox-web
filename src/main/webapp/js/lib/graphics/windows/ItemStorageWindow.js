var ItemStorageWindow = function(building, srv, typeData, graphicLayers, ctx)
{
	mixin(new WindowObject(0,0,180,250), this);
	this.addCloseButton();
	
	this.building = building;
	this.typeData = typeData;
	
	var self = this;
	srv.get("industry/ItemStorage", {buildingId: building.id}, function(result)	{
		for(i in result.content.itemStorages) {
			var storage = result.content.itemStorages[i];
			var itemType = self.typeData.item[storage.itemTypeId];
			
			var x = 0;
			var y = 16 + i * 36;
			
			var label = new ItemStorageIconLabel(x, y, itemType, storage, graphicLayers, ctx);
			label.orp.verticalAnchor = Anchor.TOP;
			label.orp.verticalOrigin = Origin.TOP;
			self.addChild(label);
		}
	});
};

