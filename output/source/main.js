var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
IMPORT("BlockEngine");
IMPORT("ChargeItem");
IMPORT("StorageInterface");
var GUI_SCALE = 3.2;
function getSolarPanelGuiContent(name, maxOutput) {
    return {
        standard: {
            header: { text: { text: Translation.translate(name) } },
            inventory: { standard: true },
            background: { standard: true }
        },
        params: {
            slot: "asp_slot"
        },
        drawing: [
            { type: "background", color: android.graphics.Color.parseColor("#353535") },
            { type: "bitmap", x: 350, y: 40, bitmap: "asp_background", scale: 2.1 },
            { type: "bitmap", x: 398, y: 107, bitmap: "asp_energybar_0", scale: GUI_SCALE },
        ],
        elements: {
            "energyScale": { type: "scale", x: 398 + GUI_SCALE * 4, y: 107, direction: 0, value: 0.5, bitmap: "asp_energybar_1", scale: GUI_SCALE },
            "slot1": { type: "slot", x: 400, y: 235 },
            "slot2": { type: "slot", x: 459, y: 235 },
            "slot3": { type: "slot", x: 518, y: 235 },
            "slot4": { type: "slot", x: 577, y: 235 },
            "textStorage": { type: "text", x: 515, y: 105, width: 300, height: 50, text: Translation.translate("Storage: ") },
            "textOutput": { type: "text", x: 515, y: 145, width: 300, height: 20, text: Translation.translate("Max Output: ") + maxOutput + " EU/t" },
            "textGen": { type: "text", x: 515, y: 185, width: 300, height: 39, text: Translation.translate("Generating: ") },
            "light": { type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE }
        }
    };
}
/// <reference path="../gui/SolarPanelGui.ts" />
var TileEntitySolarPanel = /** @class */ (function (_super) {
    __extends(TileEntitySolarPanel, _super);
    function TileEntitySolarPanel(name, props) {
        var _this = _super.call(this) || this;
        _this.defaultValues = {
            energy: 0,
            canSeeSky: false
        };
        _this.defaultDrop = null;
        _this.gui = new UI.StandartWindow(getSolarPanelGuiContent(name, props.output));
        _this.genDay = props.gen_day;
        _this.genNight = props.gen_night;
        _this.maxOutput = props.output;
        _this.energyStorage = props.storage;
        return _this;
    }
    TileEntitySolarPanel.prototype.getScreenByName = function () {
        return this.gui;
    };
    TileEntitySolarPanel.prototype.getTier = function () {
        return 4;
    };
    TileEntitySolarPanel.prototype.onInit = function () {
        this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    };
    TileEntitySolarPanel.prototype.setupContainer = function () {
        StorageInterface.setGlobalValidatePolicy(this.container, function (_, id) { return ChargeItemRegistry.isValidItem(id, "Eu", 4); });
    };
    TileEntitySolarPanel.prototype.onTick = function () {
        var generating = 0;
        if (World.getThreadTime() % 100 == 0) {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        }
        if (this.data.canSeeSky) {
            var time = World.getWorldTime() % 24000;
            if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || this.region.getLightLevel(this.x, this.y + 1, this.z) == 15)) {
                generating = this.genDay;
                this.container.sendEvent("setLightIcon", "asp_sun");
            }
            else {
                generating = this.genNight;
                this.container.sendEvent("setLightIcon", "asp_moon");
            }
            this.data.energy = Math.min(this.data.energy + generating, this.energyStorage);
        }
        else {
            this.container.sendEvent("setLightIcon", "asp_dark");
        }
        for (var i = 1; i <= 4; i++) {
            this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot" + i), "Eu", this.data.energy, 4);
        }
        this.container.setText("textGen", Translation.translate("Generating: ") + generating + " EU/t");
        this.container.setText("textStorage", Translation.translate("Storage: ") + this.data.energy + "/" + this.energyStorage);
        this.container.setScale("energyScale", this.data.energy / this.energyStorage);
        this.container.sendChanges();
    };
    TileEntitySolarPanel.prototype.getEnergyStorage = function () {
        return this.energyStorage;
    };
    TileEntitySolarPanel.prototype.getMaxPacketSize = function () {
        return this.maxOutput;
    };
    TileEntitySolarPanel.prototype.setLightIcon = function (container, window, content, data) {
        if (content) {
            content.elements["light"].bitmap = data;
        }
    };
    __decorate([
        BlockEngine.Decorators.ContainerEvent(Side.Client)
    ], TileEntitySolarPanel.prototype, "setLightIcon", null);
    return TileEntitySolarPanel;
}(Machine.Generator));
/// <reference path="Machine/TileEntitySolarPanel.ts" />
function createSolarPanel(stringID, name, texture, properties, rarity) {
    var blockID = IDRegistry.genBlockID(stringID);
    Block.createBlock(stringID, [
        { name: name, texture: [[texture, 2], [texture, 1], [texture, 0], [texture, 0], [texture, 0], [texture, 0]], inCreative: true }
    ], "machine");
    ItemRegistry.setRarity(blockID, rarity);
    ICore.Machine.registerPrototype(blockID, new TileEntitySolarPanel(name, properties));
}
var ConfigASP;
(function (ConfigASP) {
    function getInt(name) {
        return __config__.getNumber(name).intValue();
    }
    ConfigASP.getInt = getInt;
    function getBool(name) {
        return __config__.getBool(name);
    }
    ConfigASP.getBool = getBool;
    function readPanelConfig(key) {
        return {
            gen_day: ConfigASP.getInt(key + ".gen_day"),
            gen_night: ConfigASP.getInt(key + ".gen_night"),
            output: ConfigASP.getInt(key + ".output"),
            storage: ConfigASP.getInt(key + ".storage")
        };
    }
    ConfigASP.readPanelConfig = readPanelConfig;
})(ConfigASP || (ConfigASP = {}));
var ASP = ConfigASP.readPanelConfig("advanced_solar_panel");
var HSP = ConfigASP.readPanelConfig("hybrid_solar_panel");
var USP = ConfigASP.readPanelConfig("ultimate_solar_panel");
var QSP = ConfigASP.readPanelConfig("quantum_solar_panel");
// Machines
Translation.addTranslation("Advanced Solar Panel", { ru: "Улучшенная солнечная панель", zh: "高级太阳能发电机" });
Translation.addTranslation("Hybrid Solar Panel", { ru: "Гибридная солнечная панель", zh: "混合太阳能发电机" });
Translation.addTranslation("Ultimate Solar Panel", { ru: "Совершенная солнечная панель", zh: "终极混合太阳能发电机" });
Translation.addTranslation("Quantum Solar Panel", { ru: "Квантовая солнечная панель", zh: "量子太阳能发电机" });
Translation.addTranslation("Molecular Transformer", { ru: "Молекулярный преобразователь", zh: "分子重组仪" });
// Items
Translation.addTranslation("Sunnarium Part", { ru: "Часть саннариума", zh: "小块阳光化合物" });
Translation.addTranslation("Sunnarium", { ru: "Саннариум", zh: "阳光化合物" });
Translation.addTranslation("Sunnarium Alloy", { ru: "Сплав саннариума", zh: "阳光合金" });
Translation.addTranslation("Enriched Sunnarium", { ru: "Обогащённый саннариум", zh: "光辉铀锭" });
Translation.addTranslation("Enriched Sunnarium Alloy", { ru: "Сплав обогащённого саннариума", zh: "富集阳光化合物" });
Translation.addTranslation("Irradiant Glass Panel", { ru: "Излучающая стеклянная панель", zh: "富集阳光合金" });
Translation.addTranslation("Iridium Iron Plate", { ru: "Иридиевая железная пластина", zh: "光辉玻璃板" });
Translation.addTranslation("Reinforced Iridium Iron Plate", { ru: "Укрепленная иридиевая железная пластина", zh: "铱铁合金板" });
Translation.addTranslation("Irradiant Reinforced Plate", { ru: "Излучающая укреплённая пластина", zh: "强化铱铁合金板" });
Translation.addTranslation("Iridium Ingot", { ru: "Иридиевый слиток", zh: "铱锭" });
Translation.addTranslation("Enriched Uranium Ingot", { ru: "Обогащённый урановый слиток", zh: "铀锭" });
Translation.addTranslation("Irradiant Uranium Ingot", { ru: "Излучающий урановый слиток", zh: "阳光合金" });
Translation.addTranslation("MT Core", { ru: "MT-ядро", zh: "分子重组核心" });
Translation.addTranslation("Quantum Core", { ru: "Квантовое ядро", zh: "量子核心" });
// Armor
Translation.addTranslation("adv_solar_helmet", { en: "Advanced Solar Helmet", ru: "Улучшенный солнечный шлем", zh: "高级太阳能头盔" });
Translation.addTranslation("hybrid_solar_helmet", { en: "Hybrid Solar Helmet", ru: "Гибридный солнечный шлем", zh: "混合太阳能头盔" });
Translation.addTranslation("ultimate_solar_helmet", { en: "Ultimate Solar Helmet", ru: "Совершенный солнечный шлем", zh: "终极混合太阳能头盔" });
/* GUI */
// ASP
Translation.addTranslation("Storage: ", { ru: "Хранилище: " });
Translation.addTranslation("Max Output: ", { ru: "Макс выход: " });
Translation.addTranslation("Generating: ", { ru: "Генерация: " });
// Molecular Transformer
Translation.addTranslation("Input: ", { ru: "Вход: " });
Translation.addTranslation("Output: ", { ru: "Выход: " });
Translation.addTranslation("Energy: ", { ru: "Энергия: " });
Translation.addTranslation("Progress: ", { ru: "Прогресс: " });
createSolarPanel("ASP", "Advanced Solar Panel", "asp", ASP, EnumRarity.UNCOMMON);
createSolarPanel("HSP", "Hybrid Solar Panel", "hsp", HSP, EnumRarity.RARE);
createSolarPanel("USP", "Ultimate Solar Panel", "usp", USP, EnumRarity.EPIC);
createSolarPanel("QSP", "Quantum Solar Panel", "qsp", QSP, EnumRarity.EPIC);
Recipes.addShapeless({ id: BlockID.HSP, count: 8, data: 0 }, [{ id: BlockID.USP, data: 0 }]);
Recipes.addShaped({ id: BlockID.USP, count: 1, data: 0 }, [
    "aaa",
    "aba",
    "aaa"
], ['a', BlockID.HSP, 0, 'b', ItemID.circuitAdvanced, 0]);
Recipes.addShaped({ id: BlockID.QSP, count: 1, data: 0 }, [
    "aaa",
    "aba",
    "aaa"
], ['a', BlockID.USP, 0, 'b', ItemID.quantumCore, 0]);
if (ConfigASP.getBool("hard_recipes")) {
    if (ConfigASP.getBool("simple_asp_recipe")) {
        Recipes.addShaped({ id: BlockID.ASP, count: 1, data: 0 }, [
            "aaa",
            "bxb",
            "cdc"
        ], ['x', BlockID.solarPanel, -1, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
    }
    else {
        Recipes.addShaped({ id: BlockID.ASP, count: 1, data: 0 }, [
            "aaa",
            "bxb",
            "cdc"
        ], ['x', BlockID.solarPanel, 0, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
    }
    Recipes.addShaped({ id: BlockID.HSP, count: 1, data: 0 }, [
        "afa",
        "bxb",
        "cdc"
    ], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.enrichedSunnarium, 0]);
    Recipes.addShaped({ id: BlockID.USP, count: 1, data: 0 }, [
        " a ",
        "bxb",
        "cbc"
    ], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.enrichedSunnariumAlloy, 0]);
}
else {
    if (ConfigASP.getBool("simple_asp_recipe")) {
        Recipes.addShaped({ id: BlockID.ASP, count: 1, data: 0 }, [
            "aaa",
            "bxb",
            "cdc"
        ], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
    }
    else {
        Recipes.addShaped({ id: BlockID.ASP, count: 1, data: 0 }, [
            "aaa",
            "bxb",
            "cdc"
        ], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
    }
    Recipes.addShaped({ id: BlockID.HSP, count: 1, data: 0 }, [
        "afa",
        "bxb",
        "cdc"
    ], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.sunnarium, 0]);
    Recipes.addShaped({ id: BlockID.USP, count: 1, data: 0 }, [
        " a ",
        "bxb",
        "cbc"
    ], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.sunnariumAlloy, 0]);
}
var guiMolecularTransformer = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Molecular Transformer") } },
        inventory: { standard: true },
        background: { color: android.graphics.Color.parseColor("#8cc8fa") }
    },
    params: {
        slot: "molecular_slot"
    },
    drawing: [
        { type: "bitmap", x: 345, y: 92, bitmap: "molecular_background", scale: GUI_SCALE },
    ],
    elements: {
        "progressScale": { type: "scale", x: 390, y: 181, direction: 3, bitmap: "molecular_bar", scale: GUI_SCALE },
        "slot1": { type: "slot", x: 374, y: 108, size: 64 },
        "slot2": { type: "slot", x: 374, y: 239, size: 64 },
        "textInput": { type: "text", x: 520, y: 130, text: "" },
        "textOutput": { type: "text", x: 520, y: 170, text: "" },
        "textEnergy": { type: "text", x: 520, y: 210, text: "" },
        "textProgress": { type: "text", x: 520, y: 250, text: "" },
    }
});
/// <reference path="../gui/MolecularTransformerGui.ts" />
var MolecularTransformer;
(function (MolecularTransformer) {
    var blockID = IDRegistry.genBlockID("molecularTransformer");
    Block.createBlock("molecularTransformer", [
        { name: "Molecular Transformer", texture: [["molecular_transformer", 0]], inCreative: true }
    ]);
    ItemRegistry.setRarity(blockID, EnumRarity.RARE);
    var mesh = new RenderMesh();
    mesh.setBlockTexture("molecular_transformer_model", 0);
    mesh.importFromFile(__dir__ + "assets/res/molecular_transformer.obj", "obj", null);
    var model = new BlockRenderer.Model(mesh);
    var render = new ICRender.Model();
    render.addEntry(model);
    BlockRenderer.setStaticICRender(blockID, 0, render);
    ItemModel.getFor(blockID, 0).setModUiSpritePath("terrain-atlas/molecular_transformer.png");
    Recipes.addShaped({ id: blockID, count: 1, data: 0 }, [
        "aba",
        "cxc",
        "aba"
    ], ['x', ItemID.mtCore, 0, 'a', BlockID.machineBlockAdvanced, 0, 'b', BlockID.transformerEV, 0, 'c', ItemID.circuitAdvanced, 0]);
    var mt_recipes = {
        "397:1": { id: 399, count: 1, data: 0, energy: 25e7 },
        265: { id: ItemID.iridiumChunk, count: 1, data: 0, energy: 9e6 },
        87: { id: 289, count: 2, data: 0, energy: 7e4 },
        12: { id: 13, count: 1, data: 0, energy: 5e4 },
        3: { id: 82, count: 1, data: 0, energy: 5e4 },
        "263:1": { id: 263, count: 1, data: 0, energy: 6e4 },
        348: { id: ItemID.sunnariumPart, count: 1, data: 0, energy: 1e6 },
        89: { id: ItemID.sunnarium, count: 1, data: 0, energy: 9e6 },
        "35:4": { id: 89, count: 1, data: 0, energy: 5e5 },
        "35:11": { id: 22, count: 1, data: 0, energy: 5e5 },
        "35:14": { id: 152, count: 1, data: 0, energy: 5e5 },
        "263:0": { id: 264, count: 1, data: 0, energy: 9e6 },
        "ItemID.dustDiamond": { id: 264, count: 1, data: 0, energy: 6e4 },
        "ItemID.ingotLead": { id: ItemID.ingotSilver, count: 1, data: 0, energy: 5e5 },
        "ItemID.ingotSilver": { id: 266, count: 1, data: 0, energy: 1e6 },
        // mod integration
        "351:4": { id: ItemID.gemSapphire, count: 1, data: 0, energy: 5e6 },
        331: { id: ItemID.gemRuby, count: 1, data: 0, energy: 5e6 },
        "ItemID.dustTitanium": { id: ItemID.dustChrome, count: 1, data: 0, energy: 5e5 },
        "ItemID.ingotTitanium": { id: ItemID.ingotChrome, count: 1, data: 0, energy: 5e5 },
        "ItemID.ingotCopper": { id: ItemID.ingotNickel, count: 1, data: 0, energy: 3e5 },
        266: { id: ItemID.ingotPlatinum, count: 1, data: 0, energy: 9e6 },
    };
    for (var key in mt_recipes) {
        var result = mt_recipes[key];
        var id = key;
        if (key.indexOf(":") == -1) {
            id = eval(key);
        }
        if (id && result.id) {
            ICore.Recipe.addRecipeFor("molecularTransformer", id, result);
        }
    }
})(MolecularTransformer || (MolecularTransformer = {}));
var MTParticles = [];
for (var i = 0; i < 16; i++) {
    MTParticles.push(Particles.registerParticleType({
        texture: "mt_work_" + i,
        size: [2, 2],
        lifetime: [4, 4],
        render: 0
    }));
}
var TileEntityMolecularTransformer = /** @class */ (function (_super) {
    __extends(TileEntityMolecularTransformer, _super);
    function TileEntityMolecularTransformer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            id: 0,
            data: 0,
            progress: 0,
            energyNeed: 0
        };
        return _this;
    }
    TileEntityMolecularTransformer.prototype.getTier = function () {
        return 14;
    };
    TileEntityMolecularTransformer.prototype.getScreenByName = function () {
        return guiMolecularTransformer;
    };
    TileEntityMolecularTransformer.prototype.setupContainer = function () {
        this.container.setSlotAddTransferPolicy("slot2", function () { return 0; });
    };
    TileEntityMolecularTransformer.prototype.onDestroy = function () {
        if (this.data.id && this.data.energyNeed)
            this.region.dropItem(this.x + .5, this.y, this.z + .5, this.data.id, 1, this.data.data);
    };
    TileEntityMolecularTransformer.prototype.onInit = function () {
        this.emitter = new Particles.ParticleEmitter(this.x + .5, this.y + .5, this.z + .5);
    };
    TileEntityMolecularTransformer.prototype.emitParticle = function () {
        this.emitter.emit(MTParticles[World.getThreadTime() & 15], 0, 0, 0, 0);
    };
    TileEntityMolecularTransformer.prototype.onTick = function () {
        StorageInterface.checkHoppers(this);
        if (!this.data.id || !this.data.energyNeed) {
            var slot1 = this.container.getSlot("slot1");
            var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
            if (result) {
                this.data.id = slot1.id;
                this.data.data = slot1.data;
            }
        }
        else {
            var result = ICore.Recipe.getRecipeResult("molecularTransformer", this.data.id, this.data.data);
        }
        if (result) {
            this.container.setText("textInput", Translation.translate("Input: ") + Item.getName(this.data.id, this.data.data));
            var itemName = Item.getName(result.id, result.data);
            if (itemName[0] == '§')
                itemName = itemName.slice(2);
            this.container.setText("textOutput", Translation.translate("Output: ") + itemName);
            this.container.setText("textEnergy", Translation.translate("Energy: ") + result.energy);
            this.container.setText("textProgress", Translation.translate("Progress: ") + Math.floor(this.data.progress / result.energy * 100) + "%");
            this.container.setScale("progressScale", this.data.progress / result.energy);
            if (this.energyNode.energyIn > 0) {
                this.emitParticle();
                var slot2 = this.container.getSlot("slot2");
                if (this.data.progress >= result.energy &&
                    (slot2.id == 0 || slot2.id == result.id && slot2.data == result.data && slot2.count + result.count <= Item.getMaxStack(slot2.id))) {
                    this.data.id = this.data.data = 0;
                    slot2.setSlot(result.id, slot2.count + 1, result.data);
                    this.data.progress = this.data.energyNeed = 0;
                }
            }
        }
        else {
            this.container.setScale("progressScale", 0);
            this.container.setText("textInput", Translation.translate("Input: "));
            this.container.setText("textOutput", Translation.translate("Output: "));
            this.container.setText("textEnergy", Translation.translate("Energy: "));
            this.container.setText("textProgress", Translation.translate("Progress: "));
        }
        this.container.sendChanges();
    };
    TileEntityMolecularTransformer.prototype.energyReceive = function (type, amount, voltage) {
        if (this.data.id) {
            if (!this.data.energyNeed) {
                var slot1 = this.container.getSlot("slot1");
                var result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
                this.data.energyNeed = result.energy;
                this.decreaseSlot(slot1, 1);
            }
            var add = Math.min(amount, this.data.energyNeed - this.data.progress);
            this.data.progress += add;
            return add;
        }
        return 0;
    };
    return TileEntityMolecularTransformer;
}(Machine.ElectricMachine));
StorageInterface.createInterface(BlockID.molecularTransformer, {
    slots: {
        "slot1": { input: true },
        "slot2": { output: true }
    },
    isValidInput: function (item) {
        return ICore.Recipe.hasRecipeFor("molecularTransformer", item.id, item.data);
    }
});
ICore.Machine.registerPrototype(BlockID.molecularTransformer, new TileEntityMolecularTransformer());
var AdvSolarHelmet = /** @class */ (function (_super) {
    __extends(AdvSolarHelmet, _super);
    function AdvSolarHelmet() {
        return _super.call(this, "advSolarHelmet", "adv_solar_helmet", "adv_solar_helmet") || this;
    }
    AdvSolarHelmet.prototype.onTick = function (item, index, playerUid) {
        solarHelmetTick(playerUid, ASP.gen_day * 20, ASP.gen_night * 20);
        item = Entity.getArmorSlot(playerUid, 0);
        return _super.prototype.onTick.call(this, item, index, playerUid);
    };
    return AdvSolarHelmet;
}(ArmorNanoHelmet));
function solarHelmetTick(playerUid, genDay, genNight) {
    if (World.getThreadTime() % 20 != 0)
        return null;
    var region = WorldRegion.getForActor(playerUid);
    var pos = Entity.getPosition(playerUid);
    var time = World.getWorldTime() % 24000;
    if (region.canSeeSky(pos)) {
        if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || region.getLightLevel(pos) > 14)) {
            var energy = genDay;
        }
        else {
            var energy = genNight;
        }
        if (region.canSeeSky(pos) && (!World.getWeather().rain || region.getLightLevel(pos) > 14)) {
            for (var i = 0; i < 4; i++) {
                var armor = Entity.getArmorSlot(playerUid, i);
                var energyAdd = ChargeItemRegistry.addEnergyTo(armor, "Eu", energy, 4);
                if (energyAdd > 0) {
                    energy -= energyAdd;
                    Entity.setArmorSlot(playerUid, i, armor.id, 1, armor.data, armor.extra);
                    if (energy <= 0)
                        break;
                }
            }
        }
    }
}
ItemRegistry.createItem("ingotIridium", { name: "Iridium Ingot", icon: "ingot_iridium", rarity: 2 });
ItemRegistry.createItem("ingotUranium", { name: "Enriched Uranium Ingot", icon: "ingot_uranium" });
ItemRegistry.createItem("ingotIrradiantUranium", { name: "Irradiant Uranium Ingot", icon: "ingot_irradiant_uranium" });
ItemRegistry.createItem("irradiantGlass", { name: "Irradiant Glass Panel", icon: "irradiant_glass" });
ItemRegistry.createItem("sunnariumPart", { name: "Sunnarium Part", icon: "sunnarium_part" });
ItemRegistry.createItem("sunnarium", { name: "Sunnarium", icon: "sunnarium" });
ItemRegistry.createItem("sunnariumAlloy", { name: "Sunnarium Alloy", icon: "sunnarium_alloy" });
ItemRegistry.createItem("enrichedSunnarium", { name: "Enriched Sunnarium", icon: "enriched_sunnarium" });
ItemRegistry.createItem("enrichedSunnariumAlloy", { name: "Enriched Sunnarium Alloy", icon: "enriched_sunnarium_alloy" });
ItemRegistry.createItem("plateIridiumIron", { name: "Iridium Iron Plate", icon: "plate_iridium_iron" });
ItemRegistry.createItem("plateReinforcedIridiumIron", { name: "Reinforced Iridium Iron Plate", icon: "plate_reinforced_iridium_iron" });
ItemRegistry.createItem("plateIrradiantReinforced", { name: "Irradiant Reinforced Plate", icon: "plate_irradiant_reinforced" });
ItemRegistry.createItem("mtCore", { name: "MT Core", icon: "mtCore" });
ItemRegistry.createItem("quantumCore", { name: "Quantum Core", icon: "quantum_core" });
Callback.addCallback("PreLoaded", function () {
    ICore.Recipe.addRecipeFor("compressor", ItemID.iridiumChunk, { id: ItemID.ingotIridium, count: 1, data: 0 });
    ICore.Recipe.addRecipeFor("compressor", ItemID.uranium, { id: ItemID.ingotUranium, count: 1, data: 0 });
    Recipes.addShaped({ id: ItemID.ingotIrradiantUranium, count: 1, data: 0 }, [
        " a ",
        "aba",
        " a "
    ], ['a', 348, 0, 'b', ItemID.ingotUranium, 0]);
    Recipes.addShaped({ id: ItemID.irradiantGlass, count: 6, data: 0 }, [
        "aaa",
        "bcb",
        "aaa"
    ], ['a', BlockID.reinforcedGlass, 0, 'b', ItemID.ingotIrradiantUranium, 0, 'c', 348, 0]);
    Recipes.addShaped({ id: ItemID.sunnarium, count: 1, data: 0 }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.sunnariumPart, 0]);
    Recipes.addShaped({ id: ItemID.sunnariumAlloy, count: 1, data: 0 }, [
        "aaa",
        "aba",
        "aaa"
    ], ['a', ItemID.plateReinforcedIridium, 0, 'b', ItemID.sunnarium, 0]);
    Recipes.addShaped({ id: ItemID.enrichedSunnarium, count: 1, data: 0 }, [
        "aaa",
        "aba",
        "aaa"
    ], ['a', ItemID.ingotIrradiantUranium, 0, 'b', ItemID.sunnarium, 0]);
    Recipes.addShaped({ id: ItemID.enrichedSunnariumAlloy, count: 1, data: 0 }, [
        " a ",
        "aba",
        " a "
    ], ['a', ItemID.enrichedSunnarium, 0, 'b', ItemID.sunnariumAlloy, 0]);
    Recipes.addShaped({ id: ItemID.plateIridiumIron, count: 1, data: 0 }, [
        "aaa",
        "aba",
        "aaa"
    ], ['a', 265, 0, 'b', ItemID.ingotIridium, 0]);
    Recipes.addShaped({ id: ItemID.plateReinforcedIridiumIron, count: 1, data: 0 }, [
        "aba",
        "bcb",
        "aba"
    ], ['a', ItemID.plateAlloy, 0, 'b', ItemID.carbonPlate, 0, 'c', ItemID.plateIridiumIron, 0]);
    Recipes.addShaped({ id: ItemID.plateIrradiantReinforced, count: 1, data: 0 }, [
        "aba",
        "cdc",
        "axa"
    ], ['a', 331, 0, 'b', ItemID.sunnariumPart, 0, 'c', 351, 4, 'd', ItemID.plateReinforcedIridiumIron, 0, 'x', 264, 0]);
    Recipes.addShaped({ id: ItemID.mtCore, count: 1, data: 0 }, [
        "aba",
        "a a",
        "aba"
    ], ['a', ItemID.irradiantGlass, 0, 'b', ItemID.neutronReflectorThick, 0]);
    Recipes.addShaped({ id: ItemID.quantumCore, count: 1, data: 0 }, [
        "aba",
        "bcb",
        "aba"
    ], ['a', ItemID.enrichedSunnariumAlloy, 0, 'b', 399, 0, 'c', 381, 0]);
});
var HybridSolarHelmet = /** @class */ (function (_super) {
    __extends(HybridSolarHelmet, _super);
    function HybridSolarHelmet() {
        return _super.call(this, "hybridSolarHelmet", "hybrid_solar_helmet", "hybrid_solar_helmet") || this;
    }
    HybridSolarHelmet.prototype.onTick = function (item, index, playerUid) {
        solarHelmetTick(playerUid, HSP.gen_day * 20, HSP.gen_night * 20);
        item = Entity.getArmorSlot(playerUid, 0);
        return _super.prototype.onTick.call(this, item, index, playerUid);
    };
    return HybridSolarHelmet;
}(ArmorQuantumHelmet));
var UltimateSolarHelmet = /** @class */ (function (_super) {
    __extends(UltimateSolarHelmet, _super);
    function UltimateSolarHelmet() {
        return _super.call(this, "ultimateSolarHelmet", "ultimate_solar_helmet", "ultimate_solar_helmet") || this;
    }
    UltimateSolarHelmet.prototype.onTick = function (item, index, playerUid) {
        solarHelmetTick(playerUid, USP.gen_day * 20, USP.gen_night * 20);
        item = Entity.getArmorSlot(playerUid, 0);
        return _super.prototype.onTick.call(this, item, index, playerUid);
    };
    return UltimateSolarHelmet;
}(ArmorQuantumHelmet));
/// <reference path="AdvSolarHelmet.ts" />
/// <reference path="HybridSolarHelmet.ts" />
/// <reference path="UltimateSolarHelmet.ts" />
ItemRegistry.registerItem(new AdvSolarHelmet());
ItemRegistry.registerItem(new HybridSolarHelmet());
ItemRegistry.registerItem(new UltimateSolarHelmet());
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: ItemID.advSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.advSolarHelmet) }, [
        "asa",
        "chc"
    ], ['s', BlockID.ASP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.nanoHelmet, -1, 'c', ItemID.cableGold2, 0], ChargeItemRegistry.transferEnergy);
    Recipes.addShaped({ id: ItemID.quantumHelmet, count: 1, data: Item.getMaxDamage(ItemID.quantumHelmet) }, [
        "a#a",
        "bxb",
        "cqc"
    ], ['#', ItemID.storageLapotronCrystal, -1, 'x', ItemID.advSolarHelmet, -1, 'q', ItemID.hazmatHelmet, 0, 'a', ItemID.plateReinforcedIridium, 0, 'b', BlockID.reinforcedGlass, 0, 'c', ItemID.circuitAdvanced, 0], ChargeItemRegistry.transferEnergy);
    Recipes.addShaped({ id: ItemID.hybridSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.hybridSolarHelmet) }, [
        "asa",
        "chc"
    ], ['s', BlockID.HSP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transferEnergy);
    Recipes.addShaped({ id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet) }, [
        "asa",
        "chc"
    ], ['s', BlockID.USP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transferEnergy);
    Recipes.addShaped({ id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet) }, [
        "s",
        "h"
    ], ['s', BlockID.USP, 0, 'h', ItemID.hybridSolarHelmet, -1], ICore.ChargeRegistry.transferEnergy);
});
