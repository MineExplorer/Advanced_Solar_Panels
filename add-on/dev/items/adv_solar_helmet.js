IDRegistry.genItemID("advSolarHelmet");
Item.createArmorItem("advSolarHelmet", "Advanced Solar Helmet", {name: "adv_solar_helmet"}, {type: "helmet", armor: 4, durability: 625, texture: "armor/adv_solar_helmet_1.png", isTech: true});
Player.addItemCreativeInv(ItemID.advSolarHelmet, 1, 1);
ICore.ChargeRegistry.registerItem(ItemID.advSolarHelmet, 100000, 1, true, 160);

IDRegistry.genItemID("advSolarHelmetUncharged");
Item.createArmorItem("advSolarHelmetUncharged", "Advanced Solar Helmet", {name: "adv_solar_helmet"}, {type: "helmet", armor: 2, durability: 625, texture: "armor/adv_solar_helmet_1.png", isTech: true});
ICore.ChargeRegistry.registerItem(ItemID.advSolarHelmetUncharged, 100000, 1, true, 160);

ICore.Recipe.registerRecipesFor("adv-armor-charge", {
	"ItemID.advSolarHelmet": {charged: ItemID.advSolarHelmet, uncharged: ItemID.advSolarHelmetUncharged},
	"ItemID.advSolarHelmetUncharged": {charged: ItemID.advSolarHelmet, uncharged: ItemID.advSolarHelmetUncharged},
}, true);

var ADV_ARMOR_FUNC_CHARGED = {
	maxDamage: Item.getMaxDamage(ItemID.advSolarHelmet),
	tick: function(slot, inventory){
		ICore.UI.enableButton("button_nightvision")
		var armor = ICore.Recipe.getRecipeResult("adv-armor-charge", slot.id);
		if(slot.data > this.maxDamage - 5){
			slot.id = armor.uncharged;
			slot.data = this.maxDamage - 4;
			return true;
		}
		else{
			if(ICore.UI.nightvision){
				if(World.getThreadTime()%4==0){slot.data++;}
				var coords = Player.getPosition();
				if(nativeGetLightLevel(coords.x, coords.y, coords.z)==15){
					Entity.addEffect(Player.get(), MobEffect.blindness, 25, 1);
				}
				Entity.addEffect(Player.get(), MobEffect.nightVision, 225, 1);
				return true;
			}
			return false;
		}
	}
};

var RECIPE_FUNC_TRANSPORT_ENERGY = function(api, field, result){
	var energy = 0;
	for(var i in field){
		if(!ChargeItemRegistry.isFlashStorage(field[i].id)){
			energy += ChargeItemRegistry.getEnergyFrom(field[i], 10000000, 3);
		}
		api.decreaseFieldSlot(i);
	}
	ChargeItemRegistry.addEnergyTo(result, energy, energy, 3);
}

Armor.registerFuncs("advSolarHelmet", ADV_ARMOR_FUNC_CHARGED);
Armor.registerFuncs("advSolarHelmetUncharged", ADV_ARMOR_FUNC_CHARGED);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.advSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.advSolarHelmet)}, [
		"asa",
		"chc"
	], ['s', BlockID.advancedSolarPanel, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.nanoHelmet, -1, 'c', ItemID.cableGold2, 0], RECIPE_FUNC_TRANSPORT_ENERGY);
});