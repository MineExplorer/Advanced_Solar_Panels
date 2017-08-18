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