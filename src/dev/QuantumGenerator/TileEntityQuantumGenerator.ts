/// <reference path="./QuantumGeneratorGui.ts" />
BlockRegistry.createBlock("quantumGenerator", [
    {name: "quantum_generator", texture: [["quantum_generator", 0]], inCreative: true}
], "machine");
ItemRegistry.setRarity(BlockID.quantumGenerator, EnumRarity.EPIC);

ICore.Render.setStandardModel(BlockID.quantumGenerator, 0, [["quantum_generator", 0]]);
ICore.Render.registerRenderModel(BlockID.quantumGenerator, 0, [["quantum_generator", 1]]);

class TileEntityQuantumGenerator extends Machine.Generator {
	defaultValues = {
		energy: Infinity,
		output: 512,
        voltage: 512
	}

    isEnabled: boolean = true;

	getScreenByName() {
		return guiQuantumGenerator;
	}

	getTier(): number {
		return 5;
	}
    
	onTick(): void {
        this.setActive(this.isEnabled && this.data.output > 0);
		this.container.setText("textOutput", this.data.output);
		this.container.setText("textVoltage", this.data.voltage);
		this.container.sendChanges();
	}

    onRedstoneUpdate(signal: number): void {
        this.isEnabled = signal == 0;
    }

    energyTick(type: string, src: EnergyTileNode): void {
        if (this.isEnabled && this.data.output > 0) {
            src.add(this.data.output, this.data.voltage);
        }
    }

	@BlockEngine.Decorators.ContainerEvent(Side.Client)
	setLightIcon(container: ItemContainer, window: any, content: any, data: string): void {
		if (content) {
			content.elements["light"].bitmap = data;
		}
	}
}

ICore.Machine.registerPrototype(BlockID.quantumGenerator, new TileEntityQuantumGenerator());