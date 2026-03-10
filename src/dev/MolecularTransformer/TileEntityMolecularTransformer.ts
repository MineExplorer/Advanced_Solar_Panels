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
		StorageInterface.setSlotValidatePolicy(this.container, "slot1", (_, id: number, count: number, data: number) =>  {
			return !!this.getRecipe(id, data);
		});
		this.container.setSlotAddTransferPolicy("slot2", () => 0)
	}

	getRecipe(sourceId: number, sourceData: number): MolecularTransformerRecipe {
		const dictionary: MolecularTransformerRecipeDictionary = ICore.Recipe.getDictionary("molecularTransformer");
		return dictionary.getRecipe(sourceId, sourceData);
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
		const recipe = this.getRecipe(input.id, input.data);
		if (recipe) {
			this.container.setText("textInput", Translation.translate("Input: ") + this.getItemName(input));
			this.container.setText("textOutput", Translation.translate("Output: ") + this.getItemName(recipe.result as ItemInstance));
			this.container.setText("textEnergy", Translation.translate("Energy: ") + recipe.energy);
			this.container.setText("textProgress", Translation.translate("Progress: ") + Math.floor(this.data.progress / recipe.energy * 100) + "%");
			this.container.setScale("progressScale", this.data.progress / recipe.energy);
			if (this.data.progress >= recipe.energy) {
				const slot2 = this.container.getSlot("slot2");
				slot2.setSlot(recipe.result.id, slot2.count + recipe.result.count, recipe.result.data);
				input.id = input.data = 0;
				this.data.progress = this.data.energyNeed = 0;
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
			const recipe = this.getRecipe(slot1.id, slot1.data);
			if (recipe && (slot2.id == 0 || slot2.id == recipe.result.id && slot2.data == recipe.result.data && slot2.count + recipe.result.count <= 64)) {
				this.data.id = slot1.id;
				this.data.data = slot1.data;
				this.data.energyNeed = recipe.energy;
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