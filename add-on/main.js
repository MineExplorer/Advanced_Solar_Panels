/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 12
*/



// file: header.js

/*
   ___        _                                                    ____                                 ____
  / _ \      | |                                            _     / ___|          _                    |  _ \                         _
 | (_) |   __| |  _    _   __ _   _ __     ___    ___    __| |   | |__     ___   | |   __ _   _ __     | |_) |  __ _   _ __     ___  | |  ___
 |  _  |  / _` | \ \  / / / _` | | '_ \   / __|  / _ \  / _` |    \__ \   / _ \  | |  / _` | | '__|    |  __/  / _` | | '_ \   / _ \ | | / __|
 | | | | | (_| |  \ \/ / | (_| | | | | | | |__  |  __/ | (_| |    ___| | | (_) | | | | (_| | | |       | |    | (_| | | | | | |  __/ | | \__ \
 |_| |_|  \__,_|   \__/   \__,_| |_| |_|  \___|  \___|  \__,_|   |____/   \___/  |_|  \__,_| |_|       |_|     \__,_| |_| |_|  \___| |_| |___/
                     
 by MineExplorer (vk.com/vlad.gr2027) and NikuJagajaga(vk.com/nkjgjg)

 This code is a copyright, do not distribute.
*/

var GUI_SCALE = 3.2;
IMPORT("ChargeItem");




// file: translation.js

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
Translation.addTranslation("Enriched Uranium Ingot", {ru: "Обогащённый урановый слиток", zh: "铀锭"});
Translation.addTranslation("Irradiant Uranium Ingot", {ru: "Излучающий урановый слиток", zh: "阳光合金"});
Translation.addTranslation("MT Core", {ru: "MT-ядро", zh: "分子重组核心"});
Translation.addTranslation("Quantum Core", {ru: "Квантовое ядро", zh: "量子核心"});

// Armor
Translation.addTranslation("Advanced Solar Helmet", {ru: "Улучшенный солнечный шлем", zh: "高级太阳能头盔"});
Translation.addTranslation("Hybrid Solar Helmet", {ru: "Гибридный солнечный шлем", zh: "混合太阳能头盔"});
Translation.addTranslation("Ultimate Solar Helmet", {ru: "Совершенный солнечный шлем", zh: "终极混合太阳能头盔"});




// file: machine/Advanced_Solar.js

IDRegistry.genBlockID("ASP");
Block.createBlock("ASP", [
	{name: "Advanced Solar Panel", texture: [["asp", 2], ["asp", 1], ["asp", 0], ["asp", 0], ["asp", 0], ["asp", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("ASP", function(coords, blockID, blockData, level){
	return ICore.Machine.getMachineDrop(coords, blockID, level);
});


var ASP = {
	gen_day: parseInt(__config__.access("advanced_solar_panel.gen_day")),
	gen_night: parseInt(__config__.access("advanced_solar_panel.gen_night")),
	output: parseInt(__config__.access("advanced_solar_panel.output")),
	energy_storage: parseInt(__config__.access("advanced_solar_panel.storage"))
}

var guiASP = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Advanced Solar Panel"}},
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
		"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {type: "text", x: 628, y: 105, width: 300, height: 50, text: "/32000"},
		"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: "Max Output: " + ASP.output + " EU/t"},
		"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
	}
});


ICore.Machine.registerGenerator(BlockID.ASP, {
	defaultValues: {
		canSeeSky: false
	},
	
	getEnergyStorage: function(){
		return ASP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiASP;
	},
	
	init: function(){
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		var content = this.container.getGuiContent();
		if(World.getThreadTime()%100 == 0){
			this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
		}
		if(this.data.canSeeSky){
			var time = World.getWorldTime()%24000;
			if((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y+1, this.z) > 14)){
				this.data.energy = Math.min(this.data.energy + ASP.gen_day, energyStorage);
				this.container.setText("textGen", "Generating: " + ASP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "asp_sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + ASP.gen_night, energyStorage);
				this.container.setText("textGen", "Generating: " + ASP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "asp_moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "asp_dark";}
		}
		
		for(var i = 1; i <= 4; i++){
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}
		
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var output = Math.min(ASP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});




// file: machine/Hybrid_Solar.js

IDRegistry.genBlockID("HSP");
Block.createBlock("HSP", [
	{name: "Hybrid Solar Panel", texture: [["hsp", 2], ["hsp", 1], ["hsp", 0], ["hsp", 0], ["hsp", 0], ["hsp", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("HSP", function(coords, blockID, blockData, level){
	return ICore.Machine.getMachineDrop(coords, blockID, level);
});

var HSP = {
	gen_day: parseInt(__config__.access("hybrid_solar_panel.gen_day")),
	gen_night: parseInt(__config__.access("hybrid_solar_panel.gen_night")),
	output: parseInt(__config__.access("hybrid_solar_panel.output")),
	energy_storage: parseInt(__config__.access("hybrid_solar_panel.storage"))
}

var guiHSP = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Hybrid Solar Panel"}},
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
		"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {type: "text", x: 628, y: 105, width: 300, height: 50, text: "/100000"},
		"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: "Max Output: " + HSP.output + " EU/t"},
		"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
	}
});



ICore.Machine.registerGenerator(BlockID.HSP, {
	defaultValues: {
		canSeeSky: false
	},
	
	getEnergyStorage: function(){
		return HSP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiHSP;
	},
	
	init: function(){
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		var content = this.container.getGuiContent();
		if(World.getThreadTime()%100 == 0){
			this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
		}
		if(this.data.canSeeSky){
			var time = World.getWorldTime()%24000;
			if((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y+1, this.z) > 14)){
				this.data.energy = Math.min(this.data.energy + HSP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + HSP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "asp_sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + HSP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + HSP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "asp_moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "asp_dark";}
		}
		
		for(var i = 1; i <= 4; i++){
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}
		
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var output = Math.min(HSP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});




// file: machine/Ultimate_Solar.js

IDRegistry.genBlockID("USP");
Block.createBlock("USP", [
	{name: "Ultimate Solar Panel", texture: [["usp", 2], ["usp", 1], ["usp", 0], ["usp", 0], ["usp", 0], ["usp", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("USP", function(coords, blockID, blockData, level){
	return ICore.Machine.getMachineDrop(coords, blockID, level);
});

var USP = {
	gen_day: parseInt(__config__.access("ultimate_solar_panel.gen_day")),
	gen_night: parseInt(__config__.access("ultimate_solar_panel.gen_night")),
	output: parseInt(__config__.access("ultimate_solar_panel.output")),
	energy_storage: parseInt(__config__.access("ultimate_solar_panel.storage"))
}

var guiUSP = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Ultimate Solar Panel"}},
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
		"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {type: "text", x: 628, y: 105, width: 300, height: 50, text: "/1000000"},
		"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: "Max Output: " + USP.output + " EU/t"},
		"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
	}
});


ICore.Machine.registerGenerator(BlockID.USP, {
	defaultValues: {
		canSeeSky: false
	},
	
	getEnergyStorage: function(){
		return USP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiUSP;
	},
	
	init: function(){
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		var content = this.container.getGuiContent();
		if(World.getThreadTime()%100 == 0){
			this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
		}
		if(this.data.canSeeSky){
			var time = World.getWorldTime()%24000;
			if((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y+1, this.z) > 14)){
				this.data.energy = Math.min(this.data.energy + USP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + USP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "asp_sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + USP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + USP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "asp_moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "asp_dark";}
		}
		
		for(var i = 1; i <= 4; i++){
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}
		
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var output = Math.min(USP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});




// file: machine/Quantum_Solar.js

IDRegistry.genBlockID("QSP");
Block.createBlock("QSP", [
	{name: "Quantum Solar Panel", texture: [["qsp", 2], ["qsp", 1], ["qsp", 0], ["qsp", 0], ["qsp", 0], ["qsp", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("QSP", function(coords, blockID, blockData, level){
	return ICore.Machine.getMachineDrop(coords, blockID, level);
});

var QSP = {
	gen_day: parseInt(__config__.access("quantum_solar_panel.gen_day")),
	gen_night: parseInt(__config__.access("quantum_solar_panel.gen_night")),
	output: parseInt(__config__.access("quantum_solar_panel.output")),
	energy_storage: parseInt(__config__.access("quantum_solar_panel.storage"))
}

var guiQSP = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Quantum Solar Panel"}},
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
		"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: "Storage:"},
		"textInfo1": {type: "text", x: 628, y: 105, width: 300, height: 50, text: "/10000000"},
		"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: "Max Output: " + QSP.output + " EU/t"},
		"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: "Generating:"},
		"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
	}
});


ICore.Machine.registerGenerator(BlockID.QSP, {
	defaultValues: {
		canSeeSky: false
	},
	
	getEnergyStorage: function(){
		return QSP.energy_storage;
	},
	
	getGuiScreen: function(){
		return guiQSP;
	},
	
	init: function(){
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		var content = this.container.getGuiContent();
		if(World.getThreadTime()%100 == 0){
			this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
		}
		if(this.data.canSeeSky){
			var time = World.getWorldTime()%24000;
			if((time >= 23500 || time < 12550) && (!World.getWeather().rain || World.getLightLevel(this.x, this.y+1, this.z) > 14)){
				this.data.energy = Math.min(this.data.energy + QSP.gen_day, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + QSP.gen_day + " EU/t"); 
				if(content){ 
				content.elements["light"].bitmap = "asp_sun";}
			}
			else{
				this.data.energy = Math.min(this.data.energy + QSP.gen_night, this.getEnergyStorage());
				this.container.setText("textGen", "Generating: " + QSP.gen_night + " EU/t");
				if(content){
				content.elements["light"].bitmap = "asp_moon";}
			}
		}
		else{
			this.container.setText("textGen", "Generating: 0 EU/t");
			if(content){
			content.elements["light"].bitmap = "asp_dark";}
		}
		
		for(var i = 1; i <= 4; i++){
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}
		
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/" + energyStorage);
	},
	
	energyTick: function(type, src){
		var output = Math.min(QSP.output, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});




// file: machine/Molecular.js

IDRegistry.genBlockID("molecular_transformer");
Block.createBlock("molecular_transformer", [{name: "", texture: [["empty", 0]]}]);

const mtRender = new Render();

mtRender.setPart("body", [
	{//coreBottom
		type: "box",
		uv: {x: 0, y: 0},
		coords: {x: 0, y: 5.5, z: 0},
		size: {x: 10, y: 3, z: 10}
	},
	{//coreWorkZone
		type: "box",
		uv: {x: 40, y: 0},
		coords: {x: 0, y: 0.5, z: 0},
		size: {x: 6, y: 9, z: 6}
	},
	{//coreTopElectr
		type: "box",
		uv: {x: 18, y: 29},
		coords: {x: -0.5, y: -7, z: 0.033333},
		size: {x: 3, y: 2, z: 3}
	},
	{//coreTopPlate
		type: "box",
		uv: {x: 0, y: 15},
		coords: {x: -0.5, y: -5.5, z: 0},
		size: {x: 9, y: 3, z: 9}
	},
	{//firstElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//firstElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {width: 64, height: 40});

mtRender.getPart("body").addPart("second");
mtRender.setPart("second", [
	{//secondElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//secondElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {rotation: {y: -Math.PI * 2 / 3}, width: 64, height: 40});

mtRender.getPart("body").addPart("third");
mtRender.setPart("third", [
	{//thirdElTop
		type: "box",
		uv: {x: 36, y: 15},
		coords: {x: 5, y: -6.5, z: 0},
		size: {x: 4, y: 3, z: 10}
	},
	{//thirdElBottom
		type: "box",
		uv: {x: 0, y: 29},
		coords: {x: 5.5, y: 5.5, z: 0},
		size: {x: 3, y: 5, z: 6}
	}
], {rotation: {y: Math.PI * 2 / 3}, width: 64, height: 40});

IDRegistry.genItemID("molecular_transformer");
Item.createItem("molecular_transformer", "Molecular Transformer", {name: "molecular_transformer"});
Item.registerUseFunction("molecular_transformer", function(c, item, block){
  c = c.relative;
  block = World.getBlockID(c.x, c.y, c.z)
  if(GenerationUtils.isTransparentBlock(block)){
    World.setBlock(c.x, c.y, c.z, BlockID.molecular_transformer);
    World.addTileEntity(c.x, c.y, c.z);
    Player.decreaseCarriedItem();
    Game.prevent();
  }
});

Block.registerDropFunction("molecular_transformer", function(){
  return [[ItemID.molecular_transformer, 1]];
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: ItemID.molecular_transformer, count: 1, data: 0}, [
	 "aba",
	 "cxc", 
	 "aba"
	], ['x', ItemID.mtCore, 0, 'a', BlockID.machineBlockAdvanced, 0, 'b', BlockID.transformerEV, 0, 'c', ItemID.circuitAdvanced, 0]);
	
	var mt_recipes = {
		"397:1": {id: 399, count: 1, data: 0, energy: 25e7},
		265: {id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9e6},
		87: {id: 289, count: 2, data: 0, energy: 7e4},
		12: {id: 13, count: 1, data: 0, energy: 5e4},
		3: {id: 82, count: 1, data: 0, energy: 5e4},
		"263:1": {id: 263, count: 1, data: 0, energy: 6e4},
		348: {id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1e6},
		89: {id: ItemID.sunnarium, count: 1, data: 0, energy: 9e6},
		"35:4": {id: 89, count: 1, data: 0, energy: 5e5},
		"35:11": {id: 22, count: 1, data: 0, energy: 5e5},
		"35:14": {id: 152, count: 1, data: 0, energy: 5e5},
		"263:0": {id: 264, count: 1, data: 0, energy: 9e6},
		"ItemID.dustDiamond": {id: 264, count: 1, data: 0, energy: 6e4},
		"ItemID.ingotLead": {id: ItemID.ingotSilver, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotSilver": {id: 266, count: 1, data: 0, energy: 1e6},
		// mod integration
		"351:4": {id: ItemID.gemSapphire, count: 1, data: 0, energy: 5e6},
		331: {id: ItemID.gemRuby, count: 1, data: 0, energy: 5e6},
		"ItemID.dustTitanium": {id: ItemID.dustChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotTitanium": {id: ItemID.ingotChrome, count: 1, data: 0, energy: 5e5},
		"ItemID.ingotCopper": {id: ItemID.ingotNickel, count: 1, data: 0, energy: 3e5},
		266: {id: ItemID.ingotPlatinum, count: 1, data: 0, energy: 9e6},
		// nether quartz -> certus quartz 5e5
	}
	for(var key in mt_recipes){
		var result = mt_recipes[key];
		var id = key;
		if(key.split(":").length < 2){
			id = eval(key);
		}
		if(id && result.id){
			ICore.Recipe.addRecipeFor("molecularTransformer", id, result);
		}
	}
});

var guiMT = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Molecular Transformer"}},
		inventory: {standart: true},
		background: {color: android.graphics.Color.parseColor("#8cc8fa")}
	},
	
	params: {slot: "molecular_slot"},
	
	drawing: [
		{type: "bitmap", x: 345, y: 92, bitmap: "molecular_background", scale: GUI_SCALE},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 390, y: 181, direction: 3, bitmap: "molecular_bar", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 374, y: 108, size: 64},
		"slot2": {type: "slot", x: 374, y: 239, size: 64, isValid: function(){return false}},
		"textInput": {type: "text", x: 520, y: 130},
		"textOutput": {type: "text", x: 520, y: 170},
		"textEnergy": {type: "text", x: 520, y: 210},
		"textProgress": {type: "text", x: 520, y: 250},
	}
});

var MTParticles = [];
for(let i = 0; i < 16; i++){
	MTParticles.push(Particles.registerParticleType({
		texture: "mt_work_" + i,
		size: [2, 2],
		lifetime: [4, 4],
		render: 0
	}));
}

ICore.Machine.registerElectricMachine(BlockID.molecular_transformer, {
	
	anim: null,
	emitter: new Particles.ParticleEmitter(this.x + 0.5, this.y + 2, this.z + 0.5),

	defaultValues: {
		id: 0,
		data: 0,
		progress: 0,
		energyNeed: 0
	},
	
	getTier: function(){
		return 14;
	},

	getGuiScreen: function(){
		return guiMT;
	},
	
	getTransportSlots: function(){
		return {input: ["slot1"], output: ["slot2"]};
	},
	
	init: function(){
		this.anim = new Animation.Base(this.x + 0.5, this.y - 1, this.z + 0.5);
		this.anim.describe({
			skin: "model/molecular_transformer.png",
			render: mtRender.getID()
		});
		this.anim.load();
		delete this.liquidStorage;
	},
	
	destroy: function(){
		if(this.data.id && this.data.energyNeed) World.drop(this.x + 0.5, this.y, this.z + 0.5, this.data.id, 1, this.data.data);
		if(this.anim){
			this.anim.destroy();
			this.anim = null;
		}
	},
	
	tick: function(){
		if(!this.data.id || !this.data.energyNeed){
			var slot1 = this.container.getSlot("slot1");
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
			if(result){
				this.data.id = slot1.id;
				this.data.data = slot1.data;
			}
		}else{
			var result = ICore.Recipe.getRecipeResult("molecularTransformer", this.data.id, this.data.data);
		}
		if(result){
			this.container.setText("textInput", "Input: " + Item.getName(this.data.id, this.data.data));
			var itemName = Item.getName(result.id, result.data);
			if(itemName[0] == '§') itemName = itemName.slice(2);
			this.container.setText("textOutput", "Output: " + itemName);
			this.container.setText("textEnergy", "Energy: " + result.energy);
			this.container.setText("textProgress", "Progress: " + parseInt(this.data.progress / result.energy * 100) + "%");
			this.container.setScale("progressScale", this.data.progress / result.energy);
			if(this.data.last_energy_receive > 0){
				this.emitter.emit(MTParticles[World.getThreadTime() & 15], 0, this.x + 0.5, this.y + 0.5, this.z + 0.5);
				var slot2 = this.container.getSlot("slot2");
				if(this.data.progress >= result.energy && (slot2.id == 0 || slot2.id == result.id && slot2.data == result.data && slot2.count + result.count <= Item.getMaxStack(slot2.id))){
					this.data.id = this.data.data = 0;
					slot2.id = result.id;
					slot2.data = result.data;
					slot2.count++;
					this.data.id = this.data.data = 0;
					this.data.progress = this.data.energyNeed = 0;
				}
			}
		}
		else{
			this.container.setScale("progressScale", 0);
			this.container.setText("textInput", "Input:    ");
			this.container.setText("textOutput", "Output:   ");
			this.container.setText("textEnergy", "Energy:   ");
			this.container.setText("textProgress", "Progress: ");
		}
	},
	
	energyReceive: function(type, amount, voltage) {
		if(this.data.id){
			if(!this.data.energyNeed){
				var slot1 = this.container.getSlot("slot1");
				var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
				this.data.energyNeed = result.energy;
				slot1.count--;
				this.container.validateSlot("slot1");
			}
			var add = Math.min(amount, this.data.energyNeed - this.data.progress);
			this.data.progress += add;
			this.data.energy_receive += add;
			this.data.voltage = Math.max(this.data.voltage, voltage);
			return add;
		}
		return 0;
	}
});




// file: items/components.js

IDRegistry.genItemID("ingotIridium");
Item.createItem("ingotIridium", "Iridium Ingot", {name: "ingot_iridium", meta: 0});

IDRegistry.genItemID("ingotUranium");
Item.createItem("ingotUranium", "Enriched Uranium Ingot", {name: "ingot_uranium", meta: 0});
	
Callback.addCallback("PreLoaded", function(){
	ICore.Recipe.addRecipeFor("compressor", ItemID.iridiumChunk, {id: ItemID.ingotIridium, count: 1, data: 0})
	ICore.Recipe.addRecipeFor("compressor", ItemID.uranium, {id: ItemID.ingotUranium, count: 1, data: 0})
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
 ], ['a', ItemID.irradiantGlass, 0, 'b', ItemID.neutronReflectorThick, 0]);

IDRegistry.genItemID("quantumCore");
Item.createItem("quantumCore", "Quantum Core", {name: "quantum_core", meta: 0});
Recipes.addShaped({id: ItemID.quantumCore, count: 1, data: 0}, [
 "aba",
 "bcb",
 "aba"
 ], ['a', ItemID.enrichedSunnariumAlloy, 0, 'b', 399, 0, 'c', 381, 0]);




// file: items/adv_helmet.js

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




// file: items/hybrid_helmet.js

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




// file: items/ultimate_helmet.js

IDRegistry.genItemID("ultimateSolarHelmet");
Item.createArmorItem("ultimateSolarHelmet", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 5, durability: 10000, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.ultimateSolarHelmet, "Eu", 10000000, 8192, 4, "armor", true);
ICore.ItemName.setRarity(ItemID.ultimateSolarHelmet, 3);
Item.registerNameOverrideFunction(ItemID.ultimateSolarHelmet, ICore.ItemName.showRareItemStorage);

IDRegistry.genItemID("ultimateSolarHelmetUncharged");
Item.createArmorItem("ultimateSolarHelmetUncharged", "Ultimate Solar Helmet", {name: "ultimate_solar_helmet"}, {type: "helmet", armor: 2, durability: 10000, texture: "armor/ultimate_solar_helmet_1.png", isTech: true});
ChargeItemRegistry.registerItem(ItemID.ultimateSolarHelmetUncharged, "Eu", 10000000, 8192, 4, "armor");
ICore.ItemName.setRarity(ItemID.ultimateSolarHelmetUncharged, 3);
Item.registerNameOverrideFunction(ItemID.ultimateSolarHelmetUncharged, ICore.ItemName.showRareItemStorage);

Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
	"asa",
	"chc"
], ['s', BlockID.USP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transportEnergy);

Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
	"s",
	"h"
], ['s', BlockID.USP, 0, 'h', ItemID.hybridSolarHelmet, -1], ICore.ChargeRegistry.transportEnergy);


ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.ultimateSolarHelmet, {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged});
ICore.Recipe.addRecipeFor("quantum-armor-charge", ItemID.ultimateSolarHelmetUncharged, {charged: ItemID.ultimateSolarHelmet, uncharged: ItemID.ultimateSolarHelmetUncharged});

ICore.UI.setArmorButton(ItemID.ultimateSolarHelmet, "button_nightvision");

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20 == 0){
		var slot = Player.getArmorSlot(0);
		if(slot.id == ItemID.ultimateSolarHelmet || slot.id == ItemID.ultimateSolarHelmetUncharged){
			chargeArmor(USP.gen_day*20, USP.gen_night*20);
		}
	}
});

Armor.registerFuncs("ultimateSolarHelmet", QUANTUM_ARMOR_FUNCS);
Armor.registerFuncs("ultimateSolarHelmetUncharged", QUANTUM_ARMOR_FUNCS);




// file: recipes.js

Recipes.addShapeless({id: BlockID.HSP, count: 8, data: 0}, [{id: BlockID.USP, data: 0}]);

Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
], ['a', BlockID.HSP, 0, 'b', ItemID.circuitAdvanced, 0]);
 
Recipes.addShaped({id: BlockID.QSP, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
], ['a', BlockID.USP, 0, 'b', ItemID.quantumCore, 0]);

if(__config__.getBool("hard_recipes")){
	if(__config__.getBool("simple_asp_recipe")){
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, -1, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.enrichedSunnarium, 0]);

	Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.enrichedSunnariumAlloy, 0]);
}
else{
	if(__config__.getBool("simple_asp_recipe")){
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.sunnarium, 0]);
	 
	Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.sunnariumAlloy, 0]);
}




