/*
   ___        _                                                    ____                                 ____
  / _ \      | |                                            _     / ___|          _                    |  _ \                         _
 | (_) |   __| |  _    _   __ _   _ __     ___    ___    __| |   | |__     ___   | |   __ _   _ __     | |_) |  __ _   _ __     ___  | |  ___
 |  _  |  / _` | \ \  / / / _` | | '_ \   / __|  / _ \  / _` |    \__ \   / _ \  | |  / _` | | '__|    |  __/  / _` | | '_ \   / _ \ | | / __|
 | | | | | (_| |  \ \/ / | (_| | | | | | | |__  |  __/ | (_| |    ___| | | (_) | | | | (_| | | |       | |    | (_| | | | | | |  __/ | | \__ \
 |_| |_|  \__,_|   \__/   \__,_| |_| |_|  \___|  \___|  \__,_|   |____/   \___/  |_|  \__,_| |_|       |_|     \__,_| |_| |_|  \___| |_| |___/
                     
 by MrMacflame (VK: vk.com/mrmacflame), MajaProduction (VK: vk.com/mc.maja) and MineExplorer (VK: vk.com/vlad.gr2027, YouTube: http://www.youtube.com/c/MineExplorer2027)

 This code is a copyright, do not distribute.
*/
Callback.addCallback("LevelLoaded", function(){
	Game.message(ChatColor.PURPLE + "Advanced Solar Panels v1.1");
});

var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

var GUI_BAR_STANDART_SCALE = 3.2;

ModAPI.registerAPI("ASPAddonLoaded", null);


// Machines
Translation.addTranslation("Advanced Solar Panel", {ru: "Улучшенная солнечная панель", zh: "高级太阳能发电机"});
Translation.addTranslation("Hybrid Solar Panel", {ru: "Гибридная солнечная панель", zh: "混合太阳能发电机"});
Translation.addTranslation("Ultimate Solar Panel", {ru: "Совершенная солнечная панель", zh: "终极混合太阳能发电机"});
Translation.addTranslation("Quantum Solar Panel", {ru: "Квантовая солнечная панель", zh: "量子太阳能发电机"});
Translation.addTranslation("Molecular Transformer", {ru: "Молекулярный преобразователь", zh: "分子重组仪"});

// Items
Translation.addTranslation("Sunnarium Part", {ru: "Часть саннариума", zh: "小块阳光化合物"});
Translation.addTranslation("Sunnarium", {ru: "Саннариум", zh: "阳光化合物"});
Translation.addTranslation("Sunnarium Alloy", {ru: "Сплав саннариума", zh: "阳光合金"});
Translation.addTranslation("Enriched Sunnarium", {ru: "Обогащённый саннариум", zh: "光辉铀锭"});
Translation.addTranslation("Enriched Sunnarium Alloy", {ru: "Сплав обогащённого саннариума", zh: "富集阳光化合物"});
Translation.addTranslation("Irradiant Glass Panel", {ru: "Излучающая стеклянная панель", zh: "富集阳光合金"});
Translation.addTranslation("Iridium Iron Plate", {ru: "Иридиевая железная пластина", zh: "光辉玻璃板"});
Translation.addTranslation("Reinforced Iridium Iron Plate", {ru: "Укрепленная иридиевая железная пластина", zh: "铱铁合金板"});
Translation.addTranslation("Irradiant Reinforced Plate", {ru: "Излучающая укреплённая пластина", zh: "强化铱铁合金板"});
Translation.addTranslation("Iridium Ingot", {ru: "Иридиевый слиток", zh: "铱锭"});
Translation.addTranslation("Uranium Ingot", {ru: "Урановый слиток", zh: "铀锭"});
Translation.addTranslation("Irradiant Uranium Ingot", {ru: "Излучающий урановый слиток", zh: "阳光合金"});
Translation.addTranslation("MT Core", {ru: "MT-ядро", zh: "分子重组核心"});
Translation.addTranslation("Quantum Core", {ru: "Квантовое ядро", zh: "量子核心"});

// Armor
Translation.addTranslation("Advanced Solar Helmet", {ru: "Улучшенный солнечный шлем", zh: "高级太阳能头盔"});
Translation.addTranslation("Hybrid Solar Helmet", {ru: "Гибридный солнечный шлем", zh: "混合太阳能头盔"});
Translation.addTranslation("Ultimate Solar Helmet", {ru: "Совершенный солнечный шлем", zh: "终极混合太阳能头盔"});


IDRegistry.genItemID("ingotIridium");
Item.createItem("ingotIridium", "Iridium Ingot", {name: "ingot_iridium", meta: 0});

IDRegistry.genItemID("ingotUranium");
Item.createItem("ingotUranium", "Uranium Ingot", {name: "ingot_uranium", meta: 0});
	
Callback.addCallback("PreLoaded", function(){
	ICore.Recipe.addRecipeFor("compressor", ItemID.iridiumChunk, {id: ItemID.ingotIridium, count: 1, data: 0})
	ICore.Recipe.addRecipeFor("compressor", ItemID.uraniumChunk, {id: ItemID.ingotUranium, count: 1, data: 0})
});

IDRegistry.genItemID("ingotIrradiantUranium");
Item.createItem("ingotIrradiantUranium", "Irradiant Uranium Ingot", {name: "ingot_irradiant_uranium", meta: 0});
Recipes.addShaped({id: ItemID.ingotIrradiantUranium, count: 1, data: 0}, [
 " a ",
 "aba",
 " a "
 ], ['a', 348, 0, 'b', ItemID.ingotUranium, 0]);

IDRegistry.genItemID("irradiantGlass");
Item.createItem("irradiantGlass", "Irradiant Glass Panel", {name: "irradiant_glass", meta: 0});
Recipes.addShaped({id: ItemID.irradiantGlass, count: 6, data: 0}, [
 "aaa",
 "bcb", 
 "aaa"
 ], ['a', BlockID.reinforcedGlass, 0, 'b', ItemID.ingotIrradiantUranium, 0, 'c', 348, 0]);

IDRegistry.genItemID("sunnariumPart");
Item.createItem("sunnariumPart", "Sunnarium Part", {name: "sunnarium_part", meta: 0});

IDRegistry.genItemID("sunnarium");
Item.createItem("sunnarium", "Sunnarium", {name: "sunnarium", meta: 0});
Recipes.addShaped({id: ItemID.sunnarium, count: 1, data: 0}, [
 "aaa",
 "aaa",
 "aaa"
 ], ['a', ItemID.sunnariumPart, 0]);

IDRegistry.genItemID("sunnariumAlloy");
Item.createItem("sunnariumAlloy", "Sunnarium Alloy", {name: "sunnarium_alloy", meta: 0});
Recipes.addShaped({id: ItemID.sunnariumAlloy, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', ItemID.plateReinforcedIridium, 0, 'b', ItemID.sunnarium, 0]);
 
IDRegistry.genItemID("enrichedSunnarium");
Item.createItem("enrichedSunnarium", "Enriched Sunnarium", {name: "enriched_sunnarium", meta: 0});
Recipes.addShaped({id: ItemID.enrichedSunnarium, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', ItemID.ingotIrradiantUranium, 0, 'b', ItemID.sunnarium, 0]);
 
 IDRegistry.genItemID("enrichedSunnariumAlloy");
Item.createItem("enrichedSunnariumAlloy", "Enriched Sunnarium Alloy", {name: "enriched_sunnarium_alloy", meta: 0});
Recipes.addShaped({id: ItemID.enrichedSunnariumAlloy, count: 1, data: 0}, [
 " a ",
 "aba",
 " a "
 ], ['a', ItemID.enrichedSunnarium, 0, 'b', ItemID.sunnariumAlloy, 0]);

IDRegistry.genItemID("plateIridiumIron");
Item.createItem("plateIridiumIron", "Iridium Iron Plate", {name: "plate_iridium_iron", meta: 0});
Recipes.addShaped({id: ItemID.plateIridiumIron, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', 265, 0, 'b', ItemID.ingotIridium, 0]);

IDRegistry.genItemID("plateReinforcedIridiumIron");
Item.createItem("plateReinforcedIridiumIron", "Reinforced Iridium Iron Plate", {name: "plate_reinforced_iridium_iron", meta: 0});
Recipes.addShaped({id: ItemID.plateReinforcedIridiumIron, count: 1, data: 0}, [
 "aba",
 "bcb",
 "aba"
 ], ['a', ItemID.plateAlloy, 0, 'b', ItemID.carbonPlate, 0, 'c', ItemID.plateIridiumIron, 0]);

IDRegistry.genItemID("plateIrradiantReinforced");
Item.createItem("plateIrradiantReinforced", "Irradiant Reinforced Plate", {name: "plate_irradiant_reinforced", meta: 0});
Recipes.addShaped({id: ItemID.plateIrradiantReinforced, count: 1, data: 0}, [
 "aba",
 "cdc",
 "axa"
 ], ['a', 331, 0, 'b', ItemID.sunnariumPart, 0, 'c', 351, 4, 'd', ItemID.plateReinforcedIridiumIron, 0, 'x', 264, 0]);

IDRegistry.genItemID("mtCore");
Item.createItem("mtCore", "MT Core", {name: "mtCore", meta: 0});
Recipes.addShaped({id: ItemID.mtCore, count: 1, data: 0}, [
 "aba",
 "a a",
 "aba"
 ], ['a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0]);

IDRegistry.genItemID("quantumCore");
Item.createItem("quantumCore", "Quantum Core", {name: "quantum_core", meta: 0});
Recipes.addShaped({id: ItemID.quantumCore, count: 1, data: 0}, [
 "aba",
 "bcb",
 "aba"
 ], ['a', ItemID.enrichedSunnariumAlloy, 0, 'b', 399, 0, 'c', 381, 0]);


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


IDRegistry.genItemID("hybridSolarHelmet");
Item.createArmorItem("hybridSolarHelmet", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 5, durability: 8333, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
Player.addItemCreativeInv(ItemID.hybridSolarHelmet, 1, 1);
ICore.ChargeRegistry.registerItem(ItemID.hybridSolarHelmet, 1000000, 1, true, 120);

IDRegistry.genItemID("hybridSolarHelmetUncharged");
Item.createArmorItem("hybridSolarHelmetUncharged", "Hybrid Solar Helmet", {name: "hybrid_solar_helmet"}, {type: "helmet", armor: 2, durability: 8333, texture: "armor/hybrid_solar_helmet_1.png", isTech: true});
ICore.ChargeRegistry.registerItem(ItemID.hybridSolarHelmetUncharged, 1000000, 1, true, 120);

ICore.Recipe.registerRecipesFor("hybrid-armor-charge", {
	"ItemID.hybridSolarHelmet": {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged},
	"ItemID.hybridSolarHelmetUncharged": {charged: ItemID.hybridSolarHelmet, uncharged: ItemID.hybridSolarHelmetUncharged},
}, true);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.hybridSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.hybridSolarHelmet)}, [
		"asa",
		"chc"
	], ['s', BlockID.hybridSolarPanel, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], RECIPE_FUNC_TRANSPORT_ENERGY);
});


IDRegistry.genItemID("ultimateSolarHelmet");
Item.createArmorItem("ultimateSolarHelmet", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 5, durability: 8333, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
Player.addItemCreativeInv(ItemID.ultimateSolarHelmet, 1, 1);
ICore.ChargeRegistry.registerItem(ItemID.ultimateSolarHelmet, 1000000, 1, true, 120);

IDRegistry.genItemID("ultimateSolarHelmetUncharged");
Item.createArmorItem("ultimateSolarHelmetUncharged", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 2, durability: 8333, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ICore.ChargeRegistry.registerItem(ItemID.ultimateSolarHelmetUncharged, 1000000, 1, true, 120);

ICore.Recipe.registerRecipesFor("ultimate-armor-charge", {
	"ItemID.ultimateSolarHelmet": {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged},
	"ItemID.ultimateSolarHelmetUncharged": {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged},
}, true);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
		"asa",
		"chc"
	], ['s', BlockID.ultimateSolarPanel, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], RECIPE_FUNC_TRANSPORT_ENERGY);
	
	Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
		"s",
		"h"
	], ['s', BlockID.ultimateSolarPanel, 0, 'h', ItemID.hybridSolarHelmet, -1], RECIPE_FUNC_TRANSPORT_ENERGY);
});


IDRegistry.genBlockID("advancedSolarPanel");
Block.createBlock("advancedSolarPanel", [
	{name: "Advanced Solar Panel", texture: [["asp", 2], ["asp", 1], ["asp", 0], ["asp", 0], ["asp", 0], ["asp", 0]], inCreative: true}
]);

var ASP = {
	gen_day: __config__.access("advanced_solar_panel.gen_day"),
	gen_night: __config__.access("advanced_solar_panel.gen_night"),
	output: __config__.access("advanced_solar_panel.output"),
	energy_storage: __config__.access("advanced_solar_panel.storage")
}

var guiAdvancedSolarPanel = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Advanced Solar Panel"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.rgb(53, 53, 53)},
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_gui", scale: 2.1},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 398, y: 90, direction: 0, value: 0.5, bitmap: "ASP_energybar", scale: 2.1},
		"slot1": {type: "slot", x: 390, y: 212, bitmap: "slotbg", size: 50},
		"slot2": {type: "slot", x: 440, y: 212, bitmap: "slotbg", size: 50},
		"slot3": {type: "slot", x: 490, y: 212, bitmap: "slotbg", size: 50},
		"slot4": {type: "slot", x: 540, y: 212, bitmap: "slotbg", size: 50},
		"textStorage": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 615, y: 76, width: 300, height: 50, text: "/32000"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Max Output: " + ASP.output + " EU/t"},
		"textGen": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 425, y: 135, bitmap: "dark", scale: 2.1}
	}
});


ICore.Machine.registerPrototype(BlockID.advancedSolarPanel, {
	getEnergyStorage: function(){
		return ASP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiAdvancedSolarPanel;
	},
	
	tick: function(){
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, ASP.output, 0);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot2"), this.data.energy, ASP.output, 0);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot3"), this.data.energy, ASP.output, 0);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot4"), this.data.energy, ASP.output, 0);
		
		var energyStorage = this.getEnergyStorage()
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		var content = this.container.getGuiContent();
		if(World.canSeeSky(this.x, this.y + 1, this.z)){
			if(nativeGetLightLevel(this.x, this.y + 1, this.z) == 15){
				this.data.energy = Math.min(this.data.energy + ASP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + ASP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + ASP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + ASP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "dark";}
		}
		var output = Math.min(ASP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});


IDRegistry.genBlockID("hybridSolarPanel");
Block.createBlock("hybridSolarPanel", [
	{name: "Hybrid Solar Panel", texture: [["hsp", 2], ["hsp", 1], ["hsp", 0], ["hsp", 0], ["hsp", 0], ["hsp", 0]], inCreative: true}
]);

var HSP = {
	gen_day: __config__.access("hybrid_solar_panel.gen_day"),
	gen_night: __config__.access("hybrid_solar_panel.gen_night"),
	output: __config__.access("hybrid_solar_panel.output"),
	energy_storage: __config__.access("hybrid_solar_panel.storage")
}

var guiHybridSolarPanel = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Hybrid Solar Panel"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.rgb(53, 53, 53)},
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_gui", scale: 2.1},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 398, y: 90, direction: 0, value: 0.5, bitmap: "ASP_energybar", scale: 2.1},
		"slot1": {type: "slot", x: 390, y: 212, bitmap: "slotbg", size: 50},
		"slot2": {type: "slot", x: 440, y: 212, bitmap: "slotbg", size: 50},
		"slot3": {type: "slot", x: 490, y: 212, bitmap: "slotbg", size: 50},
		"slot4": {type: "slot", x: 540, y: 212, bitmap: "slotbg", size: 50},
		"textStorage": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 615, y: 76, width: 300, height: 50, text: "/100000"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Max Output: " + HSP.output + " EU/t"},
		"textGen": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 425, y: 135, bitmap: "dark", scale: 2.1}
	}
});


ICore.Machine.registerPrototype(BlockID.hybridSolarPanel, {
	getEnergyStorage: function(){
		return HSP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiHybridSolarPanel;
	},
	
	tick: function(){
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, HSP.output, 1);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot2"), this.data.energy, HSP.output, 1);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot3"), this.data.energy, HSP.output, 1);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot4"), this.data.energy, HSP.output, 1);
		
		var energyStorage = this.getEnergyStorage()
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var content = this.container.getGuiContent();
		if(World.canSeeSky(this.x, this.y + 1, this.z)){
			if(nativeGetLightLevel(this.x, this.y + 1, this.z) == 15){
				this.data.energy = Math.min(this.data.energy + HSP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + HSP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + HSP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + HSP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "dark";}
		}
		var output = Math.min(HSP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});


IDRegistry.genBlockID("ultimateSolarPanel");
Block.createBlock("ultimateSolarPanel", [
	{name: "Ultimate Solar Panel", texture: [["usp", 2], ["usp", 1], ["usp", 0], ["usp", 0], ["usp", 0], ["usp", 0]], inCreative: true}
]);

var USP = {
	gen_day: __config__.access("ultimate_solar_panel.gen_day"),
	gen_night: __config__.access("ultimate_solar_panel.gen_night"),
	output: __config__.access("ultimate_solar_panel.output"),
	energy_storage: __config__.access("ultimate_solar_panel.storage")
}

var guiUltimateHybridSolarPanel = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Ultimate Solar Panel"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.rgb(53, 53, 53)},
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_gui", scale: 2.1},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 398, y: 90, direction: 0, value: 0.5, bitmap: "ASP_energybar", scale: 2.1},
		"slot1": {type: "slot", x: 390, y: 212, bitmap: "slotbg", size: 50},
		"slot2": {type: "slot", x: 440, y: 212, bitmap: "slotbg", size: 50},
		"slot3": {type: "slot", x: 490, y: 212, bitmap: "slotbg", size: 50},
		"slot4": {type: "slot", x: 540, y: 212, bitmap: "slotbg", size: 50},
		"textStorage": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 615, y: 76, width: 300, height: 50, text: "/1000000"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Max Output: " + USP.output + " EU/t"},
		"textGen": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 425, y: 135, bitmap: "dark", scale: 2.1}
	}
});


ICore.Machine.registerPrototype(BlockID.ultimateSolarPanel, {
	getEnergyStorage: function(){
		return USP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiUltimateHybridSolarPanel;
	},
	
	tick: function(){
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, USP.output, 2);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot2"), this.data.energy, USP.output, 2);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot3"), this.data.energy, USP.output, 2);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot4"), this.data.energy, USP.output, 2);
		
		var energyStorage = this.getEnergyStorage()
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		var content = this.container.getGuiContent();
		if(World.canSeeSky(this.x, this.y + 1, this.z)){
			if(nativeGetLightLevel(this.x, this.y + 1, this.z) == 15){
				this.data.energy = Math.min(this.data.energy + USP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + USP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + USP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + USP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "dark";}
		}
		var output = Math.min(USP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});


IDRegistry.genBlockID("quantumSolarPanel");
Block.createBlock("quantumSolarPanel", [
	{name: "Quantum Solar Panel", texture: [["qsp", 2], ["qsp", 1], ["qsp", 0], ["qsp", 0], ["qsp", 0], ["qsp", 0]], inCreative: true}
]);

var QSP = {
	gen_day: __config__.access("quantum_solar_panel.gen_day"),
	gen_night: __config__.access("quantum_solar_panel.gen_night"),
	output: __config__.access("quantum_solar_panel.output"),
	energy_storage: __config__.access("quantum_solar_panel.storage")
}

var guiQuantumSolarPanel = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Quantum Solar Panel"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.rgb(53, 53, 53)},
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_gui", scale: 2.1},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 398, y: 90, direction: 0, value: 0.5, bitmap: "ASP_energybar", scale: 2.1},
		"slot1": {type: "slot", x: 390, y: 212, bitmap: "slotbg", size: 50},
		"slot2": {type: "slot", x: 440, y: 212, bitmap: "slotbg", size: 50},
		"slot3": {type: "slot", x: 490, y: 212, bitmap: "slotbg", size: 50},
		"slot4": {type: "slot", x: 540, y: 212, bitmap: "slotbg", size: 50},
		"textStorage": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 615, y: 76, width: 300, height: 50, text: "/10000000"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Max Output: " + QSP.output + " EU/t"},
		"textGen": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 425, y: 135, bitmap: "dark", scale: 2.1}
	}
});

ICore.Machine.registerPrototype(BlockID.quantumSolarPanel, {
	getEnergyStorage: function(){
		return QSP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiQuantumSolarPanel;
	},
	
	tick: function(){
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, QSP.output, 3);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot2"), this.data.energy, QSP.output, 3);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot3"), this.data.energy, QSP.output, 3);
		this.data.energy -= ICore.ChargeRegistry.addEnergyTo(this.container.getSlot("slot4"), this.data.energy, QSP.output, 3);
		
		var energyStorage = this.getEnergyStorage()
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var content = this.container.getGuiContent();
		if(World.canSeeSky(this.x, this.y + 1, this.z)){
			if(nativeGetLightLevel(this.x, this.y + 1, this.z) == 15){
				this.data.energy = Math.min(this.data.energy + QSP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + QSP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + QSP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + QSP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "dark";}
		}
		var output = Math.min(QSP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});


IDRegistry.genBlockID("molecularTransformer");
Block.createBlock("molecularTransformer", [
	{name: "Molecular Transformer", texture: [["mt", 2], ["mt", 1], ["mt", 0], ["mt", 3], ["mt", 0], ["mt", 0]], inCreative: true}
]);
/*
var molecularTransformerRenderer = new TileRenderModel(BlockID.molecularTransformer, 0);
molecularTransformerRenderer.addBox(.25, 0, .25, .75, 1, .75);
molecularTransformerRenderer.addBox(0, 0, 0, .25, .125, .25);
molecularTransformerRenderer.addBox(.75, 0, .25, 1, .125, .25);
molecularTransformerRenderer.addBox(.375, 0, .75, .625, .125, 1);
molecularTransformerRenderer.addBox(0, 0, .875, .25, 1, .25);
molecularTransformerRenderer.addBox(.75, .875, .25, 1, 1, .25);
molecularTransformerRenderer.addBox(.375, .875, .75, .625, 1, 1);
*/
Block.setBlockShape(BlockID.molecularTransformer, {x: 0.25, y: 0, z: 0.25}, {x: 0.75, y: 0.875, z: 0.75});

Recipes.addShaped({id: BlockID.molecularTransformer, count: 1, data: 0}, [
 "axa",
 "bcb", 
 "axa"
 ], ['a', BlockID.machineBlockAdvanced, 0, 'b', ItemID.circuitAdvanced, 0, 'c', ItemID.mtCore, 0, 'x', ItemID.storageLapotronCrystal, -1]);

//UI.addItemOverride(BlockID.molecularTransformer, 0, "mt")

var guiMolecularTransformer = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Molecular Transformer"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 360, y: 40, bitmap: "ASP_molecular_transformer_gui", scale: 2.1},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 408, y: 140.8, direction: 3, bitmap: "ASP_molecular_progressbar", scale: 2.1},
		"slot1": {type: "slot", x: 398, y: 88, bitmap: "slotmt", size: 43},
		"slot2": {type: "slot", x: 398, y: 183, bitmap: "slotmt", size: 43},
		"textInput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 75, width: 300, height: 50, text: "Input:"},
		"textOutput": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 120, width: 300, height: 20, text: "Output:"},
		"textEnergy": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 134, width: 300, height: 39, text: "Energy:"},
		"textProgress": {font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}, type: "text", x: 515, y: 159, width: 300, height: 39, text: "Progress:"},
	}
});

ICore.Recipe.registerRecipesFor("molecularTransformer", {
	"397:1": {id: 399, count: 1, data: 0, energy: 250000000},
	265: {id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9000000},
	87: {id: 289, count: 2, data: 0, energy: 70000},
	12: {id: 13, count: 1, data: 0, energy: 50000},
	3: {id: 82, count: 1, data: 0, energy: 50000},
	"263:1": {id: 263, count: 1, data: 0, energy: 60000},
	348: {id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1000000},
	89: {id: ItemID.sunnarium, count: 1, data: 0, energy: 9000000},
	"35:4": {id: 89, count: 1, data: 0, energy: 500000},
	"35:11": {id: 22, count: 1, data: 0, energy: 500000},
	"35:14": {id: 152, count: 1, data: 0, energy: 500000},
	"263:0": {id: 264, count: 1, data: 0, energy: 9000000},
	//"ItemID.ingotTin": {id: ItemID.ingotSilver, count: 1, data: 0, energy: 500000},
	//"ItemID.ingotSilver": {id: 266, count: 1, data: 0, energy: 500000},
}, false);

ICore.Machine.registerPrototype(BlockID.molecularTransformer, {
	defaultValues: {
		progress: 0,
	},
	
	getEnergyStorage: function(){
		return 8192;
	},
	
	getGuiScreen: function(){
		return guiMolecularTransformer;
	},
	
	tick: function(){
		var sourceSlot = this.container.getSlot("slot1");
		var result = ICore.Recipe.getRecipeResult("molecularTransformer", sourceSlot.id) || ICore.Recipe.getRecipeResult("molecularTransformer", sourceSlot.id+":"+sourceSlot.data);
		if(result){
			this.container.setText("textInput", "Input: " + Item.getName(sourceSlot.id, sourceSlot.data));
			this.container.setText("textOutput", "Output: " + Item.getName(result.id, result.data));
			this.container.setText("textEnergy", "Energy: " + result.energy);
			this.container.setText("textProgress", "Progress: " + parseInt(this.data.progress / result.energy * 100) + "%");
			var resultSlot = this.container.getSlot("slot2");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count + result.count <= 64 || resultSlot.id == 0){
				var transfer = Math.min(this.data.energy, result.energy - this.data.progress);
				this.data.progress += transfer;
				this.data.energy -= transfer;
				this.container.setScale("progressScale", this.data.progress / result.energy);
				if(this.data.progress >= result.energy){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else{
			this.data.progress = 0;
			this.container.setScale("progressScale", 0);
			this.container.setText("textInput", "Input:    ");
			this.container.setText("textOutput", "Output:   ");
			this.container.setText("textEnergy", "Energy:   ");
			this.container.setText("textProgress", "Progress: ");
		}
	},
	
	energyTick: ICore.Machine.basicEnergyReceiveFunc
});


Recipes.addShapeless({id: BlockID.hybridSolar, count: 8, data: 0}, [{id: BlockID.ultimateSolar, data: -1}]);

Recipes.addShaped({id: BlockID.ultimateSolarPanel, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', BlockID.hybridSolarPanel, 0, 'b', ItemID.circuitAdvanced, 0]);
 
 Recipes.addShaped({id: BlockID.quantumSolarPanel, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
 ], ['a', BlockID.ultimateSolarPanel, 0, 'b', ItemID.quantumCore, 0]);

if(__config__.access("hard_recipes")){
	if(__config__.access("simple_asp_recipe")){
		Recipes.replaceWithShaped({id: BlockID.advancedSolarPanel, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, -1, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, "d", BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.advancedSolarPanel, count: 1, data: 0}, [
		"aaa", 
		"bxb", 
		"cdc"
		], ['x', BlockID.solarPanel, 0, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, "d", ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.hybridSolarPanel, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	 ], ["f", 22, -1, 'x', BlockID.advancedSolarPanel, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, "d", ItemID.enrichedSunnarium, 0]);

	Recipes.addShaped({id: BlockID.ultimateSolarPanel, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	 ], ['a', 22, -1, 'x', BlockID.advancedSolarPanel, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.enrichedSunnariumAlloy, 0]);
}
else{
	if(__config__.access("simple_asp_recipe")){
		Recipes.replaceWithShaped({id: BlockID.advancedSolarPanel, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, "d", BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.advancedSolarPanel, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, "d", ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.hybridSolarPanel, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	 ], ["f", 22, -1, 'x', BlockID.advancedSolarPanel, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, "d", ItemID.sunnarium, 0]);
	 
	Recipes.addShaped({id: BlockID.ultimateSolarPanel, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	 ], ['a', 22, -1, 'x', BlockID.advancedSolarPanel, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.sunnariumAlloy, 0]);
}


