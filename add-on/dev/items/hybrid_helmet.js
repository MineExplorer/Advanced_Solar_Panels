IDRegistry.genItemID("hybridSolarHelmet");
Item.createArmorItem("hybridSolarHelmet", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 5, durability: 10000, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.hybridSolarHelmet, "Eu", 10000000, 8192, 4, "armor", true);
ICore.ItemName.setRarity(ItemID.hybridSolarHelmet, 2);
Item.registerNameOverrideFunction(ItemID.hybridSolarHelmet, ICore.ItemName.showItemStorage);

IDRegistry.genItemID("hybridSolarHelmetUncharged");
Item.createArmorItem("hybridSolarHelmetUncharged", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 2, durability: 10000, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.hybridSolarHelmetUncharged, "Eu", 10000000, 8192, 4, "armor");
ICore.ItemName.setRarity(ItemID.hybridSolarHelmetUncharged, 2);
Item.registerNameOverrideFunction(ItemID.hybridSolarHelmetUncharged, ICore.ItemName.showItemStorage);

Recipes.addShaped({id: ItemID.hybridSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.hybridSolarHelmet)}, [
	"asa",
	"chc"
], ['s', BlockID.HSP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transportEnergy);


ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.hybridSolarHelmet, {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged});
ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.hybridSolarHelmetUncharged, {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged});

ICore.UI.setArmorButton(ItemID.hybridSolarHelmet, "button_nightvision");

var QUANTUM_ARMOR_FUNCS = ICore.requireGlobal("QUANTUM_ARMOR_FUNCS");

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20 == 0){
		var slot = Player.getArmorSlot(0);
		if(slot.id == ItemID.hybridSolarHelmet || slot.id == ItemID.hybridSolarHelmetUncharged){
			chargeArmor(HSP.gen_day*20, HSP.gen_night*20);
		}
	}
});

Armor.registerFuncs("hybridSolarHelmet", QUANTUM_ARMOR_FUNCS);
Armor.registerFuncs("hybridSolarHelmetUncharged", QUANTUM_ARMOR_FUNCS);
