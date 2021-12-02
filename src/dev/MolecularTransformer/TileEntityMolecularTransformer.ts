/// <reference path="./MolecularTransformerGui.ts" />

const MTParticles: number[] = [];
for (let i = 0; i < 16; i++) {
	MTParticles.push(Particles.registerParticleType({
		texture: "mt_work_" + i,
		size: [2, 2],
		lifetime: [4, 4],
		render: 0
	}));
}

class TileEntityMolecularTransformer extends Machine.ElectricMachine {
	emitter: Particles.ParticleEmitter;

	defaultValues = {
		energy: 0,
		id: 0,
		data: 0,
		progress: 0,
		energyNeed: 0
	}

	getTier(): number {
		return 14;
	}

	getScreenByName() {
		return guiMolecularTransformer;
	}

	setupContainer(): void {
		this.container.setSlotAddTransferPolicy("slot2", () => 0)
	}

	destroy(): boolean {
		if (this.data.id)
			this.region.dropItem(this.x + .5, this.y, this.z + .5, this.data.id, 1, this.data.data);
		return false;
	}

	clientLoad(): void {
		this.emitter = new Particles.ParticleEmitter(this.x + .5, this.y + .5, this.z + .5);
		this.emitter.setEmitRelatively(true);
	}

	clientUnload(): void {
		this.emitter.release();
	}

	clientTick(): void {
		if (this.networkData.getBoolean("active")) {
			this.emitter.emit(MTParticles[World.getThreadTime() & 15], 0, 0, 0, 0);
		}
	}

	getItemName(item: {id: number, data: number}) {
		const name = Item.getName(item.id, item.data);
		if (name[0] == '§') return name.slice(2);
		return name;
	}

	onTick(): void {
		StorageInterface.checkHoppers(this);

		const input: {id: number, data: number} = this.data.id ? this.data : this.container.getSlot("slot1");
		const result = ICore.Recipe.getRecipeResult("molecularTransformer", input.id, input.data);
		if (result) {
			this.container.setText("textInput", Translation.translate("Input: ") + this.getItemName(input));
			this.container.setText("textOutput", Translation.translate("Output: ") + this.getItemName(result));
			this.container.setText("textEnergy", Translation.translate("Energy: ") + result.energy);
			this.container.setText("textProgress", Translation.translate("Progress: ") + Math.floor(this.data.progress / result.energy * 100) + "%");
			this.container.setScale("progressScale", this.data.progress / result.energy);
			if (this.data.energyNeed) { // if recipe is operating
				if (this.data.progress >= result.energy) {
					const slot2 = this.container.getSlot("slot2");
					slot2.setSlot(result.id, slot2.count + result.count, result.data);
					input.id = input.data = 0;
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
		this.setActive(this.energyNode.energyIn > 0);
	}

	energyReceive(type: string, amount: number, voltage: number): number {
		if (!this.data.energyNeed) {
			const slot1 = this.container.getSlot("slot1");
			const slot2 = this.container.getSlot("slot2");
			const result = ICore.Recipe.getRecipeResult("molecularTransformer", slot1.id, slot1.data);
			if (result && (slot2.id == 0 || slot2.id == result.id && slot2.data == result.data && slot2.count + result.count <= Item.getMaxStack(slot2.id))) {
				this.data.id = slot1.id;
				this.data.data = slot1.data;
				this.data.energyNeed = result.energy;
				this.decreaseSlot(slot1, 1);
			} else {
				return 0;
			}
		}
		const add = Math.min(amount, this.data.energyNeed - this.data.progress);
		this.data.progress += add;
		return add;
	}
}

StorageInterface.createInterface(BlockID.molecularTransformer, {
	slots: {
		"slot1": {input: true},
		"slot2": {output: true}
	},
	isValidInput: function(item) {
		return ICore.Recipe.hasRecipeFor("molecularTransformer", item.id, item.data);
	}
});