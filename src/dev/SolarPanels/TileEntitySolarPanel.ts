/// <reference path="./SolarPanelGui.ts" />

class TileEntitySolarPanel extends Machine.Generator {
	gui: UI.StandartWindow;
	genDay: number;
	genNight: number;
	maxOutput: number;
	energyStorage: number;

	defaultValues = {
		energy: 0,
		canSeeSky: false
	}

	constructor(name: string, props: PanelProperties) {
		super();
		this.defaultDrop = null;
		this.gui = new UI.StandartWindow(getSolarPanelGuiContent(name, props.output));
		this.genDay = props.gen_day;
		this.genNight = props.gen_night;
		this.maxOutput = props.output;
		this.energyStorage = props.storage;
	}

	getScreenByName() {
		return this.gui;
	}

	getTier(): number {
		return 4;
	}

	onInit(): void {
		super.onInit();
		this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
	}

	setupContainer(): void {
		StorageInterface.setGlobalValidatePolicy(this.container, (_, id) => ChargeItemRegistry.isValidItem(id, "Eu", 4));
	}

	onTick(): void {
		let generating = 0;

		if (World.getThreadTime() % 100 == 0) {
			this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
		}
		if (this.data.canSeeSky) {
			const time = World.getWorldTime() % 24000;
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

		for (let i = 1; i <= 4; i++) {
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot"+i), "Eu", this.data.energy, 4);
		}

		this.container.setText("textGen", Translation.translate("Generating: ") + generating + " EU/t");
		this.container.setText("textStorage", Translation.translate("Storage: ") + this.data.energy + "/" + this.energyStorage);
		this.container.setScale("energyScale", this.data.energy / this.energyStorage);
		this.container.sendChanges();
	}

	getEnergyStorage(): number {
		return this.energyStorage;
	}

	getMaxPacketSize(): number {
		return this.maxOutput;
	}

	@BlockEngine.Decorators.ContainerEvent(Side.Client)
	setLightIcon(container: ItemContainer, window: any, content: any, data: string): void {
		if (content) {
			content.elements["light"].bitmap = data;
		}
	}
}

function createSolarPanel(stringID: string, name: string, texture: string, properties: PanelProperties, rarity: EnumRarity): void {
    const blockID = IDRegistry.genBlockID(stringID);
    Block.createBlock(stringID, [
        {name: name, texture: [[texture, 2], [texture, 1], [texture, 0], [texture, 0], [texture, 0], [texture, 0]], inCreative: true}
    ], "machine");
    ItemRegistry.setRarity(blockID, rarity)
    ICore.Machine.registerPrototype(blockID, new TileEntitySolarPanel(name, properties));
}