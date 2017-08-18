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