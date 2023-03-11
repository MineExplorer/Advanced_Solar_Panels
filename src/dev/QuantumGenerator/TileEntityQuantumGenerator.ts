/// <reference path="./QuantumGeneratorGui.ts" />

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
		const isActive = this.isEnabled && this.data.output > 0;
        this.setActive(isActive);
		this.container.setText("textOutputAmount", this.data.output);
		this.container.setText("textVoltageAmount", this.data.voltage);
		this.container.sendEvent("setIndicator", isActive ? "on" : "off");
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
	setIndicator(container: ItemContainer, window: any, content: any, data: string): void {
		if (content) {
			content.elements["indicator"].bitmap = "quantum_generator_" + data;
		}
	}
}
