IDRegistry.genItemID("advSolarHelmet");
Item.createArmorItem("advSolarHelmet", "Advanced Solar Helmet", {name: "adv_solar_helmet"}, {type: "helmet", armor: 4, durability: 1000000, texture: "armor/adv_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.advSolarHelmet, "Eu", 1000000, 2048, 3, "armor", true);
ICore.ItemName.setRarity(ItemID.advSolarHelmet, 1);
Item.registerNameOverrideFunction(ItemID.advSolarHelmet, ICore.ItemName.showItemStorage);

IDRegistry.genItemID("advSolarHelmetUncharged");
Item.createArmorItem("advSolarHelmetUncharged", "Advanced Solar Helmet", {name: "adv_solar_helmet"}, {type: "helmet", armor: 2, durability: 1000000, texture: "armor/adv_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.advSolarHelmetUncharged, "Eu", 1000000, 3, "armor");
ICore.ItemName.setRarity(ItemID.advSolarHelmetUncharged, 1);
Item.registerNameOverrideFunction(ItemID.advSolarHelmetUncharged, ICore.ItemName.showItemStorage);

Recipes.addShaped({id: ItemID.advSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.advSolarHelmet)}, [
	"asa",
	"chc"
], ['s', BlockID.ASP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.nanoHelmet, -1, 'c', ItemID.cableGold2, 0], ChargeItemRegistry.transportEnergy);

Recipes.addShaped({id: ItemID.quantumHelmet, count: 1, data: Item.getMaxDamage(ItemID.quantumHelmet)}, [
	"a#a",
	"bxb",
	"cqc"
], ['#', ItemID.storageLapotronCrystal, -1, 'x', ItemID.advSolarHelmet, -1, 'q', ItemID.hazmatHelmet, 0, 'a', ItemID.plateReinforcedIridium, 0, 'b', BlockID.reinforcedGlass, 0, 'c', ItemID.circuitAdvanced, 0], ChargeItemRegistry.transportEnergy);
	

ICore.Recipe.addRecipeFor("nano-armor-charge", ItemID.advSolarHelmet, {charged: ItemID.advSolarHelmet, uncharged: ItemID.advSolarHelmetUncharged});
ICore.Recipe.addRecipeFor("nano-armor-charge", ItemID.advSolarHelmetUncharged, {charged: ItemID.advSolarHelmet, uncharged: ItemID.advSolarHelmetUncharged});

ICore.UI.setArmorButton(ItemID.advSolarHelmet, "button_nightvision");

var NANO_ARMOR_FUNCS = ICore.requireGlobal("NANO_ARMOR_FUNCS");
function chargeArmor(genD, genN){
	var time = World.getWorldTime()%24000;
	var p = Player.getPosition();
	if(GenerationUtils.canSeeSky(p.x, p.y, p.z)){
		if((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y+1, this.z) > 14)){
			var energy = genD;
		}else{
			var energy = genN;
		}
		for(var i = 3; i >= 0; i--){
			var armor = Player.getArmorSlot(i);
			var energyAdd = ICore.ChargeRegistry.addEnergyTo(armor, "Eu", energy, energy, 4);
			if(energyAdd > 0){
				var armorID = Player.getArmorSlot(i).id;
				if(armorID != armor.id){
					Logger.Log("Error in getArmorSlot("+i+"): id " + armor.id + " != " + armorID, "ERROR");
					continue;
				}
				energy -= energyAdd;
				Player.setArmorSlot(i, armor.id, 1, armor.data, armor.extra);
				if(energy <= 0){
					break;
				}
			}
		}
	}
}

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20 == 0){
		var slot = Player.getArmorSlot(0);
		if(slot.id == ItemID.advSolarHelmet || slot.id == ItemID.advSolarHelmetUncharged){
			chargeArmor(ASP.gen_day*20, ASP.gen_night*20);
		}
	}
});

Armor.registerFuncs("advSolarHelmet", NANO_ARMOR_FUNCS);
Armor.registerFuncs("advSolarHelmetUncharged", NANO_ARMOR_FUNCS);
