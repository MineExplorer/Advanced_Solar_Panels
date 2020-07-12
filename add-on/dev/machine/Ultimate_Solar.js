IDRegistry.genBlockID("USP");
Block.createBlock("USP", [
	{name: "Ultimate Solar Panel", texture: [["usp", 2], ["usp", 1], ["usp", 0], ["usp", 0], ["usp", 0], ["usp", 0]], inCreative: true}
], "machine");
ICore.ItemName.setRarity(BlockID.USP, 3, true);
ICore.Machine.setMachineDrop("USP");

var USP = {
	gen_day: parseInt(__config__.access("ultimate_solar_panel.gen_day")),
	gen_night: parseInt(__config__.access("ultimate_solar_panel.gen_night")),
	output: parseInt(__config__.access("ultimate_solar_panel.output")),
	energy_storage: parseInt(__config__.access("ultimate_solar_panel.storage"))
}

var guiUSP = new UI.StandartWindow({
	standart: {
		header: {text: {text: Translation.translate("Ultimate Solar Panel")}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	params: {slot: "asp_slot"},
	
	drawing: [
		{type: "background", color: android.graphics.Color.parseColor("#353535")},
		{type: "bitmap", x: 350, y: 40, bitmap: "asp_background", scale: 2.1},
		{type: "bitmap", x: 398, y: 107, bitmap: "asp_energybar_0", scale: GUI_SCALE},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 398 + GUI_SCALE * 4, y: 107, direction: 0, value: 0.5, bitmap: "asp_energybar_1", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 400, y: 235, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 4)}},
		"slot2": {type: "slot", x: 459, y: 235, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 4)}},
		"slot3": {type: "slot", x: 518, y: 235, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 4)}},
		"slot4": {type: "slot", x: 577, y: 235, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 4)}},
		"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: "Storage: "},
		"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: Translation.translate("Max Output: ") + USP.output + " EU/t"},
		"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: Translation.translate("Generating: ")},
		"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
	}
});


ICore.Machine.registerGenerator(BlockID.USP, {
	defaultValues: {
		canSeeSky: false
	},
	
	getEnergyStorage: function() {
		return USP.energy_storage;
	},
	
	getGuiScreen: function() {
		return guiUSP;
	},
	
	init: function() {
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	},
	
	getTransportSlots: function() {
		return {input: []};
	},
	
	tick: function() {
		var energyStorage = this.getEnergyStorage();
		var content = this.container.getGuiContent();
		var generating = 0;

		if (World.getThreadTime() % 100 == 0) {
			this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
		}
		if (this.data.canSeeSky) {
			var time = World.getWorldTime() % 24000;
			if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y + 1, this.z) > 14)) {
				generating = USP.gen_day;
				if (content)
					content.elements["light"].bitmap = "asp_sun";
			}
			else {
				generating = USP.gen_night;
				if (content)
					content.elements["light"].bitmap = "asp_moon";
			}
			this.data.energy = Math.min(this.data.energy + generating, this.getEnergyStorage());
		}
		else if (content) {
			content.elements["light"].bitmap = "asp_dark";
		}
		
		for(var i = 1; i <= 4; i++) {
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}
		
		this.container.setText("textGen", Translation.translate("Generating: ") + generating + " EU/t");
		this.container.setText("textStorage", Translation.translate("Storage: ") + this.data.energy + "/" + energyStorage);
		this.container.setScale("energyScale", this.data.energy / energyStorage);
	},
	
	energyTick: function(type, src) {
		var output = Math.min(USP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});